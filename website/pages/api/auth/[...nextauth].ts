import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { getApiUrl } from '../../../helpers/common_helper';

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // console.log(credentials)
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        const url = `${getApiUrl('account-service')}/api/login`;

        const req = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            userName: credentials.username,
            password: credentials.password,
          })
        })

        if (req.status === 200) {
          // Any object returned will be saved in `user` property of the JWT
          return {name:await req.text()}

        } else {
          // If you return null or false then the credentials will be rejected

          //  return null

          throw new Error((await req.json())['detail'])

          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      }
    })
  ],
  //  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn(user, account, profile) {
      
      return true
    },
    async redirect(url, baseUrl) {
      return baseUrl
    },
    async session(session) {
     

      return (session)
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log(token, user, account, profile, isNewUser)
      return token
    }
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    //  error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
  }
})