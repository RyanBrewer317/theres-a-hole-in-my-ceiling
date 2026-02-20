start_time = undefined;
document.getElementById("start-task").addEventListener("click", (e) => {
    document.getElementById("new-task").style.display = "none";
    start_time = Date.now();
    last_physics = Date.now();
})

total_drips = 0
drip_array = []
last_physics = undefined
function physics_loop() {
    // time between physics update
    delta = Date.now() - last_physics;
    last_physics = Date.now()
    // time since start of task
    elapsed_time = Date.now() - start_time;
    // make a drip if enough time has passed
    if (elapsed_time < total_drips) {
        create_drip();
        total_drips += 1;
    }
    // move drips downwards
    for (drip_instance of drip_array) {
        // if the drip is in the cup
        if (drip_instance) {
            // remove drip
            // update cup
        }
    }
}

setInterval(physics_loop, 100)

function create_drip() {
    drip_array.push(new drip(0, 0, 0, 0));
    document.appendChild(document.createElement("div#drip"));
}

class drip {
    constructor(posX, posY, velX, velY) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
  }
}