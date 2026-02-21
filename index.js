
let last_physics;
let start_time = Date.now();
let last_drip_time = start_time;

// "const" here means `drip_array` always refers to the same list, 
// even if the list is changing.
const drip_array = []; 
let num_drips = 0;

const $start_task = document.getElementById("start-task");
const $restart_task = document.getElementById("restart-task");
const $new_task = document.getElementById("new-task");
const $complete_task = document.getElementById("complete-task");
const $drip_column = document.getElementById("drip-column");
const $task_name = document.getElementById("task-name");
const $task_duration = document.getElementById("task-duration");
const $cup = document.getElementById("cup");

let interval;

let task_name;

$start_task.addEventListener("click", (e) => {
    $new_task.hidden = true;
    last_physics = Date.now();
    clearInterval(interval);
    interval = setInterval(physics_loop, 1);
    task_name = $task_name.value;
    const task_duration = $task_duration.value * 60 * 1000; // covert from minutes to ms
    // set a timeout for task end
    setTimeout((e) => {
        clearInterval(interval)
        $complete_task.hidden = false;
    }, task_duration) 
})

$restart_task.addEventListener("click", (e) => {
    $complete_task.hidden = true;
    $new_task.hidden = false;
})

function physics_loop() {
    // time since start of task
    const now = Date.now();
    elapsed_time = now - start_time;
    // time between physics update
    const delta = (now - last_physics) / 1000; // delta in seconds
    last_physics = now;
    
    // make a drip if enough time has passed
    const seconds_per_drip = 3;
    if (last_drip_time + seconds_per_drip * 1000 /*milliseconds*/ < now) {
        create_drip();
        last_drip_time = now;
    }
    // move drips downwards
    for (let i = 0; i < drip_array.length; i++) {
        const drip = drip_array[i];

        drip.velY -= 300 * delta; // gravity
        drip.posY += drip.velY * delta;
        drip.posX += drip.velX * delta;
        drip.element.style.bottom = drip.posY + "px";
        drip.element.style.left = drip.posX + "px";
        // if the drip is in the cup
        if (drip.posY < 0) {
            // remove drip
            $drip_column.removeChild(drip.element);
            drip_array.splice(i, 1);
            // update cup
            num_drips ++;
            $cup.innerHTML = task_name + num_drips;

            i--;
        }
    }
}

function create_drip() {
    const $drip_el = document.createElement("div");
    $drip_el.classList.add("drip");
    
    drip_array.push(new Drip(350, 400, random_centered(10), random_centered(10), $drip_el));
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

// util functions

function random_in_range(min, max) {
    return Math.random() * (min - max) - min;
}

function random_centered(max) {
    return random_in_range(-max, max)
}

