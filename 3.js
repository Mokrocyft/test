// Пример простой проверки ключа
const validKeyHash = '123456';  // Хэш ключа (замени своим)

function checkKey(key) {
    return hashKey(key) === validKeyHash;  // Простая проверка по хэшу
}

function hashKey(key) {
    return key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

// Запрос ключа
const userKey = prompt("Enter your key");

if (checkKey(userKey)) {
    // Если ключ валиден, загружаем основную часть кода
    fetch('https://raw.githubusercontent.com/akuma2311/mainCodeRepo/main/mainCode.js')
      .then(res => res.text())
      .then(script => eval(script))  // Выполняем основную часть кода
      .catch(err => console.error("Failed to load main code", err));
} else {
    console.error("Invalid key.");
}
