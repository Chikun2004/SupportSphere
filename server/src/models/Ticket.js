import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  category: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  department: {
    type: String
  },
  sla: {
    responseTime: {
      type: Number,
      required: true
    },
    resolutionTime: {
      type: Number,
      required: true
    },
    breached: {
      type: Boolean,
      default: false
    },
    responseDeadline: {
      type: Date
    },
    resolutionDeadline: {
      type: Date
    }
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  tags: [String],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware to update lastUpdated
ticketSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Method to check if SLA is breached
ticketSchema.methods.checkSLABreach = function() {
  const now = new Date();
  if (!this.sla.breached) {
    if (
      (this.sla.responseDeadline && now > this.sla.responseDeadline) ||
      (this.sla.resolutionDeadline && now > this.sla.resolutionDeadline)
    ) {
      this.sla.breached = true;
      return true;
    }
  }
  return false;
};

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
