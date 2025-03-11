export type User = {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'support' | 'admin';
  avatar?: string;
  createdAt: Date;
  lastActive?: Date;
  department?: string;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  sla?: {
    responseTime: number;
    resolutionTime: number;
    breached: boolean;
  };
  attachments?: string[];
  tags?: string[];
  department?: string;
};

export type Comment = {
  id: string;
  ticketId: string;
  content: string;
  userId: string;
  createdAt: Date;
  attachments?: string[];
  isInternal?: boolean;
};

export type ChatMessage = {
  id: string;
  ticketId?: string;
  senderId: string;
  receiverId?: string;
  content: string;
  createdAt: Date;
  read: boolean;
  type: 'text' | 'image' | 'file';
  attachments?: string[];
};

export type SLAConfig = {
  priority: 'low' | 'medium' | 'high' | 'urgent';
  responseTime: number; // in minutes
  resolutionTime: number; // in minutes
};

export type Department = {
  id: string;
  name: string;
  description?: string;
  members: string[];
  categories: string[];
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
  link?: string;
};

export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  type: 'ticket_created' | 'ticket_updated' | 'ticket_resolved' | 'sla_breach';
};