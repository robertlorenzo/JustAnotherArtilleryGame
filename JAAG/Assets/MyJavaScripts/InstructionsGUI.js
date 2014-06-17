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

var counter: int = 0;

function OnGUI (){
	switch(counter){
		case 0:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), bulletScreen, ScaleMode.StretchToFill, true);
			break;
		case 1:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), scoreScreen, ScaleMode.StretchToFill, true);
			break;
		case 2:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), shipHitsScreen, ScaleMode.StretchToFill, true);
			break;
		case 3:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), shadowScreen, ScaleMode.StretchToFill, true);
			break;
		case 4:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), sliderVScreen, ScaleMode.StretchToFill, true);
			break;
		case 5:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), sliderHScreen, ScaleMode.StretchToFill, true);
			break;
		case 6:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), fireScreen, ScaleMode.StretchToFill, true);
			break;
		case 7:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), stopVScreen, ScaleMode.StretchToFill, true);
			break;
		case 8:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), stopHScreen, ScaleMode.StretchToFill, true);
			break;
		default:
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), stopHScreen, ScaleMode.StretchToFill, true);
			break;	
	}
	
	if (GUI.Button(Rect(Screen.width - 110, (Screen.height/2) - 120, 100, 80), rArrow, "Label")){
		if (counter <= 7)
			counter++;
		else
			counter = 0;
	}
	if (GUI.Button(Rect(110, (Screen.height/2) - 120, 100, 80), lArrow, "Label")){
		if (counter >= 1)
			counter--;
		else
			counter = 8;
	}
	if (GUI.Button(Rect(Screen.width - 100, Screen.height - 80, 100, 80), "Quit to\nmain menu")){
		Application.LoadLevel(0);
	}
}

function Update() {

}