window.onload = function(){

    var loginMessage = sessionStorage.getItem("loginSuccess");

    if(loginMessage == "true"){
        toastr.success("Login efetuado.");
        sessionStorage.setItem("loginSuccess", null);
    }
}