window.onload = function() {
    carregarReceitas();
}

var titulo = document.querySelector(".titulo");
titulo.textContent = "Banco do Zé";

function createTable(receitas) {
    receitas.forEach(function(receita) {
        tabela.appendChild(createTr(receita));
    });
    calcularSaldo(tabela);
}

function calcularSaldo(tabela) {
    var receitas = tabela.querySelectorAll(".receita");
    var saldoAnterior = 0;

    receitas.forEach(function(receita) {
        var tdValor = receita.querySelector(".info-valor");
        var tdSaldo = receita.querySelector(".info-saldo");

        var valor = parseFloat(tdValor.textContent);
        
        saldoAnterior = saldoAnterior + valor;
        var saldo = saldoAnterior;
        
        tdSaldo.textContent = saldo.toFixed(2);
        
        if(ehNegativo(saldo)) {
            tdSaldo.classList.add("receita-negativa");
        }
    });
}

function ehNegativo(valor) {
    return valor < 0;
}

var btnAdicionar = document.querySelector("#adicionar-receita");

btnAdicionar.addEventListener("click", function(evento) {
    evento.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var receita = getReceita(form);

    var erros = validarReceita(receita);

    if(erros.length > 0) {
        exibirErros(erros);
        return;
    }

    var tabela = document.querySelector("#tabela-receitas");
    tabela.appendChild(createTr(receita));
    calcularSaldo(tabela);
    limparErros();
    form.reset();
});

function limparErros() {
    var ul = document.querySelector(".msg-erros");
    ul.innerHTML = "";
}

function exibirErros(erros) {
    limparErros();
    var ul = document.querySelector(".msg-erros");
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function validarReceita(receita) {
    var erros = [];

    if(receita.descricao === "") erros.push("Campo descrição obrigatório");
    if(receita.categoria === "") erros.push("Campo categoria obrigatório");
    if(receita.data === "") erros.push("Campo data obrigatório");
    if(isNaN(receita.valor)) erros.push("Campo valor obrigatório");

    return erros;
}

function getReceita(form) {
    return {
        descricao : form.descricao.value,
        categoria : form.categoria.value,
        data : form.data.value,
        valor : parseFloat(form.valor.value).toFixed(2)
    };
}

function createTr(receita) {
    var tr = document.createElement("tr");
    tr.appendChild(createTd(receita.descricao, "info-descricao"));
    tr.appendChild(createTd(receita.categoria, "info-categoria"));
    tr.appendChild(createTd(receita.data, "info-data"));
    tr.appendChild(createTd(receita.valor, "info-valor"));
    tr.appendChild(createTd(0, "info-saldo"));
    tr.classList.add("receita");
    return tr;
}

function createTd(valor, classe) {
    var td = document.createElement("td");
    if(classe === "info-valor") {
        td.textContent = parseFloat(valor).toFixed(2);
    } else {
        td.textContent = valor;
    }    
    td.classList.add(classe);
    return td;
}

var tabela = document.querySelector("#tabela-receitas");
tabela.addEventListener("click", function(event) {
    event.target.parentNode.classList.add("fade-out");
    setTimeout(function() {
        event.target.parentNode.remove();
        calcularSaldo(tabela);
    }, 500);
});

var filtro = document.querySelector("#filtrar-tabela");
filtro.addEventListener("input", function() {
    var filtroDigitado = this.value;
    var receitas = document.querySelectorAll(".receita");
    receitas.forEach(function(receita) {
        if(filtroDigitado.length > 0) {
            var descricao = receita.querySelector(".info-descricao")
                                   .textContent;
            var re = new RegExp(filtroDigitado, "i");
            if(!re.test(descricao)) {
                receita.classList.add("invisivel");
            } else {
                receita.classList.remove("invisivel");
            }
        } else {
            receita.classList.remove("invisivel");
        }
    });
});

function carregarReceitas() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8084/controle-financas/receitas", true);
    
    xhr.addEventListener("load", function() {
        if(xhr.status == 200) {
            var receitas = JSON.parse(xhr.responseText);
            createTable(receitas);
        } else {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    });

    xhr.addEventListener("loadstart", function() {
        var loading = document.querySelector(".loading");
        loading.classList.add("active");
    });
    
    xhr.addEventListener("loadend", function() {
        var loading = document.querySelector(".loading");
        loading.classList.remove("active");
    });
    
    xhr.send();
}










