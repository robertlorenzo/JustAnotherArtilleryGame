@script RequireComponent(AudioSource)
// Robert Lorenzo
// GUI Script for cannon firing game
// for Game Physics class
// Feb 2013

// Modified For Senior Project Preperation
// July 2013

var xRotSlider: float = 10.0;	// vertical slider on screen to control the angle of the cannon
var yRotSlider: float = 0.0;	// horizontal slider on screen to control the power of the cannon
var count2: int;				// number of hits on the ship
var cannonTarget: GameObject;	// get the cannon
var shipTarget: GameObject;		// get the spaceship
var lightObj: GameObject;		// get the light for the wind
var shipPos;					// position of the spaceship
var customSkin: GUISkin;		// custom GUI skin
var score: int = 0;				// how many rounds the player has won, consecutive
var level: int;					// the integer that corresponds to the level loaded
var endRound : boolean;			// end of the round
var bulletTexture : Texture2D;	// bullet image to display
var flagL00 : Texture2D;		//*
var flagL01 : Texture2D;		//*
var flagL05 : Texture2D;		//*
var flagL10 : Texture2D;		// Flag images for the wind
var flagR00 : Texture2D;		//*
var flagR01 : Texture2D;		//*
var flagR05 : Texture2D;		//*
var flagR10 : Texture2D;		//*
var cheering: AudioClip;

private var count1: int;						// number of cannon balls shot
private var bulletText: String;					// string for ammo label
private var hitText: String;					// string for ship hit label
private var angleValue: String;					// string for angle label
private var powerValue: String;					// string for power label
private var cannonScript: CannonAI;				// access CannonAI script
private var spaceshipScript: SpaceshipAI;		// access SpaceshipAI script
private var windScript: WindBehavior;			// access WindBehavior script
private var colorScript: RandomColor;			// access RandomColor script
private var xPos = Screen.width*0.5;			// half screen width
private var yPos = Screen.height*0.5;			// half screen height
private var labelX : float = 44.0;				// default amount of pixels for the labels - x
private var labelY : float = 39.0;				// default amount of pixels for the labels - y
private var ammoLabelX : float = 190.0;			// the amount of pixels for the ammo label - x
private var scoreLabelX : float = 146.0;		// "						" score label - x
private var hitLabelX: float = 170.0;			// "						" ship hits label - x
private var hAngleLabelX: float = 223.0;		//
private var hAngleLabelX3: float = 34.0;		//
private var vAngleLabelY : float = 477.0;
private var vAngleLabelX : float = 20.0;
private var vSliderLength : float = yPos * 1.4;	
private var gameOverX : float = 155.0;
private var goodJobX : float = 139;
var x:float = 0.9;

function Awake(){
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
	
	//print (xPos + "," + yPos);
}
function Start(){
	cannonScript = cannonTarget.GetComponent(CannonAI);		// script for cannon
	spaceshipScript = shipTarget.GetComponent(SpaceshipAI);	// script for spaceship
	colorScript = shipTarget.GetComponent(RandomColor);		// script for randomColor
	windScript = lightObj.GetComponent(WindBehavior);		// script for wind
	
	level = Application.loadedLevel;
	endRound = false;
}

