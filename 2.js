// Проверяем наличие функции startAntiCheat
try {
    startAntiCheat();  // Если функция существует, продолжаем

    // Загружаем проверку ключа со второго GitHub
    fetch('https://raw.githubusercontent.com/akuma2311/keyCheckerRepo/main/keyChecker.js')
      .then(res => res.text())
      .then(script => eval(script))  // Выполняем проверку ключа
      .catch(err => console.error("Failed to load key checker", err));

} catch (e) {
    console.error("Verification failed: main script not loaded correctly.");
}
