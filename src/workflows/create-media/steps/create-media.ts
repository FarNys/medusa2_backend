import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateMediaInput } from "..";
import { MEDIA_MODULE } from "src/modules/media";
import MediaModuleService from "src/modules/media/service";

export const createMediaStep = createStep(
  "create-media-step-1",
  async (input: CreateMediaInput, { container }) => {
    const mediaModuleService: MediaModuleService =
      container.resolve(MEDIA_MODULE);
    const media = await mediaModuleService.createMedias(input);
    return new StepResponse(media, media.id);
  }
);
