function main() {
    console.log("Main function started");

    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
        console.log("DeviceOrientation supported");
        window.addEventListener("deviceorientation", onOrientationChange);
    } else {
        console.log("Device orientation not supported on this device.");
        alert("Device orientation not supported on this device.");
    }
    // Check for camera permission and then getUserMedia
    navigator.permissions.query({ name: 'camera' }).then(function(permissionStatus) {
        console.log('Camera permission status:', permissionStatus.state);

        if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
            navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' } // Back camera
            })
            .then(function(signal) {
                console.log("Camera access granted");
                const video = document.getElementById("myVideo");
                video.srcObject = signal;
                video.play();
            })
            .catch(function(err) {
                console.error("Camera error: " + err);
                alert("Camera error: " + err);
            });
        } else {
            alert("Camera access denied or unavailable.");
        }
    }).catch(function(err) {
        console.error("Permission query error: " + err);
    });
}

function onOrientationChange(event) {
    console.log("Orientation changed: Beta = " + event.beta);

    let angle = event.beta - 90;
    if (angle < 0) {
        angle = 0;
    }

    const distToTree = document.getElementById("mySlider").value;
    document.getElementById("myLabel").innerHTML = 
        "Distance to tree: " + distToTree + " meters";
    const height = Math.tan(angle * Math.PI / 180) * distToTree;
    document.getElementById("heightInfo").innerHTML =
        height.toFixed(1) + " m (" + angle.toFixed(1) + "&deg;)";
}

