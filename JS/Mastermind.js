var colors =  ["black", "yellow", "red", "blue", "green", "white"]; //Dit zijn alle kleuren die in het spel zitten.
var randomcolors =  [colors[Math.floor(Math.random() * 6)], colors[Math.floor(Math.random() * 6)], colors[Math.floor(Math.random() * 6)], colors[Math.floor(Math.random() * 6)]]; //Dit zorgt ervoor dat de computer een nummer kiest tussen de 0 en 5.
var currentrow = 1;

for (i=1; i <= 10; i++){ //Dit zorgt ervoor dat er 10 verschillende speel vlaken worden gemaakt en de knoppen.
	var playground = document.createElement("div"); //Dit maakt een div aan in het html met de naam playground.
	playground.id = "row" + i; //Dit zorgt ervoor dat iedere rij een ander nummer heeft zodat we weten in welke we bezig zijn.
	var score = document.createElement("div");
	score.id = "scorerow" + i;
	for (a=1; a <=4; a++){ //Dit zorgt ervoor dat er 4 knoppen worden gemaakt.
		var button = document.createElement("div"); //Dit maakt een div aan in het html met de naam button.
		button.id = "button" + i + "_" + a; //Dit zorgt ervoor dat iedere knop een ander rij nummer en knop nummer heeft zodat we weten in welke we bezig zijn.
		button.setAttribute("data-color",0); //Dit zorgt ervoor dat we de data van de kleuren kunnen bewaren per knop.
		button.onclick = function(){ //Deze function zorgt ervoor dat als we op de knop klikken de knop van kleur veranderd.
			currentcolor = this.getAttribute("data-color"); //Hiermee slaan we het kleur nummer op.
			this.style.backgroundColor = colors[currentcolor]; //Hiermee zorgen we ervoor dat de achtergrond kleur van de knop veranderd.
			currentcolor++; // Dit zorgt ervoor dat currentcolor + 1 krijgt waardoor we een andere kleur krijgen.
			if (currentcolor == colors.length) { //Dit zorgt ervoor dat als we bij white zijn (5) dat we hem weer naar black (0) zetten zodat de site niet crashed.
				currentcolor = 0
			}
			this.setAttribute("data-color",currentcolor); //Dit zorgt ervoor dat we de kleur oplaat van een.
		}
		playground.appendChild(button); //Hiermee zetten we de button in de playground.
		var pin = document.createElement("div");
		pin.id = "pin" + i + "_" + a;
		score.appendChild(pin);
	} 
	document.getElementById("playfield").appendChild(playground); //Hiermee voeg je de div playground toe aan de div playfield die in de html staat.
	document.getElementById("scoreboard").appendChild(score); 
}
var button = document.createElement("button");
button.id = "Button";
button.innerHTML = "controleer";
button.onclick = rowcheck;
document.getElementById("playfield").appendChild(button);

