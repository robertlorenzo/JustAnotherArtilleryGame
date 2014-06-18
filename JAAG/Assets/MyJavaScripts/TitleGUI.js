#pragma strict
// Robert Lorenzo
// July 2013
// GUI for title screen to cannon firing game
// for Senior Project Preperation

var customSkin : GUISkin;
private var screenX : float = Screen.width * 0.5;
private var screen2X : float = Screen.width;
private var screenY : float = Screen.height * 0.5;
private var screen2Y : float = Screen.height;

function Start () {
	//print (screenX +", " + screenY);
}

function Update () {

}

function OnGUI(){
	GUI.skin = customSkin;
	
	//This is for mobile
	#if UNITY_ANDROID
	GUI.Label(Rect(screenX - 100, screenY - 100, 200, 100), "J.A.A.G.\n(Just Another Artillery Game)", GUI.skin.GetStyle("Title"));
	
	if (GUI.Button(Rect(5, screenY + 50, screenX/2-10, 100), "Test\nyour\naim")){
		Application.LoadLevel("PlayerControlled_NoShadows");
	}
	if (GUI.Button(Rect(screenX/2+5, screenY + 50, screenX/2-10, 100), "Test\nyour\nreflexes")){
		Application.LoadLevel("PingPongControlled_NoShadows");
	}
	if (GUI.Button(Rect(screenX+5, screenY + 50, screenX/2-10, 100), "Instructions")){
		Application.LoadLevel("Instructions");
	}
	if (GUI.Button(Rect(screenX*1.5+5, screenY + 50, screenX/2-10, 100), "Quit")){
		Application.Quit();
	}
	#else
	//This is for web
	GUI.Label(Rect(0, screenY - 100, screen2X, 100), "J.A.A.G.\n(Just Another Artillery Game)", GUI.skin.GetStyle("Title"));
	
	if (GUI.Button(Rect(5, screenY + 50, screen2X/3-10, 100), "Test\nyour\naim")){
		Application.LoadLevel("PlayerControlled_NoShadows");
	}
	if (GUI.Button(Rect((screen2X/3)+5, screenY + 50, screen2X/3-10, 100), "Test\nyour\nreflexes")){
		Application.LoadLevel("PingPongControlled_NoShadows");
	}
	if (GUI.Button(Rect(((screen2X/3)*2)+5, screenY + 50, screen2X/3-10, 100), "Instructions")){
		Application.LoadLevel("Instructions");
	}
	#endif
}