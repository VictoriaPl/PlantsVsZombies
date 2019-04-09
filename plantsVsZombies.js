window.onload = () => {

  //VARIABLES
  const canvas1 = document.getElementById('canvas1')
  const canvas2 = document.getElementById('canvas2')
  const ctx1 = canvas1.getContext('2d')
  const ctx2 = canvas2.getContext('2d')
  let zombiesArr = []
  let shoots = []
  let interval
  let frames = 0
  const images = {
    bg: 'images/background-canvas.jpg',
    plant1: 'images/plant1.png',
    flower1: 'images/flower1.png',
    zombie: 'images/zombie.png',
    flowerCharge: 'images/flower-charge.png'
  }


//CLASES Y CONSTRUCTORES

  class Board1 {
    constructor(img){
      this.x = 0
      this.y = 0
      this.height = 300
      this.width = 550
      this.img = new Image()
      this.img.src = img
      this.img.onload = () => {
        this.draw()
      }
    }
    draw(){
      ctx1.drawImage(this.img, this.x, this.y, canvas1.width, canvas1.height)
    }
  }

  class Board2 {
    constructor(img){
      this.x = 0
      this.y = 0
      this.height = 300
      this.width = 550
      this.img = new Image()
      this.img.src = img
      this.img.onload = () => {
        this.draw()
      }
    }
    draw(){
      ctx2.drawImage(this.img, this.x, this.y, canvas2.width, canvas2.height)
    }
  }
    //Planta 1 en canvas 1
  class Plant1 {
    constructor(y) {
      this.x = 220
      this.y = y 
      this.img = new Image()
      this.img.src = images.plant1
      this.sx = 0
      this.sy = 0
    }
    draw() {
      if (this.sx > 2860) this.sx = 0
      ctx1.drawImage(
        this.img,
        this.sx,
        this.sy,
        221,
        186,
        this.x,
        this.y,
        50,
        60
      )
      this.sx += 221
    }
  }

  class Flower1 {
    constructor(y) {
      this.x = 160
      this.y = y 
      this.img = new Image()
      this.img.src = images.flower1
      this.sx = 0
      this.sy = 0
    }
    draw() {
      if (this.sx > 13000) this.sx = 0
      ctx1.drawImage(
        this.img,
        this.sx,
        this.sy,
        220,
        219,
        this.x,
        this.y,
        50,
        60
      )
      this.sx += 220
    }
    charge() {
          if (this.sx > 3080) this.sx = 0
          ctx1.drawImage(
            this.img = new 
            this.sx,
            this.sy,
            220,
            220,
            this.x,
            this.y,
            50,
            60
          )
          this.sx += 220
        }
  }

  class Zombie {
    constructor(y){
        this.x = 650
        this.y = y
        this.img = new Image()
        this.img.src = images.zombie
        this.sx = 0
        this.sy = 0
      }
      draw() {
        if (this.sx >  5460) this.sx = 0
        ctx1.drawImage(
          this.img,
          this.sx,
          this.sy,
          220,
          117,
          this.x,
          this.y,
          130,
          110
        )
        this.sx += 220
          this.x -= 2
      }
    }


  
  //DEFINICIONES

  const board1 = new Board1(images.bg)
  const board2 = new Board2(images.bg)

  const plant1 = new Plant1(50)
  const plant1_2 = new Plant1(120)
  const plant1_3 = new Plant1(190)
  const plant1_4 = new Plant1(260)
  const plant1_5 = new Plant1(330)

  const flower1 = new Flower1(50)
  const flower1_2 = new Flower1(120)
  const flower1_3 = new Flower1(190)
  const flower1_4 = new Flower1(260)
  const flower1_5 = new Flower1(330)

  const zombie = new Zombie(70)

  //FUNCTIONS

  function update() {
    ctx1.clearRect(0,0, canvas1.width, canvas1.heigth)
    ctx2.clearRect(0,0, canvas1.width, canvas1.heigth)
    board1.draw();
    board2.draw();

    plant1.draw();
    plant1_2.draw();
    plant1_3.draw();
    plant1_4.draw();
    plant1_5.draw();

    flower1.draw();
    flower1_2.draw();
    flower1_3.draw();
    flower1_4.draw();
    flower1_5.draw();

    //chargeFunction();
    // flower1.charge();
    // flower1_2.charge();
    // flower1_3.charge();
    // flower1_4.charge();
    // flower1_5.charge();

    if (frames % 150 === 0) {
      zombiesArr.unshift(new Zombie(randomPosition()))
    }
    zombieGenerator(zombiesArr);
    console.log(frames)
    frames++
  }

  // function chargeFunction() {
  //   flower1.charge()
  // }
   
  function randomPosition() {
    let yPositions = [15,75,160,230,310]
    var rand = yPositions[Math.floor(Math.random() * yPositions.length)];
    return rand
  }

  function button1Disapear() {
    document.getElementById("player1").style.visibility = "hidden";
    runSinglePlayer();
  }

  function button2Disapear() {
    document.getElementById("player2").style.visibility = "hidden";
    runMultiplayer();
  }

  function runSinglePlayer() {
    if (interval) return;
    interval = setInterval(update, 1000 / 20);
  }


  function runMultiplayer() {
    if (interval) return;
    interval = setInterval(update, 1000 / 20);
    board2.draw();
  }


  function zombieGenerator(zombiesArr) {
    zombiesArr.slice(0, 10).forEach(zombie => {
      zombie.draw();
    });
  }

 

  //LISTENERS

  document.getElementById('player1').onclick = function() {
    button1Disapear();
  };

  document.getElementById('player2').onclick = function() {
    button2Disapear();
  };


};