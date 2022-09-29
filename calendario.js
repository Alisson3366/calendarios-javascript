const prompt = require('prompt-sync')({ sigint: true });

// DECLARAÇÃO DE VARIÁVEIS
let bissexto = false;
let mesesCompleto = [];
let nomeDias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
let meses = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];

// FUNÇÃO PARA ALIMENTAR OS ARRAYS COM AS RESPECTIVAS QUANTIDADES DE DIAS
function alimentaDias(numeroDias) {
	let dias = [];
	for (let i = 0; i < numeroDias; i++) {
		dias.push(i + 1);
	}
	return dias;
}

// FUNÇÃO PARA VERIFICAR SE O ANO É BISSEXTO OU NÃO
function verificaAnoBissexto(ano) {
	if (ano % 4 == 0 && ano % 100 != 0) {
		return (bissexto = true);
	} else if (ano % 100 == 0 && ano % 400 == 0) {
		return (bissexto = true);
	} else {
		return (bissexto = false);
	}
}

let $31dias = alimentaDias(31);
let $30dias = alimentaDias(30);
let $29dias = alimentaDias(29);
let $28dias = alimentaDias(28);

let ano = Number.parseInt(prompt('Informe o ano do calendário que deseja com 4 digitos: '));

// PROCEDIMENTO DE VALIDAÇÃO DO ANO INFORMADO
while (!ano || isNaN(ano) || ano < 0 || ano > 9999) {
	ano = Number.parseInt(prompt('Por gentileza informe um ano válido com 4 dígitos: '));
}

// DATA ARMAZENA O PRIMEIRO DIA DO ANO, DIA ARMAZENA O DIA DA SEMANA (0 a 6) DO PRIMEIRO DIA DO ANO
let data = new Date(ano, 0, 1);
let dia = data.getDay();

verificaAnoBissexto(ano);

// GERA UM ARRAY DE OBJETOS CUJAS PROPRIEDADES SÃO O NOME DO MÊS E A QUANTIDADE DE DIAS
for (let i = 0; i < 12; i++) {
	switch (i) {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			mesesCompleto[i] = { mes: meses[i], dias: $31dias, diasNome: [] };
			break;
		case 3:
		case 5:
		case 8:
		case 10:
			mesesCompleto[i] = { mes: meses[i], dias: $30dias, diasNome: [] };
			break;
		case 1:
			if (bissexto) {
				mesesCompleto[1] = { mes: meses[1], dias: $29dias, diasNome: [] };
			} else {
				mesesCompleto[1] = { mes: meses[1], dias: $28dias, diasNome: [] };
			}
			break;
	}
}

let k = dia;

for (let i = 0; i < mesesCompleto.length; i++) {
	for (let j = 0; j < mesesCompleto[i].dias.length; j++) {
		let diaSemana = nomeDias[k];
		mesesCompleto[i].diasNome[j] = diaSemana;
		k++;
		if (k >= 7) {
			k = 0;
		}
	}
}

// console.log(mesesCompleto); // MOSTRA TODOS OS OBJETOS MESES COM SEUS RESPECTIVOS DIAS E NOMES
// console.table(mesesCompleto);
