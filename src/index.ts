import http from "node:http";
import router from "./router";

const PORT = 3000;

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
