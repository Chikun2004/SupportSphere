"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/nav-bar';
import BackButton from '@/components/back-button';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Implement actual payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: "Your subscription has been activated.",
      });
      
      router.push('/dashboard/customer');
    } catch (error) {
      toast({
        title: "Error",
        description: "Payment failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-background">
      <NavBar />
      <BackButton />
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div variants={item} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Complete Your Purchase</h1>
          <p className="text-xl text-muted-foreground">
            Enter your payment details to activate your subscription
          </p>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Number</label>
                  <div className="relative">
                    <Input
                      placeholder="4242 4242 4242 4242"
                      required
                      className="pl-10"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVC</label>
                    <Input
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Name on Card</label>
                  <Input
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Pay Now
                      </div>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  Your payment is secure and encrypted
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}