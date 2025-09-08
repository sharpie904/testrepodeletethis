import nodemailer from "nodemailer";

interface Props {
    email: string,
    inviteLink: string,
}

export async function sendOrganizationEmail(props: Props) {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const info = await transport.sendMail({
        from: "test@testmail.com",
        to: props.email,
        text: `this is the link -> ${props.inviteLink}`
    })
    console.log(info);
}

interface VerificationEmailProps {
    email: string,
    url: string,
}

export async function sendVerificationEmail({email, url}: VerificationEmailProps) {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const info = await transport.sendMail({
        from: "test@testmail.com",
        to: email,
        text: `Click to verify email -> ${url}`
    })
    console.log(info)
}