import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from "@/components/emails/verificationEmail";
import PasswordResetEmail from "@/components/emails/resetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            try {
                await resend.emails.send({
                    from: 'NoteSync <onboarding@resend.dev>',
                    to: [user.email],
                    subject: 'Verify your email address',
                    react: VerificationEmail({ userName: user.name, verificationUrl: url }),
                });
                console.log("Email sent successfully");
            } catch (err) {
                console.error("Failed to send verification email:", err);
            }
        },

        sendOnSignUp: true,
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'NoteSync <onboarding@resend.dev>',
                to: [user.email],
                subject: 'Reset Your Password',
                react: PasswordResetEmail({ userName: user.name, resetUrl: url, requestTime: new Date().toLocaleString() }),
            });
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    plugins: [nextCookies()]
});