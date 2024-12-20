import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "us-east-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };

      const obj = await s3.getObject(params);

      // Check if obj.Body is defined
      if (!obj.Body) {
        reject(new Error("No data received from S3."));
        return;
      }

      // Ensure /tmp directory exists
      const tmpDir = '/tmp';
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }

      // Determine the file extension from the file_key
      const fileExtension = path.extname(file_key).toLowerCase();
      const validExtensions = ['.pdf', '.ppt', '.pptx', '.docx'];

      if (!validExtensions.includes(fileExtension)) {
        reject(new Error("Unsupported file type. Supported types are: PDF, PPT, PPTX, DOCX."));
        return;
      }

      // Use the original file extension
      const file_name = path.join(tmpDir, `${Date.now().toString()}${fileExtension}`);

      if (obj.Body instanceof require("stream").Readable) {
        const file = fs.createWriteStream(file_name);
        file.on("open", function () {
          obj.Body.pipe(file).on("finish", () => {
            // console.log(`Downloaded file saved to: ${file_name}`); // Log the file path
            return resolve(file_name);
          });
        });
      } else {
        reject(new Error("File Body is not a readable stream."));
      }
    } catch (error) {
      console.error("Error downloading from S3:", error);
      reject(error);
    }
  });
}


