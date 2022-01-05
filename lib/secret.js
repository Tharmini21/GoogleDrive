"use strict";

const oauthurl = "https://accounts.google.com/o/oauth2/auth";
const tokenurl = "https://oauth2.googleapis.com/token";
const scope = ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive.appdata"];
const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
const clientsecret = "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";
const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";