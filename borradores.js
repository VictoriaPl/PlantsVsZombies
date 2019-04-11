//Variables

let shoots2 = []
let zombiesArr2 = []
let sunArr2 = []
let interval2

//CLASES

class Plant2 {
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
    ctx2.drawImage(
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


class Flower2 {
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
    ctx2.drawImage(
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


class Zombie2 {
  constructor(y){
      this.x = 650
      this.y = y
      this.img = new Image()
      this.img.src = images.zombie
      this.sx = 0
      this.sy = 0
    }
    draw() {
      if (this.sx > 5460) this.sx = 0
      ctx2.drawImage(
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


  class Sun2 {
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
      ctx2.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }


  class GameOverImg2 {
    constructor(){
      this.x = 0
      this.y = 0
      this.img = new Image()
      this.img.src = images.gameOver
    }
    draw(){
      ctx2.drawImage(this.img, this.x, this.y, canvas2.width, canvas2.height)
    }
  }


  class Bullet2 {
    constructor(y){
      this.x          = 260 
      this.y          = y
      this.width      = 20
      this.height     = 20
      this.img = new Image()
      this.img.src = images.pea
    }
    draw() {
      ctx2.drawImage(this.img, this.x, this.y, this.width, this.height) 
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


  const gameoverimg2 = new GameOverImg2()

  const plant2 = new Plant2(50)
  const plant2_2 = new Plant2(120)
  const plant2_3 = new Plant2(190)
  const plant2_4 = new Plant2(260)
  const plant2_5 = new Plant2(330)

  const flower2 = new Flower2(50)
  const flower2_2 = new Flower2(120)
  const flower2_3 = new Flower2(190)
  const flower2_4 = new Flower2(260)
  const flower2_5 = new Flower2(330)


  //ADD TO UPDATE

    plant2.draw();
    plant2_2.draw();
    plant2_3.draw();
    plant2_4.draw();
    plant2_5.draw();

    flower2.draw();
    flower2_2.draw();
    flower2_3.draw();
    flower2_4.draw();
    flower2_5.draw();

    if (frames % 300 === 0){
      sunArr2.unshift(new Sun2(randomSun2()))
    }
    sunGenerator2(sunArr2)

    if (frames % 20 === 0) {
      zombiesArr2.unshift(new Zombie2(randomPosition2()))
    }
    zombieGenerator2(zombiesArr2)

    shoots2.forEach((bullet2) => {
      bullet2.draw()
      bullet2.move()
    })

    checkCollition2()

    //FUNCTIONS

    function randomPosition2() {
      let yPositions2 = [15,75,160,230,310]
      let randY2 = yPositions2[Math.floor(Math.random() * yPositions2.length)]
      return randY2
    }

    function randomSun2() {
      let zPositions2 = [50,120,190,260,330]
      let randZ2 = zPositions2[Math.floor(Math.random() * zPositions2.length)]
      return randZ2
    }

    function zombieGenerator2(zombiesArr2) {
      zombiesArr2.slice(0, 10).forEach(zombie2 => {
        zombie2.draw()
      })
    }

    function sunGenerator2(sunArr2) {
      sunArr2.slice(0,6).forEach(sun2 => {
        sun2.draw()
      })
    }

    function gameOver2(){
      clearInterval(interval2)
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
      gameoverimg2.draw()
    }
  
    let positionY2;

    function chooseFlower2(letter) { 
      if (letter === "Y"){
        positionY2 = 62
      } else if(letter === "U"){
        positionY2 = 130
      }else if(letter === "I"){
        positionY2 = 200
      }else if(letter === "O"){
        positionY2 = 270
      }else if(letter === "P"){
        positionY2 = 340
      } else {
        positionY2 = 62
      }
    }

    function shoot2(){
      shoots2.push(new Bullet2(positionY2))
    }


  function checkCollition2() {
    zombiesArr2.map((z, zi) => {
      shoots2.map((b, bi) => {
        if (b.isTouching(z)) {
          shoots2.splice(bi, 1)
          zombiesArr2.splice(zi, 1)
        }
      })
    })
  }


//SEEDS
let seeds1 = 25
let seeds2 = 25

class PowerBar {
  constructor(){
    this.x = 0
    this.y = 0
  }
  draw(){
    ctx1.fillStyle = "green";
    ctx1.fillRect(0,0, seeds1 * 22, 10)
  }
}

class PowerBar2 {
  constructor(){
    this.x = 0
    this.y = 0
  }
  draw(){
    ctx2.fillStyle = "green";
    ctx2.fillRect(0,0, seeds2 * 22, 10)
  }
}

let powerBar1 = new PowerBar()
let powerBar2 = new PowerBar2()

function update(){
  powerBar1.draw()
  powerBar2.draw()
}

//CHARGE

function charge(letter) {
  sunArr.map((s, si) => {
    if(letter === "A"){
      sunArr.splice(si, 1)
      seeds1+=5
    }
  })
  sunArr2.map((su, si2) => {
    if(letter === "K"){
      sunArr2.splice(si2, 1)
      seeds2+=5
    }
  })
}

//MUSIC

let gruñidoMusic = ""
let shotMusic = ""
let loseMusic = ""

let zombiesMusic = ""

class Zombie {
  this.music = new Audio()
  this.music.src = gruñidoMusic
}

zombieGenerator2 {
  zombie.music.play()
}

class Bullet {
  this.music = new Audio()
  this.music.src = shotMusic
}

class GameOverImg {
  this.music = new Audio()
  this.music.src = loseMusic
}

class GameOverImg2 {
  this.music = new Audio()
  this.music.src = loseMusic
}

//infinite seeds

if(seeds1 < 0){
  seeds1 = 0
} else if (seeds1 === 0){
  shoots.forEach(bullet => {
    bullet.draw();
    bullet.move();
  });
}

if(seeds2 < 0){
  seeds2 = 0
} else if (seeds2 === 0){
  shoots2.forEach(bullet2 => {
    bullet2.draw();
    bullet2.move();
  });
}

  // shoots.forEach(bullet => {
    //   bullet.draw();
    //   bullet.move();
    // });

// shoots2.forEach(bullet2 => {
      //   bullet2.draw();
      //   bullet2.move();
      // });