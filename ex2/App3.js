// constante globale
const pixelRatio = window.devicePixelRatio;
// variable globale
let monCanvas;
let mesOutils;
let screenDivider = 8;
let zoom = 0
let zoom2 = 0
let zoom3 = 0

let cpt = 0;

let slideDown = 0
let angle = 270;
let angle2 = 90;


let isAnimated = false;
function start() {

  //constante locale
  monCanvas = document.getElementById("ecal");
  monCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  monCanvas.height = (window.innerHeight - 60 * pixelRatio) * pixelRatio;
  monCanvas.style.width = window.innerWidth - 60 * pixelRatio;
  monCanvas.style.height = window.innerHeight - 60 * pixelRatio;

  mesOutils = monCanvas.getContext("2d");

  document.addEventListener("click", (e) => {
    isAnimated = !isAnimated;
  });

  // lancement de la fonction de dessin
  animate(); 
}

function animate() {
  mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);
  dessine();

  if (isAnimated) {
    angle += 2.5;
    angle2 += 2.5;
  //zoom += 0.1

    //slideDown += 2;
  }
  if (angle == 360){
  cpt++
  //zoom += 0.1

  }
  
  if (angle >= 360) 
   {
    
    angle = 0;
   }
  requestAnimationFrame(animate);
}


function CreerCercle(x0,y0,a,color){
  mesOutils.strokeStyle = color;
  mesOutils.lineWidth = 2;
  mesOutils.lineCap = "round";
  mesOutils.beginPath();
  mesOutils.arc(x0, y0+slideDown, (a+zoom) * pixelRatio, 0, Math.PI*2, true);
  mesOutils.stroke();
  mesOutils.closePath();

}


function dessine() {

    const nb = 5;

  let x = monCanvas.width / 2;
  let y = monCanvas.height / 2;
  
    let x1 = Math.cos(angle * (Math.PI / 180)) * (nb+zoom) * pixelRatio + x;
    let y1 = Math.sin(angle * (Math.PI / 180)) * (nb+zoom) * pixelRatio + y;
  
    let x2 = Math.cos(angle * (Math.PI / 180)) * (nb+1+zoom) * pixelRatio + x1;
    let y2 = Math.sin(angle * (Math.PI / 180)) * (nb+1+zoom) * pixelRatio + y1;
  
    let x3 = Math.cos(angle * (Math.PI / 180)) * (nb+2+zoom) * pixelRatio + x2;
    let y3 = Math.sin(angle * (Math.PI / 180)) * (nb+2+zoom) * pixelRatio + y2;
    
    let x4 = Math.cos(angle * (Math.PI / 180)) * (nb+3+zoom) * pixelRatio + x3;
    let y4 = Math.sin(angle * (Math.PI / 180)) * (nb+3+zoom) * pixelRatio + y3;
  
    let x5 = Math.cos(angle * (Math.PI / 180)) * (nb+4+zoom) * pixelRatio + x4;
    let y5 = Math.sin(angle * (Math.PI / 180)) * (nb+4+zoom) * pixelRatio + y4;

    let x6 = Math.cos(angle * (Math.PI / 180)) * (nb+5+zoom) * pixelRatio + x5;
    let y6 = Math.sin(angle * (Math.PI / 180)) * (nb+5+zoom) * pixelRatio + y5;

    for (let i = 0; i < 7; i++){

    CreerCercle(x,y,nb*i,"black")}


for (let i = 0; i < nb; i++){
    CreerCercle(x,y,nb*i,"black")
    CreerCercle(x1,y1,nb*i,"black")
    CreerCercle(x2,y2,nb*i,"black")
    CreerCercle(x3,y3,nb*i,"black")
    CreerCercle(x4,y4,nb*i,"black")
    CreerCercle(x5,y5,nb*i,"black")
    CreerCercle(x6,y6,nb*i,"black")
}






  // //cercle depart
  // mesOutils.strokeStyle = "black";
  // mesOutils.lineWidth = 2;
  // mesOutils.lineCap = "round";
  // mesOutils.beginPath();
  // mesOutils.arc(x, y+slideDown, (150+zoom) * pixelRatio, 0, Math.PI*2, true);
  // mesOutils.stroke();
  // mesOutils.closePath();

  // //millieu rond
  // mesOutils.fillStyle = "black";
  // mesOutils.beginPath();
  // mesOutils.arc(x, y+slideDown, (40+zoom) * pixelRatio, 0, 360 * (Math.PI / 180), true);
  // mesOutils.fill();
  // mesOutils.closePath();
  
  // //2eme cercle
  
  // mesOutils.strokeStyle = "black";
  // mesOutils.lineWidth = 2;
  // mesOutils.lineCap = "round";
  // mesOutils.beginPath();
  // mesOutils.arc(x1, y1+slideDown, (150/2+zoom) * pixelRatio, 0, Math.PI*2, true);
  // mesOutils.stroke();
  // mesOutils.closePath();
  
  // mesOutils.fillStyle = "black";
  // mesOutils.beginPath();
  // mesOutils.arc(x1, y1+slideDown, (40/2+zoom) * pixelRatio, 0, 360 * (Math.PI / 180), true);
  // mesOutils.fill();
  // mesOutils.closePath();
  
  // //3eme cercle
  
  // mesOutils.strokeStyle = "black";
  // mesOutils.lineWidth = 2;
  // mesOutils.lineCap = "round";
  // mesOutils.beginPath();
  // mesOutils.arc(x2, y2+slideDown, (150/3+zoom) * pixelRatio, 0, 360 * (Math.PI / 180), true);
  // mesOutils.stroke();  
  // mesOutils.closePath();
  // mesOutils.fillStyle = "black";
  // mesOutils.beginPath();
  // mesOutils.arc(x2, y2+ slideDown, (40/3+zoom) * pixelRatio, 0, 360 * (Math.PI / 180), true);
  // mesOutils.fill();
  // mesOutils.closePath();

  // // 4eme cercle
  // mesOutils.strokeStyle = "black";
  // mesOutils.lineWidth = 2;
  // mesOutils.lineCap = "round";
  // mesOutils.beginPath();
  // mesOutils.arc(x3, y3+slideDown, (150/4+zoom) * pixelRatio, 0, 360 * (Math.PI / 180), true);
  // mesOutils.stroke();  
  // mesOutils.closePath();
  // mesOutils.fillStyle = "black";
  // mesOutils.beginPath();
  // mesOutils.arc(x3, y3+ slideDown, (40/4+zoom) * pixelRatio, 0, 360 * (Math.PI / 180), true);
  // mesOutils.fill();
  // mesOutils.closePath();
  



  //Rond noir du debut
  
  
    // mesOutils.fillStyle = "black";
    // mesOutils.beginPath();
    // mesOutils.arc(x, y+slideDown+550, (100) * pixelRatio, 0, 360 * (Math.PI / 180), true);
    // mesOutils.fill();
    // mesOutils.closePath();

}


// attente que tous les éléments soient chargés
// utilisation d'une fonction anonyme en callback
// --> pas de nom de fonction car pas besoin de la réutiliser
window.onload = () => {
  start();
};

