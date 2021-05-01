const token = "10207244891555840";
const urlBase = "http://localhost:8080/api/jogo/";
var listElm = null;

window.onload = function(){

    var sucessMessage = sessionStorage.getItem("sucessMessage");
    console.log(sucessMessage);

    if(sucessMessage == "true"){
        toastr.success("Operação realizada");
        sessionStorage.setItem("sucessMessage", null);
    }

    
    listElm = document.querySelector('#lista-jogos');
    getJSON();
}


function setListaJogo(listaJogo){
    for (i in listaJogo) {
        setHtmlJogoValueResult(listaJogo[i]);
    }
}

function setHtmlJogoValueResult(jogo) {

    var item = document.createElement('tr');

    var html = 
                "<td>" + jogo.nometimea + "</td>" +  
                "<td>" + jogo.nometimeb + 
                    "<i onclick='saveJogoId(" + jogo.id + ")'" + "style='cursor: pointer; margin-left: 90%; display: inline-block;' class='glyphicon glyphicon-search'>" +  "</i>" +  
                    "<i onclick='deleteJogoById(" + jogo.id + ")'" + "style='cursor: pointer; margin-left: 97%; display: inline-block;' class='glyphicon glyphicon-remove'>" + "</i>" + 
                "</td>";

    item.innerHTML = html;
    appendJogo(item);
}

function appendJogo(item) {
    listElm.appendChild(item);
}

function getJSON(){
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMDEzMzgxNH0.H6DvWY09oRx_VekoRE0v9r4VrnycCAQcn5aJHjxkyhwWBzAtmo_LoLvSxgVIdIspdrdjPPtPEqAqVhvdcu9qmQ');
        },
        type: "GET",
        url: urlBase,
        success: function (data) {
            setListaJogo(data);
        },
        error: function (x, y, z) {
            console.log(x.responseText + " :EEE: " + x.status);
        }
    });
}

function deleteJogoById(id){
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMDEzMzgxNH0.H6DvWY09oRx_VekoRE0v9r4VrnycCAQcn5aJHjxkyhwWBzAtmo_LoLvSxgVIdIspdrdjPPtPEqAqVhvdcu9qmQ');
        },
        type: "DELETE",
        url: urlBase + id,
        success: function (data) {
            sessionStorage.setItem("sucessMessage", true);
            location.reload()
        },
        error: function (x, y, z) {
            console.log(x.responseText + " :EEE: " + x.status);
        }
    });
}


function saveJogoId(id){
    console.log(id);
    sessionStorage.setItem("jogoId", id);
    window.location.href = "atualizar-jogo.html";
}
