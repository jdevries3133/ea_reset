import { GoogleStrategy } from "remix-auth-google";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<OauthUser>(sessionStorage);

const googClientId = process.env.GOOGLE_CLIENT_ID;
const googClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googClientId) throw new Error("google client id not defined");
if (!googClientSecret) throw new Error("google client id not defined");

const strategy = new GoogleStrategy(
  {
    clientID: googClientId,
    clientSecret: googClientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
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
