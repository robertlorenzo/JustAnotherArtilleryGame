#pragma strict
// Robert Lorenzo
// GUI Script for JAAG

var verticalSlider: float = 10.0;	// vertical slider on screen
var horizontalSlider: float = 0.0;	// horizontal slider on screen
var hitCount: int;					// number of hits on the ship
var customSkin: GUISkin;			// custom GUI skin
var score: int = 1;					// how many rounds the player has won, consecutive
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
private var sw : float = Screen.width;
private var sh : float = Screen.height;

function Start()
{
	GetGameobjects();
	GetScripts();
	GetLevel();

	endRound = false;
}

function OnGUI()
{	
	GUI.skin = customSkin;	// my custom skin for this GUI
	
	if (!endRound)
	{
		DrawAmmo(5.0, 190.0, 39.0);
		DrawScore(sw * 0.4239583, 5.0, 146.0, 39.0, "Round: " + score);
		DrawHits(sw * 0.822916, 5.0, 170.0, 39.0, "Ship Hits: ");
		DrawCannons(cannonUp, 2, sh * 0.125, cannonUp.width * 0.08, cannonUp.height * 0.08);
		DrawCannons(cannonDown, 2, sh * 0.8, cannonDown.width * 0.08, cannonDown.height * 0.08);
		DrawCannons(cannonLeft, sw * 0.19, sh * 0.93, cannonLeft.width * 0.12, cannonLeft.height * 0.12);
		DrawCannons(cannonRight, sw * 0.94, sh * 0.93, cannonRight.width * 0.12, cannonRight.height * 0.12);
		DrawHSlider(sw * 0.1875, sh * 0.91, sw * 0.795, 39.0);
		DrawVSlider(sw * 0.05208, sh * 0.1, 12.0, sh * 0.8);
		GetWind();
		if (level == 2 || level == 4)
		{
			DrawFireButton(sw * 0.0875, sh * 0.725, 100.0, 100.0);
		}
	}
	// end of the round
	if (ammoCount <= 0 || shipTarget.transform.position.y <= 0)	// if the game is over
	{
		endRound = true;	// turn off all other GUI objects
		if (hitCount<4)
		{
			PlayerLost(sw - 557.5, sh - 355.0, 155.0, 39.0);
		}
		else
		{
			PlayerWon(sw - 549.5, sh - 355.0, 139.0, 39.0);
		}
	}
}

function GetGameobjects()
{
	cannonTarget = GameObject.FindGameObjectWithTag("Cannon");		//cannon object
	if (cannonTarget == null)
	{
		Debug.Log ("no cannon for GUI");
	}
	shipTarget = GameObject.FindGameObjectWithTag("Spaceship");		//spaceship object
	if (shipTarget == null)
	{
		Debug.Log ("no ship for GUI");
	}
	lightObj = GameObject.FindGameObjectWithTag("ShadowLight");		//object with the script
	if (lightObj == null)
	{
		Debug.Log ("no lightObj for GUI");
	}
}

function GetScripts()
{
	cannonScript = cannonTarget.GetComponent(CannonAI);		// script for cannon
	spaceshipScript = shipTarget.GetComponent(SpaceshipAI);	// script for spaceship
	colorScript = shipTarget.GetComponent(RandomColor);		// script for randomColor
	windScript = lightObj.GetComponent(WindBehavior);		// script for wind
}

function GetLevel()
{
	level = Application.loadedLevel;
}

function DrawAmmo(ammoLabelY : float, ammoLabelW : float, ammoLabelH : float)
{	
	ammoCount = cannonScript.shotCounter;
	
	for (var a = 0; a < ammoCount; a++)
	{
		var ammoLabelX : float = 10.0 + (12.0 * a);
		
		GUI.Label(Rect(ammoLabelX, ammoLabelY, ammoLabelW, ammoLabelH), bulletTexture);
	}
}

function DrawScore(scoreLabelX : float, scoreLabelY : float, scoreLabelW : float, scoreLabelH : float, scoreText : String)
{	
	GUI.Label(Rect(scoreLabelX, scoreLabelY, scoreLabelW, scoreLabelH), scoreText);
}

