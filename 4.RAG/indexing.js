import { PDFLoader } from '@langchain/community/document_loaders/fd/pdf';
import { OpenAIEmbeddings }  from '@langchain/openai';
import { url } from 'node:inspector';

async function generateVectorEmbeddingsForFile(filepath){
    // load the pdf content as document
  const loader = new PDFLoader(filepath);
  const document = await loader.load();

  // Initialize the embedding model
  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
    apiKey: process.env.OPENAI_API_KEY,
  });


  //  the vector store
  const vectorStore = await QdrantVectorStore.fromExisitingCollection(embeddings,{
   url: 'http://localhost:6333', // Qdrant server URL
   collectionName: 'chaicode_docs', // Name of the collection in Qdrant
  });

 vectorStore.addDocuments(document);
 
};