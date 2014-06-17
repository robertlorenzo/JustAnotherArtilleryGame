#pragma strict
//Robert Lorenzo
//Aug 2013
//Senior Project Prep
//this script is to change the color on the spaceship to a random color every round

var rRand : float;		// variables for a random red color
var gRand : float;		// "...................." green color
var bRand : float;		// "...................." blue color

function Start(){
	SetColor();
}

function SetColor () {
	rRand = Random.value;
	gRand = Random.value;
	bRand = Random.value;
	
	renderer.material.color.r = rRand;
	renderer.material.color.g = gRand;
	renderer.material.color.b = bRand;
}