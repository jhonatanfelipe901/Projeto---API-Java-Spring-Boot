const urlBase = "http://localhost:8080/api/jogo/";
var jogoId = 0;


$(document).ready(function() {
    getJogoById();
    updateJogo();
});

function getJogoById(){
    jogoId = sessionStorage.getItem("jogoId");

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"))
        },
        type: "GET",
        url: "http://localhost:8080/api/jogo/" + jogoId,
        success: function (data) {
            console.log(data);
            setValuesOnForm(data);
            //setListaJogo(data);
        },
        error: function (x, y, z) {
            console.log(x.responseText + " :EEE: " + x.status);
        }
    });
}

function setValuesOnForm(response){
    document.getElementById("nomeTimeA").value = response.nometimea;
    document.getElementById("nomeTimeB").value = response.nometimeb;
    document.getElementById("golsTimeA").value = response.golstimea;
    document.getElementById("golsTimeB").value = response.golstimeb;
}

function updateJogo(){

    $("#updateForm").submit(function( event ) {

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

        console.log(request);
            
        $.ajax({
            url: urlBase + jogoId,
            type: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            data: JSON.stringify(request),
            cache : false,
            processData: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"))
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