//courbe Lissajous (avec couleur qui changent)

// constante globale
const pixelRatio = window.devicePixelRatio;
// variable globale
let monCanvas;
let mesOutils;
let angleH = 0;
let angleV = 0;
let isAnimated = true;
let rayon = 300;
function start() {
  // constante locale
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
  //   mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);
  dessine();

  if (isAnimated) {
    angleH += 1.16;
    angleV += 0.37;
  }
  requestAnimationFrame(animate);
}

function dessine() {
  let centrex = monCanvas.width / 2;
  let centrey = monCanvas.height / 2;

  let x1 = Math.cos(angleH * (Math.PI / 180)) * rayon * pixelRatio + centrex;
  let y1 = Math.sin(angleV * (Math.PI / 180)) * rayon * pixelRatio + centrey;

  //   lissajou
  let conducteurX = x1;
  let conducteurY = centrey;
  let slavex = conducteurX;
  let slavey = y1;

  mesOutils.lineWidth = 2;
  mesOutils.strokeStyle = `hsla(${angleV},50%,50%,0.2)`;
  mesOutils.beginPath();
  mesOutils.arc(
    slavex,
    slavey,
    20 * pixelRatio,
    0,
    360 * (Math.PI / 180),
    true
  );
  mesOutils.stroke();
  mesOutils.closePath();
}

// attente que tous les éléments soient chargés
// utilisation d'une fonction anonyme en callback
// --> pas de nom de fonction car pas besoin de la réutiliser
window.onload = () => {
  start();
};

