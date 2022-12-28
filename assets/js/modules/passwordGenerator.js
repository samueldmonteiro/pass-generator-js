export const characterTypes = {

    lowercase: "abcefghijklmnoprstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    specialCaracters: "_!@#*&"
}

export const passwordGenerator = {

    generate(length, chars = null) {

        if (chars === null) {
            chars = "";
            let keys = Object.keys(characterTypes);
            keys.forEach((key, index) => {

                let type = keys[Math.ceil(Math.random() * index)];
                chars += characterTypes[type];
            });
        }

        let password = "";
        for (let i = 0; i < length; i++) {
            let rand = chars.charAt(Math.floor(Math.random() * chars.length));
            password += rand;
        }
        return password;
    },

    copyPassword(password) {
        navigator.clipboard.writeText(password);
    },
};
