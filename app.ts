import * as express from "express";
import mongoose from "mongoose";
import * as morgan from "morgan";
import * as dotenv from "dotenv" ;
import { router } from "./routes/blogroutes" ;

dotenv.config();

const app = express();
const dbURI = process.env.MONGODB_LINK;

mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', router);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});