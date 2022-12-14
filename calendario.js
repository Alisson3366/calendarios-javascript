const prompt = require('prompt-sync')({ sigint: true });
const { table, getBorderCharacters } = require('table');

// DECLARAÇÃO DE VARIÁVEIS
let bissexto = false;
let mesesCompletos = [];
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

class Meses {
	constructor(mesesIndice, mesesNome) {
		this.mesesIndice = mesesIndice;
		this.mesesNome = mesesNome;
		this.dias = Dias;
		this.semanas = [];
		this.calendario = [];
	}
}

class Dias {
	constructor(diasNumero, diasIndice, diasNome) {
		this.diasNumero = diasNumero;
		this.diasIndice = diasIndice;
		this.diasNome = diasNome;
	}
}

// class Semanas {
// 	constructor(qdtSemanas) {
// 		this.qdtSemanas = qdtSemanas; // quantidade de semanas
// 	}
// }

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
console.log(`É um ano bissexto: ${bissexto}`);

// GERA UM ARRAY DE OBJETOS CUJAS PROPRIEDADES SÃO O NOME DO MÊS E A QUANTIDADE DE DIAS
for (let i = 0; i < 12; i += 1) {
	switch (i) {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			mesesCompletos[i] = new Meses(i, meses[i]);
			mesesCompletos[i].dias = new Dias($31dias, [], []);
			break;
		case 3:
		case 5:
		case 8:
		case 10:
			mesesCompletos[i] = new Meses(i, meses[i]);
			mesesCompletos[i].dias = new Dias($30dias, [], []);
			break;
		case 1:
			if (bissexto) {
				mesesCompletos[1] = new Meses(1, meses[1]);
				mesesCompletos[1].dias = new Dias($29dias, [], []);
			} else {
				mesesCompletos[1] = new Meses(1, meses[1]);
				mesesCompletos[1].dias = new Dias($28dias, [], []);
			}
			break;
	}
}

let k = dia;

for (let i = 0; i < mesesCompletos.length; i += 1) {
	for (let j = 0; j < mesesCompletos[i].dias.diasNumero.length; j++) {
		mesesCompletos[i].dias.diasIndice[j] = k;
		mesesCompletos[i].dias.diasNome[j] = nomeDias[k];
		k++;
		if (k >= 7) {
			k = 0;
		}
	}
}

for (let i = 0; i < mesesCompletos.length; i += 1) {
	// PREENCHE O INÍCIO COM ITENS VAZIOS
	if (mesesCompletos[i].dias.diasIndice[0] != 0) {
		for (let n = 0, max = mesesCompletos[i].dias.diasIndice[0]; n < max; n += 1) {
			mesesCompletos[i].calendario.unshift('');
		}
	}

	// FAZ A UNIÃO DOS DIAS COM OS ITENS VAZIOS DO INÍCIO
	for (let j = 0; j < mesesCompletos[i].dias.diasNumero.length; j++) {
		mesesCompletos[i].calendario.push(mesesCompletos[i].dias.diasNumero[j]);
	}

	// PREENCHE O FIM COM ITENS VAZIOS
	if (mesesCompletos[i].dias.diasIndice[mesesCompletos[i].dias.diasIndice.length - 1] != 6) {
		for (
			let n = mesesCompletos[i].dias.diasIndice[mesesCompletos[i].dias.diasIndice.length - 1];
			n < 6;
			n += 1
		) {
			mesesCompletos[i].calendario.push('');
		}
	}
}

for (let i = 0; i < mesesCompletos.length; i += 1) {
	let max = 0;

	if (mesesCompletos[i].calendario.length / 7 == 6) {
		max = 6;
	} else if (mesesCompletos[i].calendario.length / 7 == 5) {
		max = 5;
	} else {
		max = 4;
	}

	mesesCompletos[i].semanas.push(nomeDias);

	for (let j = 0; j < max; j += 1) {
		mesesCompletos[i].semanas.push(mesesCompletos[i].calendario.slice(j * 7, (j + 1) * 7));
	}

	const data = mesesCompletos[i].semanas;
	const config = {
		border: getBorderCharacters(`honeywell`),
		columnDefault: {
			width: 12,
		},
		columns: {
			0: { alignment: 'center', verticalAlignment: 'middle' },
			1: { alignment: 'center', verticalAlignment: 'middle' },
			2: { alignment: 'center', verticalAlignment: 'middle' },
			3: { alignment: 'center', verticalAlignment: 'middle' },
			4: { alignment: 'center', verticalAlignment: 'middle' },
			5: { alignment: 'center', verticalAlignment: 'middle' },
			6: { alignment: 'center', verticalAlignment: 'middle' },
		},
		header: {
			alignment: 'center',
			content: `${mesesCompletos[i].mesesNome}`,
		},
	};

	console.log(table(data, config));
	// console.log(mesesCompletos[i]); // MOSTRA TODOS OS OBJETOS MESES COM SEUS RESPECTIVOS DIAS E NOMES
}
