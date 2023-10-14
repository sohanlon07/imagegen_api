require("dotenv").config();
const express =  require('express');
const bodyParser = require('body-parser')
const cors = require("cors");
const { OpenAI } = require("openai")

const app = express ();
const port = 3000;
const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

let shareName = null;
let quantity = null;
let purchaseDate = null;
let amountPaid = null;

app.listen(port, () => {
    console.log("Server listening on PORT: ", port);
});

app.get("/status", (req, res) => {
    const status = {
        "Status": "Running"
    };

    res.send(status)
});

app.post("/sendData", async(req, res) => {
    try {
            dataRecieved = req.body;
            shareName = req.body.shareName;
            quantity = req.body.quantity;
            purchaseDate = req.body.purchaseDate;
            amountPaid = req.body.amountPaid;

            const prompt = 'create an image of a cat'

            const response = await openai.images.generate({
                prompt: "a cat",
                n: 1,
                size: "1024x1024",
            });
            image_url = response.data[0].url
            
            res.send('Dall E URL: ' + image_url);
        } 
    catch (error) {
        console.error('Error during processing or API call', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});