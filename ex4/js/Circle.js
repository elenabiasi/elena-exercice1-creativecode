class Circle {
  constructor(x, y, radius, ctx, cpt,color) {

    this.color = color;
    this.saturation = 50;



    this.origin = {
      x: x,
      y: y,
    };
    this.position = { x: x, y: y };
    this.target = {
      x: x,
      y: y,
    };

  this.cpt = cpt;

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
  }

  draw() {

    let angle = 90;
    //check si on est arrivé à destination
    if (this.distance(this.position, this.target) > 0.001) this.move();

    
    
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);



//bouche
this.ctx.beginPath();
this.ctx.arc(0, 30+cpt, 5+cpt/2, 0, 2 * Math.PI);
this.ctx.fill();
this.ctx.closePath();

//oreilles
    this.ctx.beginPath();
    this.ctx.arc(100+cpt, -30, this.radius/2+cpt/2, 0, 2 * Math.PI);
    this.ctx.fillStyle = `hsl(${this.color}, ${this.saturation}%, 50%)`; //`rgba(0,0,0,0)`;
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
    this.ctx.arc(20+cpt, 0, 15+cpt, 0, 2 * Math.PI);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(0, 40+cpt, 15+cpt, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";    
    this.ctx.lineWidth = 10;
    this.ctx.arc(30+cpt, 0, 20+cpt, 0, 2 * Math.PI);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.stroke();
    this.ctx.closePath();
    

    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";    
    this.ctx.lineWidth = 10;
    this.ctx.arc(0, 30+cpt, 20+cpt, 0, 2 * Math.PI);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.stroke();
    this.ctx.closePath();

  //corps
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";    
    this.ctx.lineWidth = 20;
    this.ctx.arc(0, 0, this.radius+cpt, 0, 2 * Math.PI);
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
  }

  /**
   * function de calcul de l'animation
   */
  move() {
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = this.t * 1; //Math.pow(this.t, 5);

    //nouvelle position
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)
    // on multiplie cette distance par le facteur d'interpolation
    this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;
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
