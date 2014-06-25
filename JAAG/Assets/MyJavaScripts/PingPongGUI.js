// Robert Lorenzo
// This script will cause the sliders to move on their own during Test Your Reflexes mode

var cannonTarget: GameObject;	// get the cannon
var customSkin: GUISkin;		// custom GUI skin

private var cannonScript: CannonAI;		// access CannonAI script
private var guiScript: MainGUI;			// access MainGUI script
private var stopMovingV : boolean = false;
private var stopMovingH : boolean = false;
private var xPos = Screen.width*0.5;		// half screen width
private var yPos = Screen.height*0.5;		// half screen height

function Start()
{
	GetGameobjects();	
	GetScripts();
}

function GetGameobjects()
{
	cannonTarget = GameObject.FindGameObjectWithTag("Cannon");		//cannon object
	if (cannonTarget == null)
	{
		Debug.Log("No cannon for PingPong");
	}
}

function GetScripts()
{
	cannonScript = cannonTarget.GetComponent(CannonAI);		// script for cannon
	guiScript = Camera.main.GetComponent(MainGUI);	// get the script
}

function OnGUI() {
	GUI.skin = customSkin;	// my custom skin for this GUI
	
	if(guiScript.endRound == false)
	{
		if (stopMovingV == false)
		{
			if (GUI.Button(Rect(90, (yPos * 2) - 210, 120, 120), "Stop\nVertical", GUI.skin.GetStyle("Octagon Button")))
			{
				stopMovingV = true;
			}
		}
		if (stopMovingV == true && stopMovingH == false)
		{
			if (GUI.Button(Rect(90, (yPos * 2) - 210, 120, 120), "Stop\nHorizontal", GUI.skin.GetStyle("Octagon Button")))
			{
				stopMovingH = true;
			}
		}
	}
}

function Update() 
{	
	if (cannonScript.gameOver != true)
	{
		if (stopMovingH == false && stopMovingV == false)
		{
			guiScript.verticalSlider = 10 + Mathf.PingPong(15*Time.time, 80);
		}
		if (stopMovingH == false && stopMovingV == true)
		{
			guiScript.horizontalSlider = 45 - Mathf.PingPong(15*Time.time, 90);
		}
		if (stopMovingH == true && stopMovingV == true)
		{
			cannonScript.FireCannon();
			MakeFalse();
		}
	}
}

function MakeFalse () 
{
	stopMovingV = false;
	stopMovingH = false;
}

function CheckMoving() : boolean
{
	if(stopMovingH && stopMovingV)
	{
		return true;
	}
	else
	{
		return false;
	}
}