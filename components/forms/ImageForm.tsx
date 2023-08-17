"use client";

import axios from "axios";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function ImageForm() {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>(null);

  const [bucket, setBucket] = useState<any>();
  console.log(bucket);

  const [result, setResult] = useState<any>("");
  const { handleSubmit, register } = useForm();

  const reset = () => {
    setImage(null);
    setResult("");
  };

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [image]);

  const onSubmit = async () => {
    console.log(image);
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("filename", image.name);

      axios
        .post("http://localhost:5000/processImage", formData)
        .then((res) => {
          console.log(res);
          setBucket(res.data["Images"]);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-2 mx-2 h-auto w-full"
      >
        {!image ? (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => setImage(e.target.files![0])}
            />
          </label>
        ) : (
          <div className="flex justify-center">
            <img src={imageUrl} alt="" className="rounded-xl h-64" />
          </div>
        )}

        <div className="flex gap-2 mx-2 w-full">
          <button
            className="rounded-md bg-gray-900 text-gray-300 p-4 w-full text-2xl col-span-2"
            onClick={reset}
          >
            limpar
          </button>
          <button
            className="rounded-md bg-gray-900 text-gray-300 p-4 w-full text-2xl col-span-2"
            onClick={onSubmit}
          >
            enviar
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center w-full my-2 gap-2">
        {bucket?.map((el: any) => (
          <div key={el}>
            <img
              height={280}
              width={280}
              src={`data:image/jpg;base64,${el}`}
              alt="image"
            />
            <p></p>
          </div>
        ))}
        {/* <p className=" text-2xl">{"SSIM: " + result.data!["SSIM"]! + "%"}</p> */}
      </div>
    </div>
  );
}
