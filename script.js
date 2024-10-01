// Consult API
async function consultarPorCep(cep) {
  const cepRegex = /^[0-9]{8}$/;
  if (!cepRegex.test(cep)) {
    throw new Error('CEP deve conter 8 dígitos numéricos.');
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  
  const data = await response.json();

  if (data.cep) {
      return {
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
          cep: data.cep
      };
  } else {
      throw new Error('CEP não encontrado');
  }
}

async function consultarPorEndereco(estado, cidade, rua) {
  if (!rua || !estado || !cidade) {
    throw new Error('Todos os campos devem ser preenchidos.');
  }

  const response = await fetch(`https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`);
    
  if (!response) {
    throw new Error('Endereço não encontrado');
  }

  const data = await response.json();

  if (!!data.length) {
      return {
          logradouro: data[0].logradouro,
          bairro: data[0].bairro,
          localidade: data[0].localidade,
          uf: data[0].uf,
          cep: data[0].cep
      };
  } else {
      throw new Error('Endereço não encontrado');
  }
}

// Renders
function renderizarResultadoCep(data) {
  const resultado = `
      Rua: ${data.logradouro}<br>
      Bairro: ${data.bairro}<br>
      Cidade: ${data.localidade}<br>
      Estado: ${data.uf}<br>
      CEP: ${data.cep}
  `;
  document.getElementById('resultadoCep').innerHTML = resultado;
}

function renderizarResultadoEndereco(data) {
  const resultado = `
      Rua: ${data.logradouro}<br>
      Bairro: ${data.bairro}<br>
      Cidade: ${data.localidade}<br>
      Estado: ${data.uf}<br>
      CEP: ${data.cep}
  `;
  document.getElementById('resultadoEndereco').innerHTML = resultado;
}

// Handles
async function handleConsultaPorCep() {
  const cep = document.getElementById('cep').value;

  try {
      const data = await consultarPorCep(cep);
      renderizarResultadoCep(data);
  } catch (error) {
      alert(error.message);
      document.getElementById('resultadoCep').innerHTML = '';
  }
}

async function handleConsultaPorEndereco() {
  const rua = document.getElementById('rua').value;
  const estado = document.getElementById('estado').value;
  const cidade = document.getElementById('cidade').value;

  try {
      const data = await consultarPorEndereco(estado, cidade, rua);
      renderizarResultadoEndereco(data);
  } catch (error) {
      alert(error.message);
      document.getElementById('resultadoEndereco').innerHTML = '';
  }
}

module.exports = {
  consultarPorCep,
  consultarPorEndereco
}