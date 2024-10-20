(async (deriveKey, passwordAndData) => {
    const [data, password] = passwordAndData.split(' '); 

    const decryptData = async (encrypted) => {
        const buffer = new Uint8Array(atob(encrypted.replace(/-/g, "+").replace(/_/g, "/")).split("").map(char => char.charCodeAt(0))).buffer;
        return (new TextDecoder).decode(await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: buffer.slice(16, 28)
        }, await deriveKey(password, buffer.slice(0, 16)), buffer.slice(28)));
    };

    // Расшифровываем пользовательский ключ
    const decryptedUserKey = await decryptData(data);
    console.log("Decrypted user key:", decryptedUserKey);

    // Загружаем ключ с GitHub
    const response = await fetch("https://raw.githubusercontent.com/Mokrocyft/test/refs/heads/main/2.js");
    const encryptedKeyFromGitHub = await response.text().trim();

    // Расшифровываем ключ с GitHub
    const decryptedGitHubKey = await decryptData(encryptedKeyFromGitHub);
    console.log("Decrypted GitHub key:", decryptedGitHubKey);

    // Проверка на совпадение ключей
    console.log("Comparing user key and GitHub key...");
    if (decryptedUserKey === decryptedGitHubKey) {
        console.log("Keys match!");
    } else {
        console.log("Keys do not match.");
    }
})(deriveKey, passwordAndData);
