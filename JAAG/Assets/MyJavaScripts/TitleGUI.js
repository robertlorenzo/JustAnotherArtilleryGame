#pragma strict
// Robert Lorenzo
// GUI for title screen to JAAG

var customSkin : GUISkin;
private var sw : float = Screen.width;
private var sh : float = Screen.height;

function OnGUI()
{
	GUI.skin = customSkin;
	//This is for android
	#if UNITY_ANDROID
	TitleLabel();
	TestYourAim(sw * 0.239583, "PlayerControlled_NoShadows");
	TestYourReflexes(sw * 0.2552083, sw * 0.239583, "PingPongControlled_NoShadows");
	Instructions(sw * 0.5052083, sw * 0.239583);
	Quit();
	#else
	//This is for web
	TitleLabel();
	TestYourAim(sw * 0.322916, "PlayerControlled");
	TestYourReflexes(sw * 0.3385416, sw * 0.322916, "PingPongControlled");
	Instructions(sw * 0.671875, sw * 0.322916);
	#endif
}

function TitleLabel()
{
	GUI.Label(Rect(0, sh * 0.33333333, sw, sh * 0.17), "J.A.A.G.\n(Just Another Artillery Game)", GUI.skin.GetStyle("Title"));
}

function TestYourAim(width : float, level : String)
{
	if (GUI.Button(Rect(sw * 0.0052083, sh * 0.583, width, sh * 0.167), "Test\nyour\naim"))
	{
		Application.LoadLevel(level);
	}
}

function TestYourReflexes(tyrX : float, tyrW : float, level : String)
{
	if (GUI.Button(Rect(tyrX, sh * 0.583, tyrW, sh * 0.167), "Test\nyour\nreflexes"))
	{
		Application.LoadLevel(level);
	}
}

function Instructions(iX : float, iW : float)
{
	if (GUI.Button(Rect(iX, sh * 0.583, iW, sh * 0.167), "Instructions"))
	{
		Application.LoadLevel("Instructions");
	}
}

function Quit()
{
	if (GUI.Button(Rect(sw * 0.7552083, sh * 0.583, sw * 0.239583, sh * 0.167), "Quit")){
		Application.Quit();
	}
}