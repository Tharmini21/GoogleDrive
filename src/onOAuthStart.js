const { google } = require('googleapis');
export const onOAuthStart = (params, context) => {
    const clientId = "218866420163-v0lb8gn7fhh9p7luct36gp18h741kiuf.apps.googleusercontent.com";
    const secret = "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";
    const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback"
    const oauth2Client = new google.auth.OAuth2(clientId, secret, redirect_uri);
    google.options({
      auth: oauth2Client
    });
    if (clientId === undefined || clientId === null || clientId === '') {
        throw new Error('failed to start oauth flow : invalid client credentials');
    }
    return {
        clientId,
        oauth2URI: 'https://accounts.google.com/o/oauth2/auth',
        scope: "https://www.googleapis.com/auth/drive"
    };
};



