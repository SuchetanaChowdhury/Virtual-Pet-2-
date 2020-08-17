//Create variables here
var dog, dogImg;
var happyDog
var database
var foodStock
var foodRemaining;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var ball1;

function preload(){
 //load images here
 dogImg = loadImage("images/dogImg.png")
 dogHappy = loadImage("images/dogImg1.png")
}

function setup() {
 createCanvas(900, 500);
 dog = createSprite(750, 250, 10, 10);
 dog.addImage("dog",dogImg);
// dog.addImage("happydog",dogHappy);
 dog.scale = 0.2;
 database = firebase.database();
 foodStock = database.ref('food');


 foodStock.on("value", readStock, showError);
 foodObj = new Food();

 feed = createButton("Feed the dog");
 feed.position(700,120);
 feed.mousePressed(feedDog);

 addFood = createButton("Add Food");
 addFood.position(800,120);
 addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87)
  // if(keyWentDown(UP_ARROW)){ 
  //   dog.changeImage("happydog",dogHappy)
  //    foodRemaining=foodRemaining-1 
  //    writeStock(foodRemaining);
  //  } 
  // if(keyWentUp(UP_ARROW)){
  //     dog.changeImage("dog",dogImg);
  //   }

    foodObj.display();

    fedTime=database.ref('FoodTime');
    fedTime.on("value", function(data){
      lastFed=data.val();
     });
    
    fill(255, 255, 254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + " PM", 350,50);
    }else if(lastFed ==0){
      text("Last Feed : 12 AM", 350,50);
    }else{
      text("Last Feed : "+ lastFed + " AM", 350,50);
    }

 drawSprites();
 //add styles here
 textSize(14)
 fill(242, 231, 36);
 //text("Note: Press UP_ARROW Key To Feed Drago Milk!!",200,20);
 text("Remaining food " + foodRemaining, 680, 180);

}

function writeStock(x){
  database.ref('/').update({
    "food":x
  })
}

function readStock(data){
  foodRemaining = data.val();
  foodObj.updateFoodStock(foodRemaining);
}

function showError(){
  console.log("there is in error in showing your data");
}

function feedDog(){
  dog.addImage(dogHappy);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  foodRemaining=foodRemaining-1;
  database.ref('/').update({
    //Food:foodObj.getFoodStock(),
    Food:foodRemaining,
    FeedTime:hour()
  })
}

function addFoods(){
  foodRemaining++;
  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  database.ref('/').update({
    Food:foodRemaining
  })
}