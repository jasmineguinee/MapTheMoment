import * as dotenv from "dotenv";
import Mongoose from "mongoose";

const istest = process.argv.join("").includes("mocha") || process.argv.join("").includes("test");
 let dbpath = "./.env";

 if (istest) {
  dbpath = "./.env.test";
 }

dotenv.config({path: dbpath});


export function connectMongo() {

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
  });

  
}
