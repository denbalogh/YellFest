import Page from "../Page";
import { ViewFunc } from "../types/view";
import container from "../views/container";
import header from "../views/header";

const notFound: ViewFunc = (...args) => {
  const [, res] = args;

  const page = new Page();
  page.setBody(container([header(), "<h2>Page was not found!</h2>"]));

  const html = page.render();

  res
    .writeHead(404, {
      "content-type": "text/html",
      "content-length": Buffer.byteLength(html),
    })
    .end(html);

  return true;
};

export default notFound;
