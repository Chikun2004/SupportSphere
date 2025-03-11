"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Building2, Users, Phone, Mail, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import NavBar from '@/components/nav-bar';
import BackButton from '@/components/back-button';

export default function ContactSalesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "Our enterprise team will contact you within 24 hours.",
      });
      
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        teamSize: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  const successAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <BackButton />
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div variants={item} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Contact Our Sales Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our sales team to discuss your specific needs and how SupportSphere can help your business grow.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              variants={successAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="max-w-2xl mx-auto"
            >
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-12 text-center space-y-6">
                  <div className="relative mx-auto w-20 h-20">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <CheckCircle className="w-20 h-20 text-primary relative z-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Thank You for Reaching Out!</h2>
                  <p className="text-muted-foreground">
                    Our enterprise team will review your request and get back to you within 24 hours.
                  </p>
                  <div className="pt-6 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-medium">What happens next?</span>
                    </div>
                    <div className="grid gap-4 max-w-md mx-auto text-left">
                      {[
                        "Personal consultation with our solution architect",
                        "Customized demo of relevant features",
                        "Tailored pricing proposal for your needs",
                        "Technical implementation discussion"
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                            {index + 1}
                          </div>
                          <span>{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-8"
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          placeholder="john@company.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          required
                          placeholder="Company Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Team Size</label>
                        <Select
                          value={formData.teamSize}
                          onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="501+">501+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          placeholder="Tell us about your needs..."
                          className="min-h-[150px]"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending Message...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item} className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Why Choose Enterprise?</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Building2 className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-medium mb-1">Custom Solutions</h3>
                          <p className="text-muted-foreground">Tailored implementation specific to your business needs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Users className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-medium mb-1">Dedicated Support</h3>
                          <p className="text-muted-foreground">Personal account manager and priority support</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MessageSquare className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-medium mb-1">Training & Onboarding</h3>
                          <p className="text-muted-foreground">Comprehensive training and seamless onboarding</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>0674-324565</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <span>enterprise@supportsphere.com</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}