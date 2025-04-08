/**
 * Main element
 */
export default function main(children: string | string[]) {
  return `
    <main>
      ${Array.isArray(children) ? children.join(" ") : children}
    </main>
  `;
}
