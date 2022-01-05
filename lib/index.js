"use strict";

const {
  createBridgeHandler
} = require('@smartsheet-bridge/extension-handler');

const {
  Uploadfile
} = require('./Uploadfile');

const {
  onOAuthStart
} = require('./onOAuthStart');

const {
  onOAuthHandleCode
} = require('./onOAuthHandleCode');

exports.main = createBridgeHandler({
  onOAuthStart,
  onOAuthHandleCode,
  modules: {
    Uploadfile
  }
});