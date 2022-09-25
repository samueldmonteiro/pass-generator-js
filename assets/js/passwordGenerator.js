import { qs, qsAll, log } from "./utils.js";

const characterTypes = {

    lowercase: "abcefghijklmnoprstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    specialCaracters: "!@#$%*_><.;"
}

const lengthControl = qs("#lengthControl");
const passwordOptions = qsAll(".options-control .options .option input");
const passwordElement = qs("#password");
const copyPasswordElement = qs(".copy-password");

if (passwordOptions) {
    passwordOptions.forEach(option => {
        option.addEventListener("click", showPassword)
    });
}

if (lengthControl) {
    lengthControl.addEventListener("input", (e) => {

        qs(".length-control #lengthValue").innerText = e.currentTarget.value;
        showPassword();
    })
}

if (qs(".container-password")) {

    let containerPassword = qs(".container-password");

    containerPassword.addEventListener("mouseover", () => {
        copyPasswordElement.style.opacity = "1";
    });
    containerPassword.addEventListener("mouseout", () => {
        copyPasswordElement.style.opacity = "0";
    });
}

if(copyPasswordElement){
    copyPasswordElement.addEventListener("click", (e)=>{

        let element = e.currentTarget;
        element.querySelector("span").innerText = "Senha Copiada";

        let icon = element.querySelector(".bi");
        icon.classList.remove("bi-clipboard-fill");
        icon.classList.add("bi-clipboard-check-fill");

        copyPassword();
    });
}

function copyPassword(){
    let password = passwordElement.innerText;
    navigator.clipboard.writeText(password);
}

function showPassword() {

    restartWindow();

    let passwordLength = lengthControl.value;
    let chars = getCharacters();
    let password = generatePassword(chars, passwordLength);

    if (!password) {
        passwordElement.innerText = "Sem opções para gerar a senha!";
        return;
    }
    passwordElement.innerText = password;
}

function generatePassword(chars, length) {

    let password = "";

    for (let i = 0; i < length; i++) {
        let rand = chars.charAt(Math.floor(Math.random() * chars.length));
        password += rand;
    }
    return password;
}

function getCharacters() {

    let chars = "";

    passwordOptions.forEach(option => {
        if (option.checked) {
            let type = option.id;
            chars += characterTypes[type];
        }
    });
    return chars;
}

function restartWindow(){

    let copyIcon = copyPasswordElement.querySelector(".bi");
    copyIcon.classList.add("bi-clipboard-fill");
    copyIcon.classList.remove("bi-clipboard-check-fill");
    copyPasswordElement.querySelector("span").innerText = "Copiar Senha";
}

function init() {
    qs(".length-control #lengthValue").innerText = lengthControl.value;
    showPassword();
}

init();