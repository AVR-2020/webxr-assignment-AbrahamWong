// For reading this array:
//      X: Wall
//      S: Start
//      F: Finish
//      O: Room
//      A: Objectives A -> Toolbox
//      B: Objective B  -> Gas Canisters (6)
// Create a 6 x 6 x 6 box to simulate a room, also 
// create a trigger on reaching the finish AND all
// objective obtained.

var roomLayout = 
[
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "F", "O", "X", "X", "X", "X", "X", "O", "O", "O", "O", "O", "O", "X"],
    ["X", "X", "O", "O", "O", "O", "O", "X", "O", "X", "X", "O", "X", "O", "X"],
    ["X", "X", "O", "X", "X", "X", "O", "X", "O", "O", "X", "O", "X", "B", "X"],
    ["X", "A", "O", "X", "O", "O", "O", "O", "O", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "O", "O", "O", "O", "X", "X", "X"],
    ["X", "O", "X", "X", "X", "X", "X", "X", "O", "X", "X", "O", "O", "X", "X"],
    ["X", "O", "B", "X", "B", "O", "O", "O", "X", "X", "X", "O", "X", "X", "X"],
    ["X", "O", "X", "X", "X", "O", "X", "X", "X", "O", "X", "O", "O", "X", "X"],
    ["X", "O", "O", "X", "O", "O", "O", "O", "O", "O", "X", "O", "X", "X", "X"],
    ["X", "O", "X", "X", "X", "X", "X", "O", "X", "X", "X", "O", "O", "X", "X"],
    ["X", "O", "B", "X", "B", "O", "O", "O", "O", "O", "X", "O", "X", "B", "X"],
    ["X", "O", "X", "X", "X", "X", "X", "O", "X", "X", "X", "O", "X", "O", "X"],
    ["X", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "S", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],    
];

AFRAME.registerComponent("game_enviroment", {
    schema: {
        wallLength: { type: "int", default: 2 },
        wallWidth: { type: "int", default: 2 },
        wallHeight: { type: "int", default: 4 },
        toolboxLeft: { type: "int", default: 0 },
        jerryCanLeft: { type: "int", default: 0 }
    },

    init: function() {
        let data = this.data;
        let scene = document.querySelector("#scene");
        let el = this.el;

        console.log(`${data.wallLength}, ${data.wallHeight}, ${data.wallWidth}`)

        try {
            roomLayout.forEach((arrayElement, arrayIndex) => {
                var coord_z = (arrayIndex - arrayElement.length) * data.wallWidth;

                arrayElement.forEach((element, index) => {
                    var coord_x = (index - element.length) * data.wallLength;

                    switch (element) {
                        case "X":
                            var theWall = document.createElement("a-box");

                            console.log(`${coord_x} 2 ${coord_z}`);
                            theWall.setAttribute("position", `${coord_x} 2 ${coord_z}`);
                            theWall.setAttribute("scale", `${data.wallLength} ${data.wallHeight} ${data.wallWidth}`);
                            scene.appendChild(theWall);

                            theWall.setAttribute("static-body", "");
                            theWall.setAttribute("src", "#wall");
                            break;
                        case "S":
                            var camera = document.querySelector("#camera");

                            console.log(`S: ${coord_x} 2 ${coord_z}`);
                            camera.setAttribute("position", `${coord_x} 1.6 ${coord_z}`);
                            break;
                        case "F":
                            console.log(`F: ${coord_x} 2 ${coord_z}`);
                            break;
                        case "A":
                            var entityT = document.createElement("a-entity");

                            console.log(`Toolbox: ${coord_x} 0.1 ${coord_z}`);
                            entityT.setAttribute("objectives", "objName: toolbox");
                            entityT.setAttribute("scale", "0.005 0.005 0.005");
                            entityT.setAttribute("position", `${coord_x} 0.2 ${coord_z}`);
                            entityT.setAttribute("objectives", "objName: toolbox");
                            entityT.setAttribute("gltf-model", "#asset_toolbox");
                            entityT.setAttribute("dynamic-body", "");
                            entityT.setAttribute("light", "distance: 2; intensity: 2; type: point;");
                            
                            scene.appendChild(entityT);
                            data.toolboxLeft += 1;
                            break;
                        case "B": 
                            var entityJ = document.createElement("a-entity");

                            console.log(`Jerry Can: ${coord_x} 0.1 ${coord_z}`);
                            entityJ.setAttribute("objectives", "objName: jerrycan");
                            entityJ.setAttribute("gltf-model", "#asset_jerry_can");
                            entityJ.setAttribute("scale", "0.05 0.05 0.05");
                            entityJ.setAttribute("position", `${coord_x} 0.5 ${coord_z}`);
                            entityJ.setAttribute("objectives", "objName: toolbox");
                            entityJ.setAttribute("dynamic-body", "");
                            entityJ.setAttribute("light", "distance: 2; intensity: 2; type: point;");

                            scene.appendChild(entityJ);
                            data.jerryCanLeft += 1;
                            break;
                    }
                });
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    },
})