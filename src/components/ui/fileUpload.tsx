"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Inbox } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import upload from "/public/upload.svg";
import { Oval } from "react-loader-spinner";

const MAX_FILE_LIMIT =
  parseInt(process.env.NEXT_PUBLIC_FREE_PLAN_FILE_LIMIT || "1") * 1024 * 1024;

type Props = {
  isPro: boolean;
};

const FileUpload = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  // const {} = React.useState(false)
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      setLoading(true);
      const file = acceptedFiles[0];
      if (!props.isPro && file.size > MAX_FILE_LIMIT) {
        toast.error("file too larges, Upgrade to Pro");
        setLoading(false);
        return;
      }
      try {
        const data = await uploadToS3(file);

        if (!data?.file_key || !data.file_name) {
          toast.error("something went wrong");
          return;
        }
        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast.success("Chat created!");
            // setLoading(false);
            router.push(`/chat/${chat_id}`);
          },
          onError: (err) => {
            toast.error("error creating chat");
            // setLoading(false);
            console.log(err);
          },
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        // setLoading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl shadow-2xl">
      <div
        {...getRootProps({
          className:
            "m-4  border rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col h-[380px]",
        })}
      >
        <input {...getInputProps()} />
        <>
          <div className="w-16 h-16 relative mb-4">
            <Image
              src={upload}
              alt="icon-image"
              className="object-contain group-hover:hidden"
            />
          </div>
          {loading ? (
            <Oval
              visible={true}
              height="40"
              width="40"
              color="#FE330A"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <>
              <p className="text-lg text-gray-800  text-blue capitalize">
                Drop File here
              </p>
              {!props.isPro && (
                <p className="text-xs text-gray-800 text-blue">
                  ( Max Limit {process.env.NEXT_PUBLIC_FREE_PLAN_FILE_LIMIT} MB
                  )
                </p>
              )}
              {props.isPro && (
                <p className="text-xs text-gray-800 text-blue">
                  ( File Upto 10 MB )
                </p>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default FileUpload;
