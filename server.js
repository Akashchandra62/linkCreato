import express from "express";
import User from "./db/userSchema.js";
import bodyParser from "body-parser";
import { dbConnection } from "./db/connection.js";
import  path  from "path";
import multer from "multer";
import dotenv from 'dotenv';
dotenv.config();
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();
const PORT = process.env.PORT || 8000;
dbConnection();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/getuser", (req, res) => {
  res.json({
    message: "success",
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./frontend/public/images"));
  },
  filename: (req, file, cb) => {
    const fileName =
      Date.now() + file.originalname.toLowerCase().split(" ").join("-");
    req.fileName = fileName;
    cb(null, fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

app.post("/createcard", upload.single("images"), async (req, res) => {
  const { name, url, description } = req.body;
  const user = new User({
    name,
    description,
    url,
    imagePath: `${req.fileName}`,
  });
  await user.save();

  res.json({ message: "success", user });
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-_id');

  res.json({ message: "success", user });
});


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'));
}
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
