import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './src/routes/General.js';
import generateTables from './src/db/tables.js';
import bearerToken from 'express-bearer-token';
import formData from 'express-form-data';
import cors from 'cors';

// dotenv.config({ path: './.env' });
const app = express();

const port = process.env.PORT || 3000;
console.log('DB_PORT ', process.env.DB_PORT);
console.log('DB_DATABASE ', process.env.DB_DATABASE);
console.log('DB_USER ', process.env.DB_USER);
console.log('DB_PASS ', process.env.DB_PASS);

app.use(cors());
app.use(formData.parse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bearerToken());
app.use('/', router);

app.listen(port, async () => {
  // await generateTables();
  console.log(`Server rodando na porta:${port}`);
});