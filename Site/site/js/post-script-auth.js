const urlBase = "http://localhost:8080/login";

window.onload = function(){


   $("#loginForm").submit(function( event ) {

        event.preventDefault();
        
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        var request = {
            "username": username,
            "password": password
        }
               
        $.ajax({
            url: urlBase,
            type: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            data: JSON.stringify(request),
            cache : false,
            processData: false,
            success: (data) => {
                console.log(data);
                sessionStorage.setItem("token", data);
                sessionStorage.setItem("loginSuccess", true);
                window.location.href = "main.html";
                return;        
            },
            error: function (request, status, error) {
                toastr["error"]("Usuário inválido.");
            },
            complete: (data) => {
               // CloseWaitMessage();
            }
        });       
    });
}

function setListaJogo(listaJogo){

    for (i in listaJogo) {
        setHtmlJogoValueResult(listaJogo[i]);
    }
}

function setHtmlJogoValueResult(jogo) {

    console.log(jogo);

    var item = document.createElement('tr');

    //item.classList.add("div-apuration-item");

    var html = 
                "<td>" + jogo.nometimea + "</td>" + 
                "<td>" + jogo.nometimeb + "</td>" + 
                "<td>" + jogo.golstimea + "</td>" +  
                "<td>" + jogo.golstimeb + "</td>";

    item.innerHTML = html;
    appendJogo(item);
    cont++;
}

function appendJogo(item) {
    console.log(item);
    listElm.appendChild(item);
}

function getJSON(){
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMDEzMzgxNH0.H6DvWY09oRx_VekoRE0v9r4VrnycCAQcn5aJHjxkyhwWBzAtmo_LoLvSxgVIdIspdrdjPPtPEqAqVhvdcu9qmQ');
        },
        type: "GET",
        url: "http://localhost:8080/api/jogo/",
        success: function (data) {
            setListaJogo(data);
        },
        error: function (x, y, z) {
            console.log(x.responseText + " :EEE: " + x.status);
        }
    });
}