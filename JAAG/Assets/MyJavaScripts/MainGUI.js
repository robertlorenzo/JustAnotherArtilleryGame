@script RequireComponent(AudioSource)
// Robert Lorenzo
// GUI Script for cannon firing game
// for Game Physics class
// Feb 2013

// Modified For Senior Project Preperation
// July 2013

var verticalSlider: float = 10.0;	// vertical slider on screen
var horizontalSlider: float = 0.0;	// horizontal slider on screen
var hitCount: int;					// number of hits on the ship
var customSkin: GUISkin;			// custom GUI skin
var score: int = 0;					// how many rounds the player has won, consecutive
var level: int;						// the integer that corresponds to the level loaded
var endRound : boolean;				// end of the round
var bulletTexture : Texture2D;		// bullet image to display
var flagL00 : Texture2D;			// Flag images for the wind
var flagL01 : Texture2D;			// *
var flagL05 : Texture2D;			// *
var flagL10 : Texture2D;			// *
var flagR00 : Texture2D;			// *
var flagR01 : Texture2D;			// *
var flagR05 : Texture2D;			// *
var flagR10 : Texture2D;			// *
var cannonUp : Texture2D;			// Cannon Textures
var cannonDown : Texture2D;			// *
var cannonLeft : Texture2D;			// *
var cannonRight : Texture2D;		// *

private var cannonTarget: GameObject;					// get the cannon
private var shipTarget: GameObject;						// get the spaceship
private var lightObj: GameObject;						// get the light for the wind
private var ammoCount: int;								// number of cannon balls shot
private var cannonScript: CannonAI;						// access CannonAI script
private var spaceshipScript: SpaceshipAI;				// access SpaceshipAI script
private var windScript: WindBehavior;					// access WindBehavior script
private var colorScript: RandomColor;					// access RandomColor script
private var halfScreenW : float = Screen.width*0.5;		// half screen width
private var halfScreenH : float = Screen.height*0.5;	// half screen height

function Awake()
{
	cannonTarget = GameObject.FindGameObjectWithTag("Cannon");		//cannon object
	if (cannonTarget == null){
		print ("no cannon for GUI");
	}
	shipTarget = GameObject.FindGameObjectWithTag("Spaceship");		//spaceship object
	if (shipTarget == null){
		print ("no ship for GUI");
	}
	lightObj = GameObject.FindGameObjectWithTag("ShadowLight");		//object with the script
	if (lightObj == null){
		print ("no lightObj for GUI");
	}
}

function Start()
{
	cannonScript = cannonTarget.GetComponent(CannonAI);		// script for cannon
	spaceshipScript = shipTarget.GetComponent(SpaceshipAI);	// script for spaceship
	colorScript = shipTarget.GetComponent(RandomColor);		// script for randomColor
	windScript = lightObj.GetComponent(WindBehavior);		// script for wind
	
	level = Application.loadedLevel;
	endRound = false;
}

function OnGUI()
{	
	GUI.skin = customSkin;	// my custom skin for this GUI
	
	if (!endRound)
	{
		DrawAmmo();
		DrawScore();
		DrawHits();
		DrawCannons(cannonUp, 2, halfScreenH * 0.25, cannonUp.width * 0.08, cannonUp.height * 0.08);
		DrawCannons(cannonDown, 2, halfScreenH * 1.6, cannonDown.width * 0.08, cannonDown.height * 0.08);
//		DrawCannons(cannonLeft);
//		DrawCannons(cannonRight);
		DrawHSlider();
		DrawVSlider();
		DrawFlags();
		DrawFireButton();
	}
	
	// end of the round
	if (ammoCount <= 0 || shipTarget.transform.position.y <= 0)	// if the game is over
	{
		endRound = true;	// turn off all other GUI objects
		if (hitCount<4)
		{
			PlayerLost();
		}
		else
		{
			PlayerWon();
		}
	}
}

function DrawAmmo()
{	
	ammoCount = cannonScript.shotCounter;
	
	for (var a = 0; a < ammoCount; a++)
	{
		var ammoLabelX : float = 10.0 + (12.0 * a);
		var ammoLabelY : float = 5.0;
		var ammoLabelW : float = 190.0;
		var ammoLabelH : float = 39.0;
		
		GUI.Label(Rect(ammoLabelX, ammoLabelY, ammoLabelW, ammoLabelH), bulletTexture);
	}
}

function DrawScore()
{
	var scoreLabelX : float = halfScreenW - 73.0;
	var scoreLabelY : float = 5.0;
	var scoreLabelW : float = 146.0;
	var scoreLabelH : float = 39.0;
	var scoreText : String = "Round: " + score;
	
	GUI.Label(Rect(scoreLabelX, scoreLabelY, scoreLabelW, scoreLabelH), scoreText);
}

function DrawHits()
{
	hitCount = spaceshipScript.counterH;
	var hitLabelX : float = (halfScreenW * 2) - 170.0;
	var hitLabelY : float = 5.0;
	var hitLabelW : float = 170.0;
	var hitLabelH : float = 39.0;
	var hitText : String = "Ship Hits: " + hitCount;
	
	GUI.Label(Rect(hitLabelX, hitLabelY, hitLabelW, hitLabelH), hitText);
}

function DrawCannons(cannonTexture : Texture2D, cannonX : float, cannonY : float, cannonW : float, cannonH : float)
{
	GUI.Label(Rect(cannonX, cannonY, cannonW, cannonH), cannonTexture); 
}

function DrawHSlider()
{
	var yRotX : float = halfScreenW * 0.375;
	var yRotY : float = halfScreenH * 1.82;
	var yRotW : float = halfScreenW * 1.59;
	var yRotH : float = 39.0;
	
	horizontalSlider = GUI.HorizontalSlider(Rect(yRotX, yRotY, yRotW, yRotH), horizontalSlider, -45, 45);
}

