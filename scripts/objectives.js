AFRAME.registerComponent('objectives', {
    schema: {
        objName: { type: "string", default: null }
    },

    init: function() {
        let el = this.el;
        let data = this.data;
        let env = document.querySelector("#game_env");
        let envData = env.getAttribute("game_enviroment");

        el.addEventListener('click', ev => {
            console.log(`%c${data.objName}`, "font-size: 2em");
            
            switch (data.objName) {
                case "toolbox":
                    envData.toolboxLeft -= 1;
                    console.log(envData);
                    el.components.sound.playSound();
                    this.spawnText(envData.toolboxLeft, "objT");

                    setTimeout(() => {el.remove() }, 1000);
                    break;

                case "jerrycan":
                    envData.jerryCanLeft -= 1;
                    console.log(envData);
                    el.components.sound.playSound();
                    this.spawnText(envData.jerryCanLeft, "objJ");

                    setTimeout(() => {el.remove() }, 1000);
                    break;

                case "generator":
                    // All toolbox and jerry can retrieved
                    if (envData.toolboxLeft == 0 && envData.jerryCanLeft == 0) {
                        // Fix the generator, set the boolean to TRUE
                        envData.generatorFixed = true;
                        el.components.sound.playSound();

                        // Tell the player to click the gate to finish the game
                        var alertF = document.createElement("a-entity");
                        alertF.setAttribute("text", `
                            value: Click the gate to finish!;
                            align: center;
                            width: 200;
                        `);
                        alertF.setAttribute("position", "0 90 55");
                        ev.srcElement.appendChild(alertF);

                        // Set light to be more bright
                        var lightD = document.querySelector("#directional_light");
                        var lightA = document.querySelector("#ambient_light")

                        lightD.setAttribute("light", "intensity: 0.6; castShadow: true");
                        lightA.setAttribute("light", "intensity: 0.6 color: #BBB; type: ambient");
                        setTimeout(_ => {alertF.remove()}, 3000);

                    } else if (envData.toolboxLeft != 0) {
                        // Encouraged to find the toolbox left.
                        var alertT = document.createElement("a-entity");

                        alertT.setAttribute("text", `
                            value: You need to find ${envData.toolboxLeft} more toolbox;
                            align: center;
                            width: 200;
                        `);
                        alertT.setAttribute("position", "0 90 55");
                        ev.srcElement.appendChild(alertT);

                        setTimeout(_ => {alertT.remove()}, 3000);
                    } else if (envData.jerryCanLeft != 0) {
                        // Encouraged to find the missing jerry cans.
                        var alertJ = document.createElement("a-entity");

                        alertJ.setAttribute("text", `
                            value: You need to find ${envData.jerryCanLeft} more jerry cans;
                            align: center;
                            width: 200;
                        `);
                        alertJ.setAttribute("position", "0 90 55");
                        ev.srcElement.appendChild(alertJ);

                        setTimeout(_ => {alertJ.remove()}, 3000);
                    }
                    break;

                case "exit":
                    if (envData.generatorFixed) {
                        // Congrats! You finished the puzzle.
                        envData.timeFinish = Date.now();

                        var timeToFinish = Math.floor((envData.timeFinish - envData.timeStart) / 100) / 10;
                        var camera = document.querySelector("#camera");

                        camera.setAttribute("position", "-8 4 -8");
                        console.log(`Start: ${envData.timeStart}\nFinish: ${envData.timeFinish}\nDur: ${timeToFinish} sec`);

                        this.spawnText(timeToFinish, "time");

                        // Epic victory royale music
                        var winning = document.querySelector("#win_s");
                        winning.components.sound.playSound();
                    }
                    break;
            }
        })
    }, 

    spawnText: function(msg, format) {
        var eye = document.querySelector("#eye");
        var text = document.createElement("a-entity");

        if (format == "time") {
            text.setAttribute("text", `value: You did it! You escaped the facility!\nTime: ${msg} second; width: 2; align: center;`);
            text.setAttribute("position", "0 -0.65 -1");
            eye.appendChild(text);
        } else if (format == "objT") {
            text.setAttribute("text", `value: You collected a toolbox!\n${msg != 0? msg : "No toolbox"} remaining; width: 2; align: center;`);
            text.setAttribute("position", "0 -0.65 -1");
            eye.appendChild(text);
            setTimeout(_ => {text.remove()}, 2000);
        } else if (format == "objJ") {
            text.setAttribute("text", `value: You collected a jerrycan!\n${msg != 0? msg : "No jerrycan"} remaining; width: 2; align: center;`);
            text.setAttribute("position", "0 -0.65 -1");
            eye.appendChild(text);
            setTimeout(_ => {text.remove()}, 2000);
        }
        
    }
});