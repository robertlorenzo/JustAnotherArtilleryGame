@script RequireComponent(AudioSource)
#pragma strict
// Robert Lorenzo
// this code controls the cannon

var shotCounter : int = 10;			// count how many times the cannon can be fired
var gameOver : boolean;				// game over state
var firstShot : boolean;			// has the first shot been fired?
var bullet : Transform;				// this is prefabed bullet
var cannonFireSound : AudioClip;	// sound clip for when the cannon fires

private var speed : int;				// speed of the bullet
private var xRot : float;				// for rotation of the "target" along x axis
private var yRot : float;				// for rotation of the "target" along y axis
private var shootTime : float;			// variable to make sure there is only one cannonball on screen
private var bulletScript : BulletAI;	// this is used to access the script inside a bullet.
private var guiScript : MainGUI;		// this is used to access the GUI script
private var spaceship : GameObject;		// this is the gameobject spaceship
private var spaceshipScript : SpaceshipAI;	//this is used to access the script on the spaceship
private var hitCounter : int;			// count how many times the spaceship gets hit

function Start()
{
	GetGameobjects();
	GetScripts();
	SetTime();
	SetSpeed();
	SetFirstShot(false);
}

function Update () 
{
	MoveCannon();
	SetGameOver();
}

function GetGameobjects()
{
	spaceship = GameObject.FindGameObjectWithTag("Spaceship");		//spaceship object
	if (spaceship == null)
	{
		Debug.Log ("No ship for the cannon.");
	}
}

function GetScripts()
{
	guiScript = Camera.main.GetComponent(MainGUI);			// get the script
	spaceshipScript = spaceship.GetComponent(SpaceshipAI);	// *
}

function SetTime()
{
	shootTime = Time.timeSinceLevelLoad;
}

function SetSpeed()
{
	speed = 100;
}

function SetFirstShot(tf : boolean)
{
	firstShot = tf;
}

function MoveCannon()
{
	// value of the horizonal angle slider to control rotation of the cannon
	xRot = guiScript.verticalSlider;					
	transform.localEulerAngles.x = (-1 * xRot);	// rotate cannon
	
	// value of the vertical angle slider to control elevation of the cannon
	yRot= guiScript.horizontalSlider;
	transform.localEulerAngles.y = yRot;	// rotate cannon 
}

function SetGameOver()
{
	hitCounter = spaceshipScript.counterH;	// how many times the spaceship has been hit
	
	if (hitCounter < 4 && shotCounter > 0) //To end the round
		gameOver = false;
	else
		gameOver = true;
}

function FireCannon()
{
	if (!gameOver && GetTime() >= 3.0)
	{
		PlaySound(cannonFireSound);
		ShootBullet();		
		SetTime();
		if(!firstShot)
		{
			SetFirstShot(true);
		}
	}
}

function GetTime() : float
{
	var difference : float = Time.timeSinceLevelLoad - shootTime;
	return difference;
}

function PlaySound(i : AudioClip)
{
	audio.clip = i;
	audio.Play();
}

function ShootBullet()
{
	var bulletInstance: Transform = Instantiate(bullet, transform.position, Quaternion.identity);
	 		
	bulletScript = bulletInstance.GetComponent(BulletAI);	// get the handle of the script inside the bullet
	bulletScript.speed = speed;
	bulletScript.cannon = transform;   						// myself
	bulletScript.startLocation = transform.Find("tip"); 	// find a child named "tip" and assign it as the start location of the bullet
}