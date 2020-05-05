// Declaring Variables

var timer; // stores timeout of waiting time
var reaction; // stores time it took you to react on green color
var highscore = 0; // stores your personal highscore
var init = true; // controls if codes executes first time
var elapsed;
var reaRit = 0;
var reaTries = 1;
var reaAvg = 0;
var rit = 0; 
var x = 0; 
var rFunc = 0;  
var reaFin = 0;
var misses = 0;
var hits = 0;
var z = 0; 
var boolG = 0;

window.onload = () => { // fires when all elements have been initialized
    var go = 0;

    var entire = document.getElementsByClassName("entire")[0];
    var entirebtn = entire.getElementsByTagName("button")[0];

    var wait = document.getElementsByClassName("wait")[0];

    var click = document.getElementsByClassName("click")[0];
    var noClick = document.getElementsByClassName("noclick")[0];

    var toofast = document.getElementsByClassName("toofast")[0];
    var toofastbtn = toofast.getElementsByTagName("button")[0];

    var result = document.getElementsByClassName("result")[0];
    var resultbtn = result.getElementsByTagName("button")[0];
    var resultf = result.getElementsByTagName("res")[0];

    var highscoref = document.getElementsByClassName("highscore")[0].getElementsByTagName("res")[0];
    var averagef = document.getElementsByClassName("average")[0].getElementsByTagName("avg")[0];
    var missesf = document.getElementsByClassName("misses")[0].getElementsByTagName("mss")[0];
    var hitsf = document.getElementsByClassName("hits")[0].getElementsByTagName("hst")[0];

    function startL() {    
        entire.setAttribute("dn", "");
        wait.removeAttribute("dn");
        timer = setTimeout(() => {
            wait.setAttribute("dn", "");
            if (z > 0) {
                boolG = (Math.floor((Math.random()*2)));
            } else {
                z++; 
            }
            console.log(boolG);
            if(boolG==0) {
                noClick.removeAttribute("dn");
                click.setAttribute("dn", "");
                timerL = setTimeout(function(){
                    startL();
                }, 2000);
            }
            if(boolG==1) {
                click.removeAttribute("dn");
                noClick.setAttribute("dn", "");
            }
            reaction = new Date(); // start time
        }, Math.floor((Math.random() * 8) + 4) * Math.floor((Math.random() * 501) + 250));
    }
 
    entirebtn.onclick = () => {
        startL();
    }
    wait.onmousedown = () => { // if red screen is clicked, show "too fast" screen
        clearTimeout(timer); // cancel green screen showing timeout
        wait.setAttribute("dn", "");
        toofast.removeAttribute("dn");
        misses++; // Add 1 to miss variable
        missesf.innerHTML = misses; // Set <mss> to the value of misses variable
    }
    noClick.onmousedown = () => { // if red screen is clicked, show "too fast" screen
        clearTimeout(timerL);
        noClick.setAttribute("dn", "");
        toofast.removeAttribute("dn");
        misses++; // Add 1 to miss variable
        missesf.innerHTML = misses; // Set <mss> to the value of misses variable
    }

    click.onmousedown = () => { 
        var now = new Date(); // end time
        reaction = now.getTime() - reaction.getTime(); // calculate difference of timestamps (in ms) 
        reaRit = reaRit + reaction; 
        click.setAttribute("dn", ""); 
        result.removeAttribute("dn");
        resultf.innerHTML = reaction; // write current reaction time to screen
        if (highscore > reaction || init) { // fires if current result is better (or the code executes the first time)
            highscore = reaction;
            highscoref.innerHTML = highscore;
            /*result.getElementsByTagName("hs")[0].removeAttribute("dn");*/
        } 
        rFunc = rit; 
        rit = reaction + rFunc;
        x++; 
        reaAvg = rit / x;

        reaFin = Math.round(reaAvg);

        averagef.innerHTML = reaFin;
        console.log(reaAvg);
        hits++;
        hitsf.innerHTML = hits;
        init = false; // now first execution has been completed and init is false
    }

    resultbtn.onclick = () => {
        result.setAttribute("dn", "");
        if (entire.hasAttribute("dn")) {
            entire.removeAttribute("dn");
        }
        result.getElementsByTagName("hs")[0].setAttribute("dn", "");

        startL();
    }
    toofastbtn.onclick = () => {
        toofast.setAttribute("dn", "");
        if (entire.hasAttribute("dn")) {
            entire.removeAttribute("dn");
        }
        startL();
    }
}
































