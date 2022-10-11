import { qs, qsAll } from "./utils.js";
import { passwordGenerator, characterTypes } from "./passwordGenerator.js";

const passwordLengthControl = qs("#lengthControl");
const passwordSettings = qsAll(".options-control .options .option input");
const passwordElement = qs("#password");
const btnCopyPassword = qs(".copy-password");

if (passwordSettings) {
    passwordSettings.forEach(setting => {
        setting.addEventListener("click", _ => {
            showPassword();
        })
    });
}

if (passwordLengthControl) {
    passwordLengthControl.addEventListener("input", e => {
        qs(".length-control #lengthValue").innerText = e.currentTarget.value;
        showPassword();
    })
}

if (btnCopyPassword) {

    qs(".container-password").addEventListener("mouseover", () => {
        btnCopyPassword.style.opacity = "1";
    });
    qs(".container-password").addEventListener("mouseout", () => {
        btnCopyPassword.style.opacity = "0";
    });

    btnCopyPassword.addEventListener("click", (e) => {

        const btn = e.currentTarget;
        btn.querySelector("span").innerText = "Senha Copiada";

        const icon = btn.querySelector(".bi");
        icon.classList.remove("bi-clipboard-fill");
        icon.classList.add("bi-clipboard-check-fill");

        passwordGenerator.copyPassword(passwordElement.innerText);
    });
}

const getCharacters = () => {
    let chars = "";
    passwordSettings.forEach(setting => {
        if (setting.checked) {
            let type = setting.id;
            chars += characterTypes[type] || "";
        }
    });
    return chars;
}

const showPassword = () => {

    restartWindow();

    const passwordLength = passwordLengthControl.value;
    const chars = getCharacters();
    const password = passwordGenerator.generate(passwordLength, chars);

    if (!password) {
        passwordElement.innerText = "Sem opções para gerar a senha!";
        return;
    }
    passwordElement.innerText = password;
}

const restartWindow = () => {

    let copyIcon = btnCopyPassword.querySelector(".bi");
    copyIcon.classList.add("bi-clipboard-fill");
    copyIcon.classList.remove("bi-clipboard-check-fill");
    btnCopyPassword.querySelector("span").innerText = "Copiar Senha";
}

const init = () => {
    qs(".length-control #lengthValue").innerText = passwordLengthControl.value;
    showPassword();
}

init();

