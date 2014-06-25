#pragma strict
// By Robert Lorenzo
// Scrpit to make the spaceship move

var explosionPrefab: Transform; // an explosion prefab
var smokePrefab: Transform;		// a smoke prefab
var hitCounter: int;			// times the ship has been hit
var startPos : float;			// starting position
var randPos : float;			// random number for x position
var xPos : float;				// x position from randPos
var smokeLoc: Transform;		// position of the smoke

private var scaleVar : float;
private var ySpeed: float;					// speed for lowering the spaceship
private var xSpeed: float;					// speed for moving the spaceship side to side
private var deltaY: float;					// Y position divided by 4, to move the ship down when it gets hit
private var newPos: float;					// new position of the ship, to move the ship down when it gets hit
private var firePos: Vector3;				// position of the fire
private var cannonTarget : GameObject;		// the cannon GameObject
private var bulletScript: BulletAI; 		// this is used to access the script inside a bullet.
private var guiScript: MainGUI;				// this is used to access the script for the GUI
private var cannonScript : CannonAI;		// this is used to access the script for the cannon
private var explosionInstance : Transform;	// instantiated explosion
private var smokeInstance: Transform;		// instanciated smoke

function Start ()
{
	GetGameobjects();
	GetScripts();
	StartPositionX();
	StartPositionY();
}

function Update() {
	ShootMe();
	Spin();
	MoveX();
	MoveY();
}

function GetGameobjects()
{
	cannonTarget = GameObject.FindGameObjectWithTag("Cannon");		//cannon object
	if (cannonTarget == null){
		Debug.Log("No cannon object on Spaceship");
	}
}

function GetScripts()
{
	guiScript = Camera.main.GetComponent(MainGUI);
	cannonScript = cannonTarget.GetComponent(CannonAI);
}

function StartPositionX()
{
	randPos = RandomDecimal();
	if (randPos > 0)
	{
		randPos++;
	}
	else
	{
		randPos--;
	}
	transform.position.x = randPos;	// random starting x position	
}

function RandomDecimal() : float
{
	var temp : float = (Random.Range(-100.0, 100.0)) / 100.0;
	return temp;
}

function StartPositionY()
{
	var f_startRand : float = Mathf.Abs(RandomDecimal());
	var f_startPos : float = f_startRand * 25.0;
	f_startPos = f_startPos + 75.0;
	var f_startPercentage : float = f_startPos / 100.0;
	Debug.Log(f_startPercentage * 50);
	startPos = f_startPercentage * 50.0;
	transform.position.y += startPos;
	deltaY = transform.position.y / 4;	// variable to move ship down 1/4 of height
}

function HitShip ()
{
	newPos = transform.position.y - deltaY;
	IncrementHitCounter();	
	ySpeed = 20;
	xSpeed = GetDeltaX() / deltaY * ySpeed;
}

function IncrementHitCounter()
{
	hitCounter++;	// spaceship got hit
	// The player only needs 4 hits to win the round so...
	if (hitCounter >= 4)// ...if hit counter is above 4...
	{
		hitCounter = 4;	// ...set it down to 4.
	}
}

function GetDeltaX() : float
{
	randPos = RandomDecimal();
	if (randPos > 0)
	{
		randPos += (guiScript.score+1);
	}
	else
	{
		randPos -= (guiScript.score+1);
	}
	xPos = randPos * (guiScript.score+1);	// multiply the random number by score+1 to get an even bigger number
	if (xPos > 45)
	{
		xPos = 45;
	}
	if (xPos < -45)
	{
		xPos = -45;
	}
	var deltaX : float = xPos - transform.position.x;
	return deltaX;
}

function Fire()
{
	firePos = transform.position + Vector3(0,3,0);
	explosionInstance = Instantiate(explosionPrefab, firePos, Quaternion.identity);
}

function KillFire(){
	Destroy(explosionInstance.gameObject);
}

function Smoke(){
	var smokePos = smokeLoc.transform.position;
	smokeInstance = Instantiate(smokePrefab, smokePos, Quaternion.identity);
	smokeInstance.transform.parent = transform;
}

function KillSmoke(){
	Destroy(smokeInstance.gameObject);
}

function ShootMe()
{
	if(cannonScript.firstShot == false)
	{
		scaleVar = 1.0 + Mathf.PingPong(Time.time * 1.5, 1.0);
		transform.localScale = Vector3(scaleVar, scaleVar, scaleVar);
	}
	else
	{
		transform.localScale = Vector3.one;
	}
}

function Spin()
{
	transform.Rotate(Vector3.up, Time.deltaTime * 80);
}

function MoveX()
{
	if (xPos > transform.position.x)
	{
		transform.position.x += xSpeed * Time.deltaTime;
		if (transform.position.x >= xPos)
		{
			xSpeed = 0;
		}
	}
	else
	{
		transform.position.x += xSpeed * Time.deltaTime;
		if (transform.position.x <= xPos)
		{
			xSpeed = 0;
		}
	}
}

function MoveY()
{
	transform.position.y += -ySpeed * Time.deltaTime;
	if(transform.position.y <= newPos && hitCounter==1)
	{
		ySpeed = 0;
		if (!smokeInstance)
		{
			Smoke();
		}
	}
	if(transform.position.y <= newPos && hitCounter==2)
	{
		ySpeed = 0;
	}
	if(transform.position.y <= newPos && hitCounter==3)
	{
		ySpeed = 0;
	}
	if(transform.position.y <= newPos && hitCounter==4)
	{
		ySpeed = 0;
	}
	if (transform.position.y < 0)
	{
		if (renderer.enabled)
		{
			KillSmoke();
		}
		renderer.enabled = false;	// spaceship disappears when it "crashes"
		if (!explosionInstance)
		{
			Fire();
		}
	}
}