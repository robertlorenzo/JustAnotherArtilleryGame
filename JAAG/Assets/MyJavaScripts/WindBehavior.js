#pragma strict
//Robert Lorenzo
//This script is to set the wind behavior based on how many 
//rounds the player has won and to send the wind information 
//to the moving clouds and the cannon ball.
//JAAG

var wind : float;					// wind for bullet and shadows

private var shadowScript : MovingShadows;	// for getting the moving shadows script
private var guiScript : MainGUI;			//for getting the score from MainGUI

function Start ()
{
	GetScripts();
	Windage();
}

function GetScripts()
{
	guiScript = Camera.main.GetComponent(MainGUI);
	shadowScript = GetComponent(MovingShadows);
}

function Windage(){
	var f_score : float = guiScript.score; // to increase the value by a scale; added difficulty
	// random number between -100.0 and 100 divided by 100 to get a "more" random number
	var numRand : float = (Random.Range(-100.0, 100.0) / (100 - f_score));
	//multiply our random num by score
	if (numRand > 0)
	{ 
		wind = (numRand * f_score) + f_score;
	}
	else
	{
		wind = (numRand * f_score) - f_score;
	}
	shadowScript.windSpeedX = wind;
}