function DrawVSlider()
{
	var xRotX : float = halfScreenW * 0.10416;
	var xRotY : float = halfScreenH * 0.2;
	var xRotW : float = 12;
	var xRotH : float = halfScreenH * 1.6;
	
	verticalSlider = GUI.VerticalSlider(Rect(xRotX, xRotY, xRotW, xRotH), verticalSlider, 90, 10);
}

function DrawFlags()
{
	if(windScript.wind >= 0 && windScript.wind < 1)
	{
		GUI.Label (Rect(halfScreenW * 0.895, halfScreenH, flagR00.width/2,  flagR00.height/2), flagR00);
		GUI.Label (Rect(halfScreenW * 0.313, halfScreenH, flagL00.width/2,  flagL00.height/2), flagR00);
	}
	else if(windScript.wind >= 1 && windScript.wind < 5)
	{
		GUI.Label (Rect(halfScreenW * 0.895, halfScreenH, flagR01.width/2,  flagR01.height/2), flagR01);
		GUI.Label (Rect(halfScreenW * 0.313, halfScreenH, flagL00.width/2,  flagL00.height/2), flagR01);
	}
	else if(windScript.wind >= 5  && windScript.wind < 10)
	{
		GUI.Label (Rect(halfScreenW * 0.895, halfScreenH, flagR05.width/2,  flagR05.height/2), flagR05);
		GUI.Label (Rect(halfScreenW * 0.313, halfScreenH, flagL00.width/2,  flagL00.height/2), flagR05);
	}
	else if(windScript.wind >= 10)
	{
		GUI.Label (Rect(halfScreenW * 0.895, halfScreenH, flagR10.width/2,  flagR10.height/2), flagR10);
		GUI.Label (Rect(halfScreenW * 0.313, halfScreenH, flagL00.width/2,  flagL00.height/2), flagR10);
	}
	else if(windScript.wind < 0 && windScript.wind >= -1)
	{
		GUI.Label (Rect(halfScreenW * 0.895, halfScreenH, flagR00.width/2,  flagR00.height/2), flagL00);
		GUI.Label (Rect(halfScreenW * 0.313, halfScreenH, flagL00.width/2,  flagL00.height/2), flagL00);
	}
	else if(windScript.wind < -1 && windScript.wind >= -5)
	{
		GUI.Label (Rect(halfScreenW * 0.895, halfScreenH, flagR00.width/2,  flagR00.height/2), flagL01);
		GUI.Label (Rect(halfScreenW * 0.313, halfScreenH, flagL00.width/2,  flagL00.height/2), flagL01);
	}
	else if(windScript.wind < -5 && windScript.wind >= -10)
	{
		GUI.Label (Rect(halfScreenW * 0.895, halfScreenH, flagR00.width/2,  flagR00.height/2), flagL05);
		GUI.Label (Rect(halfScreenW * 0.313, halfScreenH, flagL00.width/2,  flagL00.height/2), flagL05);
	}
	else if(windScript.wind < 10)
	{
		GUI.Label (Rect(halfScreenW * 0.895, halfScreenH, flagR00.width/2,  flagR00.height/2), flagL10);
		GUI.Label (Rect(halfScreenW * 0.313, halfScreenH, flagL00.width/2,  flagL00.height/2), flagL10);
	}
}

function DrawFireButton()
{
	if (level == 2 || level == 4)
	{
		if (GUI.Button(Rect(halfScreenW * 0.175, halfScreenH * 1.45, 100, 100), "Fire", GUI.skin.GetStyle("Fire Button")))
		{
			cannonScript.FireCannon();
		}
	}
}

function PlayerLost()
{
	var endLabelX = halfScreenW - 77.5;
	var endLabelY = halfScreenH - 55.0;
	var endLabelW = 155.0;
	var endLabelH = 39.0;

	GUI.Label(Rect(endLabelX, endLabelY, endLabelW, endLabelH), "Game Over", GUI.skin.GetStyle("Title"));
	
	if (GUI.Button(Rect(halfScreenW - 400.0, halfScreenH + 25.0, 300.0, 100.0), "Try Again?"))
	{
		Application.LoadLevel(level);
	}
	if (GUI.Button(Rect(halfScreenW + 100.0, halfScreenH + 25.0, 300.0, 100.0), "Quit to Main Menu"))
	{
		Application.LoadLevel(0);
	}
}

function PlayerWon()
{
	var endLabelX = halfScreenW - 69.5;
	var endLabelY = halfScreenH - 55.0;
	var endLabelW = 139.0;
	var endLabelH = 39.0;
	
	GUI.Label(Rect(endLabelX, endLabelY, endLabelW, endLabelH), "Good Job!", GUI.skin.GetStyle("Title"));
	
	if (GUI.Button(Rect(halfScreenW - 400.0, halfScreenH + 25.0, 300.0, 100.0), "Start next round"))
	{
		NextRound();
	}
	if (GUI.Button(Rect(halfScreenW + 100.0, halfScreenH + 25.0, 300.0, 100.0), "Quit to Main Menu"))
	{
		Application.LoadLevel(0);
	}
}

function NextRound()
{
	score++;
	horizontalSlider = 0;
	verticalSlider = 10;
	cannonScript.shotCounter = 10;
	spaceshipScript.counterH = 0;
	shipTarget.renderer.enabled = true;
	spaceshipScript.StartPosition();
	spaceshipScript.KillFire();
	windScript.Windage();
	colorScript.SetColor();
	endRound = false;
}