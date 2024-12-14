(async (deriveKey, passwordAndData) => {
    const [data, password] = passwordAndData.split(' ');

    const decryptData = async (encrypted) => {
        const buffer = new Uint8Array(atob(encrypted.replace(/-/g, "+").replace(/_/g, "/")).split("").map(char => char.charCodeAt(0))).buffer;
        return (new TextDecoder).decode(await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: buffer.slice(16, 28)
        }, await deriveKey(password, buffer.slice(0, 16)), buffer.slice(28)));
    };

    // Загружаем зашифрованный ключ из key.json на втором GitHub
    const response = await fetch("https://raw.githubusercontent.com/Mokrocyft/test/refs/heads/main/key.json");
    if (!response.ok) return console.error(`Ошибка при загрузке ключа: ${response.statusText}`);

    const dataFromGithub = await response.json();
    const encryptedKeyFromGithub = dataFromGithub.key; // Получаем зашифрованный ключ
    console.log(encryptedKeyFromGithub);
})(deriveKey, passwordAndData);
