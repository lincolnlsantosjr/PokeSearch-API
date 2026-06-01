export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
}
