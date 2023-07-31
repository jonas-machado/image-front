"use client";

import axios from "axios";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { storage } from "@/lib/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ImageForm() {
  const [image, setImage] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [image2Url, setImage2Url] = useState<any>(null);

  const [result, setResult] = useState<any>("");
  const [resultVision, setResultVision] = useState<any>("");
  console.log(resultVision);
  const { handleSubmit, register } = useForm();

  console.log(result);
  const reset = () => {
    setImage(null);
    setImage2(null);
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

  useEffect(() => {
    if (image2) {
      setImage2Url(URL.createObjectURL(image2));
    }
    return () => {
      URL.revokeObjectURL(image2Url);
    };
  }, [image2]);

  const onSubmit = async () => {
    const imageRef1 = ref(storage, `images/${image?.name + v4()}`);
    const imageRef2 = ref(storage, `images/${image2?.name + v4()}`);

    const uploadImage = await uploadBytes(imageRef1, image).then(() => {
      console.log("image uploaded");
    });

    const uploadImage2 = await uploadBytes(imageRef2, image2).then(() => {
      console.log("image uploaded");
    });

    const urlImage: any = await getDownloadURL(imageRef1).catch((err) =>
      console.log(err)
    );
    const urlImage2: any = await getDownloadURL(imageRef2).catch((err) =>
      console.log(err)
    );

    // axios
    //   .post("http://localhost:5000/processImage", {
    //     imageUrl: urlImage,
    //     imageUrl2: urlImage2,
    //   })
    //   .then((res) => {
    //     const similarity =
    //       parseInt(res.data!["SSIM"]) > parseInt(res.data!["ORB"])
    //         ? parseInt(res.data!["SSIM"])
    //         : parseInt(res.data!["ORB"]);
    //     console.log(res);
    //     setResult(similarity);
    //   })
    //   .catch((err) => console.log(err));
    axios
      .post("http://localhost:5000/processImageVision", {
        imageUrl: urlImage,
      })
      .then((res) => {
        const labels = res;
        console.log(labels);
        setResultVision(labels.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 items-center gap-2 mx-2 h-auto w-full"
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
        {!image2 ? (
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
              onChange={(e) => setImage2(e.target.files![0])}
            />
          </label>
        ) : (
          <div className="flex justify-center">
            <img src={image2Url} alt="" className="rounded-xl h-64" />
          </div>
        )}
        <div className="flex gap-2 mx-2 col-span-2">
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
      <div className="flex justify-center w-full text-center my-6">
        <table className="w-1/2 border border-gray-900 rounded-xl">
          <tr>
            <th className="text-4xl">Label</th>
            <th className="text-4xl">Score</th>
          </tr>
          {resultVision &&
            resultVision.map((label: any) => (
              <tr>
                <td>{label.label}</td>
                <td>{Math.round(label.score * 100)}%</td>
              </tr>
            ))}
        </table>
        {/* <p className=" text-2xl">{"SSIM: " + result.data!["SSIM"]! + "%"}</p> */}
      </div>
    </div>
  );
}
