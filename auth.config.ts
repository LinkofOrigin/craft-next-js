import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
          if (isLoggedIn) {
              console.log("user is logged in on dashboard")
              return true;
          }
          console.log("user not authd");
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
          console.log('user is logged in');
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      console.log("user got here somehow");
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;