class Circle {
  constructor(x, y, radius, ctx) {
    this.position = { x: x, y: y };
    this.target = {
      x: x,
      y: y,
    };
    this.origin = {
      x: this.target.x,
      y: this.target.y,
    };
    this.radius = radius;
    this.ctx = ctx;
    /*
      vitesse de d'incrémentation de t
    */
    this.speed = 0.01;
    /*
      t est un compteur qui va de 0 à 1
      qui definit la portion du chemin parcouru
    */
    this.t = 0;
    this.hue = Math.round(Math.random() * 360);
    this.originHue = this.hue;
    this.targetHue = this.hue;
    this.originRadius = radius;
    this.targetRadius = radius;
  }


  setup(){ 
    const center = {
      x: (window.innerWidth / 2) * this.pixelRatio,
      y: (window.innerHeight / 2) * this.pixelRatio,
    }; 

  //   this.eyes = new Array(
  //     new Eye(center.x - 120, center.y - 100, 50, this.ctx),
  //     new Eye(center.x + 120, center.y - 100, 50, this.ctx)
  //   );
  //   document.addEventListener("mousemove", this.move.bind(this));
   }

  draw() {
    // this.eyes.forEach((eye) => {
    //   eye.draw(this.mouse.x, this.mouse.y);
    // });
    
    // requestAnimationFrame(this.draw.bind(this));


    let cpt = 10;
    let angle = 90;

    //check si on est arrivé à destination
    if (this.distance(this.position, this.target) > 0.001) this.move();
    
    if (Math.abs(this.targetRadius - this.radius) > 0.01) this.scale();
    else this.radius = this.targetRadius; //on force la position finale

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);

//bouche
this.ctx.beginPath();
this.ctx.arc(0, 30+cpt, 5, 0, 2 * Math.PI);
this.ctx.fill();
this.ctx.closePath();

//oreilles
this.ctx.beginPath();
this.ctx.arc(210+cpt-5, 0, this.radius/3+cpt/2, 0, 2 * Math.PI);
this.ctx.fillStyle = `hsl(${this.hue},50%,50%)`;
this.ctx.fill();
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.closePath();

this.ctx.beginPath();
this.ctx.arc(0, 210+cpt-5, this.radius/3+cpt/2, 0, 2 * Math.PI);
this.ctx.fill();
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.closePath();


//yeux
this.ctx.beginPath();
this.ctx.arc(60+cpt, 0, this.radius/8+cpt, 0, 2 * Math.PI);
this.ctx.fillStyle = "black";
this.ctx.fill();
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.closePath();

this.ctx.beginPath();
this.ctx.arc(0, 60+cpt, this.radius/8+cpt, 0, 2 * Math.PI);
this.ctx.fill();
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.closePath();

this.ctx.beginPath();
this.ctx.strokeStyle = "black";    
this.ctx.lineWidth = 10;
this.ctx.arc(60+cpt, 0, this.radius/4+cpt, 0, 2 * Math.PI);
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.stroke();
this.ctx.closePath();

this.ctx.beginPath();
this.ctx.strokeStyle = "black";    
this.ctx.lineWidth = 10;
this.ctx.arc(0, 60+cpt, this.radius/4+cpt, 0, 2 * Math.PI);
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.stroke();
this.ctx.closePath();

//corps
this.ctx.beginPath();
this.ctx.strokeStyle= `hsl(${this.hue},50%,50%)`;
this.ctx.lineWidth = 20;
this.ctx.arc(0, 0, 200+cpt, 0, 2 * Math.PI);
this.ctx.stroke();
this.ctx.closePath();



// étoile
let cpt2 = 85

this.ctx.beginPath();
this.ctx.strokeStyle= `hsl(${this.hue},50%,50%)`;
this.ctx.fillStyle = `hsl(${this.hue},50%,50%)`;

this.ctx.lineWidth = 20;
this.ctx.moveTo(108+cpt2, 0.0+cpt2);
this.ctx.lineTo(141+cpt2, 70+cpt2);
this.ctx.lineTo(218+cpt2, 78.3+cpt2);
this.ctx.lineTo(162+cpt2, 131+cpt2);
this.ctx.lineTo(175+cpt2, 205+cpt2);
this.ctx.lineTo(108+cpt2, 170+cpt2);
this.ctx.lineTo(41.2+cpt2, 205+cpt2);
this.ctx.lineTo(55+cpt2, 131+cpt2);
this.ctx.lineTo(1+cpt2, 78+cpt2);
this.ctx.lineTo(75+cpt2, 68+cpt2);
this.ctx.lineTo(108+cpt2, 0.0+cpt2);
this.ctx.stroke();
this.ctx.fill();
this.ctx.closePath();




this.ctx.restore();
  }

  /**
   *
   *  remettre le compteur t à zero
   *  réinitialiser la position du point de départ
   *  assigner la nouvelle position de destination
   */
  resetAndGo(x, y) {
    this.t = 0;
    this.origin = {
      x: this.target.x,
      y: this.target.y,
    };
    this.target = {
      x,
      y,
    };

    this.originRadius = this.radius;
    if (this.radius == 0) {
      this.targetRadius = 200;
    } else {
      this.targetRadius = 0;
    }
    this.originHue = this.hue;
    this.targetHue = this.hue + 50;

  }

  /**
   * function de calcul de l'animation
   */

  move() {

    // this.mouse = {
    //   x: e.clientX * this.pixelRatio,
    //   y: e.clientY * this.pixelRatio,
    // };

    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.elasticOut(this.t);

    //nouvelle position
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)
    // on multiplie cette distance par le facteur d'interpolation
    this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;
  
  }


  scale() {
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.bounceOut(this.t);

    //nouvelle position
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)
    // on multiplie cette distance par le facteur d'interpolation
    // this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    // this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;
    this.radius = Math.abs(
      this.originRadius + (this.targetRadius - this.originRadius) * ease
    );
    this.hue = this.originHue + (this.targetHue - this.originHue) * ease;
  }


  /**
   * calcul de la distance entre deux points
   */
  distance(target, goal) {
    return Math.sqrt(
      Math.pow(target.x - goal.x, 2) + Math.pow(target.y - goal.y, 2)
    );
  }
}
