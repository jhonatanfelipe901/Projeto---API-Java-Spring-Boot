const urlBase = "http://localhost:8080/api/jogo/";
var listElm = null;


window.onload = function(){
    listElm = document.querySelector('#lista-jogos');
   // getJSON();

   $("#registerForm").submit(function( event ) {

        event.preventDefault();
        
        var nomeTimeA = document.getElementById("nomeTimeA").value;
        var nomeTimeB = document.getElementById("nomeTimeB").value;
        var golsTimeA = document.getElementById("golsTimeA").value;
        var golsTimeB = document.getElementById("golsTimeB").value;

        var request = {
            "nometimea": nomeTimeA,
            "nometimeb": nomeTimeB,
            "golstimea": parseInt(golsTimeA),
            "golstimeb": parseInt(golsTimeB)
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
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMDEzMzgxNH0.H6DvWY09oRx_VekoRE0v9r4VrnycCAQcn5aJHjxkyhwWBzAtmo_LoLvSxgVIdIspdrdjPPtPEqAqVhvdcu9qmQ');
            },
            success: (data) => {
                console.log(data);
                sessionStorage.setItem("sucessMessage", true);
                window.location.href = "lista-jogo.html";
                return;
                
            },
            error: function (request, status, error) {
                toastr["error"](request.responseText);
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