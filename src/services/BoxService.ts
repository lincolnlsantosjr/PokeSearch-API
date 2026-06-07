import { promises as fs } from "node:fs";
import { PokemonResumo } from "../models/Pokemon";
import { formatarLinhaPokemon, mensagemOk, mensagemAviso } from "../utils/textFormatters";

const CAMINHO_ARQUIVO = "./pc_box.json";

export class BoxService {
  private pokemons: PokemonResumo[] = [];

  async carregar(): Promise<void> {
    try {
      const conteudo = await fs.readFile(CAMINHO_ARQUIVO, "utf-8");
      this.pokemons = JSON.parse(conteudo) as PokemonResumo[];
    } catch {
      this.pokemons = [];
      await this.salvar();
    }
  }

  private async salvar(): Promise<void> {
    const conteudo = JSON.stringify(this.pokemons, null, 2);
    await fs.writeFile(CAMINHO_ARQUIVO, conteudo, "utf-8");
  }

  async adicionar(pokemon: PokemonResumo): Promise<void> {
    const jaExiste: boolean = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(mensagemAviso(`${pokemon.nome} já está no catálogo.`));
      return;
    }

    this.pokemons.push(pokemon);
    await this.salvar();
    console.log(mensagemOk(`${pokemon.nome} adicionado ao catálogo.`));
  }

  listar(): void {
    if (this.pokemons.length === 0) {
      console.log(mensagemAviso("Catálogo vazio."));
      return;
    }

    console.log("\n--- Catálogo atual ---");
    this.pokemons.forEach((pokemon) => {
      console.log(formatarLinhaPokemon(pokemon));
    });
    console.log("----------------------\n");
  }

  async remover(id: number): Promise<void> {
    const existe: boolean = this.pokemons.some((pokemon) => pokemon.id === id);

    if (!existe) {
      console.log(mensagemAviso("Nenhum Pokémon encontrado com esse ID."));
      return;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    await this.salvar();
    console.log(mensagemOk("Pokémon removido do catálogo."));
  }

  calcularPesoTotal(): number {
    return this.pokemons.reduce((total, pokemon) => total + pokemon.peso, 0);
  }

  todosTemNome(): boolean {
    return this.pokemons.every((pokemon) => pokemon.nome.length > 0);
  }

  buscarPorNome(nome: string): PokemonResumo | undefined {
    return this.pokemons.find((pokemon) => pokemon.nome === nome);
  }
}