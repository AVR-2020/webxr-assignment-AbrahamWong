// For reading this array:
//      X: Wall
//      S: Start
//      F: Finish       -> Need Generator to power up and a keycard to open
//          G: Gate     -> Opens when A, B, and C is completed.
//      O: Room
//      A: Objectives A -> Toolbox
//      B: Objective B  -> Gas Canisters (6)
//      C: Objective C  -> Generator -> Need a toolbox, and 
//                                      gas canisters to power up
// Create a 6 x 6 x 6 box to simulate a room, also 
// create a trigger on reaching the finish AND all
// objective obtained.

var roomLayout = 
[
    ["X", "G", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "F", "C", "X", "X", "X", "X", "X", "O", "O", "O", "O", "O", "O", "X"],
    ["X", "O", "O", "O", "O", "O", "O", "X", "O", "X", "X", "O", "X", "O", "X"],
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

var roomDebug = [
    ["X", "G", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "F", "C", "X", "X", "X", "X", "X", "O", "O", "O", "O", "O", "O", "X"],
    ["X", "O", "O", "O", "O", "O", "O", "X", "O", "X", "X", "O", "X", "O", "X"],
    ["X", "X", "S", "X", "X", "X", "O", "X", "O", "O", "X", "O", "X", "O", "X"],
    ["X", "A", "O", "X", "O", "O", "O", "O", "O", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "O", "O", "O", "O", "X", "X", "X"],
    ["X", "O", "X", "X", "X", "X", "X", "X", "O", "X", "X", "O", "O", "X", "X"],
    ["X", "O", "O", "X", "O", "O", "O", "O", "X", "X", "X", "O", "X", "X", "X"],
    ["X", "O", "X", "X", "X", "O", "X", "X", "X", "O", "X", "O", "O", "X", "X"],
    ["X", "O", "O", "X", "O", "O", "O", "O", "O", "O", "X", "O", "X", "X", "X"],
    ["X", "O", "X", "X", "X", "X", "X", "O", "X", "X", "X", "O", "O", "X", "X"],
    ["X", "O", "O", "X", "O", "O", "O", "O", "O", "O", "X", "O", "X", "O", "X"],
    ["X", "O", "X", "X", "X", "X", "X", "O", "X", "X", "X", "O", "X", "O", "X"],
    ["X", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],    
];

AFRAME.registerComponent("game_enviroment", {
    schema: {
        wallLength: { type: "int", default: 2 },
        wallWidth: { type: "int", default: 2 },
        wallHeight: { type: "int", default: 4 },
        toolboxLeft: { type: "int", default: 0 },
        jerryCanLeft: { type: "int", default: 0 },
        generatorFixed: { type: "boolean", default: false },
        timeStart: { type: "number", default: 0 },
        timeFinish: { type: "number", default: 0 },
    },

    init: function() {
        let data = this.data;
        let scene = document.querySelector("#scene");
        let el = this.el;

        console.log(`${data.wallLength}, ${data.wallHeight}, ${data.wallWidth}`)

        try {
            roomDebug.forEach((arrayElement, arrayIndex) => {
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
                        case "O":
                            var theFloor = document.createElement("a-box");

                            this.createFloor(coord_x, coord_z, data.wallLength, data.wallWidth);
                            break;
                        case "S":
                            var camera = document.querySelector("#camera");

                            console.log(`S: ${coord_x} 2 ${coord_z}`);
                            camera.setAttribute("position", `${coord_x} 0 ${coord_z}`);

                            this.createFloor(coord_x, coord_z, data.wallLength, data.wallWidth);
                            break;
                        case "F":
                            this.createFloor(coord_x, coord_z, data.wallLength, data.wallWidth);
                            console.log(`F: ${coord_x} 2 ${coord_z}`);
                            break;
                        case "G":
                            var entity = document.createElement("a-entity");
                            var wallLeft = document.createElement("a-entity");
                            var wallRight = document.createElement("a-entity");
                            var wallUp = document.createElement("a-entity");
                            var gate = document.createElement("a-entity");

                            wallLeft.setAttribute("mixin", "gate_side");
                            wallLeft.setAttribute("position", `${coord_x - 0.75} 2 ${coord_z}`);
                            wallLeft.setAttribute("material", "src: #wall");
                            entity.appendChild(wallLeft);

                            wallRight.setAttribute("mixin", "gate_side");
                            wallRight.setAttribute("position", `${coord_x + 0.75} 2 ${coord_z}`);
                            wallRight.setAttribute("material", "src: #wall");
                            entity.appendChild(wallRight);

                            wallUp.setAttribute("mixin", "gate_up");
                            wallUp.setAttribute("position", `${coord_x} 3 ${coord_z}`);
                            wallUp.setAttribute("material", "");
                            entity.appendChild(wallUp);

                            // Can be instantiated with objectives component? idk?
                            gate.setAttribute("mixin", "gate_door");
                            gate.setAttribute("id", "gatedoor");
                            gate.setAttribute("objectives", "objName: exit");
                            gate.setAttribute("position", `${coord_x} 1 ${coord_z}`);
                            entity.appendChild(gate);

                            entity.setAttribute("id", "test_gate");
                            scene.appendChild(entity);

                            this.createFloor(coord_x, coord_z, data.wallLength, data.wallWidth);
                            break;
                        case "A":
                            this.createFloor(coord_x, coord_z, data.wallLength, data.wallWidth);
                            
                            var entityT = document.createElement("a-entity");

                            console.log(`Toolbox: ${coord_x} 0.1 ${coord_z}`);
                            entityT.setAttribute("objectives", "objName: toolbox");
                            entityT.setAttribute("scale", "0.005 0.005 0.005");
                            entityT.setAttribute("position", `${coord_x} 0.2 ${coord_z}`);
                            entityT.setAttribute("gltf-model", "#asset_toolbox");
                            entityT.setAttribute("dynamic-body", "");
                            entityT.setAttribute("light", "distance: 2; intensity: 2; type: point;");
                            
                            scene.appendChild(entityT);
                            data.toolboxLeft += 1;
                            break;
                        case "B": 
                            this.createFloor(coord_x, coord_z, data.wallLength, data.wallWidth);
                            
                            var entityJ = document.createElement("a-entity");

                            console.log(`Jerry Can: ${coord_x} 0.5 ${coord_z}`);
                            entityJ.setAttribute("objectives", "objName: jerrycan");
                            entityJ.setAttribute("gltf-model", "#asset_jerry_can");
                            entityJ.setAttribute("scale", "0.05 0.05 0.05");
                            entityJ.setAttribute("position", `${coord_x} 0.5 ${coord_z}`);
                            entityJ.setAttribute("dynamic-body", "");
                            entityJ.setAttribute("light", "distance: 2; intensity: 1; type: point;");

                            scene.appendChild(entityJ);
                            data.jerryCanLeft += 1;
                            break;
                        case "C":
                            this.createFloor(coord_x, coord_z, data.wallLength, data.wallWidth);
                            
                            var entityG = document.createElement("a-entity");

                            console.log(`Generator: ${coord_x} 0.1 ${coord_z}`);
                            entityG.setAttribute("objectives", "objName: generator");
                            entityG.setAttribute("gltf-model", "#asset_generator");
                            entityG.setAttribute("scale", "0.01 0.01 0.01");
                            entityG.setAttribute("position", `${coord_x + 0.5} 0.1 ${coord_z}`);
                            entityG.setAttribute("rotation", `0 -90 0`);
                            entityG.setAttribute("static-body", "");
                            entityG.setAttribute("light", "distance: 4; intensity: 1; type: point;");

                            scene.appendChild(entityG);
                            data.generatorFixed = false;

                            break;
                    }
                });
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }

        data.timeStart = Date.now();
    },

    createFloor: function(x, z, length, width) {
        var theFloor = document.createElement("a-box");

        console.log(`${x} -0.5 ${z}`);
        theFloor.setAttribute("position", `${x} -0.5 ${z}`);
        theFloor.setAttribute("scale", `${length} 1 ${width}`);
        theFloor.setAttribute("checkpoint", "offset: 0 0.5 0");
        scene.appendChild(theFloor);

        theFloor.setAttribute("static-body", "");
        theFloor.setAttribute("src", "#mosaic_floor");
    }
})