import { auth } from '@/lib/auth';
import { NextResponse } from "next/server";

var nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "navaneethakrishnan.cs23@bitsathy.ac.in",
    pass: "Navan@2006" // App Password, not regular password
  }
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    const { name,email,subject,message} = await request.json();
    const mailOptions = {
      from: "navaneetha2006krishnan@gmail.com",
      to: "navaneethakrishnan.cs23@bitsathy.ac.in",
      subject: `${subject}`,
      html: `
      <p>name ${name}</p>
         <p>email ${email}</p>
        <p>${message}</p>
       
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, info });

  } catch (error) {
    console.error('Mail error:', error);
    return NextResponse.json({ error: "Mail sending failed" }, { status: 500 });
  }
}