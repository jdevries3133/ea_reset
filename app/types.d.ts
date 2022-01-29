type OauthUser = {
  username: string;
  oauthTok: string;
  refreshTok: string;
};

type GmailUser = OauthUser & {
  // this is user object from google
  googleExtras: any;
};
