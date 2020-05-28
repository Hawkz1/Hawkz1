/*
Deklarerar några variabler
Elementet <dn> har en egenskap i css ( visible: false; ) som döjler element när de får den
*/
var timer; 
var reaction; 
var highscore = 0; 
var init = true; 
var elapsed;
var reaTries = 1;
var reaAvg = 0;
var rit = 0; 
var x = 0; 
var rFunc = 0;  
var reaFin = 0;
var misses = 0;
var hits = 0;




window.onload = () => { // fires when all elements have been initialized


    // Deklarerar variabler nu som pekar på elementer i själva sidan, detta gör det mycket enklare att förstå koden 

    var entire = document.getElementsByClassName("entire")[0];
    var entirebtn = entire.getElementsByTagName("button")[0];

    var wait = document.getElementsByClassName("wait")[0];

    var click = document.getElementsByClassName("click")[0];

    var toofast = document.getElementsByClassName("toofast")[0];
    var toofastbtn = toofast.getElementsByTagName("button")[0];

    var result = document.getElementsByClassName("result")[0];
    var resultbtn = result.getElementsByTagName("button")[0];
    var resultf = result.getElementsByTagName("res")[0];

    var highscoref = document.getElementsByClassName("highscore")[0].getElementsByTagName("res")[0];
    var averagef = document.getElementsByClassName("average")[0].getElementsByTagName("avg")[0];
    var missesf = document.getElementsByClassName("misses")[0].getElementsByTagName("mss")[0];
    var hitsf = document.getElementsByClassName("hits")[0].getElementsByTagName("hst")[0];

    // Deklarerar funktionen för vad som händer när man trycker på knappen i starten

    entirebtn.onclick = () => {
        entire.setAttribute("dn", ""); // döjler vita skärmen
        wait.removeAttribute("dn"); // visar röda wait skärmen 
        timer = setTimeout(() => {
            wait.setAttribute("dn", ""); // döjler röda skärmen 
            click.removeAttribute("dn"); // visar gröna skärmen
            reaction = new Date(); // starta timern 
        }, Math.floor((Math.random() * 8) + 4) * Math.floor((Math.random() * 501) + 250)); // slumpmässig period tills funktionen sätts igång
    } // setTimeout visar en grön skärm efter en random period

    wait.onmousedown = () => { // detta är en funktion som visar Too fast om man trycker för tidigt
        clearTimeout(timer); // Tar bort timern för gröna skärmen
        wait.setAttribute("dn", "");
        toofast.removeAttribute("dn");
        misses++; // Lägger på ett på miss variablen
        missesf.innerHTML = misses; // Sätter jag <mss> elementet i sidan till misses 
    }

    click.onmousedown = () => { 
        var now = new Date(); // avslutar tiden
        reaction = now.getTime() - reaction.getTime(); // beräknar skillnaden
        click.setAttribute("dn", ""); // döjler gröna skärmen
        result.removeAttribute("dn"); // visar resultalt skärmen
        resultf.innerHTML = reaction; // skriv reaktions tiden till skärmen
        if (highscore > reaction || init) { // sätter igång enbart om tiden som du fick precis är den högsta 
            highscore = reaction; // ny highscore 
            highscoref.innerHTML = highscore; // skriver den nya highscoren till highscoref elementet
        } 
        //beräknar medelvärdet av alla försök (inte optimalt men det funkar)
        rFunc = rit; 
        rit = reaction + rFunc;
        x++; 
        reaAvg = rit / x;

        reaFin = Math.round(reaAvg);

        averagef.innerHTML = reaFin;
        hits++;
        hitsf.innerHTML = hits;
        init = false; // efter första gången blir init satt till false
    }

    resultbtn.onclick = () => { // Scripten som sätter igång spelet igen efter ett försök 
        result.setAttribute("dn", ""); // döjler resultalt skärmen
        if (entire.hasAttribute("dn")) { // för en bug som händer ibland 
            entire.removeAttribute("dn");
        }
        result.getElementsByTagName("hs")[0].setAttribute("dn", ""); // döjla resultalt skärmen
    
        entire.setAttribute("dn", ""); // döjla skärmen
        wait.removeAttribute("dn"); // döjla röda skärmen
        timer = setTimeout(() => {
            wait.setAttribute("dn", ""); // döjler röda skärmen
            click.removeAttribute("dn"); // visar gröna skärmen 
            reaction = new Date(); // startar timern 
        }, Math.floor((Math.random() * 8) + 4) * Math.floor((Math.random() * 501) + 250));
    }
    toofastbtn.onclick = () => { // Scripten som sätter igång spelet igen efter man har tryckt för fort 
        toofast.setAttribute("dn", "");
        if (entire.hasAttribute("dn")) {
            entire.removeAttribute("dn");
        }
        entire.setAttribute("dn", "");
        wait.removeAttribute("dn");
        timer = setTimeout(() => {
            wait.setAttribute("dn", "");
            click.removeAttribute("dn");
            reaction = new Date(); // startar tiden
        }, Math.floor((Math.random() * 8) + 4) * Math.floor((Math.random() * 501) + 250));
    }
}
