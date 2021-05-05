const urlBase = "http://localhost:8080/api/conta-bancaria/";
var contaId = 0;


$(document).ready(function() {
    getContaBancariaById();
    updateJogo();
});

function getContaBancariaById(){
    contaId = sessionStorage.getItem("contaId");

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"))
        },
        type: "GET",
        url: urlBase + contaId,
        success: function (data) {
            console.log(data);
            setValuesOnForm(data);
        },
        error: function (x, y, z) {
            console.log(x.responseText + " :EEE: " + x.status);
        }
    });
}

function setValuesOnForm(response){
    document.getElementById("nomeTitular").value = response.nometitular;
    document.getElementById("saldo").value = response.saldo;
    document.getElementById("numeroAgencia").value = response.numeroagencia;
}

function updateJogo(){

    $("#updateForm").submit(function( event ) {

        event.preventDefault();
        
        var nomeTitular = document.getElementById("nomeTitular").value;
        var saldo = document.getElementById("saldo").value;
        var numeroAgencia = document.getElementById("numeroAgencia").value;

        var request = {
            "nometitular": nomeTitular,
            "saldo": parseInt(saldo),
            "numeroagencia": parseInt(numeroAgencia)
        }

        console.log(request);
            
        $.ajax({
            url: urlBase + contaId,
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
                window.location.href = "lista-conta-bancaria.html";
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