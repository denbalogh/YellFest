import { IncomingMessage, ServerResponse } from "node:http";
import https from "https";

export type HttpArgs = [req: IncomingMessage, res: ServerResponse];
export type MiddlewareFunc = (...args: HttpArgs) => boolean;
export type MiddlewareFuncAsync = (...args: HttpArgs) => Promise<boolean>;

export default class {
  middlewares: (MiddlewareFunc | MiddlewareFuncAsync)[] = [];

  addMiddleware(middleware: MiddlewareFunc | MiddlewareFuncAsync) {
    this.middlewares.push(middleware);
  }

  start(port: number) {
    const applyMiddlewares = async (...args: HttpArgs) => {
      for (const middleware of this.middlewares) {
        const didSendHeaders = await middleware(...args);
        if (didSendHeaders) {
          break; // We break the loop if some middleware already sent headers to client
        }
      }
    };

    https
      .createServer(
        {
          key: process.env.SSL_KEY,
          cert: process.env.SSL_CERT,
        },
        applyMiddlewares,
      )
      .listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
      });
  }
}
