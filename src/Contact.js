// Contact.js
import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate with email service or backend API here
    alert("Thank you for contacting us!");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p>Have a question or feedback? We'd love to hear from you!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              rows="5"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
