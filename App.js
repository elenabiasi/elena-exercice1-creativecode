//Elena Biasi exercice 1 
// 14 Octobre 2022
//ECAL - Creative Coding 
// Oeuvre: Auguste HERBIN - Nue, 1960

const pixelRatio = window.devicePixelRatio;
let monCanvas;
let mesOutils;
let x = 0;
let actif = false; //permet d'activer l'animation ou non 

function start() {
  monCanvas = document.getElementById("ecal");

  mesOutils = monCanvas.getContext("2d");

  mesOutils.canvas.width = 316;
  mesOutils.canvas.height = 385;

  document.body.style.backgroundColor = 'rgb(17,19,18,100)';

  dessine()
  document.addEventListener("click", function(){
   actif = !actif;
  });
  dessine()
  
}

function dessine() {

  mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);
 // mesOutils.save()

  if(actif == true){
    x++;
  }

  if (x == 450){
    x = 0;
  }

  mesOutils.fillStyle = 'rgb(17,19,18,100)'; 
  mesOutils.fillRect(0, 0, monCanvas.width, monCanvas.height);

 //cercles
  mesOutils.beginPath();
  mesOutils.fillStyle =  'rgb(14,80,239,100)'; 
  mesOutils.arc(
    170+x,
    200,
    57,
    0,
    Math.PI 
  );
  mesOutils.fill();
  mesOutils.closePath();

  mesOutils.beginPath();
  mesOutils.fillStyle =  'rgb(46,132,241,100)'; 
  mesOutils.arc(
    170-x,
    200,
    57,
    0,
    Math.PI,
    true
  );
  mesOutils.fill();
  mesOutils.closePath();

  mesOutils.beginPath();
  mesOutils.fillStyle = 'rgb(203,216,235,100)'; 
  mesOutils.arc(
    160,
    65+x,
    57,
    0,
    2 * Math.PI
  );

  mesOutils.fill();
  mesOutils.closePath();

  mesOutils.beginPath();
  mesOutils.fillStyle = 'rgb(226,47,50,100)'; 
  mesOutils.arc(
    160,
    320-x,
    59,
    0,
    2 * Math.PI
  );
  mesOutils.fill();
  mesOutils.closePath();


  mesOutils.beginPath();
  mesOutils.fillStyle = 'rgb(50,135,244,100)';
  mesOutils.arc(
    15+x,
    90,
    80,
    Math.PI * 1.5,
    Math.PI * 0.5
  );
  mesOutils.fill();
  mesOutils.closePath();

  mesOutils.beginPath();
  mesOutils.fillStyle = 'rgb(20,79,235,100)';
  mesOutils.arc(
    300-x,
    295,
    80,
    Math.PI * 0.5,
    Math.PI * 1.5
  );
  mesOutils.fill();
  mesOutils.closePath();

  //triangles
  mesOutils.fillStyle = 'rgb(50,135,244,100)';
  mesOutils.beginPath();
  mesOutils.moveTo(
    271-x,
    24-x
  );
  mesOutils.lineTo(
  233-x,
  180-x
  );
  mesOutils.lineTo(
   315-x,
   180-x
  );
  mesOutils.fill();
  mesOutils.closePath();

  mesOutils.fillStyle = 'rgb(226,47,50,100)'; 
  mesOutils.beginPath();
  mesOutils.moveTo(
    60+x,
    180+x
  );
  mesOutils.lineTo(
  13+x,
  367+x
  );
  mesOutils.lineTo(
   105+x,
   367+x
  );
  mesOutils.fill();
  mesOutils.closePath();

//rectangles
  mesOutils.fillStyle = 'rgb(205,217,239,100)'; 
  mesOutils.beginPath();
  mesOutils.rect(
    72, 
    180, 
    200, 
    25);
  mesOutils.fill();
  mesOutils.closePath();

  mesOutils.fillStyle = 'rgb(205,217,239,100)'; 
  mesOutils.beginPath();
  mesOutils.rect(
    100, 
    100, 
    12,
    140, 
    );
  mesOutils.fill();
  mesOutils.closePath();

  requestAnimationFrame(dessine);
 // mesOutils.restore()
}


window.onload = () => {
  start();
};