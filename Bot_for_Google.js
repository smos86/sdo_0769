// ==UserScript==
// @name         Google Bot v.3
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Smogunov Sergey
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @match        https://psyholog.me/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

// Целевые сайты и ключи:
let sites = {
    "napli.ru":['вывод произвольных полей wordpress', 'Отключение редакций и ревизий в WordPress', '10 самых популярных шрифтов от Google'],
    "psyholog.me":['центр здоровых отношений "Запятая"', 'Услуги центра здоровых отношений', 'Чекалина Елена психолог'],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['как звучит кларнет', 'как звучит гобой', 'Музыкальные диктанты']
};
//Переменная с целевыми сайтами, рандомный запрос:
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
// ключи:
let keywords = sites[site];

// Определение кнопки "Найти" и написание рандомного запроса по ключевым словам:
let googleInput = document.getElementsByName("q")[0];
let keyword = keywords[getRandom(0, keywords.length)];

// Задание переменной кнопки "Найти":
let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
let i = 0;

 //сбор куки на главной странице:
if (btnK !== undefined) {
    document.cookie = `site = ${site}`;
}else if(location.hostname == "www.google.com"){
    site = getCookie("site");
}else{
    site = location.hostname;
}


if (btnK !== undefined) {
    document.cookie = `site = ${site}`;
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
} else if(location.hostname == site) {
    console.log("Мы на Сайте")

    // Функция перехода по ссылкам внутри указанного сайта и возврата на главную страницу по определённому интервалу:
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if(getRandom(0,101)>=80) {
            location.href = "https://www.google.com";
        }
        else if (links[index].href.indexOf(site) !== -1)
            links[index].click();
    }, getRandom(1000,5000));

    // Если на первой страницы не найдена ключевая фраза, идти дальше:
} else {
    let nextGooglePage = true;
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.includes(site)) {
            let link = links[i];
            let nextGooglePage = false;
            console.log("Найдена строка " + links[i]);
            setTimeout(() => {
                link.click();
            }, getRandom(2500, 4500));
            break;
        }
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
