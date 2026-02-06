"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Clock, CheckCircle, MessageCircle, Send, Phone, Mail, User, Building2, Award, Users, FileCheck, TrendingUp } from 'lucide-react';
import { cn, ensureLightMode } from '@/lib/utils';

/**
 * Interface for the lead form data
 */
interface LeadFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  question: string;
}

/**
 * Premium UAE e-Invoicing compliance landing page
 * Features hero section with lead capture and value proposition grid
 */
export const UAEInvoicingLanding = () => {
  // Ensure light mode is always active
  React.useEffect(() => {
    ensureLightMode();
  }, []);
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '+971',
    question: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          companyName: formData.companyName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          question: formData.question.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSubmitError(data.error || `Request failed (${res.status})`);
        return;
      }
      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '+971',
          question: ''
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleWhatsAppInquiry = () => {
    const details: string[] = [];
    if (formData.fullName.trim()) details.push(`Name: ${formData.fullName.trim()}`);
    if (formData.companyName.trim()) details.push(`Company: ${formData.companyName.trim()}`);
    if (formData.email.trim()) details.push(`Email: ${formData.email.trim()}`);
    if (formData.phone.trim()) details.push(`Phone: ${formData.phone.trim()}`);
    if (formData.question.trim()) details.push(`Question: ${formData.question.trim()}`);
    const intro = details.join('\n');
    const standardText = `Hi, I'm interested in learning more about UAE e-Invoicing compliance with KRV Auditing.`;
    const message = intro ? `${intro}\n\n${standardText}` : standardText;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/971551177659?text=${encodedMessage}`, '_blank');
  };
  const urgencyPoints = [{
    icon: AlertTriangle,
    text: 'Mandatory registration under UAE Federal Tax Authority regulations',
    highlight: true
  }, {
    icon: Clock,
    text: 'Late action can result in penalties up to AED 50,000',
    highlight: true
  }, {
    icon: Shield,
    text: 'Fixing non-compliance later costs 3-5x more than doing it right now',
    highlight: false
  }];
  const complianceValues = [{
    icon: Shield,
    title: 'Avoid penalties',
    description: 'Non-compliance with UAE e-Invoicing can lead to fines ranging from AED 10,000 to AED 50,000. We ensure you meet all FTA requirements on time.',
    color: 'from-red-50 to-red-100',
    iconColor: 'text-red-600',
    borderColor: 'border-red-200'
  }, {
    icon: Clock,
    title: 'Avoid last-minute rush',
    description: 'Deadlines are approaching fast. Our streamlined process helps you register and implement e-Invoicing before the rush, ensuring smooth operations.',
    color: 'from-amber-50 to-amber-100',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-200'
  }, {
    icon: CheckCircle,
    title: 'Peace of mind',
    description: 'Sleep better knowing your business is fully compliant. Our expert team handles everything from registration to implementation and ongoing support.',
    color: 'from-emerald-50 to-emerald-100',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-200'
  }];
  const partnerReasons = [{
    icon: Award,
    title: 'FTA Approved Tax Agency',
    description: 'Official recognition by the Federal Tax Authority ensures your compliance is in expert hands.'
  }, {
    icon: FileCheck,
    title: 'Ministry of Economy Licensed',
    description: 'Our auditors are licensed by the UAE Ministry of Economy, guaranteeing professional standards.'
  }, {
    icon: Shield,
    title: 'ISO 9001-2015 Certified',
    description: 'International quality management certification ensures consistent, reliable service delivery.'
  }, {
    icon: TrendingUp,
    title: '20+ Years of Experience',
    description: 'Two decades of expertise in UAE tax, accounting, and regulatory compliance.'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Lead Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} className="space-y-8">
              {/* Badge */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-sm font-semibold text-red-700">Urgent: Compliance Required</span>
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  UAE e-Invoicing Is{' '}
                  <span className="text-[#01445E]">Mandatory.</span>
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Register Now or Risk Penalties.
                </h2>
              </div>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 leading-relaxed">
                The Federal Tax Authority requires all UAE businesses to implement e-Invoicing. 
                Start your compliance journey with KRV Auditing—your FTA-approved partner.
              </p>

              {/* Urgency Points */}
              <div className="space-y-4">
                {urgencyPoints.map((point, index) => <motion.div key={index} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.4 + index * 0.1
              }} className={cn('flex items-start gap-4 p-4 rounded-xl border-2 transition-all', point.highlight ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200')}>
                    <div className={cn('flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center', point.highlight ? 'bg-red-100' : 'bg-[#01445E]/10')}>
                      <point.icon className={cn('w-5 h-5', point.highlight ? 'text-red-600' : 'text-[#01445E]')} />
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed pt-1.5">
                      {point.text}
                    </p>
                  </motion.div>)}
              </div>

              {/* Trust Badge */}
              <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.8
            }} className="flex items-center gap-3 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#01445E] to-[#026b8f] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">150+ Clients Served</p>
                  <p className="text-xs text-gray-500">Join UAE's compliant companies</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Lead Form */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-[#01445E] to-[#026b8f] p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Start the Journey</h3>
                  <p className="text-white/90">Get expert guidance to ensure compliance</p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="flex items-center text-sm font-semibold text-gray-700">
                      <User className="w-4 h-4 mr-2 text-[#01445E]" />
                      Full Name *
                    </label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01445E] focus:ring-2 focus:ring-[#01445E]/20 transition-all outline-none text-gray-900" placeholder="John Smith" />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="flex items-center text-sm font-semibold text-gray-700">
                      <Building2 className="w-4 h-4 mr-2 text-[#01445E]" />
                      Company Name *
                    </label>
                    <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01445E] focus:ring-2 focus:ring-[#01445E]/20 transition-all outline-none text-gray-900" placeholder="Your Company LLC" />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-[#01445E]" />
                      Email Address *
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01445E] focus:ring-2 focus:ring-[#01445E]/20 transition-all outline-none text-gray-900" placeholder="john@company.com" />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="flex items-center text-sm font-semibold text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-[#01445E]" />
                      Phone Number *
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01445E] focus:ring-2 focus:ring-[#01445E]/20 transition-all outline-none text-gray-900" placeholder="+971 50 123 4567" />
                  </div>

                  {/* Question (Optional) */}
                  <div className="space-y-2">
                    <label htmlFor="question" className="flex items-center text-sm font-semibold text-gray-700">
                      <MessageCircle className="w-4 h-4 mr-2 text-[#01445E]" />
                      Your Question (Optional)
                    </label>
                    <textarea id="question" name="question" value={formData.question} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01445E] focus:ring-2 focus:ring-[#01445E]/20 transition-all outline-none resize-none text-gray-900" placeholder="What would you like to know about e-Invoicing compliance?" />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      {submitError}
                    </p>
                  )}
                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <button type="submit" disabled={isSubmitting || submitSuccess} className={cn('w-full px-6 py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2', isSubmitting || submitSuccess ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#01445E] hover:bg-[#01354a] shadow-lg shadow-[#01445E]/30 hover:shadow-xl hover:shadow-[#01445E]/40')}>
                      {submitSuccess ? <>
                          <CheckCircle className="w-5 h-5" />
                          Inquiry Submitted!
                        </> : isSubmitting ? <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </> : <>
                          <Send className="w-5 h-5" />
                          Get Expert Guidance
                        </>}
                    </button>

                    <button type="button" onClick={handleWhatsAppInquiry} className="w-full px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 hover:shadow-xl">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp: +971 55 117 7659
                    </button>
                  </div>

                  {/* Privacy Notice */}
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    By submitting this form, you agree to our privacy policy. 
                    We'll never share your information.
                  </p>
                </form>
              </div>

              {/* Quick Response Badge */}
              <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.8
            }} className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Typical response time: 2 hours</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why KRV Auditing Section */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#01445E]/10 border border-[#01445E]/20 rounded-full mb-6">
              <Award className="w-4 h-4 text-[#01445E] mr-2" />
              <span className="text-sm font-semibold text-[#01445E]">Your Trusted Partner</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose KRV Auditing for Your<br />e-Invoicing Journey?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As one of the leading auditing and accounting firms in Dubai, we bring unmatched expertise 
              and official credentials to ensure your compliance is seamless and stress-free.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-gradient-to-br from-[#01445E]/5 to-[#01445E]/10 rounded-xl border border-[#01445E]/20">
              <div className="text-4xl font-bold text-[#01445E] mb-2">20+</div>
              <div className="text-sm font-semibold text-gray-600">Years of Experience</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
              <div className="text-4xl font-bold text-emerald-600 mb-2">150+</div>
              <div className="text-sm font-semibold text-gray-600">Clients Served</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
              <div className="text-4xl font-bold text-amber-600 mb-2">ISO</div>
              <div className="text-sm font-semibold text-gray-600">9001-2015 Certified</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">FTA</div>
              <div className="text-sm font-semibold text-gray-600">Approved Agency</div>
            </div>
          </motion.div>

          {/* Credentials Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {partnerReasons.map((reason, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-200 hover:border-[#01445E]/30 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#01445E]/10 flex items-center justify-center group-hover:bg-[#01445E] transition-colors">
                    <reason.icon className="w-7 h-7 text-[#01445E] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>)}
          </div>

          {/* Bottom Statement */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-[#01445E] to-[#026b8f] rounded-2xl shadow-xl p-10 text-white max-w-4xl">
              <Users className="w-12 h-12 text-white/90" />
              <h3 className="text-2xl md:text-3xl font-bold">
                Let Our Experts Handle Your VAT, Tax, and e-Invoicing Needs
              </h3>
              <p className="text-lg text-white/90">
                We will take care of your VAT accounting and compliance, taking the load off you.
              </p>
              <button onClick={() => window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })} className="mt-4 px-8 py-4 bg-white text-[#01445E] font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                Schedule a Call
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Value Grid Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why businesses are acting now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Smart companies don't wait for deadlines. Here's why they're getting compliant today.
            </p>
          </motion.div>

          {/* Value Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {complianceValues.map((value, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.15
          }} whileHover={{
            y: -8,
            transition: {
              duration: 0.2
            }
          }} className="group">
                <div className={cn('h-full bg-gradient-to-br rounded-2xl border-2 p-8 transition-all duration-300', value.color, value.borderColor, 'hover:shadow-2xl')}>
                  {/* Icon */}
                  <div className={cn('w-16 h-16 rounded-xl bg-white flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3')}>
                    <value.icon className={cn('w-8 h-8', value.iconColor)} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-6 pt-6 border-t border-gray-300/50">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Guaranteed Compliance</span>
                    </div>
                  </div>
                </div>
              </motion.div>)}
          </div>

          {/* Bottom CTA */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <p className="text-lg font-semibold text-gray-900">
                Ready to secure your compliance?
              </p>
              <button onClick={() => window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })} className="px-8 py-4 bg-[#01445E] hover:bg-[#01354a] text-white font-semibold rounded-lg transition-all shadow-lg shadow-[#01445E]/30 hover:shadow-xl hover:shadow-[#01445E]/40 flex items-center gap-2">
                Start the Journey
                <Send className="w-5 h-5" />
              </button>
              <p className="text-sm text-gray-500">
                No credit card required • Quick setup • Expert support included
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>;
};
