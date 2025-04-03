export function getContentTypeFromExt(ext: string) {
  switch (ext) {
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    default:
      return "text/plain";
  }
}
