import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";
import { sendOrganizationEmail, sendVerificationEmail } from "@/lib/send-email";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
	plugins: [
		organization({
			async sendInvitationEmail(data) {
				const inviteLink = `${process.env.MEMBER_INVITE_LINK}/${data.id}`
				await sendOrganizationEmail({
					email: data.email,
					inviteLink,
				})
			}
		}),
	],
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		// requireEmailVerification: true,
	},
	emailVerification: {
		sendVerificationEmail: async (user, url) => {
			// await sendVerificationEmail({email: user.email, url})
		},
		sendOnSignUp: true
	}
})
