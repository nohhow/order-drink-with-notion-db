import express from 'express';
import path from 'path';
import dotenv from "dotenv";
import { Client } from "@notionhq/client";


dotenv.config();
const app = express();
let port = process.env.PORT || 3000;
const __dirname = path.resolve();


const notion = new Client({
  auth: process.env.AUTH,
});

const databaseId = process.env.DBID;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"/index.html"), getItem());
})

const server = app.listen(port, ()=>{
    console.log(`server on ${port}`);
});

async function getItem() {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  app.get('/data', (req, res)=>{
    res.json(response);
})
}
