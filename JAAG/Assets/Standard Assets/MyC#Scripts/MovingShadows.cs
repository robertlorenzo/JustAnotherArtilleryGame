using UnityEngine;
using System.Collections;

public class MovingShadows : MonoBehaviour {
	public float windSpeedX;
	public float windSpeedZ;
	// make this equal to the light's cookie size parameter in the inspector
	public float lightCookieSize;
	
	Vector3 initPos;
	
	void Start () {
		initPos = transform.position;
	}
	
	void Update () {
		if (Mathf.Abs(transform.position.x) >= Mathf.Abs(initPos.x) + lightCookieSize){
			Vector3 pos = transform.position;
			pos.x = initPos.x;
			transform.position = pos;
		} else {
			transform.Translate(Time.deltaTime * windSpeedX, 0, 0, Space.World);	
		}
		
		if (Mathf.Abs(transform.position.z) >= Mathf.Abs(initPos.z) + lightCookieSize){
			Vector3 pos = transform.position;
			pos.z = initPos.z;
			transform.position = pos;
		} else {
			transform.Translate(0, 0, Time.deltaTime * windSpeedZ, Space.World);
		}
	}
}
