const fs = require("fs");
const path = require("path");
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

// const directoryPath = '../../../../static';
const directoryPath = path.resolve(__dirname, "../../../../static");

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const start = performance.now();
  const fileList = fs.readdirSync(directoryPath);
  const end = performance.now();

  res.json({
    message: "Files and folders in the directory:",
    time: end - start,
    files: fileList,
  });
}
