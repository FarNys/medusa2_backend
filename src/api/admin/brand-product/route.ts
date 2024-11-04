import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

import { LinkProductToBrandStepInput } from "src/workflows/create-brand-product/steps/create-brand-product";
import { createBrandProductWorkflow } from "src/workflows/create-brand-product";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const POST = async (
  req: MedusaRequest<LinkProductToBrandStepInput>,
  res: MedusaResponse
) => {
  const { result } = await createBrandProductWorkflow(req.scope).run({
    input: req.body,
  });

  res.json({ product: result });
};

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { brand_id, ...rest } = req.query;

  const data = await query.graph({
    entity: "product",
    fields: ["brand.*", "*"],
    filters: rest,
    pagination: {
      skip: 0,
      take: 5,
    },
  });

  let filteredByBrand = [];
  if (brand_id) {
    filteredByBrand = data.data.filter((item) => item?.brand?.id === brand_id);
  } else {
    filteredByBrand = data.data;
  }

  res.json(filteredByBrand);
}
