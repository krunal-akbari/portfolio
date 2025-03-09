'use server';

import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData) {
  try {
    // Format the service name for better readability
    const serviceLabels = {
      'ui-ux': 'UI/UX Design',
      'web-design': 'Web Design',
      'development': 'Development',
      'marketing': 'Marketing',
      'other': 'Other Services'
    };

    const serviceName = serviceLabels[formData.service] || formData.service;

    // Send email to the agency
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use a verified domain in production
      to: 'temp@gmail.com',
      subject: `New Contact: ${formData.subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `
    });

    // Send confirmation email to the customer
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use a verified domain in production
      to: formData.email,
      subject: 'Thank you for contacting us',
      html: `
        <h1>Thank you for contacting us!</h1>
        <p>Dear ${formData.name},</p>
        <p>We have received your inquiry and will get back to you as soon as possible.</p>
        <p>Here's a summary of your message:</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
        <br>
        <p>Best regards,</p>
        <p>The Design Agency Team</p>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

