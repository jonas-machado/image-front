"use client";
import ImageForm from "@/components/forms/ImageForm";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ShowAll() {
  const [bucket, setBucket] = useState<any>();
  const [images, setImages] = useState<FileList | null>(null);
  const [imageUrl, setImageUrl] = useState<any>([]);
  const [toSend, setToSend] = useState<boolean>(false);
  console.log(images);
  console.log(imageUrl);

  useEffect(() => {
    if (images && images.length > 0) {
      setToSend(true);
      const imageArray = Array.from(images);
      const newUrls = imageArray.map((file) => URL.createObjectURL(file));
      setImageUrl(newUrls);
    }
    return () => {
      imageUrl.forEach((url: any) => URL.revokeObjectURL(url));
    };
  }, [images]);

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

  const sendImages = () => {
    const formData = new FormData();
    for (let i = 0; i < images!.length; i++) {
      formData.append("image", images![i]);
      formData.append("filename", images![i].name);
    }
    axios
      .post("http://localhost:5000/upload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex">
        <button
          onClick={showAll}
          className="w-full p-2 rounded-md bg-black text-gray-200 m-2"
        >
          Listar
        </button>
        <label
          htmlFor="images"
          className="cursor-pointer w-full p-2 text-center rounded-md bg-black text-gray-200 m-2"
        >
          Selecionar imagens para enviar
          <input
            type="file"
            id="images"
            onChange={(e) => {
              setImages(e.target.files);
            }}
            className="hidden w-full p-2 rounded-md bg-black text-gray-200 m-2"
            multiple
          />
        </label>
      </div>
      <div className="m-4 flex items-center flex-wrap gap-4">
        {!toSend
          ? bucket?.map((el: any) => (
              <div key={el}>
                <img
                  height={280}
                  width={280}
                  src={`data:image/jpg;base64,${el}`}
                  alt="image"
                />
                <p></p>
              </div>
            ))
          : imageUrl.map((url: string, index: number) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index}`}
                height={280}
                width={280}
              />
            ))}
      </div>
      {toSend && (
        <button
          onClick={sendImages}
          className="w-full p-2 bg-black rounded-md text-gray-200"
        >
          Enviar
        </button>
      )}
    </>
  );
}
