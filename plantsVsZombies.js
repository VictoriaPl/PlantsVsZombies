window.onload = () => {

  //VARIABLES
  const canvas1 = document.getElementById('canvas1')
  const canvas2 = document.getElementById('canvas2')
  const ctx1 = canvas1.getContext('2d')
  const ctx2 = canvas2.getContext('2d')
  let shoots = []
  let zombiesArr = []
  let sunArr = []
  let interval

  
  let frames = 0
  const images = {
    bg: 'images/background-canvas.jpg',
    plant1: 'images/plant1.png',
    flower1: 'images/flower1.png',
    zombie: 'images/zombie.png',
    flowerCharge: 'images/flower-charge.png',
    pea: 'images/pea.png',
    sun: 'images/sun.png',
    gameOver: 'images/gameOver.png'
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
          if (this.x < 180){
            gameOver();
          }
      }
    }

    class Sun {
      constructor(y){
        this.x = 160 
        this.y = y
        this.height = 60
        this.width = 50
        this.img = new Image()
        this.img.src = images.sun
        this.img.onload = () => {
          this.draw()
        }
      }
      draw(){
        ctx1.drawImage(this.img, this.x, this.y, this.width, this.height)
      }
    }


    class GameOverImg {
      constructor(){
        this.x = 0
        this.y = 0
        this.img = new Image()
        this.img.src = images.gameOver
      }
      draw(){
        ctx1.drawImage(this.img, this.x, this.y, canvas1.width, canvas1.height)
      }
    }
  
    class Bullet {
      constructor(y){
        this.x          = 260 
        this.y          = y
        this.width      = 20
        this.height     = 20
        this.img = new Image()
        this.img.src = images.pea
      }
      draw() {
        ctx1.drawImage(this.img, this.x, this.y, this.width, this.height) 
        //this.x+=5  
      }
      move() {
        this.x+=5
      }
      isTouching(obstacle){
        return  (this.x < obstacle.x + 220) &&
        (this.x + 15  > obstacle.x + 80) &&
        (this.y < obstacle.y + 117) &&
        (this.y + 15 > obstacle.y)
      }
      }
    
  

  //DEFINICIONES

  const board1 = new Board1(images.bg)
  const board2 = new Board2(images.bg)

  const gameoverimg = new GameOverImg()

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

    if (frames % 300 === 0){
      sunArr.unshift(new Sun(randomSun()))
    }
    sunGenerator(sunArr)


    if (frames % 20 === 0) {
      zombiesArr.unshift(new Zombie(randomPosition()))
    }
    zombieGenerator(zombiesArr)

    frames++

    shoots.forEach((bullet) => {
      bullet.draw()
      bullet.move()
    })

    checkCollition()
    
  }
   
  function randomPosition() {
    let yPositions = [15,75,160,230,310]
    let randY = yPositions[Math.floor(Math.random() * yPositions.length)]
    return randY
  }

  function randomSun() {
    let zPositions = [50,120,190,260,330]
    let randZ = zPositions[Math.floor(Math.random() * zPositions.length)]
    return randZ
  }

  function button1Disapear() {
    document.getElementById("player1").style.visibility = "hidden"
    runSinglePlayer();
  }

  function button2Disapear() {
    document.getElementById("player2").style.visibility = "hidden"
    runMultiplayer();
  }

  function runSinglePlayer() {
    if (interval) return
    interval = setInterval(update, 1000 / 20)
  }

  function runMultiplayer() {
    if (interval) return
    interval = setInterval(update, 1000 / 20)
    board2.draw()
  }

  function zombieGenerator(zombiesArr) {
    zombiesArr.slice(0, 10).forEach(zombie => {
      zombie.draw()
    })
  }

  function sunGenerator(sunArr) {
    sunArr.slice(0,6).forEach(sun => {
      sun.draw()
    })
  }

  function gameOver(){
    clearInterval(interval)
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    gameoverimg.draw()
  }

  let positionY;

  function chooseFlower(letter) { 
    if (letter === "Q"){
      positionY = 62
    } else if(letter === "W"){
      positionY = 130
    }else if(letter === "E"){
      positionY = 200
    }else if(letter === "R"){
      positionY = 270
    }else if(letter === "T"){
      positionY = 340
    } else {
      positionY = 62
    }
  }

  function shoot(){
    shoots.push(new Bullet(positionY))
  }


  function checkCollition() {
    zombiesArr.map((z, zi) => {
      shoots.map((b, bi) => {
        if (b.isTouching(z)) {
          shoots.splice(bi, 1)
          zombiesArr.splice(zi, 1)
        }
      })
    })
  }


  //LISTENERS

  document.getElementById('player1').onclick = function() {
    button1Disapear()
  }

  document.getElementById('player2').onclick = function() {
    button1Disapear()
    button2Disapear()
  }

  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 81: 
        chooseFlower("Q")
        break;
      case 87: 
      chooseFlower("W")
        break;
        case 69: 
      chooseFlower("E")
        break;
        case 82: 
      chooseFlower("R")
        break;
        case 84:
      chooseFlower("T")
        break;
        case 89: 
      chooseFlower2("Y")
        break;
        case 85:
      chooseFlower2("U")
        break;
        case 73: 
      chooseFlower2("I")
        break;
        case 79: 
      chooseFlower2("O")
        break;
        case 80: 
      chooseFlower2("P")
        break;
        case 83: 
      shoot() //S
        break;
        case 65: 
      charge("A")
        break;
        case 76: 
        shoot2()
        break;
        case 75: 
        charge("K")
        default:
        break;  
    }
  })

}

