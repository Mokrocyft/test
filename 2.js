(async (deriveKey, passwordAndData) => {
    try {
        const [data, password] = passwordAndData.split(' ');

        const decryptedData = await (async (data, password) => {
            const buffer = new Uint8Array(atob(data.replace(/-/g, "+").replace(/_/g, "/")).split("").map(char => char.charCodeAt(0))).buffer;
            return (new TextDecoder).decode(await crypto.subtle.decrypt({
                name: "AES-GCM",
                iv: buffer.slice(16, 28)
            }, await deriveKey(password, buffer.slice(0, 16)), buffer.slice(28)));
        })(data, password);

        // Проверка расшифрованных данных с ключом на GitHub
        const gitKey = await fetch("https://raw.githubusercontent.com/Mokrocyft/test/refs/heads/main/2.js")
            .then(res => res.text());

        if (decryptedData.trim() === gitKey.trim()) {
            console.log("Ключи совпадают");
        } else {
            console.log("Ключи не совпадают");
        }
    } catch (error) {
        console.error("Ошибка расшифровки или проверки ключей:", error);
    }
})(deriveKey, passwordAndData);
