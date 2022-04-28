const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());

// dbUser2
// sGuOO1Bc0lYgje5M

app.use(express.json());
const users = [
  { id: 1, name: "Salman", age: 22 },
  { id: 2, name: "Sami", age: 20 },
  { id: 3, name: "Sajeb", age: 21 },
];

//connect to database

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://dbUser2:sGuOO1Bc0lYgje5M@cluster0.pea3c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("demo").collection("users");
    // create a document to insert
    app.post("/user", async (req, res) => {
      const user = req.body;
      user.id = users.length + 1;
      users.push(user);
      const result = await database.insertOne(user);
      res.send(user);
    });

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

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

app.listen(port, () => {
  console.log("App is running", port);
});
