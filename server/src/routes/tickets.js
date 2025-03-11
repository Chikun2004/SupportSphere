import express from 'express';
import { body, validationResult } from 'express-validator';
import Ticket from '../models/Ticket.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware for authentication
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Validation middleware
const validateTicket = [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('priority').isIn(['low', 'medium', 'high', 'urgent']),
  body('category').trim().notEmpty()
];

// Create ticket
router.post('/', auth, validateTicket, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, priority, category, department } = req.body;

    // Calculate SLA times based on priority
    const slaConfig = {
      low: { response: 24, resolution: 72 },
      medium: { response: 12, resolution: 48 },
      high: { response: 4, resolution: 24 },
      urgent: { response: 1, resolution: 8 }
    };

    const now = new Date();
    const responseDeadline = new Date(now.getTime() + slaConfig[priority].response * 60 * 60 * 1000);
    const resolutionDeadline = new Date(now.getTime() + slaConfig[priority].resolution * 60 * 60 * 1000);

    const ticket = new Ticket({
      title,
      description,
      priority,
      category,
      department,
      createdBy: req.user._id,
      sla: {
        responseTime: slaConfig[priority].response,
        resolutionTime: slaConfig[priority].resolution,
        responseDeadline,
        resolutionDeadline
      }
    });

    await ticket.save();

    // Create initial message
    const message = new Message({
      ticketId: ticket._id,
      senderId: req.user._id,
      content: description,
      type: 'text'
    });

    await message.save();

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ message: 'Server error while creating ticket' });
  }
});

// Get all tickets
router.get('/', auth, async (req, res) => {
  try {
    const { status, priority, category, department } = req.query;
    const filter = {};

    // Apply filters
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (department) filter.department = department;

    // Role-based filtering
    if (req.user.role === 'customer') {
      filter.createdBy = req.user._id;
    } else if (req.user.role === 'support') {
      filter.department = req.user.department;
    }

    const tickets = await Ticket.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ message: 'Server error while fetching tickets' });
  }
});

// Get ticket by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Get messages for the ticket
    const messages = await Message.find({ ticketId: ticket._id })
      .populate('senderId', 'name email')
      .sort({ createdAt: 1 });

    res.json({ ticket, messages });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ message: 'Server error while fetching ticket' });
  }
});

// Update ticket
router.patch('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check permissions
    if (req.user.role === 'customer' && ticket.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (key !== '_id' && key !== 'createdBy') {
        ticket[key] = updates[key];
      }
    });

    // Check SLA breach
    if (ticket.checkSLABreach()) {
      // TODO: Send SLA breach notification
    }

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({ message: 'Server error while updating ticket' });
  }
});

// Add message to ticket
router.post('/:id/messages', auth, async (req, res) => {
  try {
    const { content, type = 'text', attachments = [] } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const message = new Message({
      ticketId: ticket._id,
      senderId: req.user._id,
      content,
      type,
      attachments
    });

    await message.save();

    // Update ticket last activity
    ticket.lastUpdated = new Date();
    await ticket.save();

    await message.populate('senderId', 'name email');
    res.status(201).json(message);
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ message: 'Server error while adding message' });
  }
});

export default router;