arrow();
Uitleg();
function rowcheck(){
	var check = [];
	var answer = [];
	var playerAnswer = [];
	for(e=1; e <=4; e++){
		answer.push(randomcolors[e-1]);
		playerAnswer.push(document.getElementById("button" + currentrow + "_" + e).style.backgroundColor);
	}
	//tegenover elkaar controleren
	for(c=1; c <= 4; c++){
		if (playerAnswer[c-1] == answer[c-1]){
			if (document.getElementById("pin" + currentrow + "_" + 1).style.backgroundColor == ""){
				document.getElementById("pin" + currentrow + "_" + 1).style.backgroundColor = "black";
			}else if(document.getElementById("pin" + currentrow + "_" + 2).style.backgroundColor == ""){
				document.getElementById("pin" + currentrow + "_" + 2).style.backgroundColor = "black";
			}else if(document.getElementById("pin" + currentrow + "_" + 3).style.backgroundColor == ""){
				document.getElementById("pin" + currentrow + "_" + 3).style.backgroundColor = "black";
			}else{
				document.getElementById("pin" + currentrow + "_" + 4).style.backgroundColor = "black";
			}
			check.push(answer[c-1]);
			answer[c-1] = "geraden";
			delete playerAnswer[c-1];
		}
	}
	//schuin controlren
	for(a=1; a <= 4; a++){
		var crossAnswer = playerAnswer.includes (answer[a-1]);
		var color = answer[a-1];
		if(crossAnswer == true){
			if (document.getElementById("pin" + currentrow + "_" + 1).style.backgroundColor == ""){
				document.getElementById("pin" + currentrow + "_" + 1).style.backgroundColor = "white";
			}else if(document.getElementById("pin" + currentrow + "_" + 2).style.backgroundColor == ""){
				document.getElementById("pin" + currentrow + "_" + 2).style.backgroundColor = "white";
			}else if(document.getElementById("pin" + currentrow + "_" + 3).style.backgroundColor == ""){
				document.getElementById("pin" + currentrow + "_" + 3).style.backgroundColor = "white";
			}else{
				document.getElementById("pin" + currentrow + "_" + 4).style.backgroundColor = "white";
			}
			var check2 = playerAnswer.includes (color);
			if(check2 == true){
				answer[a-1] = "zin er in";
				for (d=1; d <= 4; d++){
					if(playerAnswer[d-1] == color){
						delete playerAnswer[d-1];
						break; // De break is er om ervoor te zorgen dat hij niet twee dezelfde kleuren weg haalt als ze allebei op de verkeerde plek staan.
					}
				}
			}
		}
	// console.log(answer);
	// console.log(playerAnswer);
	// console.log(color);
	color = [];
	}
	if(check.length == 4){
		alert("Je hebt de code ontcijfert!");
	}else{
		check = [];
		answer = [];
		playerAnswer = [];
		currentrow++;
		moveArrow();		
	}
	if (currentrow > 10 && check.length != 4) {
		alert("je hebt verloren de goede antwoorden waren:" + " " + randomcolors + ". " + "wil je het nog een keer proberen druk dan op f5.");
	}
}

function arrow(){
	var indicatordiv = document.createElement("div");
	indicatordiv.id = "indicatordiv";
	var indicator = document.createElement("div");
	indicator.id = "indicator";
	document.body.appendChild(indicatordiv);
	indicatordiv.appendChild(indicator);
	for (f=1; f <=3; f++){
		var arrow = document.createElement("div");
		arrow.id = "arrow" + f;
		indicator.appendChild(arrow);
	}
}

function moveArrow(){
	if(currentrow <= 10){
		var pixels = (currentrow-1) * 85 + 50;
		document.getElementById("indicatordiv").style.top = pixels + "px";
	}
}

function Uitleg(){
	var tekstvlak = document.createElement("div");
	tekstvlak.id = "tekstvlak";
	document.body.appendChild(tekstvlak);
	var tekstkop = document.createElement("h1");
	tekstkop.id = "tekstkop";
	tekstkop.innerHTML = "Uitleg";
	tekstvlak.appendChild(tekstkop);
	var tekst = document.createElement("p");
	tekst.id = "tekst";
	tekstvlak.appendChild(tekst);
	tekst.innerHTML = "De regels zijn vrij simple. De computer zorgt voor een antwoord die je moet gaan raden. Dit antwoord bestaat uit 4 verschillende kleuren en deze kleuren moeten ook op de goede volgorde staan. Door op de rondtjes te klikken verander je de kleuren van een rontje met de keuze uit 6 kleuren. Nadat je alle rondjes op de eerste rij een kleur hebt gegeven is het tijd om te controleren. Als de kleur in de code zit en hij zit ook op de goede plek wordt er een rondje zwart in het schermpje ernaast. Als de kleur wel in de code zit maar niet op de goede plek staat dan wordt het bolletje wit. Je hebt 10 poggingen om de code te raden.";

}
//crossanswer = answer.includes (colors[a-1])?colors[a-1]:false; 
// De code hierboven zorgt ervoor dat crossanswer inplaats van true of false terug geeft dat hij de kleur of false terug geeft.