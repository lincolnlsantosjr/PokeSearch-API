import { BoxService } from "./services/BoxService";
import { TerminalController } from "./controllers/TerminalController";

async function main(): Promise<void> {
  const boxService = new BoxService();
  const controller = new TerminalController(boxService);

  await controller.executar();
}

main();