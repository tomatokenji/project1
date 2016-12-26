$(document).ready(function(){

  //game logic
  function Game(){
    this.chapter = [];
  };

  //game chapter
  function Chapter(){
    this.prelude = function(){};
    this.startGame = function(){};
  }

  //game character
  function Character(){
    this.health = 100;
  }

  //enemy object
  function Enemy(index, address){
    this.index = index;
    this.address = address;
  }

  //generate enemy location random. div class="enemy"
  var generateEnemy = function(){
    //horizontal appearance
    var randomNo = Math.random()*90;
    //vertical appearance
    var randomNo2 = Math.random()*80;
    $('.gameplay').append('<div class="enemy">');
    var lastEnemy = $('.enemy:last');
    $(lastEnemy).css({
        'left':randomNo+'%',
        'top':randomNo2+'%',
    });

    var index = movingEnemy(lastEnemy);
    removeEnemy(lastEnemy, index);

    var enemy = new Enemy(index, lastEnemy);
    enemyArray.push(enemy);
  }

  //prelude - sliding stuff
  $('#okay').click(function(){
    $('.story').slideToggle("slow",function(){
      if(hasGameStarted===false){
        hasGameStarted===true;
        initGameOne();
      }
      else if(isPauseTrue === true){
        isPauseTrue === false;
        startGame();
      }else{
        isPauseTrue === true;
        pauseGame();
      }
    })
  })

  $('#storyButton').click(function(){
    $('.story').slideToggle("slow",function(){
      if(isPauseTrue === true){
        isPauseTrue === false;
        startGame();
      }else{
        isPauseTrue === true;
        pauseGame();
      }
    })
  })


  //at click what happens - enemy disappear, score +=1
  // $('.enemy').click(function(){
  //   this.remove();
  //   playerScore +=1;
  // })


  //enemy random moving animation
  function movingEnemy(something){
    var index = setInterval(function(){
      var random = Math.random();
      var topPosition = parseInt(something[0].style.top);
      var leftPosition = parseInt(something[0].style.left);
      console.log(leftPosition);

      if(random<0.33 && leftPosition <= 85.1){
        $(something).css({
          'left': "+=5%",
        })
      }else if(random<0.66 && topPosition <= 80.1){
        $(something).css({
          'top':"+=5%",
        })
      }else if(leftPosition>2){
        $(something).css({
          'left':"-=5%",
        })
      };

      //health function
      if(topPosition >=80){
        health -=5;
        $('#health').prop("value", health);
      }

      if(dead(health)){
        gameOver();
      }
      console.log(something[0].style.left);
    }, 500);
    return index;
  }


  //progress bar



  //add event Timer


  //global variables
  var playerScore = 0;
  var health = 100;
  var enemyArray = [];
  var isPauseTrue = false;
  var hasGameStarted = false;
  //game logic -> when does game end


  function removeEnemy(enemy, index){
    $(enemy).click(function(){
      console.log(index);
      clearInterval(index);
      $(enemy).remove();
      playerScore +=1;
      //update playerScore
      $('#player1-score').text(playerScore);
    })
  }

  //dead function
  function dead(userHealth){
    if(userHealth <=0){
      return true;
    }
  }

  //gameOver
  function gameOver(){
    $('.story').html("you have died");

    pauseGame();
    enemyArray = [];
    $('.story').show();

  }

  //function pauseGame
  function pauseGame(){
    for(var i=0; i<enemyArray.length; i++){
      clearInterval(enemyArray[i].index);
    }
    console.log("paused");
  }

  //function startGame
  function startGame(){
    for(var i=0; i<enemyArray.length; i++){
      var index = movingEnemy(enemyArray[i].address);
      enemyArray[i].index = index;
      removeEnemy(enemyArray[i].address, index);
    }
    console.log("start");
  }

  //function initiateGame
  function initGameOne(){
    generateEnemy();
    generateEnemy();
    generateEnemy();
  }
  //implement functions





})
