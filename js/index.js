const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com um email válido.");
        return;
    }

    if(password.length < 8) {
        alert("Sua senha deve ter no mínimo 8 dígitos.");
        return
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso.");
});

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data))
}

// LOGAR A CONTA
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("emailinput").value;
    const password = document.getElementById("passwordinput").value;
    const session = document.getElementById("sessioncheck").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Opps! verifique o usuário ou a senha.");
        return
    }

    if(account) {
        if(account.password !== password) {
            alert("Opps! verifique o usuário ou a senha.");
            return
        }

        saveSession(email, session);

        window.location.href = "home.html";
    }
});

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account)
    }

    return "";
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html"
    }
}