function OnGUI(){
	
	GUI.skin = customSkin;	// my custom skin for this GUI
	
	if (endRound == false){
		// Draw a label for ammo
		count1 = cannonScript.shotCounter;
		for (var a = 0; a < count1; a++)
		{
			GUI.Label (Rect((10 + (12*a)), 5, ammoLabelX, labelY), bulletTexture);
		}
		
		//Label for score. Score is the number of rounds the player has completed.
		GUI.Label (Rect(xPos - (scoreLabelX / 2), 5, scoreLabelX, labelY), "Round: " + score);
		
		// Draw a label for ship hits
		count2 = spaceshipScript.counterH;
		hitText = "Ship Hits: " + count2;
		GUI.Label (Rect((xPos * 2) - hitLabelX, 5, hitLabelX, labelY), hitText);
			
		// Draws a horizontal slider control that goes from 0 to 90. 
		// mySlider function draws a label and then moves the slider to the end of that label.
		// x position of the Rect is half of the screen(xPos) minus half of the entire length of mySlider.
		// the entire length of mySlider being the length of the label(105) plus the length of the slider((xPos*1.5)+105)
		// all x positions for the horizontal slider labels correspond to the offset of the slider from center
		yRotSlider = mySlider(Rect(5, yPos * 1.82, hAngleLabelX, labelY), yRotSlider, 45.0, "Horizontal angle");
		// Draw a label for angle control slider and numbers
		GUI.Label (Rect(hAngleLabelX, yPos * 1.89, labelX, labelY), "-45");						// -45 at the bottom beginning of the slider
		GUI.Label (Rect((xPos * 2) - hAngleLabelX3, yPos * 1.89, hAngleLabelX3, labelY), "45");	// 45 at the bottom end of the slider
		// Putting the angle value on a label
		var i_yRotSlider : int = yRotSlider;
		angleValue = i_yRotSlider.ToString();
		//angleValue = yRotSlider.ToString("F1");	// float to string; "F1" means show 1 number after decimal
		GUI.Label (Rect(xPos + 104, yPos * 1.89, labelX, labelY), angleValue);	// angle label at the bottom middle of the slider
		
		// Draw a label for the power control slider
		GUI.Label (Rect(vAngleLabelX, yPos - (vAngleLabelY / 2), vAngleLabelX, vAngleLabelY), VerticalText("Vertical angle"));
		// Draws a vertical slider control that goes from 10 to 100.
		xRotSlider = GUI.VerticalSlider(Rect(vAngleLabelX + 30, yPos * 0.3, 12, vSliderLength), xRotSlider, 90, 10);
		// Draw a label for power control values
		GUI.Label(Rect(45, yPos-((vSliderLength)/2)-labelY, labelX, labelY), "90");		// max angle of 90 at the top of the slider
		GUI.Label(Rect(45, yPos * 1.73, labelX, labelY), "10");			// min angle of 10 at the bottom of the slider
		// Putting the power value on a label
		var i_xRotSlider : int = xRotSlider;
		powerValue = i_xRotSlider.ToString();	
		//powerValue = xRotSlider.ToString("F1");					// float to string; F1 means 1 decimal point
		GUI.Label (Rect(60, yPos*.975, 50, 50), powerValue);	// label in the middle of the slider
		
		//***To set the flags for the wind*********************************************************
		if(windScript.wind >= 0 && windScript.wind < 1)											//*
		{																						//*
			GUI.Label (Rect(xPos * 0.895, yPos,  flagR00.width/2,  flagR00.height/2), flagR00);	//*
			GUI.Label (Rect(xPos * 0.313, yPos, flagL00.width/2,  flagL00.height/2), flagR00);	//*
		}																						//*
		else if(windScript.wind >= 1 && windScript.wind < 5)									//*
		{																						//*
			GUI.Label (Rect(xPos * 0.895, yPos,  flagR01.width/2,  flagR01.height/2), flagR01);	//*
			GUI.Label (Rect(xPos * 0.313, yPos, flagL00.width/2,  flagL00.height/2), flagR01);	//*
		}																						//*
		else if(windScript.wind >= 5  && windScript.wind < 10)									//*	
		{																						//*
			GUI.Label (Rect(xPos * 0.895, yPos,  flagR05.width/2,  flagR05.height/2), flagR05);	//*
			GUI.Label (Rect(xPos * 0.313, yPos, flagL00.width/2,  flagL00.height/2), flagR05);	//*	
		}																						//*		
		else if(windScript.wind >= 10)															//*
		{																						//*
			GUI.Label (Rect(xPos * 0.895, yPos,  flagR10.width/2,  flagR10.height/2), flagR10);	//*
			GUI.Label (Rect(xPos * 0.313, yPos, flagL00.width/2,  flagL00.height/2), flagR10);	//*
		}																						//*
		else if(windScript.wind < 0 && windScript.wind >= -1)									//*
		{																						//*
			GUI.Label (Rect(xPos * 0.895, yPos,  flagR00.width/2,  flagR00.height/2), flagL00);	//*
			GUI.Label (Rect(xPos * 0.313, yPos, flagL00.width/2,  flagL00.height/2), flagL00);	//*
		}																						//*
		else if(windScript.wind < -1 && windScript.wind >= -5)									//*
		{																						//*
			GUI.Label (Rect(xPos * 0.895, yPos,  flagR00.width/2,  flagR00.height/2), flagL01);	//*
			GUI.Label (Rect(xPos * 0.313, yPos, flagL00.width/2,  flagL00.height/2), flagL01);	//*
		}																						//*
		else if(windScript.wind < -5 && windScript.wind >= -10)									//*
		{																						//*
			GUI.Label (Rect(xPos * 0.895, yPos,  flagR00.width/2,  flagR00.height/2), flagL05);	//*
			GUI.Label (Rect(xPos * 0.313, yPos, flagL00.width/2,  flagL00.height/2), flagL05);	//*
		}																						//*
		else if(windScript.wind < 10)															//*
		{																						//*
			GUI.Label (Rect(xPos * 0.895, yPos,  flagR00.width/2,  flagR00.height/2), flagL10);	//*
			GUI.Label (Rect(xPos * 0.313, yPos, flagL00.width/2,  flagL00.height/2), flagL10);	//*
		}																						//*		
		//*****************************************************************************************
		
		// Draw a Fire button if the game is "Player Controlled"(2)
		if (level == 2){
			if (GUI.Button(Rect(xPos * 0.175, yPos * 1.45, 100, 100), "Fire", GUI.skin.GetStyle("Fire Button"))){
				cannonScript.FireCannon();
			}
		}
	}
	
	// end of the round
	if (count1 <= 0){																			// if the game is over because the player lost...
		endRound = true;	// turn off all other GUI objects
		if (count2<4){
			GUI.Label (Rect(xPos -(gameOverX/2), yPos - 55, gameOverX, labelY), "Game Over", GUI.skin.GetStyle("Title"));	// ... tell the player ...
			if (GUI.Button(Rect(xPos - 400, yPos + 25, 300, 100), "Try Again?")){					// ... and allow them to restart ...
				Application.LoadLevel(level);
			}
			if (GUI.Button(Rect(xPos + 100, yPos + 25, 300, 100), "Quit to Main Menu")){			// ... or quit completely.
				Application.LoadLevel(0);
			}
		}	// end if()
	}	// end if()
	if (shipTarget.transform.position.y <= 0){												// if the game is over because the player won...
		endRound = true;		// turn off all other GUI objects
		if(!audio.isPlaying)
		{
			//audio.PlayOneShot(cheering,0.7);
		}																					//...play the cheering sound....
		GUI.Label (Rect(xPos - (goodJobX/2), yPos - 55, goodJobX, labelY), "Good Job!", GUI.skin.GetStyle("Title"));	// ... tell the player ...
		if (GUI.Button(Rect(xPos - 400, yPos + 25, 300, 100), "Start next round")){			// ... and allow them to start the next round ...
			ResetLevel();
		}	// end if()
		if (GUI.Button(Rect(xPos + 100, yPos + 25, 300, 100), "Quit to Main Menu")){			// ... or quit.
			Application.LoadLevel(0);
		}
	}	// end if()
}	// end OnGUI()

