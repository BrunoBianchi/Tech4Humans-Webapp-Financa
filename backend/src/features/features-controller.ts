import { Router } from "express";
import fs from "fs";
import path from "path";
import { ControllerClass } from "../utils/class/controller-class";
const featuresDir = path.join(__dirname);
const featuresController: Router = Router();

fs.readdir(
  featuresDir,
  (err: NodeJS.ErrnoException | null, files: string[]) => {
    files
      .filter((file: string) => file != "features-controller.ts")
      .forEach((file: string) => {
        try {
          const controller: ControllerClass =
            require(path.join(
              featuresDir,
              file,
              `${file}-controller.ts`
            )).default || null;
          featuresController.use(controller.getRouter().path, controller.getRouter().router);
          console.log(`✅ Loaded ${controller.getRouter().name} controller`);
        } catch (err) {
          console.error(`‼️  Error loading ${file} controller: ${err}`);
        }
      });
  }
);

export default featuresController;
