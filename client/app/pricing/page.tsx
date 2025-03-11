"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, X, Sparkles, Shield, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import NavBar from '@/components/nav-bar';
import BackButton from '@/components/back-button';

const plans = {
  monthly: [
    {
      name: "Free Trial",
      price: "0",
      description: "Perfect for trying out SupportSphere",
      features: [
        "Up to 3 team members",
        "Basic ticket management",
        "Email support",
        "1 custom integration",
        "Basic analytics",
      ],
      limitations: [
        "Limited to 50 tickets/month",
        "No priority support",
        "Basic reporting only",
      ],
      cta: "Start Free Trial",
      badge: "14 Days",
      icon: Shield,
    },
    {
      name: "Pro",
      price: "49",
      description: "Ideal for growing businesses",
      features: [
        "Up to 10 team members",
        "Advanced ticket management",
        "Priority email & chat support",
        "5 custom integrations",
        "Advanced analytics",
        "Custom workflows",
        "API access",
        "SLA management",
      ],
      limitations: [],
      cta: "Get Started",
      badge: "Most Popular",
      highlighted: true,
      icon: Zap,
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For large-scale operations",
      features: [
        "Unlimited team members",
        "Enterprise-grade security",
        "24/7 priority support",
        "Unlimited integrations",
        "Custom analytics",
        "Advanced workflows",
        "Full API access",
        "Custom SLA management",
        "Dedicated account manager",
        "Custom training",
      ],
      limitations: [],
      cta: "Contact Sales",
      icon: Users,
    },
  ],
  yearly: [
    {
      name: "Free Trial",
      price: "0",
      description: "Perfect for trying out SupportSphere",
      features: [
        "Up to 3 team members",
        "Basic ticket management",
        "Email support",
        "1 custom integration",
        "Basic analytics",
      ],
      limitations: [
        "Limited to 50 tickets/month",
        "No priority support",
        "Basic reporting only",
      ],
      cta: "Start Free Trial",
      badge: "14 Days",
      icon: Shield,
    },
    {
      name: "Pro",
      price: "39",
      description: "Ideal for growing businesses",
      features: [
        "Up to 10 team members",
        "Advanced ticket management",
        "Priority email & chat support",
        "5 custom integrations",
        "Advanced analytics",
        "Custom workflows",
        "API access",
        "SLA management",
      ],
      limitations: [],
      cta: "Get Started",
      badge: "Save 20%",
      highlighted: true,
      icon: Zap,
    },
    {
      name: "Enterprise",
      price: "159",
      description: "For large-scale operations",
      features: [
        "Unlimited team members",
        "Enterprise-grade security",
        "24/7 priority support",
        "Unlimited integrations",
        "Custom analytics",
        "Advanced workflows",
        "Full API access",
        "Custom SLA management",
        "Dedicated account manager",
        "Custom training",
      ],
      limitations: [],
      cta: "Contact Sales",
      badge: "Save 20%",
      icon: Users,
    },
  ],
};

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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

  const floatingIcon = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-10, 10],
      rotate: [-5, 5],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background perspective-container">
      <NavBar />
      <BackButton />
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div variants={item} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 mb-6 border border-primary/20 rounded-full bg-primary/5"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Choose Your Plan
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your business
          </p>
        </motion.div>

        <motion.div variants={item} className="flex justify-center items-center gap-4 mb-12">
          <Label htmlFor="billing-cycle" className={billingCycle === 'monthly' ? 'text-primary' : 'text-muted-foreground'}>
            Monthly
          </Label>
          <Switch
            id="billing-cycle"
            checked={billingCycle === 'yearly'}
            onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
          />
          <Label htmlFor="billing-cycle" className={billingCycle === 'yearly' ? 'text-primary' : 'text-muted-foreground'}>
            Yearly
            <Badge variant="secondary" className="ml-2">Save 20%</Badge>
          </Label>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
          <AnimatePresence mode="wait">
            {plans[billingCycle].map((plan, index) => (
              <motion.div
                key={`${plan.name}-${billingCycle}`}
                className={`card-3d transform-gpu ${plan.highlighted ? 'md:scale-105' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{
                  scale: plan.highlighted ? 1.08 : 1.05,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className={`relative h-full ${
                  plan.highlighted 
                    ? 'border-primary shadow-lg' 
                    : 'hover:border-primary/50'
                } overflow-hidden`}>
                  {plan.badge && (
                    <Badge 
                      className="absolute top-4 right-4"
                      variant={plan.highlighted ? "default" : "secondary"}
                    >
                      {plan.badge}
                    </Badge>
                  )}
                  <CardHeader>
                    <motion.div
                      variants={floatingIcon}
                      initial="initial"
                      animate="animate"
                      className="mb-4"
                    >
                      <plan.icon className="w-8 h-8 text-primary mx-auto" />
                    </motion.div>
                    <CardTitle className="text-2xl text-center">{plan.name}</CardTitle>
                    <div className="mt-4 text-center">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground ml-2">
                        {plan.price === "0" ? "" : `/${billingCycle === 'monthly' ? 'mo' : 'mo, billed yearly'}`}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-center mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-center gap-2 text-muted-foreground">
                          <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <X className="h-3 w-3" />
                          </div>
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {plan.cta === "Contact Sales" ? (
                      <Link href="/contact-sales" className="w-full">
                        <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                          {plan.cta}
                        </Button>
                      </Link>
                    ) : plan.cta === "Get Started" ? (
                      <Link href="/payment" className="w-full">
                        <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                          {plan.cta}
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/auth/register" className="w-full">
                        <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                          {plan.cta}
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={item} className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Enterprise Features</h2>
          <p className="text-muted-foreground mb-8">
            All enterprise plans include custom pricing and the following features:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Integration",
                description: "Connect with any tools your team uses"
              },
              {
                title: "Advanced Security",
                description: "SSO, audit logs, and compliance features"
              },
              {
                title: "Dedicated Support",
                description: "24/7 priority support with dedicated manager"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="transform-gpu hover:scale-105 transition-transform duration-300"
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="text-center p-6 hover-lift shine">
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-16">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-foreground/5 to-transparent"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <h2 className="text-3xl font-bold mb-4 relative z-10">Need a Custom Solution?</h2>
              <p className="text-lg mb-8 text-primary-foreground/90 relative z-10">
                Contact our sales team for a personalized demo and custom pricing.
              </p>
              <Link href="/contact-sales">
                <Button variant="secondary" size="lg" className="relative z-10">
                  Contact Sales
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}