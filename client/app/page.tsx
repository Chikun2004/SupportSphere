"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, TicketCheck, Users, Clock, Shield, Zap, LineChart, Award, Bot, Brain, Workflow, Network, Database, FileCheck, Settings, MessageSquare, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FeatureDialog = ({ 
  title, 
  description, 
  features,
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  features: { title: string; description: string }[];
  icon: any;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Card className="p-8 hover:shadow-lg transition-shadow card-3d cursor-pointer">
        <Icon className="h-12 w-12 text-primary mb-6 floating" />
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </Card>
    </DialogTrigger>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <Icon className="h-6 w-6 text-primary" />
          {title}
        </DialogTitle>
        <DialogDescription className="text-lg pt-2">
          {description}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{feature.title}</h4>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

export default function Home() {
  const features = [
    {
      title: "Smart Ticketing",
      description: "AI-powered ticket routing and prioritization",
      icon: TicketCheck,
      details: [
        {
          title: "Intelligent Routing",
          description: "Machine learning algorithms analyze ticket content and automatically route to the most qualified agent"
        },
        {
          title: "Priority Detection",
          description: "Automatically detect urgency levels based on content analysis and customer history"
        },
        {
          title: "Category Classification",
          description: "Auto-categorize tickets using natural language processing for faster resolution"
        },
        {
          title: "Load Balancing",
          description: "Evenly distribute tickets across team members based on expertise and workload"
        },
        {
          title: "Smart Queuing",
          description: "Optimize ticket queue management with predictive analytics"
        }
      ]
    },
    {
      title: "Instant Resolution",
      description: "AI-powered automated responses and solutions",
      icon: Zap,
      details: [
        {
          title: "AI Response Generation",
          description: "Generate contextually accurate responses using advanced language models"
        },
        {
          title: "Knowledge Base Integration",
          description: "Automatically suggest relevant documentation and solutions"
        },
        {
          title: "Predictive Resolution",
          description: "Anticipate customer needs based on historical patterns"
        },
        {
          title: "Self-Service Automation",
          description: "Enable customers to resolve common issues through guided workflows"
        },
        {
          title: "Continuous Learning",
          description: "System improves responses based on successful resolution patterns"
        }
      ]
    },
    {
      title: "Team Collaboration",
      description: "Seamless communication and ticket sharing",
      icon: Users,
      details: [
        {
          title: "Real-time Chat",
          description: "Instant team communication with context-aware threading"
        },
        {
          title: "Knowledge Sharing",
          description: "Collaborative documentation and best practices repository"
        },
        {
          title: "Ticket Handoff",
          description: "Smooth ticket transfer with complete context preservation"
        },
        {
          title: "Team Insights",
          description: "Track team performance and collaboration metrics"
        },
        {
          title: "Cross-department Coordination",
          description: "Streamline communication between different departments"
        }
      ]
    },
    {
      title: "Analytics & Insights",
      description: "Comprehensive reporting and analytics",
      icon: LineChart,
      details: [
        {
          title: "Custom Dashboards",
          description: "Create personalized views of key metrics and KPIs"
        },
        {
          title: "Trend Analysis",
          description: "Identify patterns and areas for improvement"
        },
        {
          title: "Performance Metrics",
          description: "Track individual and team performance metrics"
        },
        {
          title: "Customer Satisfaction",
          description: "Monitor and analyze customer satisfaction scores"
        },
        {
          title: "Predictive Analytics",
          description: "Forecast support trends and resource needs"
        }
      ]
    },
    {
      title: "24/7 Availability",
      description: "Round-the-clock automated support",
      icon: Clock,
      details: [
        {
          title: "Automated Responses",
          description: "Provide instant support outside business hours"
        },
        {
          title: "Global Coverage",
          description: "Support customers across different time zones"
        },
        {
          title: "Smart Escalation",
          description: "Automatically escalate urgent issues to on-call team"
        },
        {
          title: "Follow-up Automation",
          description: "Schedule and automate follow-up communications"
        },
        {
          title: "Service Level Monitoring",
          description: "Track and maintain response time commitments"
        }
      ]
    },
    {
      title: "Customer Success",
      description: "Proactive customer satisfaction tools",
      icon: Award,
      details: [
        {
          title: "Success Tracking",
          description: "Monitor customer health scores and engagement metrics"
        },
        {
          title: "Proactive Outreach",
          description: "Identify and address potential issues before they escalate"
        },
        {
          title: "Feedback Collection",
          description: "Automated surveys and feedback analysis"
        },
        {
          title: "Customer Journey Mapping",
          description: "Track and optimize the customer support experience"
        },
        {
          title: "Success Metrics",
          description: "Measure and improve customer satisfaction rates"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10" />
        <div className="absolute inset-y-0 right-0 w-[800px] bg-gradient-to-l from-primary/5 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-1.5 mb-8 border border-primary/20 rounded-full bg-primary/5 text-primary text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" /> Enterprise-grade Support Platform
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Customer Support
              <br />
              Reimagined
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
              Transform your customer support experience with our AI-powered platform.
              Handle support tickets efficiently and provide exceptional service at scale.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/pricing">
                <Button size="lg" className="h-12 px-8 text-lg">
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                  Learn more
                </Button>
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
              {[
                { label: 'Active Users', value: '30+' },
                { label: 'Response Rate', value: '99.9%' },
                { label: 'Tickets Resolved', value: '50+' },
                { label: 'Customer Satisfaction', value: '98%' },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Enterprise Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to deliver exceptional customer support at scale
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureDialog
                key={index}
                title={feature.title}
                description={feature.description}
                features={feature.details}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-primary p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-foreground/20 mix-blend-multiply" />
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Customer Support?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of companies delivering exceptional customer service with SupportSphere.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/pricing">
                  <Button size="lg" variant="secondary" className="h-12 px-8 text-lg">
                    View Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-lg bg-white/10 hover:bg-white/20 text-white border-white/20">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}