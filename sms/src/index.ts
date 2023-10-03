import { startDB } from "./db/index";
import { startBus } from "./service/listen_bus";

async function main() {
  await startDB();
  await startBus();
}

main();
