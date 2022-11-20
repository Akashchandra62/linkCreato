import mongoose from "mongoose";

export const dbConnection = ()=> (
    mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://akashchandra62:akash@cluster0.qsnjo.mongodb.net/digicard?retryWrites=true&w=majority")
    .then((result) => {
      console.log("Connected to Database");
    })
    .catch((err) => {
        console.log(err);
      console.log("Error in connecting to database..");
    })
)
  