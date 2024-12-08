// type Props = { pdf_url: string };

// const PDFViewer = ({ pdf_url }: Props) => {
//   console.log(pdf_url);
//   const encoded_pdf_url = encodeURIComponent(pdf_url);

//   return (
//     <iframe
//       src={`https://docs.google.com/viewer?hl=en&embedded=true&url=${encoded_pdf_url}`}
//       style={{ width: "100%", height: "100vh", border: "none" }}
//     ></iframe>
//   );
// };

// export default PDFViewer;
"use client";
import { useState } from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  // const encoded_pdf_url = encodeURIComponent(pdf_url);
  // Use encodeURI to encode the URL
  const encoded_pdf_url = encodeURI(pdf_url).replace(/\+/g, "%252B");
  // console.log(`${pdf_url}`);
  // console.log(`${encoded_pdf_url}`);
  // console.log(
  //   `https://docs.google.com/viewer?hl=en&embedded=true&url=${encoded_pdf_url}`
  // );
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Loader: Only show while loading */}
      {isLoading && (
        <div className="flex justify-center items-center absolute inset-0 bg-white z-10">
          <div className="loader border-t-transparent border-blue-500"></div>
        </div>
      )}

      {/* iFrame: Hide loader when loaded */}
      <iframe
        src={`https://docs.google.com/viewer?hl=en&embedded=true&url=${encoded_pdf_url}`}
        style={{ width: "100%", height: "100%", border: "none" }}
        onLoad={() => setIsLoading(false)} // Hide loader on load
      ></iframe>

      <style jsx>{`
        .loader {
          border: 4px solid #e0e0e0; /* Light gray */
          border-top-color: #3498db; /* Blue color */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PDFViewer;

// https://docs.google.com/viewer?hl=en&embedded=true&url=https%3A%2F%2Fconverse-ai.s3.us-east-1.amazonaws.com%2Fuploads%2F1730355418727wasim%252BCv.docx
// https://docs.google.com/viewer?hl=en&embedded=true&url=https%3A%2F%2Fconverse-ai.s3.us-east-1.amazonaws.com%2Fuploads%2F1730355418727wasim%2BCv.docx
// https://docs.google.com/viewerng/viewer?hl=en&url=https://converse-ai.s3.us-east-1.amazonaws.com/uploads/1730355418727wasim%2BCv.docx
//
