// Основной скрипт
function startAntiCheat() {}  // Пустая функция, которая будет проверяться

// Загружаем античит с третьего GitHub
fetch('https://raw.githubusercontent.com/akuma2311/antiCheatRepo/main/antiCheat.js')
  .then(res => res.text())
  .then(script => eval(script))  // Выполняем загруженный код
  .catch(err => console.error("Failed to load anti-cheat", err));
