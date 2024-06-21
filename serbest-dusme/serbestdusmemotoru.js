init ();
setSpeed(0);
function init(){
    h = parseFloat(document.querySelector("#height").value).toFixed(2);
    g = parseFloat(document.querySelector("#gravity").value).toFixed(2);

    t = Math.sqrt((2*h)/g);

    vcrash = g * t;
    
    stopTime = parseFloat(document.querySelector("#timeStop").value).toFixed(2);
    if (stopTime != 0){
        document.querySelector("#timeElapsed").innerHTML = "0s, <small>t = " + stopTime + " anında durdurlacak.</small>";

    } else {
        document.querySelector("#timeElapsed").innerHTML = "0";
    }

    document.querySelector("#remainingHeight").innerText = h;
    document.querySelector("#velocity").innerText = 0;

    document.querySelector(".screen").innerHTML = "<div class='mass'></div><div id='details' style='background-color: rgba(0, 0, 0, 0.5); width: 50px;'></div>"

    document.querySelector(".screen").style.height = (10*h) + "px";
    document.querySelector(".mass").style.top = -100 + "px";

    setSpeed(document.querySelector("#simSpeed").value);
}

function birakma(){
    isPaused = false;
    document.querySelector("#durdur").disabled = false;
    document.querySelector("#yenidenFirlat").disabled = true;

    // SAYAÇ
    elapsed = 0;

    timer = setInterval(function(){
        if (!isPaused){
            elapsed++
            document.querySelector("#timeElapsed").innerText = parseFloat(elapsed/100).toFixed(2);

            // anlık hız
            v = 0 + (g * elapsed)/100;
            document.querySelector("#velocity").innerText = v;

            // düşey yerdeğiştirme (displacement) (yatay hareket yok) (delta x)
            dx = (g * (elapsed/100) ** 2) / 2;
            remainingheight = parseFloat(h - dx).toFixed(2);
            document.querySelector("#remainingHeight").innerText = remainingheight;

            document.querySelector(".mass").style.top = (10 * dx - 100) + "px";

            console.log(remainingheight)

            if (remainingheight <= 0){
                finishMotion()
            }

            if (stopTime != 0){
                if (stopTime == parseFloat(elapsed / 100).toFixed(2)){
                    durdurdevam();
                }
            }
        }
    }, mp)
}

function yenidenbirakma(){
    clearInterval(timer);
    init();
    birakma();
}

function durdurdevam(){
    if (!isPaused) {
        isPaused = true;
        document.querySelector("#yenidenFirlat").disabled = false;
    } else {
        isPaused = false;
        document.querySelector("#yenidenFirlat").disabled = true;
    }
}

function finishMotion(){
    clearInterval(timer);
    isPaused = true;
    document.querySelector("#yenidenFirlat").disabled = false;

    // Milimetrik Sapmaları Yoksaymak İçin:
    document.querySelector("#remainingHeight").innerText = 0;
    document.querySelector(".mass").style.top = (10*h - 100) + "px";
}

function setSpeed(x){
    if (x == 0) mp = 10;
    else if (x == -1) mp = 20;
    else if (x == -2) mp = 50;
    else if (x == 1) mp = 1;
}