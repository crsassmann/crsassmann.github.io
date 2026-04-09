'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, MessageCircle, Users } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact information
  const contactInfo = {
    email: 'christianrainersassmann@outlook.com',
    phone: '+18737348962',
    discord: 'crsassmann',
    teams: 'https://teams.live.com/l/invite/FEAXswdluk6PpBPfQI?v=g1',
    location: 'Tokyo, Japan'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create email content
      const emailSubject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
      const emailBody = encodeURIComponent(
        `Hello,\n\n` +
        `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `Best regards,\n${formData.firstName} ${formData.lastName}`
      );

      // Open email client with pre-filled content
      const mailtoUrl = `mailto:${contactInfo.email}?subject=${emailSubject}&body=${emailBody}`;
      window.open(mailtoUrl, '_blank');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });

      toast.success('Email client opened! Your message is ready to send.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailClick = () => {
    const mailtoUrl = `mailto:${contactInfo.email}`;
    window.open(mailtoUrl, '_blank');
    toast.success('Opening email client...');
  };

  const handlePhoneClick = () => {
    const phoneUrl = `tel:${contactInfo.phone}`;
    window.open(phoneUrl, '_self');
  };

  const handleDiscordClick = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.discord);
      toast.success('Discord username copied to clipboard.');
    } catch {
      toast.success(`Discord: ${contactInfo.discord}`);
    }
  };

  const handleTeamsClick = () => {
    window.open(contactInfo.teams, '_blank', 'noopener,noreferrer');
    toast.success('Opening Teams invite link...');
  };

  const handleLocationClick = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.location)}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    toast.success('Opening location in Google Maps...');
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {`Ready to bring your ideas to life? Let's discuss your next project`}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              <h3 className="text-2xl font-semibold mb-6">{`Let's Connect`}</h3>
              <p className="text-muted-foreground mb-8">
                {`I'm always interested in hearing about new opportunities and exciting projects.
                Whether you have a question or just want to say hi, feel free to reach out!`}
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleEmailClick}
                  className="flex items-center gap-3 w-full text-left p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{contactInfo.email}</p>
                  </div>
                </button>

                <button
                  onClick={handlePhoneClick}
                  className="flex items-center gap-3 w-full text-left p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                </button>

                <button
                  onClick={handleDiscordClick}
                  className="flex items-center gap-3 w-full text-left p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Discord</p>
                    <p className="text-muted-foreground">{contactInfo.discord}</p>
                  </div>
                </button>

                <button
                  onClick={handleTeamsClick}
                  className="flex items-center gap-3 w-full text-left p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Teams</p>
                    {/* <p className="text-muted-foreground break-all">{contactInfo.teams}</p> */}
                  </div>
                </button>

                <button
                  onClick={handleLocationClick}
                  className="flex items-center gap-3 w-full text-left p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{contactInfo.location}</p>
                  </div>
                </button>
              </div>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Your message..."
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Preparing Email...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;