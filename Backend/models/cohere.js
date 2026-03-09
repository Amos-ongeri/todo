import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

// Create the Cohere client with your API key
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export default cohere;