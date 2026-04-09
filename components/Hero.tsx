'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { getOptimizedImageUrl } from '@/lib/image-utils';
import ThreeBackground from './ThreeBackground';

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  // Contact information - Update these with your actual details
  const contactInfo = {
    email: 'christianrainersassmann@outlook.com',
    github: 'https://github.com/crsassmann',
    linkedin: 'https://www.linkedin.com/in/christian-rainer-sassmann-7a90093b8',
    resumeUrl: '/crsassmann.pdf', // Place your resume in the public folder
  };

  const handleGetInTouch = () => {
    const subject = encodeURIComponent('Hello! I would like to get in touch');
    const body = encodeURIComponent('Hi, \n\nI visited your portfolio and would like to discuss...\n\nBest regards,');
    const mailtoUrl = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

    window.open(mailtoUrl, '_blank');
    toast.success('Opening email client...');
  };

  const handleDownloadResume = () => {
    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = contactInfo.resumeUrl;
      link.download = 'crsassmann.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Resume download started!');
    } catch (error) {
      toast.error('Resume not available. Please contact me directly.');
      console.error('Resume download error:', error);
    }
  };

  const handleSocialClick = (url: string, platform: string) => {
    if (url === '#') {
      toast.info(`${platform} link will be available soon!`);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    const mailtoUrl = `mailto:${contactInfo.email}`;
    window.open(mailtoUrl, '_blank');
    toast.success('Opening email client...');
  };

  return (
    <section id="home" className="py-20 md:py-32 relative overflow-hidden">
      <ThreeBackground />
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;