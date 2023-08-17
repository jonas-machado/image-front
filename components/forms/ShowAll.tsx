"use client";
import ImageForm from "@/components/forms/ImageForm";
import axios from "axios";

export default function ShowAll() {
  const showAll = () => {
    axios.get("http://localhost:5000/listObjects").then((res) => {
      console.log(res);
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
    </>
  );
}
