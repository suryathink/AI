import { OpenAIEmbeddings } from "@langchain/openai";

import "dotenv/config";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function query(userQuery) {
  // convert user query to vector embeddings
  // initialize the embedding model

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
  });

  // seeacrh the vector in the quadrant
  //  the vector store
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://localhost:6333", // Qdrant server URL
      collectionName: "chaicode_docs", // Name of the collection in Qdrant
    },
  );

  // get similar vectors and chunks?

  const vectorRetriever = vectorStore.asRetriever({ k: 5 }); // get top 5 matching vectors
  const results = await vectorRetriever.invoke(userQuery);
  // feed those chunks to llm model and do a simple chat with {userQuery}

  const SYSTEM_PROMPT = `You are a helpful assistant that answers questions based on the provided context. 
    If the answer is not contained within the text below, say "I don't know."
    
    User Documents:
    ${results.map((e) => JSON.stringify({ pageContent: e.pageContent, pageNumber: e.metadata.loc.pageNumber, metadata: e.metadata })).join("\n\n")}
    `;

  // console.log(SYSTEM_PROMPT);/

const llmResponse = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userQuery },
  ],
});

console.log("LLM RESPONSE:", llmResponse.choices[0].message.content);
}

// query("What is the name of the person in the document?"); // LLM RESPONSE: The name of the person in the document is Surya Prakash Singh.
// query("Where is the user currently working? "); // LLM RESPONSE: The user is currently working at Visit Health in Bengaluru, Karnataka, India.
query("How much experiencce does he has"); // LLM RESPONSE: The user is currently working at Visit Health in Bengaluru, Karnataka, India.
