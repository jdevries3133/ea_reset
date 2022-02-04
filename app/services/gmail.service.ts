import { gmail_v1, google } from "googleapis";

import { googClientId, googClientSecret, redirectUri } from "./auth.server";

export function getClient(user: OauthUser): gmail_v1.Gmail {
  const authClient = new google.auth.OAuth2(
    googClientId,
    googClientSecret,
    redirectUri
  );
  authClient.setCredentials({
    access_token: user.oauthTok,
    refresh_token: user.refreshTok,
  });
  return google.gmail({
    version: "v1",
    auth: authClient,
  });
}
