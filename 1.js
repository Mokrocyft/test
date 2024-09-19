const expectedUrl = 'https://raw.githubusercontent.com/Mokrocyft/test/refs/heads/main/finish.js';

// Проверка источника
function checkScriptSource() {
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
        if (script.src === expectedUrl) return;
    }
    console.error("Script not loaded from GitHub");
    throw new Error("Script not loaded from GitHub");
}

// Выполнение проверки и загрузка скрипта
checkScriptSource();
