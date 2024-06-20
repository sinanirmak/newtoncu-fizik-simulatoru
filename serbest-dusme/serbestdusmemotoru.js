init ();
function init(){
    h = parseFloat(document.querySelector("#height").value);
    g = parseFloat(document.querySelector("#gravity").value);

    t = Math.sqrt((2*h)/g);
    
    document.querySelector(".screen").style.height = (10*h) + "px";
    document.querySelector(".mass").style.top = -100 + "px";

    document.querySelector("#remainingHeight").innerText = h;
    document.querySelector("#velocity").innerText = 0;
}

function birakma(){
    motion = true;
    isPaused = false;
    document.querySelector("#durdur").disabled = false;

    // SAYAÇ
    var elapsed = 0;
    var timer = setInterval(function(){
        if (!isPaused){
            elapsed++

            // anlık hız
            v = 0 + (g * elapsed)/100;
            document.querySelector("#velocity").innerText = v;

            // düşey yerdeğiştirme (displacement) (yatay hareket yok) (delta x)
            dx = (g * (elapsed/100) ** 2) / 2;
            remainingheight = parseFloat(h - dx).toFixed(2);
            document.querySelector("#remainingHeight").innerText = remainingheight;

            document.querySelector(".mass").style.top = (10 * dx - 100) + "px";

            if (elapsed == t * 100){
                clearInterval(timer);
            }
        }
    }, 10)
}

function durdurdevam(){
    if (!isPaused) {
        isPaused = true;
    } else {
        isPaused = false;
    }
}