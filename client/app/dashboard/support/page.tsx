"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, TicketCheck, AlertCircle, Clock, CheckCircle, Search, Filter, BarChart3, UserCheck, Timer, Award } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import NavBar from '@/components/nav-bar';
import BackButton from '@/components/back-button';

const activityData = [
  { name: 'Mon', resolved: 12, new: 8 },
  { name: 'Tue', resolved: 15, new: 10 },
  { name: 'Wed', resolved: 18, new: 12 },
  { name: 'Thu', resolved: 14, new: 9 },
  { name: 'Fri', resolved: 16, new: 11 },
  { name: 'Sat', resolved: 8, new: 5 },
  { name: 'Sun', resolved: 6, new: 4 },
];

const categoryData = [
  { name: 'Technical', value: 35 },
  { name: 'Billing', value: 25 },
  { name: 'Account', value: 20 },
  { name: 'Feature', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const initialTickets = [
  { 
    id: 1, 
    customer: 'John Doe', 
    title: 'Login Issue', 
    status: 'open', 
    priority: 'high', 
    created: '2024-03-20',
    category: 'Authentication',
    responseTime: '30m',
    lastUpdate: '2 hours ago',
    assignedTo: null
  },
  { 
    id: 2, 
    customer: 'Jane Smith', 
    title: 'Feature Request', 
    status: 'in-progress', 
    priority: 'medium', 
    created: '2024-03-19',
    category: 'Enhancement',
    responseTime: '1h',
    lastUpdate: '1 day ago',
    assignedTo: 'support@example.com'
  },
  { 
    id: 3, 
    customer: 'Bob Johnson', 
    title: 'Payment Error', 
    status: 'open', 
    priority: 'urgent', 
    created: '2024-03-18',
    category: 'Billing',
    responseTime: '15m',
    lastUpdate: '3 hours ago',
    assignedTo: null
  },
];

export default function SupportDashboard() {
  const [tickets, setTickets] = useState(initialTickets);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleTakeTicket = async (id: number) => {
    try {
      setTickets(tickets.map(ticket => 
        ticket.id === id ? { ...ticket, status: 'in-progress', assignedTo: 'support@example.com' } : ticket
      ));
      toast({
        title: "Ticket Assigned",
        description: "You have been assigned to this ticket.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to take ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResolveTicket = async (id: number) => {
    try {
      setTickets(tickets.map(ticket => 
        ticket.id === id ? { ...ticket, status: 'resolved' } : ticket
      ));
      toast({
        title: "Ticket Resolved",
        description: "The ticket has been marked as resolved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resolve ticket. Please try again.",
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

  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = filter === 'all' || ticket.status === filter;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Support Dashboard</h1>
            <p className="text-muted-foreground">Manage and resolve customer support tickets</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tickets..." 
                className="pl-10 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tickets</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 perspective-container">
          <motion.div variants={item}>
            <Card className="card-3d transform-gpu">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Response Time</CardTitle>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                  <Timer className="h-6 w-6 text-primary floating relative z-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28m</div>
                <p className="text-xs text-muted-foreground mt-1">Average response time</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="card-3d transform-gpu">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Resolution Rate</CardTitle>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                  <Award className="h-6 w-6 text-primary floating relative z-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground mt-1">First contact resolution</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="card-3d transform-gpu">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Active Agents</CardTitle>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                  <UserCheck className="h-6 w-6 text-primary floating relative z-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-muted-foreground mt-1">Online support staff</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="card-3d transform-gpu">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Pending Tickets</CardTitle>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                  <AlertCircle className="h-6 w-6 text-primary floating relative z-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{tickets.filter(t => t.status === 'open').length}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item} className="md:col-span-2">
            <Card className="glass transform-gpu">
              <CardHeader>
                <CardTitle className="text-xl">Weekly Performance</CardTitle>
                <CardDescription>Ticket resolution metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <XAxis dataKey="name" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip />
                      <Bar dataKey="resolved" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="new" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="glass transform-gpu">
              <CardHeader>
                <CardTitle className="text-xl">Ticket Categories</CardTitle>
                <CardDescription>Distribution by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map((category, index) => (
                    <div key={category.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{category.name}</span>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Active Tickets</CardTitle>
                  <CardDescription>Manage and resolve customer inquiries</CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTickets.map(ticket => (
                  <motion.div
                    key={ticket.id}
                    className="flex items-center justify-between p-6 border rounded-xl hover-lift shine bg-card/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-full animate-pulse ${
                          ticket.priority === 'urgent' ? 'bg-red-500/20' :
                          ticket.priority === 'high' ? 'bg-orange-500/20' :
                          'bg-yellow-500/20'
                        }`}></div>
                        <AlertCircle className={`h-6 w-6 mt-1 relative z-10 ${
                          ticket.priority === 'urgent' ? 'text-red-500' :
                          ticket.priority === 'high' ? 'text-orange-500' :
                          'text-yellow-500'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-medium">{ticket.title}</h3>
                          <span className="text-sm text-muted-foreground">#{ticket.id}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{ticket.customer}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{ticket.created}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Response time: {ticket.responseTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        ticket.priority === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        ticket.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
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
                        {ticket.status === 'open' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleTakeTicket(ticket.id)}
                            className="glow button-hover transform-gpu"
                          >
                            Take Ticket
                          </Button>
                        )}
                        {ticket.status === 'in-progress' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleResolveTicket(ticket.id)}
                            className="glow button-hover transform-gpu"
                          >
                            Mark Resolved
                          </Button>
                        )}
                        <Link href={`/tickets/${ticket.id}`}>
                          <Button 
                            size="sm"
                            className="glow button-hover transform-gpu"
                          >
                            View Details
                          </Button>
                        </Link>
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