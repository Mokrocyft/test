(async (deriveKey, passwordAndData) => {
    const [data, password] = passwordAndData.split(' '); 

    const decryptData = async (encrypted) => {
        const buffer = new Uint8Array(atob(encrypted.replace(/-/g, "+").replace(/_/g, "/")).split("").map(char => char.charCodeAt(0))).buffer;
        return (new TextDecoder).decode(await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: buffer.slice(16, 28)
        }, await deriveKey(password, buffer.slice(0, 16)), buffer.slice(28)));
    };

    // Загружаем ключ из JSON на GitHub
    const response = await fetch("https://raw.githubusercontent.com/Mokrocyft/test/refs/heads/main/key.json");
    if (!response.ok) return console.error(`Ошибка: ${response.statusText}`);

    const dataFromGithub = await response.json();
    const githubKey = dataFromGithub.key; // Получаем ключ из JSON

    // Расшифровываем введенный ключ
    const decryptedData = await decryptData(data);
    console.log("Decrypted data:", decryptedData);

    // Сравниваем расшифрованный ключ с ключом из GitHub
    console.log(`Ключ с GitHub: "${githubKey}"`);
    console.log(decryptedData === githubKey ? "Ключи совпадают!" : "Ключи не совпадают.");
})(deriveKey, passwordAndData);
