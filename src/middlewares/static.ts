import { HttpArgs } from "../App";
import { readdir, readFile } from "node:fs/promises";
import { getContentTypeFromExt } from "../utils/file";

export default function staticFolder(folderPath: string) {
  return async function (...args: HttpArgs) {
    const [req, res] = args;

    if (req.method !== "GET" || !req.url) {
      return;
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
    }
  };
}
