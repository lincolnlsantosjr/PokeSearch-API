import { PokemonResumo, PokemonApiResponse } from "../models/Pokemon";
import { mensagemErro, mensagemOk } from "../utils/textFormatters";

const URL_BASE = "https://pokeapi.co/api/v2/pokemon";

export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
  const url = `${URL_BASE}/${nomeOuId}`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      console.log(mensagemErro(`Pokémon não encontrado: ${nomeOuId}`));
      return null;
    }

    const dados = await resposta.json() as PokemonApiResponse;

    // Usa map para transformar o array de tipos da API em um array de strings
    const tipos: string[] = dados.types.map((item) => item.type.name);

    const pokemon: PokemonResumo = {
      id: dados.id,
      nome: dados.name,
      tipos: tipos,
      altura: dados.height,
      peso: dados.weight,
    };

    console.log(mensagemOk(`Pokémon encontrado: ${pokemon.nome}`));
    return pokemon;

  } catch (erro) {
    console.log(mensagemErro("Não foi possível buscar o Pokémon. Verifique sua conexão."));
    return null;
  }
}