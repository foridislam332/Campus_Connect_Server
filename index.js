const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1huygit.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const collegesCollection = client.db('campus_connect').collection('colleges');
        const myCollegeCollection = client.db('campus_connect').collection('my_college');
        const categoriesCollection = client.db('campus_connect').collection('categories');
        const researchPaperCollection = client.db('campus_connect').collection('research_paper');
        const reviewsCollection = client.db('campus_connect').collection('reviews');

        // get colleges
        app.get('/colleges', async (req, res) => {
            const result = await collegesCollection.find().toArray();
            res.send(result);
        });

        // get colleges
        app.get('/colleges/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await collegesCollection.findOne(query)
            res.send(result)
        });

        // get categories
        app.get('/categories', async (req, res) => {
            const result = await categoriesCollection.find().toArray();
            res.send(result);
        });

        // get research paper
        app.get('/researchPaper', async (req, res) => {
            const result = await researchPaperCollection.find().toArray();
            res.send(result);
        });

        // get reviews
        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollection.find().toArray();
            res.send(result);
        });

        // get my college
        app.get('/my_college', async (req, res) => {
            const result = await myCollegeCollection.find().toArray();
            res.send(result);
        });

        // get reviews
        app.post('/my_college', async (req, res) => {
            const newCollege = req.body;
            const result = await myCollegeCollection.insertOne(newCollege);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Campus Connect is running')
})

app.listen(port, () => {
    console.log(`Campus Connect is running on port ${port}`)
})