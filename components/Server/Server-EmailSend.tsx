"use server";

import { Resend } from "resend";
// Ensure API key exists
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not defined in environment variables");
}
// Initialize Resend with your API key from environment variables
const resend = new Resend(resendApiKey);

// Define the structure of the email form data
interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Server action to send email
export async function sendEmail(formData: EmailData) {
  try {
    // Validate input
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      };
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>", // Replace with your verified domain
      to: ["kshitij.bharambe@gmail.com"], // Your primary email address
      subject: formData.subject || "New Portfolio Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <h2 style="color: #333;">New Message from Portfolio Contact Form</h2>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject || "No subject"}</p>
            <hr style="border: none; border-top: 1px solid #eaeaea;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Email send error:", error);
      return {
        success: false,
        error: "Failed to send email. Please try again.",
      };
    }

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
