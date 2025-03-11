"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Clock, MessageSquare, Paperclip } from 'lucide-react';
import type { Ticket, Comment } from '@/app/types';
import NavBar from '@/components/nav-bar';
import BackButton from '@/components/back-button';

export default function TicketDetail({ id }: { id: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const mockTicket: Ticket = {
      id: id,
      title: 'Login Issue',
      description: 'Unable to login to the dashboard after password reset.',
      status: 'open',
      priority: 'high',
      category: 'Authentication',
      createdBy: 'user@example.com',
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-03-20'),
    };

    const mockComments: Comment[] = [
      {
        id: '1',
        ticketId: id,
        content: 'We are looking into this issue.',
        userId: 'support@example.com',
        createdAt: new Date('2024-03-20T10:00:00'),
      },
      {
        id: '2',
        ticketId: id,
        content: 'Please provide your browser version.',
        userId: 'support@example.com',
        createdAt: new Date('2024-03-20T10:30:00'),
      },
    ];

    setTicket(mockTicket);
    setComments(mockComments);
  }, [id]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: String(comments.length + 1),
      ticketId: id,
      content: newComment,
      userId: 'user@example.com',
      createdAt: new Date(),
    };

    setComments([...comments, comment]);
    setNewComment('');
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the ticket.",
    });
  };

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <NavBar />
      <BackButton />
      <div className="max-w-4xl mx-auto space-y-6 pt-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{ticket.title}</h1>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
              ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {ticket.priority}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
              ticket.status === 'in-progress' ? 'bg-purple-100 text-purple-800' :
              'bg-green-100 text-green-800'
            }`}>
              {ticket.status}
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{ticket.description}</p>
            </div>
            <div className="flex gap-6">
              <div>
                <h3 className="font-medium mb-1">Category</h3>
                <p className="text-muted-foreground">{ticket.category}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Created</h3>
                <p className="text-muted-foreground">
                  {ticket.createdAt.toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Last Updated</h3>
                <p className="text-muted-foreground">
                  {ticket.updatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{comment.userId}</span>
                    <span className="text-sm text-muted-foreground">
                      {comment.createdAt.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{comment.content}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <Button type="button" variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach Files
                </Button>
                <Button type="submit">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}