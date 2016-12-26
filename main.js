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

  function Enemy(index){
    this.intervalIndex = index;
  }

  //generate enemy location random. div class="enemy"
  var generateEnemy = function(){
    //horizontal appearance
    var randomNo = Math.random()*90;
    //vertical appearance
    var randomNo2 = Math.random()*90;
    $('.gameplay').append('<div class="enemy">');
    var lastEnemy = $('.enemy:last');
    $(lastEnemy).css({
        'left':randomNo+'%',
        'top':randomNo2+'%',
      },movingEnemy(lastEnemy)), console.log(lastEnemy);
    removeEnemy(lastEnemy);
    //what happens when enemy touches :D

  }

  //prelude - sliding stuff
  $('#okay').click(function(){
    $('.story').slideToggle("slow",function(){
    })
  })

  $('#storyButton').click(function(){
    $('.story').slideToggle("slow",function(){
    })
  })


  //at click what happens - enemy disappear, score +=1
  $('.enemy').click(function(){
    this.remove();
    playerScore +=1;
  })


  //enemy moving animation
  function movingEnemy(something){
    var index = setInterval(function(){
      var random = Math.random();
      if(random<0.33){
        $(something).css({
          'left': "+=2%",
        })
      }else if(random<0.66){
        $(something).css({
          'top':"+=2%",
        })
      }else{
        $(something).css({
          'left':"-=2%",
        })
      }; console.log(something[0].style.top);
    }, 500);
    enemyArray.push(new Enemy(index))
  }


  //progress bar



  //add event Timer


  //global variables
  var playerScore = 0;
  var enemyArray = [];



  //game logic -> when does game end
  generateEnemy();

  function removeEnemy(enemy){
    $(enemy).click(function(){
      clearInterval()
      $(enemy).remove();
      playerScore +=1;
      //update playerScore
      $('#player1-score').text(playerScore);
    })
  }

  //implement functions





})
