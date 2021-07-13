// ==UserScript==
// @name         Yandex Bot v.3
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Smogunov Sergey
// @match        https://yandex.ru/*
// @match        https://napli.ru/*
// @match        https://www.rolf.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

// Целевые сайты и ключи:
let sites = {
    "napli.ru":["10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress"],
    "rolf.ru":["Автомобили в наличии", "Обзоры автомобилей", "Новые автомобили в Москве"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой", "Тромбон", "Арфа"]
};

//Переменная с целевыми сайтами, рандомный запрос:
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
//ключи:
let keywords = sites[site];

// Определение кнопки "Найти" и написание рандомного запроса по ключевым словам:
let yandexInput = document.getElementsByName('text')[0];
let keyword = keywords[getRandom(0, keywords.length)];

// Задание переменной кнопки "Найти":
let btn = document.getElementsByClassName("button_theme_search")[0];
let links = document.links;
let i = 0;

//сбор куки на главной странице:
if (btn !== undefined) {
    document.cookie = `site = ${site}`;
}else if(location.hostname == "yandex.ru"){
    site = getCookie("site");
}else{
    site = location.hostname;
}

if (btn !== undefined) {
    document.cookie = `site = ${site}`;
 // написание запроса по одной букве с времени 200 мс:
    let timerId = setInterval(() => {
        yandexInput.value += keyword[i];
        i++;
        if (i == keyword.length){
            clearInterval(timerId);
            btn.click();
        }
    },200);
    console.log(location.hostname);
    // Указание сайта в котором необходимо задать переход по ссылкам:
}else if (location.hostname == site) {
    console.log("Мы на "+site);
           // Функция перехода по ссылкам внутри указанного сайта и возврата на главную страницу по определённому интервалу:
    setInterval(()=>{
        let index = getRandom(0, links.length);
        console.log(links.length);
        if (getRandom(0, 101)>=70) {
            location.href = "https://yandex.ru";
        }else if (links[index].href.indexOf(site) !== -1) {
            links[index].click();
        }
    }, getRandom(2500, 4500));

    // Если на первой страницы не найдена ключевая фраза, идти дальше:
} else {
    let nextYandexPage = true;
    for (let i = 0; i<links.length; i++) {
        if (links[i].href.includes(site)){
            let link = links[i];
            nextYandexPage = false;
            console.log("Найдена строка "+link);
            setTimeout(() => {
                location.href = link;
            }, getRandom(2000,4000));
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
//Доступ к куки – через регулярные выражения.
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
