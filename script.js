function main(){
    window.addEventListener("deviceorientation",onOrientationChange) //mobile sensor-accelerometer, gyroscope-listen to the device orientation, when it changes it trigers a call back function
    
    navigator.mediaDevices.getUserMedia({video:{
        facingMode:'environment' //so we use the back camara
}}) //we get user mide with video parameters  
    .then(function(signal){ //call back function to call the signal 
            const video=document.getElementById("myVideo");
            video.srcObject=signal;
            video.play();
        })
        .catch(function (err){
            alert(err);
        })
}

function onOrientationChange(event){//beta focuses on one axis of rotation, if the phone is facing you it would rotate towards you like a wheel
    let angle=event.beta-90; //substract 90 from beta
    if(angle<0){ // 0 to 90 degrees interval--->we dismiss any neative values to avoid contition
        angle=0; //when phone in a table angle is 0, negative values ehn phone is upside down
    }

    const distToTree=document.getElementById("mySlider").value; //we need to know the distance
    document.getElementById("myLabel").innerHTML=
        "Distance to tree: "+distToTree+" meters"; //to know the distance so the value appears
    const height=Math.tan(angle*Math.PI/180)*distToTree; //angle*Math.PI/180 in order to get angles and not radians, otherwise will get negative values
    document.getElementById("heightInfo").innerHTML=
        height.toFixed(1)+" m (" +angle.toFixed(1)+"&deg;)";

}
