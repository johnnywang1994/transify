import { Application } from "express";
import fs from "fs/promises";

async function registerRouters(app: Application) {
  const files = await fs.readdir(__dirname);
  await Promise.all(
    files.map(async (filename) => {
      if (filename.startsWith("index")) return;
      const { default: routerModule, prefix } = await import(`./${filename}`);
      app.use(prefix, routerModule);
    })
  );
}

export default registerRouters;
