$(document).ready(function(){

  //game logic
  function Game(){
    this.chapter = [];
  };

  //game chapter
  function Chapter(){
    this.prelude = "";
    this.gameFunctions = {

    }
  }

  //game character
  function Character(){
    this.health = 100;
    this.name = "default";
    this.picture = "";
  }

  //global variables
  var playerScore = 0;
  var health = 100;
  var enemyArray = [];
  var isPauseTrue = false;
  var hasGameStarted = false;



//Chapter 1 objects
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
        hasGameStarted=true;
        initGameOne();
      }
      else if(isPauseTrue === true){
        isPauseTrue = false;
        startGame();
        initGameOne();
      }else{
        isPauseTrue = true;
        pauseGame();
      }
    })
  })

  $('#storyButton').click(function(){
    $('.story').slideToggle("slow",function(){
      if(isPauseTrue === true){
        isPauseTrue = false;
        startGame();
      }else{
        isPauseTrue = true;
        pauseGame();
      }
    })
  })

  //enemy random moving animation
  function movingEnemy(something){
    var index = setInterval(function(){
      var random = Math.random();
      var topPosition = parseInt(something[0].style.top);
      var leftPosition = parseInt(something[0].style.left);

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
    }, 500);
    return index;
  }


  //progress bar



  //game logic -> when does game end

  //hardcoded easy in
  function removeEnemy(enemy, index){
    $(enemy).click(function(){
      console.log(index);
      clearInterval(index);
      $(enemy).remove();
      playerScore +=1;

      //update playerScore
      $('#player1-score').text(playerScore);
      winLevel1();
      enemyArray = $.grep(enemyArray, function(e){
        return e.index != index;
      })
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
    clearInterval(chapterOneIndex);
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

  var chapterOneIndex;
  //function initiateGame - zombie spawning
  function initGameOne(){
    chapterOneIndex = setInterval(function(){
      generateEnemy();
      generateEnemy();
      generateEnemy();
    },3000);

  }

  //Zombies to Kill
  function difficultyLevel(difficulty){
    switch(difficulty){
      case "easy":
        return 15;
      case "medium":
        return 30;
      case "hard":
        return 45;
      case "extreme":
        return 60;
    }
  }


  function winLevel1(){
    if(playerScore >= difficultyLevel("easy")){
      pauseGame();
      $('.story').html("you have WON!!!! saved your friend");
      $('.story').show();
      return true;
    }return false;
  }

})
