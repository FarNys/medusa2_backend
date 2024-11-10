import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createMediaStep } from "./steps/create-media";

export type CreateMediaInput = {
  name: string;
  url: string;
};

export const createMediaWorkflow = createWorkflow(
  "create-media",
  (input: CreateMediaInput) => {
    // TODO
    const media = createMediaStep(input);

    return new WorkflowResponse(media);
  }
);
