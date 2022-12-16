class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * this.pixelRatio;
    this.canvas.height = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.img_file = "./asset/andy.jpg";
    this.setup();

  }

  initWebcam() {
    //init webcam
    this.video = document.createElement("video");
    // document.body.appendChild(this.video);

    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      {
        video: { width: 640, height: 480 },
        audio: false,
      },
      (stream) => {
        // if (navigator.mozGetUserMedia || navigator.msGetUserMedia) {
        //   video.mozSrcObject = stream;
        // }
        this.video.srcObject = stream;
        this.video.play();
      },
      (err) => {
        console.log("An error occured! " + err);
      }
    );
  }

  setup() {
    // init webcam
    this.initWebcam();
    // create grid
    this.grid = [];
    this.scale = 4;
    //quel espace entre chaque cercle si on en veut 50 sur la largeur et la hauteur
    this.stepX = Math.floor(640 / 50);
    this.stepY = Math.floor(480 / 50);

    // coordonnee de décalage de la grille
    this.offsetX =
      (window.innerWidth / 2) * this.pixelRatio -
      (this.stepX * 50 * this.scale) / 2;
    this.offsetY =
      (window.innerHeight / 2) * this.pixelRatio -
      (this.stepY * 50 * this.scale) / 2;

    //creation de la grille
    for (let j = 0; j < 480; j += this.stepY) {
      for (let i = 0; i < 640; i += this.stepX) {
        this.grid.push(
          new Circle(
            this.offsetX + i * this.scale,
            this.offsetY + j * this.scale,
            40,
            this.ctx
          )
        );
      }
    }

    document.addEventListener("mousemove", (event) => {
      this.mouse = {
        x: event.clientX * this.pixelRatio,
        y: event.clientY * this.pixelRatio,
      };

      //this.pushPixels();
    });
 
  this.mouseDown = 0;


document.body.onmousedown = function() { 
  ++this.mouseDown;
}
document.body.onmouseup = function() {
  --this.mouseDown;
}  




    this.draw();
  }







  pushPixels() {
    //distance entre la sourise et tous les éléments de la grille
    this.grid.forEach((circle, index) => {
      const distance = Math.sqrt(
        Math.pow(circle.x - this.mouse.x, 2) +
          Math.pow(circle.y - this.mouse.y, 2)
      );
      let zoom = 0.9;
      let range = 400 * this.pixelRatio;
      let differenceX = this.mouse.x - circle.x;
      let differenceY = this.mouse.y - circle.y;
      if (distance < range) {
        //
        const l = this.map(distance, 0, range * 2, 0, Math.PI * 2);
        const angle = Math.cos(l);
        const amt = this.map(angle, -1, 1, 0, zoom);
        differenceX *= amt;
        differenceY *= amt;
        circle.x = circle.origin.x - differenceX;
        circle.y = circle.origin.y - differenceY;

      } else {
        circle.x = circle.origin.x;
        circle.y = circle.origin.y;
      }
    });
  }




  changeText() {
    //distance entre la sourise et tous les éléments de la grille
    this.grid.forEach((circle, index) => {
      const distance = Math.sqrt(
        Math.pow(circle.x - this.mouse.x, 2) +
          Math.pow(circle.y - this.mouse.y, 2)
      );
      let zoom = 0.9;
      let range = 400 * this.pixelRatio;
      let differenceX = this.mouse.x - circle.x;
      let differenceY = this.mouse.y - circle.y;
      if (distance < range) {
        //
        const l = this.map(distance, 0, range * 2, 0, Math.PI * 2);
        const angle = Math.cos(l);
        const amt = this.map(angle, -1, 1, 0, zoom);
        differenceX *= amt;
        differenceY *= amt;
        circle.x = circle.origin.x - differenceX;
        circle.y = circle.origin.y - differenceY;

      } else {
        circle.x = circle.origin.x;
        circle.y = circle.origin.y;
      }
    });
  }



  detectPixels() {
    console.log("detectPixels");
    if (this.video) {
      this.ctx.drawImage(this.video, 0, 0, 640, 480);
    }
    // get image data from canvas
    this.imgData = this.ctx.getImageData(0, 0, 640, 480);
    // get pixel data
    this.pixels = this.imgData.data;

    // get rgb data for each step pixel in 100 x 100
    this.rgb = [];
    for (let j = 0; j < 480; j += this.stepY) {
      for (let i = 0; i < 640; i += this.stepX) {
        let index = (j * 640 + i) * 4;
        this.rgb.push({
          r: this.pixels[index],
          g: this.pixels[index + 1],
          b: this.pixels[index + 2],
          a: this.pixels[index + 3],
        });
      }
    }

    // this.draw();
  }

  draw() {
    this.detectPixels();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //draw all circle of the grid
    this.grid.forEach((circle, index) => {
      const color = this.rgb[index];
      circle.color = `rgba(${color.r}, ${color.g}, ${color.b},0.4)`;
      circle.draw();
    });


    if(this.mouseDown > 0){
      console.log("hello")
      this.grid.forEach((circle, index) => {
        circle.color = "pink";
        circle.draw();
      });
    }


    requestAnimationFrame(this.draw.bind(this));



  }

  map(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}


window.onload = function () {
  new App();
};
