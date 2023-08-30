"use client";

import axios from "axios";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

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
      .post("http://localhost:5000/reference", formData)
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
          id="email"
          type="text"
          placeholder="E-mail"
          className="rounded-md p-2 text-black"
          {...register("email")}
        />
        <input
          id="password"
          type="text"
          placeholder="Nome"
          className="rounded-md p-2 text-black"
          {...register("password")}
        />
        <button className="w-full bg-black rounded-md text-gray-200 p-2">
          Enviar
        </button>
      </form>
    </div>
  );
}
