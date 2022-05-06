import {JSDOM} from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"

(async () => {
    //Crée un nouveau browser
    const browser = await puppeteer.launch();
    //Créer une nouvelle instance de la page
    const page = await browser.newPage();

    //Go to Wikipedia
    await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');

    //Prend un screenshot
    const screen = await page.screenshot({ path: 'cantons.png', fullPage: true });
    console.log(screen);

    //Ferme le browser
    await browser.close();
})();

//Cantons suisses 
(async () => {
    const response = await fetch('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');
    const text = await response.text();
    const dom = new JSDOM(text);
    const cantons = dom.window.document.querySelectorAll("table.wikitable tr");
    for (const canton of cantons) {
        try {
            const name = canton.querySelector("td a").textContent;
            const population = canton.querySelector("td bdi").textContent;
            let populationNumber = population.substring(1, population.length - 1);
            if (populationNumber.startsWith("00")) {
                populationNumber = populationNumber.substring(2, populationNumber.length);
            } else if (populationNumber.startsWith("0")) {
                populationNumber = populationNumber.substring(1, populationNumber.length);
            }
            console.log(`${name} : ${populationNumber}`);
        } catch (error) { }
    }
})();


//E-commerce
(async () => {
    const response = await fetch('https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops');
    const text = await response.text();
    const dom = new JSDOM(text);
    const products = dom.window.document.querySelectorAll("div.thumbnail ");
    for (const product of products) {
        try {
            const line = {
                "product" : product.querySelector("div.caption h4 a").textContent,
                "price" : product.querySelector("div.caption h4").textContent,
                "ratings" : product.querySelectorAll("div.ratings p span").length
            }
            console.log(line);
        } catch (error) {}   
    }
})()