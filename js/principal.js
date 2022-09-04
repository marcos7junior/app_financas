
let botaoAdicionar = document.querySelector("#botao-adicionar");
let entradaDescricao = document.querySelector("#descricao");
let entradaValor = document.querySelector("#valor");
let data = new Date();

botaoAdicionar.addEventListener("click", (handleAddButtonEvent));

function handleAddButtonEvent() {
	if(validaDados()){
		limparEntradas();
	}
}

function formataEntradaValor() {
	return Number(entradaValor.value.replace(",", "."));
}

function validaDados() {
	let descricao = entradaDescricao.value;
	let valor = entradaValor.value;

	if (!valor.length || !descricao.length) {
		alert("Dados inválidos!");
		limparEntradas();
		return false;
	} else {
		return true;
	}
}

function limparEntradas() {
	entradaDescricao.value = '';
	entradaValor.value = '';
}
