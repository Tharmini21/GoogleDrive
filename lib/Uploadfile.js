"use strict";

const {
  google
} = require('googleapis');

const request = require('request');

const fs = require('fs');

const path = require('path');

const https = require('https');

const imageDownloader = require('node-image-downloader');

const {
  response
} = require('express');

const {
  post
} = require('request');

const {
  URL
} = require('url');

var FormData = require('form-data'); // import { data } from './secret'
// var Blob = require('blob');


const Blob = require('node-blob');

exports.Uploadfile = (inputs, context) => {
  function createDriveClient() {
    const clientId = "218866420163-v0lb8gn7fhh9p7luct36gp18h741kiuf.apps.googleusercontent.com";
    const secret = "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";
    const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
    const oauth2Client = new google.auth.OAuth2(clientId, secret, redirect_uri);
    oauth2Client.setCredentials(context.oAuthData); // console.log("TokenData:", context.oAuthData);

    return google.drive({
      version: 'v3',
      auth: oauth2Client
    });
  }

  ;
  request({
    url: inputs.filepath,
    encoding: null
  }, function (err, res, body) {
    if (err) {
      reject(err);
    }

    console.log('body:', body);
    const bytes = new Uint8Array(body.data); // var Blob = require('blob');
    // const blob = new Blob([bytes.buffer]);
    // const urlcreator = URL.createObjectURL(blob);
    // console.log("urlcreator", urlcreator);
  }); //   return driveClient.files.create(
  //   ).then(response => {
  //     console.log(response);
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // });

  function UploadfiletoDrive(fileUri, fileName) {
    // console.log("header:",res.headers["content-type"]);
    return new Promise((resolve, reject) => {
      request({
        url: fileUri,
        encoding: null
      }, function (err, res, body) {
        if (err) {
          reject(err);
        }

        console.log("Content-type:", res.headers["content-type"]); //***********//simple Upload//***********//

        request.post({
          headers: {
            "Authorization": "Bearer " + context.oAuthData.access_token,
            "content-type": res.headers["content-type"],
            "Content-Length": res.headers["content-length"]
          },
          url: "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
          body: body
        }, function (error, response, body) {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }); //***********//Multipart Upload using request post//***********//
        // var metadata = {
        //   "name": "Bridgemultipartupload.png",
        //   "mimeType": "application/json; charset=UTF-8",
        //   "parents": "1mapA3Cco1lXaKjldLYOlASwF1HguHwd1"
        // };
        // var formData = new FormData();
        // formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        // // formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        // // let myBlob = new Blob(["something"], { type: 'text/plain' });
        // formData.append("file", body);
        // request.post({
        //   headers: {
        //     "Authorization": "Bearer " + context.oAuthData.access_token,
        //     "Content-Type": "multipart",
        //     "Content-Length": res.headers["content-length"]
        //   },
        //   url: "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        //   body: formData
        // }, function (error, response, body) {
        //   if (error) {
        //     reject(error);
        //   }
        //   else {
        //     resolve(body);
        //   }
        // });
        //***********//Multipart Upload using Drive//***********//
        // const driveClient = createDriveClient();
        // const filepath = path.join(__dirname,'business-deal.jpg');
        // var fileMetadata = {
        //   "name": fileName,
        //   "mimeType": "image/jpg",
        //   "parents": "1mapA3Cco1lXaKjldLYOlASwF1HguHwd1"
        // };
        // var media = {
        //   mimeType: "image/jpg",
        //   body: fs.createReadStream(filepath)
        //   // body: body
        // };
        // driveClient.files.create({
        //   requestBody: fileMetadata,
        //   media: media,
        //   fields: 'id'
        // }, function (err, file) {
        //   if (err) {
        //     console.error(err);
        //   } else {
        //     resolve(file.id);
        //   }
        // });
      });
    });
  }

  return UploadfiletoDrive(inputs.filepath, inputs.filename).then(function (response) {
    console.log(response);
    return {
      response: response
    };
  }).catch(function (err) {
    return {
      error: err
    };
  });
};