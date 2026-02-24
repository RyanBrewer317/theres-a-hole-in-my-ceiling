
class Drip {
    constructor(posX, posY, velX, velY, $element) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
        this.element = $element;
    }
    step(delta) {
        // 2042 = (9.8m/s^2)*(500px/2.4m). Meters cancel, leaving px/s^2
        // 500px is the viewport height, 2.4m is the irl room height
        this.velY -= 2042 * delta; // delta is in seconds, so velY is in px/s
        this.posY += this.velY * delta; // so posY and posX are in px
        this.posX += this.velX * delta;
    }
    draw() {
        this.element.style.bottom = this.posY + "px";
        this.element.style.left = this.posX + "px";
    }
}

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
const $water = document.getElementById("water");

let interval;

let task_name;

$start_task.addEventListener("click", (e) => {
    $new_task.hidden = true;
    $water.style.maxHeight = "0";
    const now = Date.now();
    start_time = now;
    last_physics = now;
    task_name = $task_name.value;
    const task_in_minutes = $task_duration.value;
    const task_duration = task_in_minutes * 60 * 1000; // covert from minutes to ms
    clearInterval(interval);
    interval = setInterval(()=>physics_loop(task_duration), 1);
    // set a timeout for task end
    setTimeout((e) => {
        $water.style.maxHeight = "100px";
        clearInterval(interval)
        const old_tasks_completed_str = localStorage.getItem("tasks-completed") || "";
        const new_tasks_completed_str = old_tasks_completed_str + "\"" + encodeURI(task_name) + "\"" + task_in_minutes;
        localStorage.setItem("tasks-completed", new_tasks_completed_str);
        draw_completed_tasks();
        drip_array.map(drip=>$drip_column.removeChild(drip.element));
        drip_array.length = 0;
        $complete_task.hidden = false;
    }, task_duration) 
})

$restart_task.addEventListener("click", (e) => {
    $complete_task.hidden = true;
    $new_task.hidden = false;
})

function physics_loop(task_duration) {
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
        drip.step(delta);
        // if the drip is in the cup
        if (drip.posY < 0) {
            // remove drip
            $drip_column.removeChild(drip.element);
            drip_array.splice(i, 1);
            // update cup
            num_drips++;
            $water.style.maxHeight = (100 * elapsed_time / task_duration) + "px";

            // splicing means the next array item went down in position,
            // to the current item's position.
            i--; // this compensates; it'll cancel out with the i++
            continue;
        }
        drip.draw();
    }
}

function create_drip() {
    const $drip_el = document.createElement("div");
    $drip_el.classList.add("drip");
    const drip = new Drip(
        350, // starting x position, px
        400, // starting y position, px
        random_centered(10), // starting x velocity, -10px/s < v < 10px/s
        0, // starting y velocity, px/s
        $drip_el, // the dom element
    );
    drip_array.push(drip);
    $drip_column.appendChild($drip_el);
}

function random_centered(radius) {
    // 0 < Math.random() < 1
    // 0 < Math.random()*(2r) < 2r     (multiply by 2r)
    // -r < Math.random()*(2r)-r < r   (subtract r)
    // therefore, this returns a value between -r and r
    return Math.random() * (2 * radius) - radius;
}

function draw_completed_tasks() {
    const completed_tasks_str = localStorage.getItem("tasks-completed");
    const completed_tasks_pieces = completed_tasks_str.split("\"");
    const $completed_tasks_list = document.getElementById("completed-tasks-temp");
    $completed_tasks_list.innerHTML = "<button onclick=\"localStorage.clear();draw_completed_tasks();\">clear</button>";
    // the stored tasks format is `"name1"time1"name2"time2` etc.
    // so we split it on the quotation marks, into ["", "name1", "time1", "name2", "time2"]
    // i = 1 skips the first one, i += 2 means we progress in twos
    for (let i = 1; i < completed_tasks_pieces.length; i += 2) {
        const name = decodeURI(completed_tasks_pieces[i]);
        const minutes = parseInt(completed_tasks_pieces[i+1]);
        const $p = document.createElement("p");
        const $name = document.createElement("i");
        $name.innerHTML = name;
        $p.appendChild($name);
        $p.appendChild(document.createTextNode(
            ": " + minutes + (minutes == 1? " minute" : " minutes")
        ));
        $completed_tasks_list.appendChild($p);
    }
}

draw_completed_tasks();