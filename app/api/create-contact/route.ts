import { NextResponse } from "next/server";
import { Resend } from "resend";
import React from "react";
import SignupEmail, { signupEmailText } from "@/components/email/signup-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // 1) Create a contact in Resend Audience
    const contact = await resend.contacts.create({
      audienceId: "4e779ef8-e029-431e-ae3e-a1960a0de41b",
      email,
    });

    // 2) Send a minimal signup email from your verified domain
    const sendEmailResponse = await resend.emails.send({
      from: "ZenPersonal <updates@hello.zenpersonal.app>",
      to: [email],
      subject: "You will know when ZenPersonal is ready",
      react: React.createElement(SignupEmail), // HTML
      text: signupEmailText,                  // Plain text
    })

    return NextResponse.json({ success: true, contact, sendEmailResponse });
  } catch (error) {
    console.error("Error creating contact or sending email:", error);
    return NextResponse.json(
      { error: "Error creating contact." },
      { status: 500 }
    );
  }
}
