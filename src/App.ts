import http, { IncomingMessage, ServerResponse } from "node:http";

export type HttpArgs = [req: IncomingMessage, res: ServerResponse];

export default class {
  middlewares: ((...args: HttpArgs) => void)[] = [];

  addMiddleware = (middleware: (...args: HttpArgs) => void) => {
    this.middlewares.push(middleware);
  };

  handleMiddlewares = (...args: HttpArgs) => {
    for (const middleware of this.middlewares) {
      middleware(...args);
    }
  };

  start = (port: number) => {
    http.createServer(this.handleMiddlewares).listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  };
}
