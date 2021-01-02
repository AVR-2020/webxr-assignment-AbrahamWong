AFRAME.registerComponent('flashlight', {
    schema: {
        grabbed: { type: "boolean", default: false }
    },

    init: function() {
        let el = this.el;
        let data = this.data;
        
        el.addEventListener('click', ev => {
            let positionObject = ev.srcElement.object3D.position;

            ev.srcElement.setAttribute("position", "0.2 1.4 -0.2");
            ev.srcElement.setAttribute("static-body", "");
            ev.srcElement.removeAttribute("dynamic-body");
            ev.srcElement.setAttribute("rotation", "-90 0 0");                    

            data.grabbed = true;

            console.log(ev.srcElement);
        });

        
        let flashDirection = document.querySelector("#flashlightfront");
        console.log(flashDirection);
    }, 

    // Temporarily, the flashlight will follow the camera, aka the HMD.
    tick: function(time, timeDelta) {
        let data = this.data;
        let el = this.el;
        if (data.grabbed) {
            let camera = document.querySelector("#camera");
            let cameraRotation = camera.getAttribute("rotation");
            let cameraPosition = camera.getAttribute("position");

            el.setAttribute('rotation', `${-90 + cameraRotation.x} ${cameraRotation.y} ${cameraRotation.z}`);
            el.setAttribute('position', `${cameraPosition.x} ${cameraPosition.y - 0.3} ${cameraPosition.z - .1}`);
        }
    }
});