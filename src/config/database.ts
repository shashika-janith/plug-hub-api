import { connect, connection as mongooseConnection } from "mongoose";

const options = {
  family: 4,
};

connect(
  `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@cluster0.cwtq7.mongodb.net/?retryWrites=true&w=majority`,
  options
)
  .then(() => console.log("Mongooose connection established"))
  .catch((error) => console.log("Connection failed", error));

mongooseConnection.on("error", (err) => {
  console.log("Mongooose connection error", err);
});

export default mongooseConnection;
