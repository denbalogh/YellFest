import { MiddlewareFuncAsync } from "../App";
import { readdir, readFile } from "node:fs/promises";
import { getContentTypeFromExt } from "../utils/file";

const staticFolder: (folderPath: string) => MiddlewareFuncAsync = (
  folderPath,
) => {
  return async function (...args) {
    const [req, res] = args;

    if (req.method !== "GET" || !req.url) {
      return false;
    }

    const dirContents = (await readdir(folderPath, {
      recursive: true,
    })) as string[];

    if (dirContents.includes(req.url.substring(1))) {
      const file = await readFile(`${folderPath}${req.url}`);
      const ext = req.url.split(".").pop() as string;
      res
        .writeHead(200, {
          "content-type": getContentTypeFromExt(ext),
          "content-length": Buffer.byteLength(file),
        })
        .end(file);

      return true;
    }

    return false;
  };
};

export default staticFolder;
