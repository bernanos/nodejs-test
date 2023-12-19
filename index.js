
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
var isAuthorised = false;

function checkAuthorised (req, res, next) {
    var passWord = req.body["password"];
    if (passWord === "ILoveProgramming") {
        isAuthorised = true;
    }
    next();
}

app.use(checkAuthorised);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    // var passWord = req.body["password"];
    // if (passWord === "ILoveProgramming") {
    //     res.sendFile(__dirname + "/public/secret.html")
    // } else {
    //     res.sendFile(__dirname + "/public/index.html");
    // }
    if (isAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});