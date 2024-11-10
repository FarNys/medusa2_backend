import {
  defineRouteConfig,
  defineWidgetConfig,
  RouteConfig,
} from "@medusajs/admin-sdk";
import { Apple } from "@medusajs/icons";
import { Button, Container, Heading } from "@medusajs/ui";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductWidget = () => {
  const { id } = useParams();
  console.log("Producti_iD", id);
  const [brandInput, setBrandInput] = useState("");

  const [brandsData, setBrandsData] = useState<any[]>([]);

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
    setBrandsData(data.brands);
  }

  async function updateWithBrandHandler() {
    const res = await fetch("/admin/brand-product", {
      credentials: "include",
      method: "post",
      body: JSON.stringify({
        productId: id,
        brandId: brandsData[3].id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("UpdateProductBrand", data);
  }

  async function getProductDataHandler() {
    const res = await fetch(
      "/admin/brand-product?brand_id=01JBSC28C3GVRTC6VW63DY9S9K",
      {
        credentials: "include",
        method: "get",
      }
    );
    const data = await res.json();
    console.log("Refresh", data);
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Product Brands</Heading>
        <input name="brand" onChange={onChange} />
        <Button onClick={createBrandHandler}>Create</Button>
        <Button onClick={getBrandsHandler}>Brand</Button>
        <Button onClick={updateWithBrandHandler}>Post Data With Brand</Button>
        <Button onClick={getProductDataHandler}>Product Brand</Button>
      </div>
    </Container>
  );
};

// export const config = defineWidgetConfig({
//   zone: "product.details.before",
// });

// export const configRoute = defineRouteConfig({
//   label: "Brand",
//   icon: Apple,
// });

export default ProductWidget;
