import { PutObjectCommandOutput, S3,ObjectCannedACL, PutObjectCommand  } from "@aws-sdk/client-s3";

export async function uploadToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        region: "us-east-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });

      const file_key =
        "uploads/" + Date.now().toString() + file.name.replace(/\s+/g, "-");

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
        Body: file,
        // ACL: "public-read" as ObjectCannedACL, 
        ContentType: file.type, // Add this line
      };


      const command = new PutObjectCommand(params); // 👈 Use PutObjectCommand

      s3.send(command)
        .then(() => resolve({ file_key, file_name: file.name }))
        .catch((err) => reject(err));
    } catch (error) {
      console.log(error);
      reject(error);
    }

  });
}


export function getS3Url(file_key:string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${file_key}`;
    return url;
} 