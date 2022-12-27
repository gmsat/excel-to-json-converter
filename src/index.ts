import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import { connectDb } from "./database/db";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  try {
    await connectDb();
  } catch (e) {
    console.error('Error!', e)
  }
});

// TODO: Export db table updates to external file
// TODO: Find out how to synchronize all of the tables without losing data
// TODO: Create function to update/create all tables
// TODO: Create function to update/create selected tables
// TODO: Figure out a different way to handle synchronization
