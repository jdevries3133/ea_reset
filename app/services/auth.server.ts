import { GoogleStrategy } from "remix-auth-google";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<GmailUser>(sessionStorage);

// get environmetn variables, and validate their presence
export const googClientId = process.env.GOOGLE_CLIENT_ID;
export const googClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const redirectUri = process.env.OAUTH_CALLBACK_URI;

if (!googClientId) {
  throw new Error("google client id not defined in environment");
}
if (!googClientSecret) {
  throw new Error("google client id not defined in environment");
}
if (!redirectUri) {
  throw new Error("redirect uri not defined in environment");
}

const strategy = new GoogleStrategy(
  {
    clientID: googClientId,
    clientSecret: googClientSecret,
    callbackURL: redirectUri,
    scope: "openid profile email https://www.googleapis.com/auth/gmail.send",
  },
  async ({
    accessToken,
    refreshToken,
    extraParams,
    profile,
  }): Promise<GmailUser> => {
    return {
      username: profile.emails[0].value,
      oauthTok: accessToken,
      refreshTok: refreshToken,
      googleExtras: {
        ...profile,
        ...extraParams,
      },
    };
  }
);

authenticator.use(strategy);
