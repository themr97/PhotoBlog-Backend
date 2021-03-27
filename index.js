import express from 'express';
import bodyParser from 'body-parser';
import moongose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();


// Middleware


app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes)
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;


moongose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server Running on port and connected to db : ${PORT}`)))
    .catch((error)=> console.log(error.message));

moongose.set('useFindAndModify', false);
