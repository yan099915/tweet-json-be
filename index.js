// Import Dependencies
const express = require("express");
const fetch = require("node-fetch");
const cors = require('cors');
require("dotenv").config();
const app = express();

const port = 3001;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`);
});

app.post("/app", async (req, res) => {
  let { url, count } = req.body
  let split = url.split("/")
  let screen_name = `screen_name=${split[split.length - 1]}`
  let qty = `count=${count}`
  
  const response = await fetch(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?${screen_name}&${qty}&trim_user=true&exclude_replies=false&include_rts=false`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`
      },
    }
  )
  .then(res => res.json())
  .then(json => res.send(json));
});
