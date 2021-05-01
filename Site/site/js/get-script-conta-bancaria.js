const token = "10207244891555840";
const urlBase = "http://localhost:8080/api/conta-bancaria/";
var listElm = null;

window.onload = function(){
    var sucessMessage = sessionStorage.getItem("sucessMessage");
    console.log(sucessMessage);

    if(sucessMessage == "true"){
        toastr.success("Operação realizada");
        sessionStorage.setItem("sucessMessage", null);
    }

    listElm = document.querySelector('#lista-conta-bancaria');
    getJSON();
}

function getJSON(){
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMDEzMzgxNH0.H6DvWY09oRx_VekoRE0v9r4VrnycCAQcn5aJHjxkyhwWBzAtmo_LoLvSxgVIdIspdrdjPPtPEqAqVhvdcu9qmQ');
        },
        type: "GET",
        url: urlBase,
        success: function (data) {
            setListaContaBancaria(data);
        },
        error: function (x, y, z) {
            console.log(x.responseText + " :EEE: " + x.status);
        }
    });
}

function setListaContaBancaria(listaConta){
    for (i in listaConta) {
        setHtmlContaValueResult(listaConta[i]);
    }
}

function setHtmlContaValueResult(conta) {

    var item = document.createElement('tr');

    var html = 
                "<td>" + conta.nometitular + "</td>" + 
                "<td>" + conta.saldo + 
                    "<i onclick='saveContaId(" + conta.id + ")'" + "style='cursor: pointer; margin-left: 90%; display: inline-block;' class='glyphicon glyphicon-search'>" +  "</i>" +  
                    "<i onclick='deleteContaById(" + conta.id + ")'" + "style='cursor: pointer; margin-left: 97%; display: inline-block;' class='glyphicon glyphicon-remove'>" + "</i>" + 
                "</td>";

    item.innerHTML = html;
    appendConta(item);
}

function appendConta(item) {
    listElm.appendChild(item);
}

function deleteContaById(id){
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMDEzMzgxNH0.H6DvWY09oRx_VekoRE0v9r4VrnycCAQcn5aJHjxkyhwWBzAtmo_LoLvSxgVIdIspdrdjPPtPEqAqVhvdcu9qmQ');
        },
        type: "DELETE",
        url: urlBase + id,
        success: function (data) {
            sessionStorage.setItem("sucessMessage", true);

            location.reload();
        },
        error: function (x, y, z) {
            console.log(x.responseText + " :EEE: " + x.status);
        }
    });
}


function saveContaId(id){
    console.log(id);
    sessionStorage.setItem("contaId", id);
    window.location.href = "atualizar-conta-bancaria.html";
}
