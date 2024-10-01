
const { consultarPorCep, consultarPorEndereco } = require('../script');

describe('Testar função consultarPorCep', () => {
    it('Deve retornar os dados de endereço para um CEP válido', async () => {
        const cep = '01310915';

        const resultado = await consultarPorCep(cep);

        expect(resultado).toEqual({
            logradouro: 'Avenida Paulista',
            bairro: 'Bela Vista',
            localidade: 'São Paulo',
            uf: 'SP',
            cep: '01310-915'
        });
    });

    it('Deve lançar erro para CEP inválido', async () => {
        const cep = '00000000';

        await expect(consultarPorCep(cep)).rejects.toThrow('CEP não encontrado');
    });
});

describe('Testar função consultarPorEndereco', () => {
    it('Deve retornar os dados de endereço para um endereço válido', async () => {
        const estado = 'SP';
        const cidade = 'São Paulo';
        const rua = 'Avenida Paulista';

        const resultado = await consultarPorEndereco(estado, cidade, rua);

        expect(resultado).toEqual({
          logradouro: 'Avenida Paulista',
          bairro: 'Bela Vista',
          localidade: 'São Paulo',
          uf: 'SP',
          cep: expect.stringMatching(/^\d{5}-\d{3}$/) 
        });
    });

    it('Deve lançar erro para endereço inválido', async () => {
        const estado = 'SP';
        const cidade = 'Lorem Lorem Lorem';
        const rua = 'Lorem Lorem Lorem';

        await expect(consultarPorEndereco(estado, cidade, rua)).rejects.toThrow('Endereço não encontrado');
    });
});
