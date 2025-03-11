"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Paperclip, Send, Image } from 'lucide-react';
import type { ChatMessage, User } from '@/app/types';

interface ChatWindowProps {
  ticketId?: string;
  currentUser: User;
  recipientUser?: User;
  onSendMessage: (message: Partial<ChatMessage>) => void;
}

export default function ChatWindow({
  ticketId,
  currentUser,
  recipientUser,
  onSendMessage,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Partial<ChatMessage> = {
      ticketId,
      senderId: currentUser.id,
      receiverId: recipientUser?.id,
      content: newMessage,
      type: 'text',
      createdAt: new Date(),
      read: false,
    };

    onSendMessage(message);
    setNewMessage('');
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar />
          <div>
            <p className="text-sm font-medium">
              {recipientUser?.name || 'Support Chat'}
            </p>
            <p className="text-xs text-muted-foreground">
              {recipientUser?.department || 'General Support'}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === currentUser.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="button" variant="outline" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" size="icon">
            <Image className="h-4 w-4" />
          </Button>
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}