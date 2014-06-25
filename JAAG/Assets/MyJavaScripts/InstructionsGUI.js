#pragma strict
// This script is for the instruction screen.

var scoreScreen : Texture2D;
var bulletScreen : Texture2D;
var shipHitsScreen: Texture2D;
var shadowScreen: Texture2D;
var sliderVScreen: Texture2D;
var sliderHScreen: Texture2D;
var fireScreen: Texture2D;
var stopHScreen: Texture2D;
var stopVScreen: Texture2D;
var lArrow: Texture2D;
var rArrow: Texture2D;

var customSkin : GUISkin;

private var counter: int = 0;

function OnGUI ()
{
	GUI.skin = customSkin;
	
	switch(counter)
	{
		case 0:
			DrawInstructionSlide(bulletScreen);
			break;
		case 1:
			DrawInstructionSlide(scoreScreen);
			break;
		case 2:
			DrawInstructionSlide(shipHitsScreen);
			break;
		case 3:
			DrawInstructionSlide(shadowScreen);
			break;
		case 4:
			DrawInstructionSlide(sliderVScreen);
			break;
		case 5:
			DrawInstructionSlide(sliderHScreen);
			break;
		case 6:
			DrawInstructionSlide(fireScreen);
			break;
		case 7:
			DrawInstructionSlide(stopVScreen);
			break;
		case 8:
			DrawInstructionSlide(stopHScreen);
			break;
		default:
			Application.LoadLevel(1);
			break;	
	}
	LeftArrow();
	RightArrow();
	QuitButton();
}

function DrawInstructionSlide(slide : Texture2D)
{
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), slide, ScaleMode.StretchToFill, true);
}

function LeftArrow()
{
	if (GUI.Button(Rect(110, (Screen.height/2) - 120, 100, 80), lArrow, "Label"))
	{
		if (counter > 0)
			counter--;
		else
			counter = 8;
	}
}

function RightArrow()
{
	if (GUI.Button(Rect(Screen.width - 110, (Screen.height/2) - 120, 100, 80), rArrow, "Label"))
	{
		if (counter < 8)
			counter++;
		else
			counter = 0;
	}
}

function QuitButton()
{
	if (GUI.Button(Rect(Screen.width - 160, Screen.height - 80, 160, 80), "Quit to\nmain menu"))
	{
		Application.LoadLevel(0);
	}
}