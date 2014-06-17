#pragma strict
// Robert Lorenzo
// Touch Controls for JAAG
// for Senior Project 
// Nov 2013

private var guiScript: GUITest;			// this is used to access the GUI script
private var deltaY : float;
private var deltaX : float;
var customSkin: GUISkin;		// custom GUI skin

function Start () {
	guiScript = Camera.main.GetComponent(GUITest);	// get the script
}

function Update () {
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Moved)
	{
		guiScript.yRotSlider += Input.GetTouch(0).deltaPosition.x/10.0;
		if (guiScript.yRotSlider >= 45)
		{
			guiScript.yRotSlider = 45;
		}
		else if (guiScript.yRotSlider <= -45)
		{
			guiScript.yRotSlider = -45;
		}
		
		guiScript.xRotSlider += Input.GetTouch(0).deltaPosition.y/5.0;
		if (guiScript.xRotSlider >= 80)
		{
			guiScript.xRotSlider = 80;
		}
		else if (guiScript.xRotSlider <= 0)
		{
			guiScript.xRotSlider = 0;
		}		
	}	
}