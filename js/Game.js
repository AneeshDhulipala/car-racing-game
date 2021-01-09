class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(400,200);
    car1.addImage(car1Image)
    car2 = createSprite(600,200);
    car2.addImage(car2Image)
    car3 = createSprite(800,200);
    car3.addImage(car3Image)
    car4 = createSprite(1000,200);
    car4.addImage(car4Image)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtTheEnd();
    if(allPlayers !== undefined){
    background("brown")
    image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5) 
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 275;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 275;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //cars[index - 1].shapeColor = "red";
          fill("yellow")
          stroke("red")
          strokeWeight(3)
          ellipse(x,y,60,60)
          text(player.name,x-30,y+100)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && player.distance<=5780){
      player.distance +=10
      player.update();
    }
    if (player.distance>=5780){
      gameState=2
      player.rank+=1
      Player.updateCarsAtTheEnd(player.rank)
    }
    drawSprites();
  }
  end(){
    console.log("game ended")
    console.log(player.rank)

  }
  
}
