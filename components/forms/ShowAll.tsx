"use client";
import ImageForm from "@/components/forms/ImageForm";
import axios from "axios";
import { useState } from "react";

export default function ShowAll() {
  const [bucket, setBucket] = useState<any>();

  const showAll = () => {
    axios
      .get("http://localhost:5000/listObjects")
      .then((res) => {
        console.log(res);
        setBucket(res.data["Images"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="">
        <button
          onClick={showAll}
          className="w-full rounded-md bg-black text-gray-200 m-2"
        >
          Listar
        </button>
      </div>
      <div className="m-4 flex items-center flex-wrap gap-4">
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
      </div>
    </>
  );
}
