const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Middleware
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: "Unauthorized Access" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorize Access" });
        }
        req.user = decoded;
        next();
    });
};

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
        const cartCollection = bistroDB.collection("cart");

        // Auth Related
        app.post("/jwt", async (req, res) => {
            const user = req.body;
            console.log(user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
                expiresIn: "6h",
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            }).send({ setSuccess: true });
        });

        app.post("/logout", (req, res) => {
            const user = req.body;
            res.clearCookie("token", { maxAge: 0 }).send({ setSuccess: true });
        });

        // Getting cart details
        app.post("/carts", async (req, res) => {
            const newCart = req.body;
            const result = await cartCollection.insertOne(newCart);
            res.send(result);
        });

        app.get("/carts", async (req, res) => {
            const id = req.query.id;
            // if (req.user.uid !== id) {
            //     return res.status(403).send({ message: "Forbidden Access" });
            // }
            const query = { buyerId: id };
            const result = await cartCollection.find(query).toArray();
            res.send(result);
        });

        app.delete("/carts/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        });

        // Creating Data
        app.post("/foods", async (req, res) => {
            const newFood = req.body;
            const result = await foodsCollection.insertOne(newFood);
            res.send(result);
        });

        // Getting for all foods page with pagination and search
        app.get("/foods", async (req, res) => {
            const search = req.query.search;
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
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

        // Getting Food Data By User
        app.get("/foods/:id", async (req, res) => {
            const id = req.params.id;
            const query = { "madeBy.id": id };
            const result = await foodsCollection.find(query).toArray();
            res.send(result);
        });

        app.get("/food/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await foodsCollection.findOne(query);
            res.send(result);
        });

        app.put("/food/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedFood = req.body;
            const updateFood = {
                $set: {
                    quantity: updatedFood.quantity,
                    timesOrdered: updatedFood.timesOrdered,
                },
            };
            const result = await foodsCollection.updateOne(
                filter,
                updateFood,
                options
            );
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
