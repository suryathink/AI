import { OpenAIEmbeddings }  from '@langchain/openai';
import { url } from 'node:inspector';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import 'dotenv/config';
import { QdrantVectorStore } from '@langchain/qdrant';
import path from "node:path";

async function generateVectorEmbeddingsForFile(filepath){
    // load the pdf content as document
  const loader = new PDFLoader(filepath);
  const document = await loader.load(); // already chunks data page by page 

  // Initialize the embedding model
  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
    apiKey: process.env.OPENAI_API_KEY,
  });


  //  the vector store
  const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings,{
   url: 'http://localhost:6333', // Qdrant server URL
   collectionName: 'chaicode_docs', // Name of the collection in Qdrant
  });

 await vectorStore.addDocuments(document);

 console.log(`All the documents are indexed.....`);

};

generateVectorEmbeddingsForFile('surya_sde_2_full_stack_dev.pdf');
