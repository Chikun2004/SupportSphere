"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Users, Clock, LineChart, Award, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import NavBar from '@/components/nav-bar';
import BackButton from '@/components/back-button';

export default function AboutPage() {
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
        {/* Hero Section */}
        <motion.div variants={item} className="text-center mb-20 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 mb-6 border border-primary/20 rounded-full bg-primary/5"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            About SupportSphere
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text relative">
            Revolutionizing Support
            <motion.div
              className="absolute -right-8 top-0 text-primary opacity-20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Shield className="w-24 h-24" />
            </motion.div>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming customer support with cutting-edge technology and human-centered design.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div variants={item}>
          <Card className="mb-20 glass transform-gpu hover:shadow-xl transition-all duration-500 hover:-translate-y-2 card-3d">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <motion.div
                variants={floatingIcon}
                initial="initial"
                animate="animate"
                className="relative z-10"
              >
                <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4 relative z-10">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto relative z-10">
                To empower businesses with intelligent support solutions that create exceptional customer experiences and drive meaningful relationships.
              </p>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 z-0" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Features */}
        <motion.div variants={item} className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SupportSphere?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
            {[
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Lightning Fast",
                description: "Resolve customer inquiries quickly with AI-powered automation and intelligent routing."
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Team Collaboration",
                description: "Enable seamless communication between support agents and departments."
              },
              {
                icon: <LineChart className="w-8 h-8 text-primary" />,
                title: "Data Insights",
                description: "Make informed decisions with comprehensive analytics and reporting."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card-3d transform-gpu"
                whileHover={{
                  scale: 1.05,
                  rotateX: 10,
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      variants={floatingIcon}
                      initial="initial"
                      animate="animate"
                      className="mb-4"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div variants={item} className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 perspective-container">
            {[
              { value: "99.9%", label: "Uptime", icon: Clock },
              { value: "< 30s", label: "Avg. Response Time", icon: Zap },
              { value: "50+", label: "Tickets Resolved", icon: CheckCircle },
              { value: "98%", label: "Customer Satisfaction", icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="card-3d transform-gpu"
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="text-center p-6 relative overflow-hidden">
                  <motion.div
                    variants={floatingIcon}
                    initial="initial"
                    animate="animate"
                    className="mb-2"
                  >
                    <stat.icon className="h-6 w-6 text-primary mx-auto" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 z-0" />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div variants={item} className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-container">
            {[
              {
                icon: <Clock className="w-6 h-6 text-primary" />,
                title: "Save Time",
                description: "Automate routine tasks and reduce resolution time by up to 50%"
              },
              {
                icon: <Award className="w-6 h-6 text-primary" />,
                title: "Improve Quality",
                description: "Maintain consistent support quality across all channels"
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-primary" />,
                title: "Increase Efficiency",
                description: "Handle more tickets with the same team size"
              },
              {
                icon: <Users className="w-6 h-6 text-primary" />,
                title: "Customer Satisfaction",
                description: "Boost customer satisfaction with faster, better support"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="transform-gpu hover:scale-105 transition-transform duration-300"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="h-full hover-lift shine">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div
                        variants={floatingIcon}
                        initial="initial"
                        animate="animate"
                      >
                        {benefit.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={item}>
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
              <h2 className="text-3xl font-bold mb-6 relative z-10">Ready to Transform Your Customer Support?</h2>
              <p className="text-lg mb-8 text-primary-foreground/90 relative z-10">
                Join thousands of companies delivering exceptional customer service with SupportSphere.
              </p>
              <div className="flex justify-center gap-4 relative z-10">
                <Link href="/auth/register">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="h-12 px-8 hover:scale-105 transition-transform"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}