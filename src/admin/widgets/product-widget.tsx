import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Button, Container, Heading } from "@medusajs/ui";
import { ChangeEvent, useEffect, useState } from "react";

const ProductWidget = () => {
  const [brandInput, setBrandInput] = useState("");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setBrandInput(e.target.value);
  }

  async function createBrandHandler() {
    const res = await fetch("/admin/brands", {
      credentials: "include",
      method: "post",
      body: JSON.stringify({
        name: brandInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("DATA", data);
  }

  async function getBrandsHandler() {
    const res = await fetch("/admin/brands", {
      credentials: "include",
      method: "get",
    });
    const data = await res.json();
    console.log("DATA", data);
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Product Brands</Heading>
        <input name="brand" onChange={onChange} />
        <Button onClick={createBrandHandler}>Create</Button>
        <Button onClick={getBrandsHandler}>Get Data</Button>
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductWidget;
