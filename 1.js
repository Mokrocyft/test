(async (password, data) => {
    const decryptedData = await (async (data, password) => {
        const buffer = new Uint8Array(atob(data.replace(/-/g, "+").replace(/_/g, "/")).split("").map(char => char.charCodeAt(0))).buffer;
        return (new TextDecoder).decode(await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: buffer.slice(16, 28)
        }, await deriveKey(password, buffer.slice(0, 16)), buffer.slice(28)));
    })(data, password);

    navigator.clipboard.writeText(decryptedData);
})(password, data);
