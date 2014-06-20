// Robert Lorenzo
// GUI Script for cannon firing game level 2
// For Senior Project Preperation
// August 2013

var cannonTarget: GameObject;	// get the cannon
var customSkin: GUISkin;		// custom GUI skin

private var cannonScript: CannonAI;		// access CannonAI script
private var guiScript: MainGUI;			// access MainGUI script
private var moveX;
private var moveY;
private var checkX : boolean = false;
private var checkY : boolean = false;
private var xPos = Screen.width*0.5;		// half screen width
private var yPos = Screen.height*0.5;		// half screen height

function Start(){
	cannonTarget = GameObject.FindGameObjectWithTag("Cannon");		//cannon object
	if (cannonTarget == null){ print ("no cannon for PingPong"); }
	cannonScript = cannonTarget.GetComponent(CannonAI);		// script for cannon
	
	guiScript = Camera.main.GetComponent(MainGUI);	// get the script
}

function OnGUI() {
	GUI.skin = customSkin;	// my custom skin for this GUI
	
	if(guiScript.endRound == false)
	{
		if (checkX == false){
			if (GUI.Button(Rect(90, (yPos * 2) - 210, 120, 120), "Stop\nVertical", GUI.skin.GetStyle("Octogon Button"))){
				checkX = true;
			}
		}
		if (checkX == true && checkY == false){
			if (GUI.Button(Rect(90, (yPos * 2) - 210, 120, 120), "Stop\nHorizontal", GUI.skin.GetStyle("Octogon Button"))){
				checkY = true;
			}
		}
	}
}

function Update() {
	moveX = guiScript.xRotSlider;
	moveY = guiScript.yRotSlider;
	
	if (cannonScript.gameOver != true){
		if (checkX == false && checkY == false){
			guiScript.xRotSlider = 10 + Mathf.PingPong(15*Time.time, 80);
		}
		if (checkY == false && checkX == true){
			guiScript.yRotSlider = 45 - Mathf.PingPong(15*Time.time, 90);
		}
		if (checkX == true && checkY == true){
			cannonScript.FireCannon();
			//checkX = false;
			MakeFalse();
		}
	}
}

function MakeFalse () {
	checkX = false;
	checkY = false;
}