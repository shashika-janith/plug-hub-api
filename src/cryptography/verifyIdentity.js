const crypto = require("crypto");
const fs = require("fs");
const decrypt = require("./decrypt.js");

const receivedData = require("./signMessage").pkgOfDateToSend;

const hash = crypto.createHash(receivedData.algorithm);
const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, receivedData.signedAndEncryptedData);
const decryptedMessageHex = decryptedMessage.toString();

hash.update(JSON.stringify(receivedData.originalData));
const hashOfOriginalHex = hash.digest("hex");

if (hashOfOriginalHex === decryptedMessageHex) {
  console.log("Data has not been tampered.");
} else {
  console.log("Data has been manipulated.");
}
