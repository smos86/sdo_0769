// ==UserScript==
// @name         Google Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Smogunov Sergey
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @grant        none
// ==/UserScript==

// ключевые слова:
let keywords = ["DevTools — очень полезная штука для разработчика",
       "Редакции — это резервные копии",
    "Google Fonts очень популярны",];

// Определение кнопки "Найти" и написание рандомного запроса по ключевым словам:
let googleInput = document.getElementsByName("q")[0];
let keyword = keywords[getRandom(0, keywords.length)];

// Здаание переменной кнопки "Найти":
let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
let i = 0;

if (btnK !== undefined) {
    // написание запроса по одной букве с времени 200 мс:
   let timerId = setInterval(() => {
        googleInput.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
            btnK.click();
        }
    }, 200);

// Указание сайта в котором необходимо задать переход по ссылкам:
} else if(location.hostname == "napli.ru") {
    console.log("Мы на Napli!")

// Функция перехода по ссылкам внутри указанного сайта и возврата на главную страницу по определённому интервалу:
    setInterval(()=>{
    let index = getRandom(0,links.length);
    if(getRandom(0,101)>=70) {
    location.href = "https://www.google.com";
    }
    else if (links[index].href.indexOf("napli.ru") !== -1)
    links[index].click();
    }, getRandom(1000,5000));

    // Если на первой страницы не найдена ключевая фраза, идти дальше:
} else {
    let nextGooglePage = true;
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.includes("napli.ru")) {
            let link = links[i];
            let nextGooglePage = false;
            console.log("Найдена строка " + links[i]);
            setTimeout(() => {
                link.click();
            }, getRandom(1000, 4000));
    break;
}
}
    // Ограничение поиска 5-й страницей:
    if (document.querySelector(".YyVfkd").innerText == "5") {
        let nextGooglePage = false;
        location.href = "https://www.google.com";
}
    // Переход на следующую страницу поиска с заданным интервалом времени:
    if (nextGooglePage) {
        setTimeout(() => {
            pnnext.click();
        }, getRandom(2000, 4500));
    }
}


// Функция рандома ключевых слов запроса:
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

