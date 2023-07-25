"use client";

import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";

export default function ImageForm() {
  const [image, setImage] = useState<any>();
  const onSubmit = () => {
    axios
      .post("http://localhost:5000/processImage", {
        imageUrl:
          "https://global.cdn.magazord.com.br/edexjeans/img/2023/02/produto/7436/t-jaqueta-masculina-nylon-4105-variacao-37827-1-61263e0afaef09183d9d0328c3265499-20220427135503.jpeg?ims=fit-in/475x650",
      })
      .then((res) => console.log(res));
  };
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center w-full">
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
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => setImage(URL.createObjectURL(e.target.files![0]))}
          />
        </label>
      </div>
      <button
        className="rounded-md bg-gray-900 text-gray-300 p-4 w-full text-2xl"
        onClick={onSubmit}
      >
        enviar
      </button>
      <div>
        <Image src={image} alt="firstImage" width={500} height={500} />
      </div>
    </div>
  );
}
