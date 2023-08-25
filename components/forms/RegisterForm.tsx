"use client";

import axios from "axios";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Webcam from "react-webcam";

export default function RegisterForm() {
  const { handleSubmit, register } = useForm();

  //   useEffect(() => {
  //     if () {
  //       setImageUrl(URL.createObjectURL());
  //     }
  //     return () => {
  //       URL.revokeObjectURL();
  //     };
  //   }, []);

  const onSubmit = async () => {
    axios
      .get("http://localhost:5000/register")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black p-2 rounded-md flex flex-col gap-2 bg-opacity-50"
      >
        <input type="text" placeholder="Nome" className="rounded-md p-2" />
        <input type="text" placeholder="E-mail" className="rounded-md p-2" />
        <input type="text" placeholder="Instagram" className="rounded-md p-2" />
        <div className="flex flex-row gap-2 w-full">
          <input
            type="text"
            placeholder="País"
            className="rounded-md p-2 w-14"
          />
          <input
            type="text"
            placeholder="Telefone"
            className="rounded-md p-2 w-full"
          />
        </div>
        <label
          htmlFor="image"
          className="w-full bg-black rounded-md text-center cursor-pointer"
        >
          Escolher imagem
          <input
            className="hidden"
            id="image"
            type="file"
            accept="image/*"
            capture="environment"
          />
        </label>
        <button className="w-full bg-black rounded-md">Enviar</button>
      </form>
    </div>
  );
}
