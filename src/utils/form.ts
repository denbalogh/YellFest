import { IncomingMessage } from "node:http";

function parseFormData<Keys extends string>(
  formData: string,
): Record<Keys, string> {
  const searchParams = new URLSearchParams(formData);
  return Object.fromEntries(searchParams.entries()) as Record<Keys, string>;
}

export default function getFormData<Keys extends string>(
  req: IncomingMessage,
): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    let body = "";
    //Listen for data
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    // Data has been received
    req.on("end", () => {
      resolve(parseFormData<Keys>(body));
    });
    // On error
    req.on("error", (err) => {
      reject(err);
    });
  });
}
