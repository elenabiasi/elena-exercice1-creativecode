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

  draw() {
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
this.ctx.arc(0, 30+cpt, 3+cpt/2, 0, 2 * Math.PI);
this.ctx.fill();
this.ctx.closePath();

//oreilles
this.ctx.beginPath();
this.ctx.arc(100+cpt, -30, this.radius/2+cpt/2, 0, 2 * Math.PI);
this.ctx.fillStyle = `hsl(${this.hue},50%,50%)`;
this.ctx.fill();
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.closePath();

this.ctx.beginPath();
this.ctx.arc(-30, 100+cpt, this.radius/2+cpt/2, 0, 2 * Math.PI);
this.ctx.fill();
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.closePath();


//yeux
this.ctx.beginPath();
this.ctx.arc(20+cpt, 0, this.radius/6+cpt, 0, 2 * Math.PI);
this.ctx.fillStyle = "black";
this.ctx.fill();
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.closePath();

this.ctx.beginPath();
this.ctx.arc(0, 40+cpt, this.radius/6+cpt, 0, 2 * Math.PI);
this.ctx.fill();
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.closePath();

this.ctx.beginPath();
this.ctx.strokeStyle = "black";    
this.ctx.lineWidth = 10;
this.ctx.arc(30+cpt, 0, this.radius/4+cpt, 0, 2 * Math.PI);
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.stroke();
this.ctx.closePath();

this.ctx.beginPath();
this.ctx.strokeStyle = "black";    
this.ctx.lineWidth = 10;
this.ctx.arc(0, 30+cpt, this.radius/4+cpt, 0, 2 * Math.PI);
this.ctx.rotate(angle * Math.PI / 180);
this.ctx.stroke();
this.ctx.closePath();

//corps
this.ctx.beginPath();
this.ctx.strokeStyle= `hsl(${this.hue},50%,50%)`;this.ctx.lineWidth = 20;
this.ctx.arc(0, 0, 100+cpt, 0, 2 * Math.PI);
this.ctx.stroke();
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
      this.targetRadius = 100;
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
