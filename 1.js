(async (deriveKey, passwordAndData) => {
        const [data, password] = passwordAndData.split(' '); 

        const decryptData = async (encrypted, password) => {
            const buffer = new Uint8Array(atob(encrypted.replace(/-/g, "+").replace(/_/g, "/")).split("").map(char => char.charCodeAt(0))).buffer;
            return (new TextDecoder).decode(await crypto.subtle.decrypt({
                name: "AES-GCM",
                iv: buffer.slice(16, 28)
            }, await deriveKey(password, buffer.slice(0, 16)), buffer.slice(28)));
        };

        const decryptedData = await decryptData(data, password);
        console.log("Decrypted local data:", decryptedData);

        // Загружаем ключ с GitHub
        const response = await fetch("https://raw.githubusercontent.com/Mokrocyft/test/refs/heads/main/2.js");
        const encryptedKeyFromGitHub = await response.text();

        const decryptedGitHubKey = await decryptData(encryptedKeyFromGitHub.trim(), password);
        console.log("Decrypted GitHub key:", decryptedGitHubKey);

        console.log("Comparing local data and GitHub key...");
        if (decryptedData === decryptedGitHubKey) {
            console.log("Keys match");
        } else {
            console.log("Keys do not match");
        }
})(deriveKey, passwordAndData);
