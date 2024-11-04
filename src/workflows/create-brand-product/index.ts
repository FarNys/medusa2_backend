import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  linkProductToBrandStep,
  LinkProductToBrandStepInput,
} from "./steps/create-brand-product";

export const createBrandProductWorkflow = createWorkflow(
  "create-brand-product",
  (input: LinkProductToBrandStepInput) => {
    // TODO
    const result = linkProductToBrandStep(input);

    return new WorkflowResponse(result);
  }
);
