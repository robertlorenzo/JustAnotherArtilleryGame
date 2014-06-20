#pragma strict
// Robert Lorenzo
// Touch Controls for JAAG
// for Senior Project 
// Nov 2013

private var guiScript: MainGUI;			// this is used to access the GUI script
private var deltaY : float;
private var deltaX : float;
var customSkin: GUISkin;		// custom GUI skin

function Start () {
	guiScript = Camera.main.GetComponent(MainGUI);	// get the script
}

function Update () {
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Moved)
	{
		guiScript.horizontalSlider += Input.GetTouch(0).deltaPosition.x/10.0;
		if (guiScript.horizontalSlider >= 45)
		{
			guiScript.horizontalSlider = 45;
		}
		else if (guiScript.horizontalSlider <= -45)
		{
			guiScript.horizontalSlider = -45;
		}
		
		guiScript.verticalSlider += Input.GetTouch(0).deltaPosition.y/5.0;
		if (guiScript.verticalSlider >= 80)
		{
			guiScript.verticalSlider = 80;
		}
		else if (guiScript.verticalSlider <= 0)
		{
			guiScript.verticalSlider = 0;
		}		
	}	
}