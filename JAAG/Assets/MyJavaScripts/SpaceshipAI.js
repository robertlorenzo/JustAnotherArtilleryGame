#pragma strict
// By Robert Lorenzo
// Scrpit to make the spaceship behave
// for Game Physics midterm
// Feb 2013

// Further Modified For Senior Project Preperation
// July 2013

var explosionPrefab: Transform; // an explosion prefab
var smokePrefab: Transform;		// a smoke prefab
var counterH: int;				// times the ship has been hit
var startPos : float;			// starting position
var randPos : float;			// random number for x position
var xPos : float;				// x position from randPos
var smokeCase : int;			// for deciding which smoke to use
var smokeLoc: Transform;					// position of the smoke

private var ySpeed: float;					// speed for lowering the spaceship
private var xSpeed: float;					// speed for moving the spaceship side to side
private var deltaY: float;					// Y position divided by 4, to move the ship down when it gets hit
private var deltaX: float;					// the change in x direction, unknown 
private var newPos: float;					// new position of the ship, to move the ship down when it gets hit
private var firePos: Vector3;				// position of the fire
private var bulletScript: BulletAI; 		// this is used to access the script inside a bullet.
private var guiScript: GUITest;				// this is used to access the script for the GUI
private var explosionInstance : Transform;	// instantiated explosion
private var smokeInstance: Transform;		// instanciated smoke

function Start () {
	guiScript = Camera.main.GetComponent(GUITest);
	if (guiScript == null){
		print ("guiScript is null on Spaceship");
	}
	// get a random number from -100 to 100. divide that number by 100 to get a decimal
	randPos = (Random.Range(-100.0, 100.0))/100.0;
	if (randPos > 0){
		randPos += 1;
	} else {
		randPos -= 1;
	}
	transform.position.x = randPos;	// random starting x position
	transform.position.y += 40;		// starting position is y + 40	
	startPos = transform.position.y;
	deltaY = transform.position.y / 4;	// variable to move ship down 1/4 of height
}	// end Start()

function HitShip ()
{
	counterH++;	// spaceship got hit
	// The player only needs 4 hits to win the round so...
	if (counterH >= 4){	// ...if hit counter is above 4...
		counterH = 4;	// ...set it down to 4.
	}	// end if()
	
	ySpeed = 20;
	newPos = transform.position.y - deltaY;
	
	// get a new random number from -100 to 100, then divide it by 100 - the score, giving us a bigger number as the score increases.
	randPos = (Random.Range(-100.0, 100.0))/(100.0 - guiScript.score);
	if (randPos > 0){
		randPos += (guiScript.score+1);
	} else {
		randPos -= (guiScript.score+1);
	}
	
	xPos = (guiScript.score+1) * randPos;	// multiply the random number by score+1 to get an even bigger number
	if (xPos > 45) { xPos = 45; }
	if (xPos < -45) { xPos = -45; }
	
	deltaX = xPos - transform.position.x;
	xSpeed = deltaX/deltaY * ySpeed;
}	// end HitShip()

function Fire()
{
	firePos = transform.position + Vector3(0,3,0);
	explosionInstance = Instantiate(explosionPrefab, firePos, Quaternion.identity);
}	// end Fire()

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
function Update() {
	transform.Rotate(Vector3.up, Time.deltaTime * 80);
	
	if (xPos > transform.position.x){
		transform.position.x += xSpeed * Time.deltaTime;
		if (transform.position.x >= xPos){ xSpeed = 0; }
	} else {
		transform.position.x += xSpeed * Time.deltaTime;
		if (transform.position.x <= xPos){ xSpeed = 0; }
	}
	
	transform.position.y += -ySpeed * Time.deltaTime;
	if(transform.position.y <= newPos && counterH==1){
		ySpeed = 0;
		if (!smokeInstance){ Smoke(); }
	}	// end if()
	if(transform.position.y <= newPos && counterH==2){
		ySpeed = 0;
		//Destroy(smokeInstance.gameObject);
	}	// end while()
	if(transform.position.y <= newPos && counterH==3){
		ySpeed = 0;
	}	// end while()
	if(transform.position.y <= newPos && counterH==4){
		ySpeed = 0;
	}	// end while()
	if (transform.position.y < 0){
		if (renderer.enabled == true){
			KillSmoke();
		}
		renderer.enabled = false;	// spaceship disappears when it "crashes"
		if (!explosionInstance){ Fire(); }	// end if()
	}	// end if()
}