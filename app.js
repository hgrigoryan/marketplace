import express from 'express';
import connectToDB from './utils/mongoose.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser())

app.use('/auth', authRoutes);
app.use('/product', productRoutes);

connectToDB();
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });

const port = 3000;
app.listen(port);
console.log('Express started. Listening on %s', port);