// function for slider and label next to each other
function mySlider (screenRect : Rect, sliderValue : float, sliderMaxValue : float, labelText : String) : float 
{
	GUI.Label (screenRect, labelText);
	screenRect.x += screenRect.width; // Push the Slider to the end of the Label
	screenRect.width += (xPos * 2)-(2 * hAngleLabelX) - 10;
	screenRect.y += 10;
	sliderValue = GUI.HorizontalSlider (screenRect, sliderValue, -45.0, sliderMaxValue);
	return sliderValue;
}	// end mySlider()

/*******************************************************************
*************** function to draw the text vertically ***************
************** I got this function from this website: **************
** http://answers.unity3d.com/questions/162267/vertical-text.html **
*******************************************************************/
function VerticalText(input : String) : String {
	var sb = new System.Text.StringBuilder(input.Length*2);
	
	for (var i = 0; i < input.Length; i++) {
		sb.Append(input[i]).Append("\n");
	}
	
	return sb.ToString();
}

function ResetLevel(){
	score++;
	yRotSlider = 0;
	xRotSlider = 10;
	cannonScript.shotCounter = 10;
	spaceshipScript.counterH = 0;
	shipTarget.renderer.enabled = true;
	//shipTarget.transform.position.y = spaceshipScript.startPos;
	spaceshipScript.StartPosition();
	spaceshipScript.KillFire();
	windScript.Windage();
	colorScript.SetColor();
	endRound = false;
}