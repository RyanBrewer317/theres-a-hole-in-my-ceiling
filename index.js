
let last_physics;
let start_time = Date.now();
let last_drip_time = start_time;

// "const" here means `drip_array` always refers to the same list, 
// even if the list is changing.
const drip_array = []; 

const $start_task = document.getElementById("start-task");
const $new_task = document.getElementById("new-task")
const $drip_column = document.getElementById("drip-column");

let interval;

$start_task.addEventListener("click", (e) => {
    $new_task.style.display = "none";
    last_physics = Date.now();
    clearInterval(interval);
    interval = setInterval(physics_loop, 100);
})

function physics_loop() {
    // time between physics update
    const now = Date.now();
    delta = now - last_physics;
    last_physics = now;
    // time since start of task
    elapsed_time = now - start_time;
    // make a drip if enough time has passed
    if (last_drip_time + 1000/*milliseconds*/ < now) {
        create_drip();
        last_drip_time = now;
    }
    // move drips downwards
    for (let i = 0; i < drip_array.length; i++) {
        const drip = drip_array[i];

        // if the drip is in the cup
        drip.velY -= 9.8; // gravity
        drip.posY += drip.velY;
        drip.posX += drip.velX;
        drip.element.style.bottom = drip.posY + "px";
        drip.element.style.left = drip.posX + "px";
        if (drip.posY < 0) {
            // remove drip
            $drip_column.removeChild(drip.element);
            drip_array.splice(i, 1);
            // update cup
            console.log("drip");

            i--;
        }
    }
}

function create_drip() {
    const $drip_el = document.createElement("div");
    $drip_el.classList.add("drip");
    drip_array.push(new Drip(350, 400, 0, 0, $drip_el));
    $drip_column.appendChild($drip_el);
}

class Drip {
    constructor(posX, posY, velX, velY, $element) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
        this.element = $element;
  }
}