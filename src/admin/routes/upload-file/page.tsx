import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Container, Heading } from "@medusajs/ui";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Camera } from "@medusajs/icons";

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  function selectFileHandler(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] as File;
    console.log("selectedFile", selectedFile);
    setFile(selectedFile);
  }

  async function saveMedia(url: string) {
    const res = await fetch("/admin/media", {
      credentials: "include",
      method: "post",
      body: JSON.stringify({
        name: Math.random().toString(),
        url: url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    console.log("Result from saving to Media Table", data);
  }

  async function uploadHandler() {
    const formData = new FormData();
    formData.append("files", file as File);
    const res = await fetch("/admin/uploads", {
      credentials: "include",
      method: "post",
      body: formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
    });
    const data = await res.json();
    console.log("Return Data", data);

    const result = data.files[0];
    console.log("result", result.url);
    await saveMedia(result.url);
  }

  // useEffect(() => {
  //   async function getImages() {
  //     const res = await fetch("/admin/uploads/1731191715470-bg-image.jpg", {
  //       credentials: "include",
  //       method: "get",
  //     });
  //     const data = await res.json();
  //     console.log("Get Images?", data);
  //   }
  //   getImages();
  // }, []);
  // useEffect(() => {
  //   async function getImages() {
  //     const res = await fetch("/admin/custom", {
  //       credentials: "include",
  //       method: "get",
  //     });
  //     const data = await res.json();
  //     console.log("Get Images in Custom Route?", data);
  //   }
  //   getImages();
  // }, []);

  useEffect(() => {
    async function getBrands() {
      const res = await fetch("/admin/media", {
        credentials: "include",
        method: "get",
      });
      const data = await res.json();
      console.log("Medias", data);
    }
    getBrands();
  }, []);

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Upload File</Heading>
        <div>
          <label htmlFor="upload">Upload</label>
          <input
            name="upload"
            id="upload"
            type="file"
            onChange={selectFileHandler}
          />
        </div>
      </div>
      <Button onClick={uploadHandler}>Upload Action</Button>
    </Container>
  );
};

export default UploadFile;

export const config = defineRouteConfig({
  label: "Uploads",
  icon: Camera,
});
