import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Middleware to set readAt when message is marked as read
messageSchema.pre('save', function(next) {
  if (this.isModified('read') && this.read) {
    this.readAt = new Date();
  }
  next();
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
