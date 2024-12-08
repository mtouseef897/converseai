import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import md5 from 'md5';
import { getEmbeddings } from './embedding';
import { downloadFromS3 } from "./s3-server";
import { convertToAscii } from './utils';
import { loadDocument } from './loaddocument';
export const getPineconeClient = () => {
    return new Pinecone({
      
      apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
    });
  };

  type PDFPage = {
    pageContent: string;
    metadata: {
      loc: { pageNumber: number };
    };
  };
  
  // Define a compatible document type with metadata.
  type EnhancedDocument = {
    pageContent: string;
    metadata: {
      pageNumber: number;
      text: string;
    };
  };
  
  // export async function loadS3IntoPinecone(fileKey: string) {
  //   // 1. obtain the pdf -> downlaod and read from pdf
  //   console.log("downloading s3 into file system");
  //   const file_name = await downloadFromS3(fileKey);
  //   if (!file_name) {
  //     throw new Error("could not download from s3");
  //   }

  //   const loader = new PDFLoader(file_name);
  //   const pages = (await loader.load()) as PDFPage[];
  //    // 2. split and segment the pdf
  //    const documents = await Promise.all(pages.map(prepareDocument));
  //   // 3. vectorise and embed individual documents
  // const vectors = await Promise.all(documents.flat().map(embedDocument));
  // // 4. upload to pinecone
  // const client = await getPineconeClient();
  // const pineconeIndex = await client.index("converse-ai");
  // const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

  // console.log("inserting vectors into pinecone");
  // await namespace.upsert(vectors);

  // return documents[0];

  // }  



  export async function loadS3IntoPinecone(fileKey: string) {
    // console.log("Downloading file from S3...");
    const fileName = await downloadFromS3(fileKey);
    if (!fileName) {
      throw new Error("Could not download from S3");
    }
  
    const fileType = fileKey.split('.').pop() as string; // Get file extension
    const pages = await loadDocument(fileName, fileType) as PDFPage[];

    // console.log("here are the pages : ",pages);
  
    // Adjust type to match expected Document format
    const documents = await Promise.all(
      pages.map(page => prepareDocument(page as PDFPage)) // Explicit type cast
    );
    
    // Vectorize and embed
    const vectors = await Promise.all(documents.flat().map(embedDocument));
    
    // console.log("vectors calculated as : ",vectors);
    // Upload vectors to Pinecone
    const client = getPineconeClient();
    const pineconeIndex = await client.index("converse-ai");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
  
    // console.log("Inserting vectors into Pinecone");
    await namespace.upsert(vectors);
  
    return documents[0];
  }


  async function embedDocument(doc: Document) {
    // console.log("here is the input for embedDocument",doc)
    try {
      const embeddings = await getEmbeddings(doc.pageContent);
      const hash = md5(doc.pageContent);
  
      return {
        id: hash,
        values: embeddings,
        metadata: {
          text: doc.metadata.text,
          pageNumber: doc.metadata.pageNumber,
        },
      } as PineconeRecord;
    } catch (error) {
      console.log("error embedding document", error);
      throw error;
    }
  }




  export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
  };
  
  // async function prepareDocument(page: PDFPage) {
  //   let { pageContent, metadata } = page;
  //   pageContent = pageContent.replace(/\n/g, "");
  //   // split the docs
  //   const splitter = new RecursiveCharacterTextSplitter();
  //   const docs = await splitter.splitDocuments([
  //     new Document({
  //       pageContent,
  //       metadata: {
  //         pageNumber: metadata.loc.pageNumber,
  //         text: truncateStringByBytes(pageContent, 36000),
  //       },
  //     }),
  //   ]);
  //   return docs;
  // }


  async function prepareDocument(page: PDFPage): Promise<EnhancedDocument[]> {
    let { pageContent, metadata } = page;
    pageContent = pageContent.replace(/\n/g, "");
  
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
      new Document({
        pageContent,
        metadata: {
          pageNumber: metadata.loc.pageNumber,
          text: truncateStringByBytes(pageContent, 36000),
        },
      }),
    ]);
  
    // Map docs to ensure the metadata types are as expected
    return docs.map(doc => ({
      pageContent: doc.pageContent,
      metadata: {
        pageNumber: doc.metadata.pageNumber as number, // Cast to number
        text: doc.metadata.text as string, // Cast to string
      },
    }));
  }
  