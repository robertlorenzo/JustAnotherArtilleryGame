@script RequireComponent(AudioSource)
#pragma strict
// Robert Lorenzo

// this code is to control a bullet flyinng from a cannon.
// by Dr. Wei Xu (Modified by Robert Lorenzo)
// for Game Physics class
// Summer'12 (Modified Feb 13)

// Further Modified For Senior Project Preperation
// July 2013

var startLocation:Transform;   	// the location of bullet when it is shot. 
var explosionPrefab: Transform; // an explosion prefab
var fireworksPrefab: Transform;	// a fireworks prefab
var shipTar: GameObject;		// spaceship object
var cannon: Transform;   		// the cannon to shoot
var speed: float = 1;			// speed of the bullet; assigned by the cannon
var windForce: Vector3;			// assigned by WindBehavior.js
var allForces: Vector3;			// wind + gravity
var lightObj : GameObject;		// obj holding the wind script
var smokeLoc : GameObject;		// location of smoke or fireworksto be emitted
var shipHit : AudioClip;		// audio for when the bullet hits the ship
var terrainHit : AudioClip;		// audio for when the buttle hits the terrain

private var velocity: Vector3; 
private var gravityForce: Vector3;
private var shipScript: SpaceshipAI;	// accessing spaceshipAI
private var guiScript: PingPongGUI;		// accessing PingPongGUI
private var guiTestScript: GUITest;		// accessing GUITest
private var windScript : WindBehavior;	// accessing WindBehavior
private var cannonScript: CannonAI;		// accessing cannonAI

function Start () 
{
	shipTar = GameObject.FindGameObjectWithTag("Spaceship");	//Assign spaceship
	if (shipTar == null)
	{
		print("no ship");
	}
	lightObj = GameObject.FindGameObjectWithTag("ShadowLight");	//Assign Light
	if (lightObj == null){
		print ("no lightObj");
	}
	smokeLoc = GameObject.FindGameObjectWithTag("SmokeLoc");	// Assign smoke location
	if (smokeLoc == null){
		print ("No smokeLoc for bullet");
	}
	shipScript = shipTar.GetComponent(SpaceshipAI);		// get the script
	windScript = lightObj.GetComponent(WindBehavior);	// get the script
	guiScript = Camera.main.GetComponent(PingPongGUI);	// get the script
	guiTestScript = Camera.main.GetComponent(GUITest);	// get the script
	cannonScript = cannon.GetComponent(CannonAI);		// get the script
	
	transform.position = startLocation.position; 
	velocity = speed * cannon.forward;
	gravityForce = Vector3(0, -50, 0);
	windForce = Vector3(windScript.wind, 0, 0);
	allForces = (windForce + gravityForce);
	//print ("All forces: " + allForces);  
}	// end Start()

function Update () 
{
	velocity += allForces * Time.deltaTime;
	transform.position += velocity * Time.deltaTime;	
	
	// destroy the bullet if it is under the ground
	if (transform.position.y <= -1)
	{	
		cannonScript.shotCounter --;
		guiScript.MakeFalse(); //to ping pong the sliders in "Test your reflexes"
		Destroy(gameObject);  // destroy the bullet
	}	// end if
}	// end Update()

function OnTriggerEnter (other : Collider)
{
	if (other.transform.tag == "Terrain")
	{
		cannonScript.shotCounter --;
		cannonScript.PlaySound(terrainHit);
		var explosionInstance: Transform = Instantiate(explosionPrefab, transform.position, Quaternion.identity);
		Destroy(explosionInstance.gameObject, 3);
		Destroy(gameObject);
		if (guiTestScript.level == 1)
		{
			guiScript.MakeFalse();//to ping pong the sliders in "Test your reflexes"
		}
	}
	if (other.transform.tag == "Spaceship")
	{
		cannonScript.shotCounter --;
		cannonScript.PlaySound(shipHit);
		//instantiate fireworks prefab for a destructive effect
		var fireworksInstance: Transform = Instantiate(fireworksPrefab, transform.position, Quaternion.identity);
		Destroy(fireworksInstance.gameObject, 1);
		shipScript.HitShip();
		Destroy(gameObject);
		if (guiTestScript.level == 1)
		{
			guiScript.MakeFalse();//to ping pong the sliders in "Test your reflexes"
		}
	}
}	// end OnTriggerEnter()