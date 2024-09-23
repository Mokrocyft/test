(async () => {
  try {
    const e = async (e, t) => crypto.subtle.deriveKey({
      name: "PBKDF2",
      salt: t,
      iterations: 3e5,
      hash: "SHA-512"
    }, await crypto.subtle.importKey("raw", (new TextEncoder).encode(e), "PBKDF2", !1, ["deriveKey"]), {
      name: "AES-GCM",
      length: 256
    }, !1, ["encrypt", "decrypt"]);
    
    const [t, a, r] = ['"e" or "d":', "password:", "data:"].map(prompt);
    
    const n = await ("e" === t
      ? async (t, a) => {
          const [r, n] = [crypto.getRandomValues(new Uint8Array(16)), crypto.getRandomValues(new Uint8Array(12))];
          return btoa(String.fromCharCode(...new Uint8Array([...r, ...n, ...new Uint8Array(await crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: n
          }, await e(a, r), (new TextEncoder).encode(t)))])))
            .replace(/[+/=]/g, e => ({ "+": "-", "/": "_", "=": "" }[e]));
        }
      : async (t, a) => {
          const r = new Uint8Array(atob(t.replace(/-/g, "+").replace(/_/g, "/")).split("").map(e => e.charCodeAt(0))).buffer;
          return (new TextDecoder).decode(await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: r.slice(16, 28)
          }, await e(a, r.slice(0, 16)), r.slice(28)));
        })(r, a);
    
    navigator.clipboard.writeText(n);
  } catch (error) {
    console.error("Error:", error);
  }
})();
