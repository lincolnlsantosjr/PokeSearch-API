import { PokemonResumo } from "../models/Pokemon";

export function formatarLinhaPokemon(pokemon: PokemonResumo): string {
  const tipos: string = pokemon.tipos.join(", ");
  return `#${pokemon.id} - ${pokemon.nome} | Tipos: ${tipos} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso}`;
}

export function mensagemOk(texto: string): string {
  return `[OK] ${texto}`;
}

export function mensagemAviso(texto: string): string {
  return `[AVISO] ${texto}`;
}

export function mensagemErro(texto: string): string {
  return `[ERRO] ${texto}`;
}