(async (deriveKey, passwordAndData) => {
    const [data, password] = passwordAndData.split(' ');

    const decryptData = async (encrypted) => {
        const buffer = new Uint8Array(atob(encrypted.replace(/-/g, "+").replace(/_/g, "/")).split("").map(char => char.charCodeAt(0))).buffer;
        return (new TextDecoder).decode(await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: buffer.slice(16, 28)
        }, await deriveKey(password, buffer.slice(0, 16)), buffer.slice(28)));
    };

    // Загружаем ключ из JSON на первом GitHub
    const response1 = await fetch("https://raw.githubusercontent.com/Mokrocyft/test/refs/heads/main/key.json");
    if (!response1.ok) return console.error(`Ошибка при загрузке ключа: ${response1.statusText}`);

    const dataFromGithub = await response1.json();
    const githubKey = dataFromGithub.key; // Получаем ключ из JSON

    // Загружаем зашифрованный ключ со второго GitHub
    const response2 = await fetch("https://raw.githubusercontent.com/Mokrocyft/test/refs/heads/main/2.js"); // Замените на правильный URL
    if (!response2.ok) return console.error(`Ошибка при загрузке зашифрованного ключа: ${response2.statusText}`);

    const encryptedKeyFromGithub = await response2.text(); // Получаем зашифрованный ключ

    // Расшифровываем введенный ключ
    const decryptedData = await decryptData(data);
    console.log("Decrypted data:", decryptedData);

    // Расшифровываем ключ со второго GitHub
    const decryptedGithubKey = await decryptData(encryptedKeyFromGithub);
    console.log("Decrypted key from GitHub:", decryptedGithubKey);

    // Сравниваем расшифрованные значения
    console.log(decryptedData === decryptedGithubKey ? "Ключи совпадают!" : "Ключи не совпадают.");
})(deriveKey, passwordAndData);
