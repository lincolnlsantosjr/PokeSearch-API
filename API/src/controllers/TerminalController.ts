import * as readline from "node:readline";
import { buscarPokemon } from "../services/PokeApiService";
import { BoxService } from "../services/BoxService";

export class TerminalController {
  private boxService: BoxService;
  private rl: readline.Interface;

  constructor(boxService: BoxService) {
    this.boxService = boxService;

    // Cria a interface de leitura do terminal
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  // Faz uma pergunta no terminal e retorna a resposta como Promise
  private perguntar(texto: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(texto, (resposta) => {
        resolve(resposta);
      });
    });
  }

  private exibirMenu(): void {
    console.log("\n=============================");
    console.log("    Pokédex TypeScript Lite  ");
    console.log("=============================");
    console.log("1 - Buscar e adicionar Pokémon");
    console.log("2 - Listar catálogo");
    console.log("3 - Remover Pokémon por ID");
    console.log("4 - Ver peso total do catálogo");
    console.log("0 - Sair");
    console.log("=============================");
  }

  async executar(): Promise<void> {
    await this.boxService.carregar();

    let rodando = true;

    while (rodando) {
      this.exibirMenu();

      const opcao = await this.perguntar("Digite uma opção: ");

      if (opcao === "1") {
        const nome = await this.perguntar("Digite o nome ou ID do Pokémon: ");
        const pokemon = await buscarPokemon(nome);

        if (pokemon !== null) {
          await this.boxService.adicionar(pokemon);
        }
      }

      if (opcao === "2") {
        this.boxService.listar();
      }

      if (opcao === "3") {
        const entrada = await this.perguntar("Digite o ID do Pokémon para remover: ");
        const id = Number(entrada);

        if (isNaN(id)) {
          console.log("[ERRO] ID inválido. Digite um número.");
        }

        if (!isNaN(id)) {
          await this.boxService.remover(id);
        }
      }

      if (opcao === "4") {
        const total = this.boxService.calcularPesoTotal();
        console.log(`\nPeso total do catálogo: ${total}`);
      }

      if (opcao === "0") {
        console.log("\nAté mais! 👋");
        rodando = false;
      }

      if (opcao !== "0" && opcao !== "1" && opcao !== "2" && opcao !== "3" && opcao !== "4") {
        console.log("[AVISO] Opção inválida. Tente novamente.");
      }
    }

    this.rl.close();
  }
}