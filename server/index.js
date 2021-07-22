import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const DB_URI =
    "mongodb+srv://mir:mir123@cluster0.iwdxn.mongodb.net/DB?retryWrites=true&w=majority";
const PORT = process.env.PORT || 4000;

mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(`Error: ${error.message}`));

mongoose.set("useFindAndModify", false);
