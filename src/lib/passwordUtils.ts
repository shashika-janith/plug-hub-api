import crypto from "crypto";

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt,
    passwordHash,
  };
}

/**
 * Validates user credentials.
 * @param {string} password Password given.
 * @param {string} hash Hashed password of the user.
 * @param {string} salt Password salt.
 */
function validatePassword(password: string, hash: string, salt: string) {
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === passwordHash;
}

export { genPassword, validatePassword };
