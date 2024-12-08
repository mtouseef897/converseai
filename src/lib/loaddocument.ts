import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import mammoth from "mammoth";
import * as officeParser from "officeparser"; // Ensure you import this
import * as pptParser from "ppt-parser";

export async function loadDocument(fileName: string, fileType: string) {
  // console.log(fileName,fileType)
  switch (fileType) {
    case "pdf":
      return loadPdf(fileName);
    case "pptx":
      return loadPptx(fileName);
    case "ppt":
      // return loadPptx(fileName);
      return loadPpt(fileName); // Use a separate handler for .ppt
    case "docx":
      return loadDocx(fileName);
    default:
      throw new Error("Unsupported file type");
  }
}

async function loadPdf(fileName: string) {
  const loader = new PDFLoader(fileName);
  return await loader.load();
}

async function loadPptx(fileName: string) {
  try {
    // Use the async version of the parseOffice method
    const data = await officeParser.parseOfficeAsync(fileName);

    // Split the returned data into slides
    const slides = data.split("\n\n"); // Assuming `data` is a string with slides separated by newlines

    // Map the slides to the desired format
    return slides.map((text: string, index: number) => ({
      pageContent: text,
      metadata: { loc: { pageNumber: index + 1 } },
    }));
  } catch (error: any) {
    throw new Error(`Error parsing PPTX: ${error.message}`);
  }
}

async function loadPpt(fileName: string) {
  try {
    const parsedData = await pptParser.parse(fileName, {});
    if (typeof parsedData !== "string") {
      throw new Error("Unexpected data structure. Parsing failed.");
    }

    // Split text into slides (e.g., separated by two newlines)
    const slides = parsedData.split("\n\n");

    return slides.map((text, index) => ({
      pageContent: text,
      metadata: { loc: { pageNumber: index + 1 } },
    }));
  } catch (error: any) {
    throw new Error(`Error parsing PPT: ${error.message}`);
  }
}

async function loadDocx(fileName: string) {
  const result = await mammoth.extractRawText({ path: fileName });
  const pages = result.value.split("\n\n"); // Split into "pages" by paragraphs
  return pages.map((content, index) => ({
    pageContent: content,
    metadata: { loc: { pageNumber: index + 1 } },
  }));
}
