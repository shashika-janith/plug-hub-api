import { model, Schema } from "mongoose";

const COLLECTION_NAME = "categories";

const schema = new Schema({
  name: String,
});

const Category = model(COLLECTION_NAME, schema);

export default Category;
