// ==UserScript==
// @name         Yandex Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Smogunov Sergey
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

let keywords = ["Купить новый автомобиль", "Отзывы автовладельцев об автомобилях", "Каталог автомобилей"];
let keyword = keywords[getRandom(0,keywords.length)];

document.getElementsByName("text")[0].value = keyword;
let button = document.getElementsByClassName('//button[contains (@class, "mini-suggest__button")]')[0];
let links = document.links;

if (button !== undefined) {
    document.getElementsByName("text")[0].value = keyword;
    document.getElementsByClassName('//button[contains (@class, "mini-suggest__button")]')[0].click();
}else{
for (let i=0; i<links.length; i++) {
if (links[i].href.includes("auto.ru")) {
    let link = links[i];
    console.log("Найдена строка " +links[i])
    link.click();
    break;
}
}
}

function getRandom (min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}
