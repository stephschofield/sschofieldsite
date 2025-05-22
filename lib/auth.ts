// This is a simple auth utility file that provides default values
// when no real authentication is available

export const authOptions = {
  providers: [],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
}

export async function getServerSession() {
  // Return a default session object
  return {
    user: {
      name: "Stephanie Schofield",
      email: "stephanie@example.com",
      image: "/stephanie-profile.jpeg",
    },
  }
}

export async function getAuthSession() {
  return await getServerSession()
}
