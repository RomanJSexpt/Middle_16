let user = {
    login: "admin@mail.com",
    password: "7777"
}

function Constructor(){
    const btn = document.querySelector("button");
    btn.setAttribute("type","button")
    const passwInput = document.querySelector("#inputPassword");
    passwInput.setAttribute("type","password");
    const loginInput = document.querySelector("#inputEmail");
    const firstPage = document.querySelector(".form-signin");
    let viewAlert = document.querySelector(".alert-danger");
    viewAlert.classList.add("hide");

    let secondPage = document.getElementById("second-page");
    secondPage.classList.add("hide");
    let userLogin = document.getElementById("userlog");
    let userPassword = document.getElementById("userpass");
    const btnBack =secondPage.lastElementChild;
    const showPass = userPassword.nextElementSibling;
    

    this.setLoginPassword = (item) => {
        localStorage.setItem("login", item.login);
        localStorage.setItem("password", item.password);
    }
     getPass = () => passwInput.value;
     getLogin = () => loginInput.value;

   this.validatyValues = function(){
        if ((getPass().length === 0) || (getLogin().length === 0)) {
            showAlert("Поля формы не заполнены");
            return;
        }
        let indexPass = password(getPass());
        let indexLogin = login(getLogin());
        if (!isNaN(indexPass + indexLogin)) {
            showPages(getLogin(),getPass());
        }
    }

    function password(item) {
        if (item === localStorage.getItem("password")) {return 1;}
         if ((item.length < 4) || (item.length > 12)) {
            showAlert("Пароль должен содержать от 4 до 12 символов.");
        } else {
            showAlert("Неверный пароль.");
        }
    }
    function login(login) {
        if (login === localStorage.getItem("login")) {return 1;
        } else {
            let regular = /\S+@\S+\.\S+/;
            (regular.test(login)) ? showAlert("Неверный логин."): showAlert("Введите корректный e-mail");
        }
    }
    function changeViewPass(){
        if(userPassword.getAttribute("type") === "password"){
            userPassword.setAttribute("type","text");
            showPass.innerHTML = "Скрыть пароль"
        }else{
            userPassword.setAttribute("type","password");
            showPass.innerHTML = "Показать пароль";
        }
    }
    function backToFuture(){
        secondPage.classList.add("hide");
        firstPage.classList.remove("hide");
    }
    function showPages(login,passw) {
        firstPage.classList.add("hide");
        secondPage.classList.remove("hide");
        userLogin.value = login;
        userPassword.value = passw;
    }
    function showAlert(string) {
        viewAlert.classList.remove("hide");
        viewAlert.innerHTML = string;
        setTimeout(function () {
            viewAlert.classList.add("hide");
        }, 1400)
    }

    btn.addEventListener("click", this.validatyValues);
    btnBack.addEventListener("click", backToFuture);
    showPass.addEventListener("click",changeViewPass);
}

let item = new Constructor();

item.validatyValues;
item.setLoginPassword(user);
