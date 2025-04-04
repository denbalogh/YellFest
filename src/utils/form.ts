import { IncomingMessage } from "node:http";

function parseFormData(formData: string): Record<string, string> {
  const formDataObject = {};

  const keyValuePairs = formData.split("&");
  for (const keyValue of keyValuePairs) {
    const [key, value] = keyValue.split("=");
    formDataObject[key] = value;
  }

  return formDataObject;
}

export default function getFormData(
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
      resolve(parseFormData(body));
    });
    // On error
    req.on("error", (err) => {
      reject(err);
    });
  });
}
