'use strict';

const SMSClient = require('@alicloud/sms-sdk');

const constants = require('../util/constants');

class AliSMS {
  constructor(accessKeyId, secretAccessKey) {
    this.smsClient = new SMSClient({
      accessKeyId,
      secretAccessKey,
    });
  }
  async sendVerifyCode(phoneNumber, verifyCode) {
    try {
      return await this.smsClient.sendSMS({
        PhoneNumbers: phoneNumber,
        SignName: constants.signName,
        TemplateCode: constants.templateCode,
        TemplateParam: `{"code":"${verifyCode}"}`,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const instance = new AliSMS(constants.smsAccessKeyId, constants.smsSecretAccessKey);
Object.freeze(instance);

module.exports = instance;
