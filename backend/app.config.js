const config = {
  auth: {
    google: {
      clientId:
        process.env.GOOGLE_CLIENT_ID || "352039495912-igun7ionlvauugjs3vfoa8lg1noq9d8a.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
      redirectUri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/callback/google",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
      scope: "openid",
    },
  },
};

module.exports = config;
