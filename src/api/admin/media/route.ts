const fs = require("fs");
const path = require("path");
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { BRAND_MODULE } from "src/modules/brand";
import BrandModuleService from "src/modules/brand/service";
import { MEDIA_MODULE } from "src/modules/media";
import MediaModuleService from "src/modules/media/service";
import {
  CreateMediaInput,
  createMediaWorkflow,
} from "src/workflows/create-media";

const directoryPath = "../../../../static";

export const POST = async (
  req: MedusaRequest<CreateMediaInput>,
  res: MedusaResponse
) => {
  //METHOD-1 WORKFLOW
  // const { result } = await createMediaWorkflow(req.scope).run({
  //   input: req.body,
  // });
  // res.json({ media: result });

  //METHOD-2 DIRECT SERVICE
  const mediaModuleService: MediaModuleService =
    req.scope.resolve(MEDIA_MODULE);
  const body = req.body;
  const result = await mediaModuleService.createMedia(body);
  res.json({
    result: result,
  });
};

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const mediaModuleService: MediaModuleService =
    req.scope.resolve(MEDIA_MODULE);

  const [results, count] = await mediaModuleService.listAndCountMedia();

  res.json({
    results,
    count,
  });
}
