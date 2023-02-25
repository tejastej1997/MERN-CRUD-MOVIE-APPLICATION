

const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
let detail = require('./model')
const port=process.env.port || 5000;
let cors = require('cors')

const app = express()

let password=process.env.MongoPassword;

let username=process.env.MongoUsername;


app.use(express.json())
app.use(cors({
    origin: "*"
}))
mongoose.set('strictQuery', true)
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.hfthgsz.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Data base connected');
    })
    .catch((err) => {
        console.log(err.message);
        alert('Data base not connected')
        console.log('Please check the connection');

    })



app.get('/', (req, res) => {
    res.send('home page rendered')
})

app.post('/add', async (req, res) => {

    const { moviename, hero, releaseyear, rating, poster } = req.body;
    try {
        const newTask = new detail({
            moviename: moviename,
            hero: hero,
            releaseyear: releaseyear,
            rating: rating,
            poster: poster
        })
        await newTask.save()
        return res.json(await detail.find())
    }
    catch (err) {
        console.log(err);

    }
})

app.get('/moviename', async (req, res) => {
    try {
        return res.json(await detail.find())
    }
    catch (err) {
        console.log(err);

    }
})

app.delete('/delete/:id', async (req, res) => {

    try {
        await detail.findByIdAndDelete(req.params.id)
        return res.json(await detail.find())
    }
    catch (err) {
        console.log(err);

    }
})


app.put('/update/:id', async (req, res) => {

    const id = req.params.id;
    const { moviename, hero, releaseyear, rating, poster } = req.body;
    try {
        const newUpdate = new detail({
            _id: id,
            moviename: moviename,
            hero: hero,
            releaseyear: releaseyear,
            rating: rating,
            poster: poster
        })
        await detail.findByIdAndUpdate(id, newUpdate)
        return res.json(await detail.find())
    }
    catch (err) {
        console.log(err);

    }
})



app.get('/moviename/:id', async (req, res) => {
    try {
        return res.json(await detail.findById(req.params.id))
    }
    catch (err) {
        console.log(err);

    }
})

app.get('/search/:searchkey', async (req, res) => {

    try {
        let data = await detail.find(
            {
                "$or": [
                    { moviename: { $regex: req.params.searchkey } }
                ]
            }
        )
        return res.json(data)

    }
    catch (err) {
        console.log(err.message);
    }
})

app.listen(port, () => {
    console.log('port connected 5000');

})