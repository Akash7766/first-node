const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());
const users = [
  { id: 1, name: "Salman", age: 22 },
  { id: 2, name: "Sami", age: 20 },
  { id: 3, name: "Sajeb", age: 21 },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name.toLowerCase();
    const match = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    res.send(match);
  } else {
    res.send(users);
  }
});
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const u = users[id];
  res.send(u);
});
app.post("/user", (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
});

app.listen(port, () => {
  console.log("App is running", port);
});
