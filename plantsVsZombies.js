window.onload = () => {
  //VARIABLES
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  const ctx1 = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  let shoots = [];
  let zombiesArr = [];
  let sunArr = [];
  let interval;
  let multi = false;
  let kills1 = 0
  let kills2 = 0
  let seeds1 = 25
  let seeds2 = 25

  let shoots2 = [];
  let zombiesArr2 = [];
  let sunArr2 = [];

  let frames = 0;
  const images = {
    bg: "images/background-canvas.jpg",
    plant1: "images/plant1.png",
    flower1: "images/flower1.png",
    zombie: "images/zombie.png",
    flowerCharge: "images/flower-charge.png",
    pea: "images/pea.png",
    sun: "images/sun.png",
    gameOver: "images/gameOver.png"
  };

  let music = "music/Plants vs. Zombies (Main Theme).mp3"
  let gruñidoMusic = "music/gruñido.wav"
  let shotMusic = "music/shot.wav"
  let loseMusic = "music/lose.wav"

  //CLASES Y CONSTRUCTORES

  class Board1 {
    constructor(img) {
      this.x = 0;
      this.y = 0;
      this.height = 300;
      this.width = 550;
      this.music = new Audio();
      this.music.src = music;
      this.img = new Image();
      this.img.src = img;
      this.img.onload = () => {
      this.draw();
      };
    }
    draw() {
      ctx1.drawImage(this.img, this.x, this.y, canvas1.width, canvas1.height);
    }
  }

  class Board2 {
    constructor(img) {
      this.x = 0;
      this.y = 0;
      this.height = 300;
      this.width = 550;
      this.img = new Image();
      this.img.src = img;
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      ctx2.drawImage(this.img, this.x, this.y, canvas2.width, canvas2.height);
    }
  }

  class Plant1 {
    constructor(y) {
      this.x = 220;
      this.y = y;
      this.img = new Image();
      this.img.src = images.plant1;
      this.sx = 0;
      this.sy = 0;
    }
    draw() {
      if (this.sx > 2860) this.sx = 0;
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
      );
      this.sx += 221;
    }
  }

  class Flower1 {
    constructor(y) {
      this.x = 160;
      this.y = y;
      this.img = new Image();
      this.img.src = images.flower1;
      this.sx = 0;
      this.sy = 0;
    }
    draw() {
      if (this.sx > 13000) this.sx = 0;
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
      );
      this.sx += 220;
    }
  }

  class Zombie {
    constructor(y) {
      this.x = 650;
      this.y = y;
      this.music = new Audio()
      this.music.src = gruñidoMusic
      this.img = new Image();
      this.img.src = images.zombie;
      this.sx = 0;
      this.sy = 0;
    }
    draw() {
      if (this.sx > 5460) this.sx = 0;
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
      );
      this.sx += 220;
      this.x -= 2;
      if (this.x < 180) {
        gameOver();
      }
    }
  }

  class Sun {
    constructor(y) {
      this.x = 160;
      this.y = y;
      this.height = 60;
      this.width = 50;
      this.img = new Image();
      this.img.src = images.sun;
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      ctx1.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  class GameOverImg {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.music = new Audio()
      this.music.src = loseMusic
      this.img = new Image();
      this.img.src = images.gameOver;
    }
    draw() {
      ctx1.drawImage(this.img, this.x, this.y, canvas1.width, canvas1.height);
    }
  }

  class Bullet {
    constructor(y) {
      this.x = 260;
      this.y = y;
      this.width = 20;
      this.height = 20;
      this.music = new Audio()
      this.music.src = shotMusic
      this.img = new Image();
      this.img.src = images.pea;
    }
    draw() {
      ctx1.drawImage(this.img, this.x, this.y, this.width, this.height);
      //this.x+=5
    }
    move() {
      this.x += 5;
    }
    isTouching(obstacle) {
      return (
        this.x < obstacle.x + 220 &&
        this.x + 15 > obstacle.x + 80 &&
        this.y < obstacle.y + 117 &&
        this.y + 15 > obstacle.y
      );
    }
  }

  class Plant2 {
    constructor(y) {
      this.x = 220;
      this.y = y;
      this.img = new Image();
      this.img.src = images.plant1;
      this.sx = 0;
      this.sy = 0;
    }
    draw() {
      if (this.sx > 2860) this.sx = 0;
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
      );
      this.sx += 221;
    }
  }

  class Flower2 {
    constructor(y) {
      this.x = 160;
      this.y = y;
      this.img = new Image();
      this.img.src = images.flower1;
      this.sx = 0;
      this.sy = 0;
    }
    draw() {
      if (this.sx > 13000) this.sx = 0;
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
      );
      this.sx += 220;
    }
  }

  class Zombie2 {
    constructor(y) {
      this.x = 650;
      this.y = y;
      this.music = new Audio()
      this.music.src = gruñidoMusic
      this.img = new Image();
      this.img.src = images.zombie;
      this.sx = 0;
      this.sy = 0;
    }
    draw() {
      if (this.sx > 5460) this.sx = 0;
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
      );
      this.sx += 220;
      this.x -= 2;
      if (this.x < 180) {
        gameOver2();
      }
    }
  }

  class Sun2 {
    constructor(y) {
      this.x = 160;
      this.y = y;
      this.height = 60;
      this.width = 50;
      this.img = new Image();
      this.img.src = images.sun;
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      ctx2.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  class GameOverImg2 {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.music = new Audio()
      this.music.src = loseMusic
      this.img = new Image();
      this.img.src = images.gameOver;
    }
    draw() {
      ctx2.drawImage(this.img, this.x, this.y, canvas2.width, canvas2.height);
    }
  }

  class Bullet2 {
    constructor(y) {
      this.x = 260;
      this.y = y;
      this.width = 20;
      this.height = 20;
      this.music = new Audio()
      this.music.src = shotMusic
      this.img = new Image();
      this.img.src = images.pea;
    }
    draw() {
      ctx2.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    move() {
      this.x += 5;
    }
    isTouching(obstacle) {
      return (
        this.x < obstacle.x + 220 &&
        this.x + 15 > obstacle.x + 80 &&
        this.y < obstacle.y + 117 &&
        this.y + 15 > obstacle.y
      );
    }
  }

  class PowerBar {
    constructor(){
      this.x = 0
      this.y = 0
    }
    draw(){
      ctx1.fillStyle = "yellow";
      ctx1.fillRect(0,0, seeds1 * 36, 10)
    }
  }
  
  class PowerBar2 {
    constructor(){
      this.x = 0
      this.y = 0
    }
    draw(){
      ctx2.fillStyle = "yellow";
      ctx2.fillRect(0,0, seeds2 * 36, 10)
    }
  }

  //DEFINICIONES

  const board1 = new Board1(images.bg);
  const board2 = new Board2(images.bg);

  const gameoverimg = new GameOverImg();

  const plant1 = new Plant1(50);
  const plant1_2 = new Plant1(120);
  const plant1_3 = new Plant1(190);
  const plant1_4 = new Plant1(260);
  const plant1_5 = new Plant1(330);

  const flower1 = new Flower1(50);
  const flower1_2 = new Flower1(120);
  const flower1_3 = new Flower1(190);
  const flower1_4 = new Flower1(260);
  const flower1_5 = new Flower1(330);

  const gameoverimg2 = new GameOverImg2();

  const plant2 = new Plant2(50);
  const plant2_2 = new Plant2(120);
  const plant2_3 = new Plant2(190);
  const plant2_4 = new Plant2(260);
  const plant2_5 = new Plant2(330);

  const flower2 = new Flower2(50);
  const flower2_2 = new Flower2(120);
  const flower2_3 = new Flower2(190);
  const flower2_4 = new Flower2(260);
  const flower2_5 = new Flower2(330);

  let powerBar1 = new PowerBar()
  let powerBar2 = new PowerBar2()
  //FUNCTIONS

  function update() {


    ctx1.clearRect(0, 0, canvas1.width, canvas1.heigth);
    ctx2.clearRect(0, 0, canvas1.width, canvas1.heigth);

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

    if (frames % 100 === 0) {
      sunArr.unshift(new Sun(randomSun()));
    }
    sunGenerator(sunArr);

    if (frames % 20 === 0) {
      zombiesArr.unshift(new Zombie(randomPosition()));
    }
    zombieGenerator(zombiesArr);

    frames++;

    shoots.forEach(bullet => {
      bullet.draw();
      bullet.move();
    });

    checkCollition();

    if (multi) {
      
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
  
      if (frames % 100 === 0) {
        sunArr2.unshift(new Sun2(randomSun2()));
      }
      sunGenerator2(sunArr2);
  
      if (frames % 20 === 0) {
        zombiesArr2.unshift(new Zombie2(randomPosition2()));
      }
      zombieGenerator2(zombiesArr2);
  
      shoots2.forEach(bullet2 => {
        bullet2.draw();
        bullet2.move();
      });
  
      checkCollition2();

      powerBar2.draw()
    }

    powerBar1.draw()
 
  }

  function randomPosition() {
    let yPositions = [15, 75, 160, 230, 310];
    let randY = yPositions[Math.floor(Math.random() * yPositions.length)];
    return randY;
  }

  function randomSun() {
    let zPositions = [50, 120, 190, 260, 330];
    let randZ = zPositions[Math.floor(Math.random() * zPositions.length)];
    return randZ;
  }

  function button1Disapear() {
    document.getElementById("player1").style.visibility = "hidden";
    runSinglePlayer();
  }

  function button2Disapear() {
    document.getElementById("player2").style.visibility = "hidden";
    runMultiplayer();
    multi = true;
  }

  function runSinglePlayer() {
    if (interval) return;
    interval = setInterval(update, 1000 / 20);
    board1.music.play()
  }

  function runMultiplayer() {
    multi = true;
    board1.music.play()
  }

  function zombieGenerator(zombiesArr) {
    zombiesArr.slice(0, 30).forEach(zombie => {
      zombie.draw();
    });
  }

  function sunGenerator(sunArr) {
    sunArr.slice(0, 6).forEach(sun => {
      sun.draw();
    });
  }

  function gameOver() {
    clearInterval(interval);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    gameoverimg.draw();
    winner(kills1, kills2)
    board1.music.pause();
    gameoverimg.music.play()
  }

  let positionY;

  function chooseFlower(letter) {
    if (letter === "Q") {
      positionY = 62;
    } else if (letter === "W") {
      positionY = 130;
    } else if (letter === "E") {
      positionY = 200;
    } else if (letter === "R") {
      positionY = 270;
    } else if (letter === "T") {
      positionY = 340;
    } else {
      positionY = 62;
    }
  }

  function shoot() {
    shoots.push(new Bullet(positionY));
    seeds1--
  }

  function checkCollition() {
    zombiesArr.map((z, zi) => {
      shoots.map((b, bi) => {
        if (b.isTouching(z)) {
          shoots.splice(bi, 1);
          zombiesArr.splice(zi, 1);
          kills1++
          document.getElementById("killsCounter1").innerHTML = kills1
        }
      });
    });
  }

  function randomPosition2() {
    let yPositions2 = [15, 75, 160, 230, 310];
    let randY2 = yPositions2[Math.floor(Math.random() * yPositions2.length)];
    return randY2;
  }

  function randomSun2() {
    let zPositions2 = [50, 120, 190, 260, 330];
    let randZ2 = zPositions2[Math.floor(Math.random() * zPositions2.length)];
    return randZ2;
  }

  function zombieGenerator2(zombiesArr2) {
    zombiesArr2.slice(0, 30).forEach(zombie2 => {
      zombie2.draw();
    });
  }

  function sunGenerator2(sunArr2) {
    sunArr2.slice(0, 6).forEach(sun2 => {
      sun2.draw();
    });
  }

  function gameOver2() {
    clearInterval(interval);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    gameoverimg2.draw();
    winner(kills1, kills2)
    gameoverimg.music.play()
  }

  let positionY2;

  function chooseFlower2(letter) {
    if (letter === "P") {
      positionY2 = 62;
    } else if (letter === "O") {
      positionY2 = 130;
    } else if (letter === "I") {
      positionY2 = 200;
    } else if (letter === "U") {
      positionY2 = 270;
    } else if (letter === "Y") {
      positionY2 = 340;
    } else {
      positionY2 = 62;
    }
  }

  function shoot2() {
    shoots2.push(new Bullet2(positionY2));
    seeds2--
  }

  function checkCollition2() {
    zombiesArr2.map((zombie, zi) => {
      shoots2.map((bullet, bi) => {
        if (bullet.isTouching(zombie)) {
          shoots2.splice(bi, 1);
          zombiesArr2.splice(zi, 1);
          kills2++
          document.getElementById("killsCounter2").innerHTML = kills2
        }
      });
    });
  }

  function winner(kills1, kills2){
    if(kills1 > kills2){
      document.getElementById("winnerText").innerText = `Player1 wins!! Total score: ${kills1} Player2 lose :( Final score: ${kills2}`;
    } else if (kills2 > kills1){
      document.getElementById("winnerText").innerText = `Player2 wins!! Final score: ${kills2} Player1 lose :( Total score: ${kills1}`;
    } else {
      document.getElementById("winnerText").innerText = "Same score!! Play again!";
    }
  }

  function reset(){
    window.location.reload();
  }

  function charge(letter) {
    sunArr.map((s, si) => {
      if(letter === "A"){
        sunArr.splice(si, 1)
        seeds1+=2
      }
    })
    sunArr2.map((su, si2) => {
      if(letter === "K"){
        sunArr2.splice(si2, 1)
        seeds2+=2
      }
    })
  }

  //LISTENERS

  document.getElementById("player1").onclick = function() {
    button1Disapear();
  };

  document.getElementById("player2").onclick = function() {
    button1Disapear();
    button2Disapear();
  };

  document.getElementById("resetButton").onclick = function() {
    reset();
  }

  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 81:
        chooseFlower("Q");
        break;
      case 87:
        chooseFlower("W");
        break;
      case 69:
        chooseFlower("E");
        break;
      case 82:
        chooseFlower("R");
        break;
      case 84:
        chooseFlower("T");
        break;
      case 89:
        chooseFlower2("Y");
        break;
      case 85:
        chooseFlower2("U");
        break;
      case 73:
        chooseFlower2("I");
        break;
      case 79:
        chooseFlower2("O");
        break;
      case 80:
        chooseFlower2("P");
        break;
      case 83:
        shoot(); //S
        break;
      case 65:
        charge("A");
        break;
      case 76:
        shoot2();
        break;
      case 75:
        charge("K");
      default:
        break;
    }
  });
};