function DrawHits(hitLabelX : float, hitLabelY : float, hitLabelW : float, hitLabelH : float, hitText : String)
{
	hitCount = spaceshipScript.hitCounter;
	
	GUI.Label(Rect(hitLabelX, hitLabelY, hitLabelW, hitLabelH), hitText + hitCount);
}

function DrawCannons(cannonTexture : Texture2D, cannonX : float, cannonY : float, cannonW : float, cannonH : float)
{
	GUI.Label(Rect(cannonX, cannonY, cannonW, cannonH), cannonTexture); 
}

function DrawHSlider(yRotX : float, yRotY : float, yRotW : float, yRotH : float)
{	
	horizontalSlider = GUI.HorizontalSlider(Rect(yRotX, yRotY, yRotW, yRotH), horizontalSlider, -45, 45);
}

function DrawVSlider(xRotX : float, xRotY : float, xRotW : float, xRotH : float)
{
	verticalSlider = GUI.VerticalSlider(Rect(xRotX, xRotY, xRotW, xRotH), verticalSlider, 90, 10);
}

function GetWind()
{
	if(windScript.wind >= 0 && windScript.wind < 1)
	{
		DrawFlags(flagR00);
	}
	else if(windScript.wind >= 1 && windScript.wind < 5)
	{
		DrawFlags(flagR01);
	}
	else if(windScript.wind >= 5  && windScript.wind < 10)
	{
		DrawFlags(flagR05);
	}
	else if(windScript.wind >= 10)
	{
		DrawFlags(flagR10);
	}
	else if(windScript.wind < 0 && windScript.wind >= -1)
	{
		DrawFlags(flagL00);
	}
	else if(windScript.wind < -1 && windScript.wind >= -5)
	{
		DrawFlags(flagL01);
	}
	else if(windScript.wind < -5 && windScript.wind >= -10)
	{
		DrawFlags(flagL05);
	}
	else if(windScript.wind < -10)
	{
		DrawFlags(flagL10);
	}
}

function DrawFlags(flag : Texture2D)
{
	GUI.Label (Rect(sw * 0.4475, sh * 0.5, flag.width/2,  flag.height/2), flag);
	GUI.Label (Rect(sw * 0.1565, sh * 0.5, flag.width/2,  flag.height/2), flag);
}

function DrawFireButton(fireButtonX : float, fireButtonY : float, fireButtonW : float, fireButtonH : float)
{
	if (GUI.Button(Rect(fireButtonX, fireButtonY, fireButtonW, fireButtonH), "Fire", GUI.skin.GetStyle("Fire Button")))
	{
		cannonScript.FireCannon();
	}
}

function PlayerLost(endLabelX: float, endLabelY : float, endLabelW : float, endLabelH : float)
{
	GUI.Label(Rect(endLabelX, endLabelY, endLabelW, endLabelH), "Game Over", GUI.skin.GetStyle("Title"));
	
	EndOfRoundButtons("Try Again?");
}

function PlayerWon(endLabelX : float, endLabelY : float, endLabelW : float, endLabelH : float)
{	
	GUI.Label(Rect(endLabelX, endLabelY, endLabelW, endLabelH), "Good Job!", GUI.skin.GetStyle("Title"));
	
	EndOfRoundButtons("Start next round");
}

function EndOfRoundButtons(winOrLose : String)
{
	if (GUI.Button(Rect(sw - 880.0, sh - 275.0, 300.0, 100.0), winOrLose))
	{
		if (winOrLose == "Try Again?")
		{
			Application.LoadLevel(level);
		}
		else
		{
			NextRound();
		}
	}
	if (GUI.Button(Rect(sw - 380.0, sh - 275.0, 300.0, 100.0), "Quit to Main Menu"))
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
	spaceshipScript.hitCounter = 0;
	shipTarget.renderer.enabled = true;
	spaceshipScript.StartPositionY();
	spaceshipScript.KillFire();
	windScript.Windage();
	colorScript.SetColor();
	endRound = false;
}