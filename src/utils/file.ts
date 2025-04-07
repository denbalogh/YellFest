export function getContentTypeFromExt(ext: string) {
  switch (ext) {
    // Text
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    // Images
    case "png":
      return "image/png";
    case "jpeg":
      return "image/jpeg";
    case "svg":
      return "image/svg+xml";
    case "ico":
      return "image/x-icon";
    // Json
    case "webmanifest":
      return "application/json";
    default:
      return "text/plain";
  }
}
