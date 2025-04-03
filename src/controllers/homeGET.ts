import { HttpArgs } from "../App";
import Header from "../views/Header";
import Layout from "../views/layout";

export default function homeGET(...args: HttpArgs) {
  const [, res] = args;

  const layout = new Layout();
  layout.addCss("/css/home.css");

  const header = new Header(
    `<a href="/fights/new", class="cta-button">Start a fight</a>`,
  );
  layout.setContent(header.render());

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  res.end(layout.render());
}
