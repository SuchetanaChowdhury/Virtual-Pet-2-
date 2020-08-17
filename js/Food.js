class Food {
    constructor(){
        this.foodStock = 0;
        this.lastFed = 0;
        this.image = loadImage("images/Milk.png");
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;

    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

    deductFood(){
        if(this.foodStock>0)
        this.foodStock=this.foodStock-1;
    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){
         var x = 80, y=100;
        //  imageMode(CENTER);
        //  image(this.image, 250, 220, 70, 70);
         
        if(this.foodStock!==0){
            for(var i=0; i<this.foodStock; i++){
                // console.log(this.foodStock);
                if(i%10===0){
                    x = 80;
                    y = y+50;
                }
                image(this.image, x, y, 50, 50);
                x = x+30;
            }
            }
        }
    }