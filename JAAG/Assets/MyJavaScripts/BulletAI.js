@script RequireComponent(AudioSource)
#pragma strict
//Robert Lorenzo
//this code is to control the bullet shot from the cannon.

var startLocation:Transform;   	// the location of bullet when it is shot. 
var explosionPrefab: Transform; // an explosion prefab
var fireworksPrefab: Transform;	// a fireworks prefab
var cannon: Transform;   		// the cannon to shoot from
var speed: float = 1;			// speed of the bullet; assigned by the cannon
var shipHit : AudioClip;		// audio for when the bullet hits the ship
var terrainHit : AudioClip;		// audio for when the buttle hits the terrain

private var level : int;
private var spaceship: GameObject;		// spaceship object
private var windForce: Vector3;			// assigned by WindBehavior.js
private var allForces: Vector3;			// wind + gravity
private var lightObj : GameObject;		// obj holding the wind script
private var velocity: Vector3; 
private var gravityForce: Vector3;
private var shipScript: SpaceshipAI;	// accessing spaceshipAI
private var ppGuiScript: PingPongGUI;	// accessing PingPongGUI
private var mainGuiScript: MainGUI;		// accessing MainGUI
private var windScript : WindBehavior;	// accessing WindBehavior
private var cannonScript: CannonAI;		// accessing cannonAI

function Start () 
{
	GetGameobjects();
	GetScripts();
	GetForces();
	GetLevel();
}

function Update () 
{
	MoveTheBullet();
	
	if (transform.position.y <= -1)
	{	
		BulletCleanup("Under Terrain");
	}
}

function OnTriggerEnter (other : Collider)
{
	BulletCleanup(other.transform.tag);
}

function GetGameobjects()
{
	spaceship = GameObject.FindGameObjectWithTag("Spaceship");	//Assign spaceship
	if (spaceship == null)
	{
		Debug.Log("No spaceship on bullet.");
	}
	lightObj = GameObject.FindGameObjectWithTag("ShadowLight");	//Assign Light
	if (lightObj == null){
		Debug.Log("No lightObj on bullet.");
	}
}

function GetScripts()
{
	shipScript = spaceship.GetComponent(SpaceshipAI);		// get the script
	windScript = lightObj.GetComponent(WindBehavior);		// get the script
	ppGuiScript = Camera.main.GetComponent(PingPongGUI);	// get the script
	mainGuiScript = Camera.main.GetComponent(MainGUI);		// get the script
	cannonScript = cannon.GetComponent(CannonAI);			// get the script
}

function GetForces()
{
	velocity = speed * cannon.forward;
	gravityForce = Vector3(0, -50, 0);
	windForce = Vector3(windScript.wind, 0, 0);
	allForces = (windForce + gravityForce);
}

function GetLevel()
{
	level = Application.loadedLevel;
}

function MoveTheBullet()
{
	velocity += allForces * Time.deltaTime;
	transform.position += velocity * Time.deltaTime;
}

function BulletCleanup(where : String)
{
	if(where=="Spaceship")
	{
		shipScript.HitShip();
		cannonScript.PlaySound(shipHit);
		Fireworks();
	}
	else if(where == "Terrain")
	{
		cannonScript.PlaySound(terrainHit);
		Explosion();
	}
	if(level == 3 || level == 5)
	{
		ppGuiScript.MakeFalse(); //to ping pong the sliders in "Test your reflexes"	
	}
	cannonScript.shotCounter --;
	Destroy(gameObject);  // destroy the bullet
	
}

function Explosion()
{
	var explosionInstance: Transform = Instantiate(explosionPrefab, transform.position, Quaternion.identity);
	Destroy(explosionInstance.gameObject, 3);
}

function Fireworks()
{
	var fireworksInstance: Transform = Instantiate(fireworksPrefab, transform.position, Quaternion.identity);
	Destroy(fireworksInstance.gameObject, 1);
}