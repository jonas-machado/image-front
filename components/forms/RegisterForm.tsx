"use client";

import axios from "axios";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Webcam from "react-webcam";

export default function RegisterForm() {
  const { handleSubmit, register } = useForm();
  const [image, setImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  console.log(imageUrl);
  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [image]);

  const onSubmit = async ({
    name,
    email,
    instagram,
    country,
    tel,
  }: FieldValues) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("instagram", instagram);
    formData.append("country", country);
    formData.append("tel", tel);
    formData.append("image", image);

    axios
      .post("http://localhost:5000/register", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black p-2 rounded-md flex flex-col gap-2 bg-opacity-60"
      >
        <input
          type="text"
          placeholder="Nome"
          className="rounded-md p-2"
          {...register("name")}
        />
        <input
          type="text"
          placeholder="E-mail"
          className="rounded-md p-2"
          {...register("email")}
        />
        <input
          type="text"
          placeholder="Instagram"
          className="rounded-md p-2"
          {...register("instagram")}
        />
        <div className="flex flex-row gap-2 w-full">
          <input
            type="text"
            placeholder="País"
            className="rounded-md p-2 w-14"
            {...register("country")}
          />
          <input
            type="text"
            placeholder="Telefone"
            className="rounded-md p-2 w-full"
            {...register("tel")}
          />
        </div>
        <label
          htmlFor="image"
          className="w-full bg-black rounded-md text-center cursor-pointer text-gray-200 p-2"
        >
          Escolher imagem
          <input
            className="hidden"
            id="image"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e: any) => {
              setImage(e.target.files[0]);
            }}
          />
        </label>
        {image && (
          <img src={imageUrl} alt="ref" width={300} className=" mx-auto" />
        )}
        <button className="w-full bg-black rounded-md text-gray-200 p-2">
          Enviar
        </button>
      </form>
    </div>
  );
}
