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
            if (data.objName == "toolbox") {
                envData.toolboxLeft -= 1;
                console.log(envData);
            } else if (data.objName == "jerrycan") {
                envData.jerryCanLeft -= 1;
                console.log(envData);
            }
            el.remove();
        })
    }
});