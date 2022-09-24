import { qs, qsAll, log } from "./utils.js";

const characterTypes = {

    lowercase: "abcefghijklmnoprstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    specialCaracters: "!@#$%*_><.;"
}

const lengthControl = qs("#lengthControl");
const passwordOptions = qsAll(".options-control .options .option input");

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

function showPassword() {

    let passwordLength = lengthControl.value;
    let chars = getCharacters();
    let password = generatePassword(chars, passwordLength);

    if(!password){
        qs("#password").innerText = "Sem opções para gerar a senha!";
        return;
    }
    qs("#password").innerText = password;
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

function init() {
    qs(".length-control #lengthValue").innerText = lengthControl.value;
    showPassword();
}

init();