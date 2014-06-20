@script RequireComponent(AudioSource)
#pragma strict
// Robert Lorenzo

// this code controls the cannon
// by Dr. Wei Xu (Modified by Robert Lorenzo)
// for Game Physics
// (Modified Feb 13)

// Further Modified For Senior Project Preperation
// July 2013

var bullet: Transform;					// this is prefabed bullet
var speed: int;							// speed of the bullet
var xRot: float;						// for rotation of the "target" along x axis
var yRot: float;						// for rotation of the "target" along y axis
var shotCounter: int = 10;				// count how many times the cannon can be fired
var gameOver : boolean;					// game over state
var shootTime : float;					// variable to make sure there is only one cannonball on screen
var cannonFireSound : AudioClip;		// sound clip for when the cannon fires
var firstShot : boolean;				// has the first shot been fired?

private var bulletScript: BulletAI; 	// this is used to access the script inside a bullet.
private var guiScript: MainGUI;			// this is used to access the GUI script
private var hitCounter: int;			// count how many times the spaceship gets hit

function Start()
{
	guiScript = Camera.main.GetComponent(MainGUI);	// get the script
	shootTime = 120;
	firstShot = false;
}	// end Start()

function Update () 
{	
	hitCounter = guiScript.hitCount;	// how many times the spaceship has been hit
	
	// value of the horizonal angle slider to control rotation of the cannon
	xRot = guiScript.verticalSlider;					
	transform.localEulerAngles.x = (-1 * xRot);	// rotate cannon
	
	// value of the vertical angle slider to control elevation of the cannon
	yRot= guiScript.horizontalSlider;
	transform.localEulerAngles.y = yRot;	// rotate cannon 
	
	shootTime++;		// 24 fps * 3 seconds = 72 for FireCannon()
	
	if (hitCounter < 4 && shotCounter > 0) //To end the round
		gameOver = false;
	else
		gameOver = true;
}	// end Update()

function FireCannon()
{
	if (gameOver==false && shootTime >= 72)
	{
		firstShot = true;
		PlaySound(cannonFireSound);
		
		var bulletInstance: Transform = Instantiate(bullet, transform.position, Quaternion.identity);
	 		
		bulletScript = bulletInstance.GetComponent(BulletAI);	// get the handle of the script inside the bullet
		bulletScript.speed = speed;
		bulletScript.cannon = transform;   						// myself
		bulletScript.startLocation = transform.Find("tip"); 	// find a child named "tip" and assign it as the start location of the bullet
		
		shootTime = 0;
	}
}

function PlaySound(i : AudioClip)
{
	audio.clip = i;
	audio.Play();
}