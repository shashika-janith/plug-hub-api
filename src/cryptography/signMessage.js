const crypto = require("crypto");
const fs = require("fs");
const encrypt = require("./encrypt");

const hash = crypto.createHash("sha256");

const data = {
  fName: "Shashika",
  lName: "Jayawardhana",
};

const dataStr = JSON.stringify(data);

hash.update(dataStr);

const hashedData = hash.digest("hex");

const privateKey = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf8");

const signedMessage = encrypt.encryptWithPrivateKey(privateKey, hashedData);

const pkgOfDateToSend = {
  algorithm: "sha256",
  originalData: data,
  signedAndEncryptedData: signedMessage,
};

module.exports.pkgOfDateToSend = pkgOfDateToSend;
