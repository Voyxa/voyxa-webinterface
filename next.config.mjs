const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Enable SWC minifier for faster builds
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL, // URL where your app is running (important for NextAuth)
  },
  typescript: {
    ignoreBuildErrors: true,
 },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://13.127.87.100:3000/graphql',
      },
    ];
  },
};

// Use ES module syntax to export the configuration
export default nextConfig;
