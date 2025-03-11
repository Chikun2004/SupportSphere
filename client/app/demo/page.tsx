"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ChatWindow from '@/components/chat/chat-window';
import SLATimer from '@/components/tickets/sla-timer';
import PriorityBadge from '@/components/tickets/priority-badge';
import EmailPreview from '@/components/notifications/email-preview';
import RoleSwitcher from '@/components/dashboard/role-switcher';
import type { ChatMessage, User, Ticket, EmailTemplate } from '@/app/types';
import NavBar from '@/components/nav-bar';
import BackButton from '@/components/back-button';
import { Sparkles, Zap, Shield, Clock, MessageSquare, Mail } from 'lucide-react';

export default function DemoPage() {
  const currentUser: User = {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'customer',
    createdAt: new Date(),
  };

  const supportAgent: User = {
    id: '2',
    email: 'support@example.com',
    name: 'Support Agent',
    role: 'support',
    department: 'Technical Support',
    createdAt: new Date(),
  };

  const mockTicket: Ticket = {
    id: '1',
    title: 'Test Ticket',
    description: 'This is a test ticket',
    status: 'open',
    priority: 'high',
    category: 'Technical',
    createdBy: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTemplate: EmailTemplate = {
    id: '1',
    name: 'Ticket Created',
    subject: 'New Ticket: {{ticketTitle}}',
    body: `
      <h2>New Support Ticket Created</h2>
      <p>Ticket: {{ticketTitle}}</p>
      <p>Priority: {{priority}}</p>
      <p>Created by: {{userName}}</p>
    `,
    variables: ['ticketTitle', 'priority', 'userName'],
    type: 'ticket_created',
  };

  const handleSendMessage = (message: Partial<ChatMessage>) => {
    console.log('Message sent:', message);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <NavBar />
      <BackButton />
      <motion.div 
        className="max-w-7xl mx-auto space-y-8 pt-16"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div variants={item} className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1.5 mb-4 border border-primary/20 rounded-full bg-primary/5">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Interactive Feature Showcase
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Experience the Power
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive suite of support features designed for modern teams
          </p>
        </motion.div>

        {/* Role Switcher */}
        <motion.div variants={item}>
          <Card className="overflow-hidden transform-gpu hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Role-based Access Control</CardTitle>
              </div>
              <CardDescription>Switch between different user roles to explore various perspectives</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <RoleSwitcher />
            </CardContent>
          </Card>
        </motion.div>

        {/* Priority and SLA */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden transform-gpu hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle>Priority Levels</CardTitle>
              </div>
              <CardDescription>Visual indicators for ticket urgency</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <PriorityBadge priority="urgent" />
                <PriorityBadge priority="high" />
                <PriorityBadge priority="medium" />
                <PriorityBadge priority="low" />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform-gpu hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle>SLA Monitoring</CardTitle>
              </div>
              <CardDescription>Real-time service level agreement tracking</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <SLATimer ticket={mockTicket} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Chat */}
        <motion.div variants={item}>
          <Card className="overflow-hidden transform-gpu hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle>Live Chat Support</CardTitle>
              </div>
              <CardDescription>Real-time communication with support agents</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChatWindow
                currentUser={currentUser}
                recipientUser={supportAgent}
                onSendMessage={handleSendMessage}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Email Notifications */}
        <motion.div variants={item}>
          <Card className="overflow-hidden transform-gpu hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Email Notifications</CardTitle>
              </div>
              <CardDescription>Automated email updates and notifications</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <EmailPreview
                template={mockTemplate}
                variables={{
                  ticketTitle: 'Login Issue',
                  priority: 'High',
                  userName: 'John Doe',
                }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={item}>
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/5 to-transparent" />
              <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to Transform Your Support?</h2>
              <p className="text-lg mb-8 text-primary-foreground/90 relative z-10">
                Experience these features and more in your own support environment
              </p>
              <Button variant="secondary" size="lg" className="relative z-10">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}