var pattern = [];
var k = 0;
var level = 1;
var started = false;


function make_pattern() {
    var num = Math.random();
    num = Math.floor(num * 4) + 1;
    pattern.push(num);
}


function toggle(j) {
        document.getElementById(j).classList.toggle("fade");
}


function show_pattern() {
    var i = 0;
    var check = false;
    var iD = setInterval(() => {
        if (check == true) {
            // console.log(`${pattern[i]} fadedout`);
            toggle(pattern[i]);
            check = false;
            i++;
        }
        else {
            // console.log(`${pattern[i]} fadedin`);
            toggle(pattern[i]);
            check = true;
        }
        if (i == pattern.length) {
            // console.log("interval cleared and k=" + k);
            clearInterval(iD);
        }
    }, 300);
}


$(".box").on("click", function (event) {
    var id = Number(event.currentTarget.id);
    document.getElementById(id).classList.add("pressed");
    setTimeout(() => {
        document.getElementById(id).classList.remove("pressed");
    }, 200);
    if (started == true) {
        if (id != pattern[k]) {
            // console.log("id=" + id);
            // console.log("k=" + k)
            // console.log("box=" + pattern[k]);
            $("h1").html("GAME OVER<br><br>SELECTED WRONG BOX");
            pattern = [];
            started = false;
            setTimeout(() => {
                $("h1").html('TO START NEW GAME PRESS "a"');
            }, 2000)
        }
        else {
            k++;
            if (k == pattern.length) {
                make_pattern();
                level++;
                k = 0;
                started = false;
                setTimeout(() => {
                    $("h1").html("Level " + level);
                    show_pattern();
                }, 700)
                started = true;
            }
        }
    }
})


$(document).on("keypress", function (event) {
    if (started == false && event.key == 'a') {
        started = true;
        level = 1;
        $("h1").html("Level " + level);
        make_pattern();
        show_pattern();
        k = 0;
    }
});