// Função para formatar valores em moeda brasileira
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para formatar porcentagem
function formatarPorcentagem(valor) {
    return valor.toFixed(2) + '%';
}

// Função para gerar número aleatório de nota fiscal
function gerarNumeroNota() {
    return Math.floor(Math.random() * 900000) + 100000;
}

// Função para obter data e hora atual formatada
function obterDataHoraAtual() {
    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toLocaleTimeString('pt-BR');
    return `${data} às ${hora}`;
}

// Função principal para calcular impostos e gerar nota fiscal
function calcularEGerarNota(event) {
    event.preventDefault();

    // Obter valores do formulário
    const valorVenda = parseFloat(document.getElementById('valorVenda').value);
    const itensVendidos = document.getElementById('itensVendidos').value;
    const irpf = parseFloat(document.getElementById('irpf').value);
    const pis = parseFloat(document.getElementById('pis').value);
    const cofins = parseFloat(document.getElementById('cofins').value);
    const inss = parseFloat(document.getElementById('inss').value);
    const issqn = parseFloat(document.getElementById('issqn').value);

    // Validar se todos os campos foram preenchidos
    if (isNaN(valorVenda) || valorVenda <= 0) {
        alert('Por favor, insira um valor de venda válido!');
        return;
    }

    if (!itensVendidos.trim()) {
        alert('Por favor, descreva os itens/serviços vendidos!');
        return;
    }

    // Calcular valores dos impostos
    const valorIRPF = (valorVenda * irpf) / 100;
    const valorPIS = (valorVenda * pis) / 100;
    const valorCOFINS = (valorVenda * cofins) / 100;
    const valorINSS = (valorVenda * inss) / 100;
    const valorISSQN = (valorVenda * issqn) / 100;

    // Calcular total de impostos
    const totalImpostos = valorIRPF + valorPIS + valorCOFINS + valorINSS + valorISSQN;

    // Calcular valor líquido
    const valorLiquido = valorVenda - totalImpostos;

    // Preencher dados na nota fiscal
    document.getElementById('numeroNota').textContent = gerarNumeroNota();
    document.getElementById('dataEmissao').textContent = obterDataHoraAtual();
    document.getElementById('descricaoServicos').textContent = itensVendidos;
    document.getElementById('valorTotal').textContent = formatarMoeda(valorVenda);

    // Preencher impostos
    document.getElementById('aliquotaIRPF').textContent = formatarPorcentagem(irpf);
    document.getElementById('valorIRPF').textContent = formatarMoeda(valorIRPF);

    document.getElementById('aliquotaPIS').textContent = formatarPorcentagem(pis);
    document.getElementById('valorPIS').textContent = formatarMoeda(valorPIS);

    document.getElementById('aliquotaCOFINS').textContent = formatarPorcentagem(cofins);
    document.getElementById('valorCOFINS').textContent = formatarMoeda(valorCOFINS);

    document.getElementById('aliquotaINSS').textContent = formatarPorcentagem(inss);
    document.getElementById('valorINSS').textContent = formatarMoeda(valorINSS);

    document.getElementById('aliquotaISSQN').textContent = formatarPorcentagem(issqn);
    document.getElementById('valorISSQN').textContent = formatarMoeda(valorISSQN);

    document.getElementById('totalImpostos').textContent = formatarMoeda(totalImpostos);
    document.getElementById('valorLiquido').textContent = formatarMoeda(valorLiquido);

    // Exibir nota fiscal
    document.getElementById('notaFiscal').classList.remove('hidden');

    // Rolar suavemente até a nota fiscal
    document.getElementById('notaFiscal').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Função para limpar o formulário e ocultar a nota
function limparFormulario() {
    document.getElementById('nfseForm').reset();
    document.getElementById('notaFiscal').classList.add('hidden');
    
    // Restaurar valores padrão dos impostos
    document.getElementById('irpf').value = 4.8;
    document.getElementById('pis').value = 0.65;
    document.getElementById('cofins').value = 3.0;
    document.getElementById('inss').value = 11.0;
    document.getElementById('issqn').value = 5.0;

    // Rolar para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adicionar evento ao formulário
document.getElementById('nfseForm').addEventListener('submit', calcularEGerarNota);

// Mensagem de boas-vindas no console
console.log('Sistema de NFS-e carregado com sucesso!');
console.log('📄 Desenvolvido para cálculo e emissão de Nota Fiscal de Serviço');