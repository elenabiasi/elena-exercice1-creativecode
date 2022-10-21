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
  //mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);
  dessine();

  if (isAnimated) {
    angle += 2.5;
    angle2 += 2.5;
  zoom += 0.2
  zoom2 += 0.05


    //slideDown += 2;
  }
  if (angle == 360){
  cpt++

  }
  
  if (angle >= 360) 
   {
    
    angle = 0;
   }
  requestAnimationFrame(animate);
}


function CreerCercle(x0,y0,a,b){
  mesOutils.strokeStyle = `hsla(${angle},50%,50%,0.2)`;
  mesOutils.lineWidth = 2;
  mesOutils.lineCap = "round";
  mesOutils.beginPath();
  mesOutils.arc(x0, y0+slideDown, (a+zoom) * pixelRatio, 0, Math.PI*2, true);
  mesOutils.stroke();
  mesOutils.closePath();

  //millieu rond
  mesOutils.fillStyle = `hsla(${angle},50%,50%,0.2)`;
  mesOutils.beginPath();
  mesOutils.arc(x0, y0+slideDown, (b+zoom2) * pixelRatio, 0, 360 * (Math.PI / 180), true);
  mesOutils.fill();
  mesOutils.closePath();
}


function dessine() {

  let nb = 25;
  let nb2 = 25;
  let x = monCanvas.width / 2;
  let y = monCanvas.height / 2;
  
    let x1 = Math.cos(angle * (Math.PI / 180)) * (nb+zoom) * pixelRatio + x;
    let y1 = Math.sin(angle * (Math.PI / 180)) * (nb+zoom) * pixelRatio + y;
  
    let x2 = Math.cos(angle * (Math.PI / 180)) * (nb/2+zoom) * pixelRatio + x1;
    let y2 = Math.sin(angle * (Math.PI / 180)) * (nb/2+zoom) * pixelRatio + y1;
  
    let x3 = Math.cos(angle * (Math.PI / 180)) * (nb/3+zoom) * pixelRatio + x2;
    let y3 = Math.sin(angle * (Math.PI / 180)) * (nb/3+zoom) * pixelRatio + y2;
    
    let x4 = Math.cos(angle * (Math.PI / 180)) * (nb/4+zoom) * pixelRatio + x3;
    let y4 = Math.sin(angle * (Math.PI / 180)) * (nb/4+zoom) * pixelRatio + y3;
  
    let x5 = Math.cos(angle * (Math.PI / 180)) * (nb/5+zoom) * pixelRatio + x4;
    let y5 = Math.sin(angle * (Math.PI / 180)) * (nb/5+zoom) * pixelRatio + y4;

    let x6 = Math.cos(angle * (Math.PI / 180)) * (nb/6+zoom) * pixelRatio + x5;
    let y6 = Math.sin(angle * (Math.PI / 180)) * (nb/6+zoom) * pixelRatio + y5;


CreerCercle(x,y,0,0)
CreerCercle(x1,y1,nb/2,nb2/2)

// if (cpt == 1){
// CreerCercle(x,y,0,0)
// CreerCercle(x1,y1,nb/2,nb2/2)

// }
// else if (cpt == 2){
//   CreerCercle(x,y,nb/2,nb2/2)
//   CreerCercle(x1,y1,nb/3,nb2/3)
// }
// else if (cpt == 3){
//   CreerCercle(x,y,nb/3,nb2/3)
//   CreerCercle(x1,y1,nb/4,nb2/4)
// }
// else if (cpt == 4){
//   CreerCercle(x,y,nb/4,nb2/4)
//   CreerCercle(x1,y1,nb/5,nb2/5)
// }
// else if (cpt >= 5){
//   CreerCercle(x,y,nb/5,nb2/5)
//   CreerCercle(x1,y1,nb/6,nb2/6)
// }







  // //cercle depart
  // mesOutils.strokeStyle = "black";
  // mesOutils.lineWidth = 2;
  // mesOutils.lineCap = "round";
  // mesOutils.beginPath();
  // mesOutils.arc(x, y+slideDown, (nb+zoom) * pixelRatio, 0, Math.PI*2, true);
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
  // mesOutils.arc(x1, y1+slideDown, (nb/2+zoom) * pixelRatio, 0, Math.PI*2, true);
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
  // mesOutils.arc(x2, y2+slideDown, (nb/3+zoom) * pixelRatio, 0, 360 * (Math.PI / 180), true);
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
  // mesOutils.arc(x3, y3+slideDown, (nb/4+zoom) * pixelRatio, 0, 360 * (Math.PI / 180), true);
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

