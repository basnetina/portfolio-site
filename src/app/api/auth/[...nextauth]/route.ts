import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log('inside authorize')
                const res = await fetch(`${process.env.API_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })

                if(!res.ok){
                    throw new Error('Failed to login')
                }

                const response = await res.json()

                console.log(response)

                if (response.data) {
                    return {
                        id: response.data.uid,
                        ...response.data,
                        accessToken: response.accessToken
                    };
                }

                throw new Error(response.message || "Invalid email or password.");
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session:{
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 365,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async signIn({ user, account, profile, email, credentials }) {
            console.log(
                { user, account, profile, email, credentials }
            );
            return true
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            const newToken=token;
            if (user) {
                newToken.accessToken = account?.access_token;
                newToken.user = user;
            }
            return newToken;
        },
        async session({ session, user, token }) {
            const newSession = session;
            if (token?.user) {
                newSession.user = token.user;
                // @ts-ignore
                newSession.accessToken = token.accessToken
            }
            return newSession;
        },

    }

})

export { handler as GET, handler as POST }

