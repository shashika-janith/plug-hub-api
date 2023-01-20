import fs from "fs";
var jwt = require("jsonwebtoken");
import path from "path";

const pathToPrivKey = path.join(__dirname, "..", "cryptography", "id_rsa_priv.pem");
const privateKey = fs.readFileSync(pathToPrivKey, "utf8");

function issueJWT(user) {
  const payload = {
    id: user._id,
    iat: Date.now(),
  };

  var token = jwt.sign(payload, privateKey, { expiresIn: "7d", algorithm: "RS256" });

  return token;
}

export { issueJWT };
