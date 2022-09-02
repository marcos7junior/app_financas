
let botaoAdicionar = document.querySelector("#botao-adicionar");
let entradaDescricao = document.querySelector("#descricao");
let entradaValor = document.querySelector("#valor");
let resultado = document.querySelector("#resultado");
let resultadoTd = Number(resultado.textContent);
let data = new Date();

botaoAdicionar.addEventListener("click", handleButtonEvent);

function handleButtonEvent(){
	geraNovaLinhaTabela();
	calculaResultado();
	limparEntradas();
}

function geraNovaLinhaTabela() {
	let tabela = document.querySelector("#tabela");
	tabela.appendChild(geraTr(data.toLocaleDateString()));	
}

function tipoDeEntrada() {
	let radioButtons = document.querySelectorAll("input[name='selecao-tipo']");

	function findSelected() {
		let selected = document.querySelector("input[name='selecao-tipo']:checked");
		let selecao = selected.value;
		return selecao;
	}

	radioButtons.forEach(radio => {
		radio.addEventListener("click", findSelected);
	});
	
	saidaDoTipo = findSelected();
	if(saidaDoTipo === "receita") return true;
	return false;
}

function geraTr(data) {
	if(!validaDados()){
		alert("Dados inválidos!");
		return;
	}

	let tr = document.createElement("tr");
	tr.appendChild(geraTd(entradaDescricao.value));
	tr.appendChild(geraTd(entradaValor.value));
	tr.appendChild(geraTd(data));
	return tr;
}

function geraTd(conteudo) {
	let td = document.createElement("td");
	let receita = tipoDeEntrada();
	
	if(!receita){
		td.classList.add("valor-despesa");
	}
	td.classList.add("valor-receita");

	
	td.textContent = conteudo;
	return td;
}

function validaDados() {
	let descricao = entradaDescricao.value;
	let valor = entradaValor.value;
	
	if(valor.length === 0 || descricao.length === 0) {
		return false;
	} else {
		return true;
	}
}

function calculaResultado() {
	let receita = tipoDeEntrada();
	
	if(receita) {
		resultadoTd += Number(entradaValor.value);
	} else {
		resultadoTd -= Number(entradaValor.value);
	}
	resultado.textContent = resultadoTd;
}

function limparEntradas() {
	entradaDescricao.value = '';
	entradaValor.value = '';
}