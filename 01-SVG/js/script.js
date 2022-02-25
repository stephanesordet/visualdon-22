const rectangle = document.getElementById("rectangle");
const cercle = document.getElementById("extCircle");
rectangle.onclick = changeColor;
cercle.onmouseenter = changeRadius;
cercle.onmouseleave = changeRadius;

function changeColor(){
    if(document.getElementById("rectangle").style.fill == "red"){
        document.getElementById("rectangle").style.fill = "black";
        return;
    }
    document.getElementById("rectangle").style.fill = "red";
    
}

function changeRadius(){
    if(document.getElementById("extCircle").getAttribute("r") != 100 ){
        document.getElementById("extCircle").setAttribute("r", 100);
        return;
    }
    document.getElementById("extCircle").setAttribute("r", 60);
    
}