(async (password, data) => {
    const deriveKey = async (password, salt) => crypto.subtle.deriveKey({
        name: "PBKDF2",
        salt: salt,
        iterations: 300000,
        hash: "SHA-512"
    }, await crypto.subtle.importKey("raw", (new TextEncoder).encode(password), "PBKDF2", false, ["deriveKey"]), {
        name: "AES-GCM",
        length: 256
    }, false, ["decrypt"]);

    const decryptedData = await (async (data, password) => {
        const buffer = new Uint8Array(atob(data.replace(/-/g, "+").replace(/_/g, "/")).split("").map(char => char.charCodeAt(0))).buffer;
        return (new TextDecoder).decode(await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: buffer.slice(16, 28)
        }, await deriveKey(password, buffer.slice(0, 16)), buffer.slice(28)));
    })(data, password);

    navigator.clipboard.writeText(decryptedData);
})(password, data);
