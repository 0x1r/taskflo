import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_OAUTH_CLIENT,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECTURI,
});

export const fetchGoogleuser = async (req, res) => {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    scope: ["openid", "email", "profile"],
  });
  res.redirect(authorizeUrl);
};

export const fetchGoogleCode = async (code) => {
  const token = await oAuth2Client.getToken(code);
  const tokenInfo = await oAuth2Client.verifyIdToken({
    idToken: token.tokens.id_token,
    audience: process.env.GOOGLE_OAUTH_CLIENT,
  });

  return tokenInfo;
};
