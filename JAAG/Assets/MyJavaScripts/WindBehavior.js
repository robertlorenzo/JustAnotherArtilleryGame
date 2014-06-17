#pragma strict
//Robert Lorenzo
//Aug 2013
//Senior Project Prep
//This script is to set the wind behavior based on how many 
//rounds the player has won and to send the wind information 
//to the moving clouds and the cannon ball.

var numRand : float;				// setting the random number for the wind
var f_score : float;				// score made into a float;
var wind : float;					// wind for bullet and shadows
var shadowScript : MovingShadows;	// for getting the moving shadows script
//var shadowObj : GameObject;			// for setting the wind var on the moving shadows
var guiScript : GUITest;			//for getting the score from GUITest

function Start () {
	guiScript = Camera.main.GetComponent(GUITest);
	if (guiScript == null){
		print ("No guiScript for windage.");
	}
	shadowScript = GetComponent(MovingShadows);
	if (shadowScript == null){
		print ("No shadowScript for windage");
	}
	Windage();
}

function Windage(){
	f_score = guiScript.score + 1; // to increase the value by a scale; added difficulty
	// random number between -100.0 and 100 divided by 100 to get a "more" random number
	numRand = (Random.Range(-100.0, 100.0) / (101 - f_score));
	//multiply our random num by score
	if (numRand > 0){ 
		wind = (numRand * f_score) + f_score;
	} else {
		wind = (numRand * f_score) - f_score;
	}
	shadowScript.windSpeedX = wind;
	//print("Wind: " + wind);
}