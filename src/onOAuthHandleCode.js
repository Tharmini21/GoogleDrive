import { createHash } from 'crypto';
const { google } = require('googleapis');
const clientId = "218866420163-v0lb8gn7fhh9p7luct36gp18h741kiuf.apps.googleusercontent.com";
const secret = "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";
const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
const oauth2Client = new google.auth.OAuth2(clientId, secret, redirect_uri);

export const onOAuthHandleCode = (params, concontextfig) => {
    if (params.code === undefined || params.code === null || params.code === '') {
        throw new Error(
            'failed to create access token : authentication code not specified'
        );
    }
    return oauth2Client.getToken(params.code).then(function (response) {
        console.log("tokens:", response.tokens);
        return ({
            access_token: response.tokens.access_token,
            token_type: response.tokens.token_type,
        });
    }).catch(function (err) {
        console.log(err);
        throw new Error(`failed to create access token : ${err.message}`);
    });

};