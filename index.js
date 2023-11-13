const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6cq5lj6.mongodb.net/?retryWrites=true&w=majority`;

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
        // await client.connect();
        // Send a ping to confirm a successful connection

        const bistroDB = client.db("bistroDB");

        const foodsCollection = bistroDB.collection("foods");

        // Getting for all foods page
        app.get("/foods", async (req, res) => {
            const search = req.query.search;
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            console.log(page, size, search);
            const query = {
                foodName: { $regex: new RegExp(search, "i") },
            };
            const result = await foodsCollection
                .find(query)
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        });

        app.get("/foods/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await foodsCollection.findOne(query);
            res.send(result);
        });

        app.get("/foods-count", async (req, res) => {
            const count = await foodsCollection.estimatedDocumentCount();
            res.send({ count });
        });

        app.get("/top-foods", async (req, res) => {
            const topFoods = foodsCollection.find().sort({ timesOrdered: -1 });
            const result = (await topFoods.toArray()).slice(0, 6);
            res.send(result);
        });

        // await client.db("admin").command({ ping: 1 });
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
    res.send("Server is Running");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
