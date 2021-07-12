// ==UserScript==
// @name         Yandex Bot v.2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Smogunov Sergey
// @match        https://yandex.ru/*
// @match        https://www.rolf.ru/*
// @grant        none
// ==/UserScript==

// ключевые слова:
let keywords = ["Автомобили в наличии", "Обзоры автомобилей", "Новые автомобили в Москве"];

// Определение кнопки "Найти" и написание рандомного запроса по ключевым словам:
let yadexInput = document.getElementsByName("text")[0];
let keyword = keywords[getRandom(0, keywords.length)];

// Задание переменной кнопки "Найти":
let button = document.getElementsByClassName("button_theme_search")[0];
let links = document.links;
let i = 0;

if (button !== undefined) {
    // написание запроса по одной букве с времени 200 мс:
   let timerId = setInterval(() => {
        yadexInput.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
            button.click();
        }
    }, 200);

// Указание сайта в котором необходимо задать переход по ссылкам:
} else if(location.hostname == "www.rolf.ru") {
    console.log("Мы на rolf.ru!")

// Функция перехода по ссылкам внутри указанного сайта и возврата на главную страницу по определённому интервалу:
    setInterval(()=>{
    let index = getRandom(0,links.length);
    if(getRandom(0,101)>=70) {
    location.href = "https://yandex.ru";
    }
    else if (links[index].href.indexOf("rolf.ru") !== -1)
    links[index].click();
    }, getRandom(1000,5000));

    // Если на первой страницы не найдена ключевая фраза, идти дальше:
} else {
    let nextYandexPage = true;
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.includes("rolf.ru")) {
            let link = links[i];
            let nextYandexPage = false;
            console.log("Найдена строка " + links[i]);
            setTimeout(() => {
                link.click();
            }, getRandom(1000, 4000));
    break;
}
}
    // Ограничение поиска 5-й страницей:
    if (document.querySelector('.pager__item_current_yes').innerHTML == "5") {
       let nextYandexPage = false;
        location.href = "https://yandex.ru/";
}
    // Переход на следующую страницу поиска с заданным интервалом времени:
    if (nextYandexPage) {
        setTimeout(() => {
          document.querySelector('[aria-label="Следующая страница"]').click();
        }, getRandom(3000, 5500));
    }
}


// Функция рандома ключевых слов запроса:
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
