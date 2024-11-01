import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createBrandStep } from "./steps/create-brand";

export type CreateBrandInput = {
  name: string;
};

export const createBrandWorkflow = createWorkflow(
  "create-brand",
  (input: CreateBrandInput) => {
    // TODO
    const brand = createBrandStep(input);

    return new WorkflowResponse(brand);
  }
);
