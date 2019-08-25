require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googleBooks";


async function mongoConnect(MONGODB_URI) {
    try {    
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
        console.log("mongo has connected");
    } catch(err) {
        console.error("failed to connect mongo");
    }

    
};

mongoConnect(MONGODB_URI);


app.listen(PORT, function() {
    console.log(`Server is now listening on port: ${PORT}`);
});