import { PokemonResumo } from "../models/Pokemon";

// Formata uma linha do catálogo para exibição no terminal
export function formatarLinhaPokemon(pokemon: PokemonResumo): string {
  const tipos: string = pokemon.tipos.join(", ");
  return `#${pokemon.id} - ${pokemon.nome} | Tipos: ${tipos} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso}`;
}

// Formata mensagem de sucesso
export function mensagemOk(texto: string): string {
  return `[OK] ${texto}`;
}

// Formata mensagem de aviso
export function mensagemAviso(texto: string): string {
  return `[AVISO] ${texto}`;
}

// Formata mensagem de erro
export function mensagemErro(texto: string): string {
  return `[ERRO] ${texto}`;
}