"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Clock, CheckCircle, AlertCircle, TrendingUp, MessageSquare, Calendar } from 'lucide-react';
import Link from 'next/link';
import CreateTicket from './create-ticket';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import NavBar from '@/components/nav-bar';
import BackButton from '@/components/back-button';

const chartData = [
  { name: 'Mon', tickets: 2 },
  { name: 'Tue', tickets: 4 },
  { name: 'Wed', tickets: 3 },
  { name: 'Thu', tickets: 5 },
  { name: 'Fri', tickets: 2 },
  { name: 'Sat', tickets: 1 },
  { name: 'Sun', tickets: 3 },
];

export default function CustomerDashboard() {
  const [tickets, setTickets] = useState([
    { 
      id: 1, 
      title: 'Login Issue', 
      status: 'open', 
      priority: 'high', 
      created: '2024-03-20',
      lastResponse: '2 hours ago',
      category: 'Authentication',
      responses: 3
    },
    { 
      id: 2, 
      title: 'Feature Request', 
      status: 'in-progress', 
      priority: 'medium', 
      created: '2024-03-19',
      lastResponse: '1 day ago',
      category: 'Enhancement',
      responses: 5
    },
    { 
      id: 3, 
      title: 'Payment Failed', 
      status: 'resolved', 
      priority: 'high', 
      created: '2024-03-18',
      lastResponse: '3 days ago',
      category: 'Billing',
      responses: 4
    },
  ]);

  const { toast } = useToast();

  const handleDeleteTicket = async (id: number) => {
    try {
      setTickets(tickets.filter(ticket => ticket.id !== id));
      toast({
        title: "Ticket Deleted",
        description: "The ticket has been removed from your dashboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">Track and manage your support requests</p>
          </div>
          <CreateTicket />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 perspective-container">
          <motion.div variants={item}>
            <Card className="card-3d transform-gpu">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Total Tickets</CardTitle>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                  <Ticket className="h-6 w-6 text-primary floating relative z-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{tickets.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Lifetime total</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="card-3d transform-gpu">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">In Progress</CardTitle>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                  <Clock className="h-6 w-6 text-primary floating relative z-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {tickets.filter(t => t.status === 'in-progress').length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Being handled</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="card-3d transform-gpu">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Resolved</CardTitle>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                  <CheckCircle className="h-6 w-6 text-primary floating relative z-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {tickets.filter(t => t.status === 'resolved').length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Successfully closed</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="card-3d transform-gpu">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Avg Response</CardTitle>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                  <MessageSquare className="h-6 w-6 text-primary floating relative z-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.4h</div>
                <p className="text-xs text-muted-foreground mt-1">Response time</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item} className="md:col-span-2">
            <Card className="glass transform-gpu">
              <CardHeader>
                <CardTitle className="text-xl">Ticket Activity</CardTitle>
                <CardDescription>Weekly ticket creation trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="name" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="tickets" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2} 
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="glass transform-gpu">
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>Latest updates on your tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.slice(0, 3).map((ticket, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${
                        ticket.status === 'open' ? 'bg-blue-500' :
                        ticket.status === 'in-progress' ? 'bg-purple-500' :
                        'bg-green-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{ticket.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Last response {ticket.lastResponse}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={item}>
          <Card className="glass transform-gpu">
            <CardHeader>
              <CardTitle className="text-2xl">Your Tickets</CardTitle>
              <CardDescription>Manage and track your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map(ticket => (
                  <motion.div
                    key={ticket.id}
                    className="flex items-center justify-between p-6 border rounded-xl hover-lift shine bg-card/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-start gap-4">
                      {ticket.priority === 'high' && (
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
                          <AlertCircle className="h-6 w-6 text-red-500 mt-1 relative z-10" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-medium">{ticket.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Created on {ticket.created}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{ticket.responses} responses</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        ticket.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {ticket.priority}
                      </span>
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        ticket.status === 'open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        ticket.status === 'in-progress' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {ticket.status}
                      </span>
                      <div className="flex gap-3">
                        <Link href={`/tickets/${ticket.id}`}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="glow button-hover transform-gpu"
                          >
                            View Details
                          </Button>
                        </Link>
                        {ticket.status === 'resolved' && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="glow button-hover transform-gpu"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}