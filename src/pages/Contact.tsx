import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { client } from '../lib/sanity';
import FadeIn from '../components/ui/FadeIn';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await client.create({
        _type: 'contactMessage',
        ...formData,
        submittedAt: new Date().toISOString()
      });
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Header / Hero Section */}
      <FadeIn>
      <div className="bg-secondary text-white py-16 text-center">
        <h1 className="font-display text-white font-bold text-4xl">Contact Us</h1>
        <p className="mt-2 text-gray-300">We'd love to hear from you</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT COLUMN: Contact Info */}
          <div>
            <div className="mb-8">
              
              <span className="text-primary font-bold tracking-widest text-sm uppercase">
                Contact With Us
              </span>
              <div className="w-40 h-1 bg-primary mt-2"></div>
              <h2 className="mt-7 font-display font-bold text-4xl text-secondary leading-tight">
                Feel free to get in touch with us
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                We value your inquiries. Feel free to get in touch with us anytime, 
                whether it's through email, phone, or a visit to our office. 
                We strive to make communication easy and convenient.
              </p>
            </div>

            <div className="space-y-8 mt-10">
              {/* Phone */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary text-white flex items-center justify-center text-2xl shrink-0 rounded-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Have any question?</h3>
                  <p className="font-display font-bold text-md text-secondary">+234 (0) 903 193 2411</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary text-white flex items-center justify-center text-2xl shrink-0 rounded-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Write email</h3>
                  <p className="font-display font-bold text-md text-secondary break-all">info@wambalga.ng</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary text-white flex items-center justify-center text-2xl shrink-0 rounded-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Visit anytime</h3>
                  <p className="font-display font-bold text-md text-secondary">
                    Wamba LGA Headquarters,<br />
                    Nasarawa State
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for contacting us. We will get back to you shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-500 mb-2">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-500 mb-2">Your email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-500 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white"
                    placeholder="Subject"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-500 mb-2">Your message (optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-block bg-primary text-white px-10 py-4 rounded font-bold uppercase tracking-wider hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default Contact;