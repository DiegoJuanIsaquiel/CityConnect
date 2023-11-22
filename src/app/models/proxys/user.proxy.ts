export interface UserProxy {
    Usuario: string,
    telefone: string,
    pontuacao: string,
    Nome: string,
    longitude: number,
    latitude: number,
    fotoPerfil: string,
    Email: string,
    dataNascimento: Date,
    dadosConquista: { Nome: string, Descricao: string}[],
    CPF: string
}
