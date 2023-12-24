import "dotenv/config";
import express from "express";
import registerRouters from "./router";

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

registerRouters(app);

app.listen(port, () => console.log("Transify server on port:", port));
