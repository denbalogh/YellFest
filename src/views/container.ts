/**
 * Div element with class .container
 */
export default function container(children: string[]) {
  return `<div class="container">${children.join(" ")}</div>`;
}
