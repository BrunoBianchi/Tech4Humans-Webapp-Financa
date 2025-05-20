import { Router } from "express";
import fs from "fs";
import path from "path";

const featuresDir = path.join(__dirname);
const featuresController: Router = Router();

fs.readdir(
  featuresDir,
  (err: NodeJS.ErrnoException | null, files: string[]) => {
    files
      .filter((file: string) => file != "features-controller.ts")
      .forEach((file: string) => {
        try {
          const controllerModule = require(path.join(
            featuresDir,
            file,
            `${file}-controller.ts`
          ));
          const controller = controllerModule.default;
          if (!controller) {
            throw new Error(`Controller not found in ${file}-controller.ts`);
          }
          let routerConfig;
          
          if (typeof controller === 'function') {
            if (typeof controller.getRouter === 'function') {
              routerConfig = controller.getRouter();
            } else {
              const instance = new controller();
              if (typeof instance.getRouter === 'function') {
                routerConfig = instance.getRouter();
              } else {
                throw new Error(`Controller ${file} doesn't have getRouter method`);
              }
            }
          } else {
            if (typeof controller.getRouter === 'function') {
              routerConfig = controller.getRouter();
            } else {
              throw new Error(`Controller ${file} doesn't have getRouter method`);
            }
          }
          
          featuresController.use(routerConfig.path, routerConfig.router);
          console.log(`✅ Loaded ${routerConfig.name || file} controller`);
        } catch (err) {
          console.log(err);
          console.error(`‼️  Error loading ${file} controller: ${err}`);
        }
      });
  }
);

export default featuresController;