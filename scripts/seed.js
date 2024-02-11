// Seed a vercel KV store from a json file

// import { KV_REST_API_TOKEN, KV_REST_API_URL } from "$env/static/private";
import { createClient } from "@vercel/kv";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: '.env.development.local'
})

const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;
const KV_REST_API_URL = process.env.KV_REST_API_URL;
console.log(KV_REST_API_TOKEN);

const client = createClient({
  token: KV_REST_API_TOKEN,
  url: KV_REST_API_URL,
});


const seed = async () => {
  const data = JSON.parse(fs.readFileSync('./seed.json', 'utf8'));

  client.set('sraz_root', data);
}

const get = async () => {
  const data = await client.get('sraz_root');
  console.log(data);
}

seed().then(() => {
  console.log('seeded');
  get();
});
