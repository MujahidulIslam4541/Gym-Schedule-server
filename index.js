const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(express.json());
app.use(cors());

// conceptual51
//O10uc5aCPlUZy81u
// console.log(process.env.DB_USER);

const uri = `mongodb+srv://conceptual51:O10uc5aCPlUZy81u@cluster0.oo75q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // collection create
    const GymSchedule = client.db("Gym-schedule").collection("schedule");

    // data post
    app.post("/schedule", async (req, res) => {
      const data = req.body;
      const result = await GymSchedule.insertOne(data);
      res.send(result);
    });

    // data get
    app.get("/schedule", async (req, res) => {
      const result = await GymSchedule.find().toArray();
      res.send(result);
    });

    // data delete
    app.delete("/schedule/:id", async (req, res) => {
      const id = req.params.id;
      const quarry = { _id: new ObjectId(id) };
      const result = await GymSchedule.deleteOne(quarry);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Gym Schedule server running");
});
app.listen(port, () => {
  console.log("This project running on this port", port);
});
