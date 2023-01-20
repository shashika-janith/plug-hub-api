import { model, Schema } from "mongoose";

const COLLECTION_NAME = "users";

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
});

const User = model(COLLECTION_NAME, schema);

export default User;
