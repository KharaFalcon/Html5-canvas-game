


    const falling_stuff_namespace = function () { // use a function to hide all the identifiers except start_game and stop_game

        /* a canvas and a canvas context to let us draw stuff */
        const canv=document.getElementById("game_canvas");
        const ctx=canv.getContext("2d");


         //tests to see whether theCanvas does not contain false 

//Then, it tests whether the getContext() function exists.
//The return statement breaks out and stops execution if the test fails.
        if (!canv || !canv.getContext) {
            return;
         }
        
        var max = 255; //max for random colours
   
       
        const bonusPoints = 1500; //bonus points what each level it will occur relating to the points
        const bonusPoints1 = 3000; 
        const bonusPoints2 = 5000; 

        /* event listener calls move when the canvas is clicked */
        canv.addEventListener("mousemove", seen_mouse_motion, false); //mouse
        canv.addEventListener("touchstart",seen_touch_start, false); //touch screen 
        canv.addEventListener("touchmove",seen_touch_motion, false);
       
        //backgorund sound for game 
        let mySound = new Audio('../Audio/fishAudio.mp3'); // Gone Fishin'
        let hitSound = new Audio('../Audio/hit.mp3'); // https://opengameart.org/content/hit-sound-effects
       

        //constructor for a player class 
        class Player {
            constructor(x, y, colour, hit) {
                this.x = x;
                this.y = y;
                this.radius = 40;
                this.colour = colour;

                this.hit = hit;
                this.points = 0;
                this.draw = function (ctx) {
                    
                    var image = new Image();
                    image.src = "../Img/fishy1.png"; //player image 
                    image.onload = () => {
                    ctx.drawImage(image,this.x,this.y); // image has loaded and can be drawn
                }
        
        } }}
        //sets constructors for player
        var me = new Player(8, 8, "#f00", 0);


        
        


        /* move calculates a new x position for the player */
        function seen_mouse_motion( e ) {
         
                var bounding_box = canv.getBoundingClientRect(); //size of element 
                me.x = (e.clientX-bounding_box.left) *
                                        (canv.width/bounding_box.width);     
                                        
                                        
                                        
                me.y = (e.clientY-bounding_box.top) *
                                        (canv.height/bounding_box.height);
        }

        
        function seen_touch_start(e) {
            e.preventDefault()
        }
        function seen_touch_motion(e) {
            // if there is a touch movement over the canvas
            // this function will be called - we can then 
            // update the red box's location on the canvas
            // from the touch event 
            // and the canvas bounding rectangle
    
            var bounding_box=canv.getBoundingClientRect();
            me.x=(e.targetTouches[e.targetTouches.length-1].clientX-bounding_box.left) *
                                (canv.width/bounding_box.width);        
            me.y=(e.targetTouches[e.targetTouches.length-1].clientY-bounding_box.top) *
                 
            
            (canv.height/bounding_box.height);        
        }

        function damageCollide(some_falling_box){

        let circleDistancex = some_falling_box.x - me.x;
        let circleDistancey = some_falling_box.y - me.y;

         //pythagoreas theorem  a^2 + b^2 = c^2 => Triangle
        let distance = Math.sqrt(circleDistancex * circleDistancex + circleDistancey * circleDistancey);
        let sumOfRadius = (some_falling_box.radius - 30) + me.radius;

        if (distance <= sumOfRadius){

            me.colour = randomColour();
//! equals false 
//if not counted as collided 
            if (!some_falling_box.counted){
                me.hit++ //adds a hit to the player 
                hitSound.play(); // plays a sound when a collions has occured
                //circles collide
            console.log(me.hit); //test to see if a collison has occurred
            some_falling_box.colour = '#f00';
            some_falling_box.counted = true;
            }
            

            if(me.hit == 3){
                stop_game();
            }

        }else if (distance > sumOfRadius){
            //no collision
        }
        }

        function healthCollide(some_falling_box){

            let circleDistancex = (some_falling_box.x ) - me.x;
            let circleDistancey = (some_falling_box.y ) - me.y;
    
             //pythagoreas theorem  a^2 + b^2 = c^2 => Triangle
            let distance = Math.sqrt(circleDistancex * circleDistancex + circleDistancey * circleDistancey);
            let sumOfRadius = (some_falling_box.radius) + me.radius;
    
            if (distance <= sumOfRadius){
    
                me.colour = randomColour(); 
    //! equals false 
                if (!some_falling_box.counted){
                    if (me.hit > 0){
                        me.hit--;
                        console.log(me.hit);
                        some_falling_box.colour = '#f00';
                        some_falling_box.counted = true; //checks a collion has occurred
                    }
                    //circles collide
                    if(me.hit == 3){
                        stop_game();
                    }
        
                }else if (distance > sumOfRadius){
                    //no collision
                }
              
    
                }
                
    
            
            }

        function coinsCollide(some_falling_box){

            let circleDistancex = some_falling_box.x - me.x;
            let circleDistancey = some_falling_box.y - me.y;
    
             //pythagoreas theorem  a^2 + b^2 = c^2 => Triangle
            let distance = Math.sqrt(circleDistancex * circleDistancex + circleDistancey * circleDistancey);
            let sumOfRadius = some_falling_box.radius + me.radius;
    
            if (distance <= sumOfRadius){
    
                me.colour = randomColour();
    //! equals false 
                if (!some_falling_box.counted){
                    
                    me.points = me.points + 100;
                        console.log(me.hit);
                        //makes them the same colour as background once been claimed 
                        some_falling_box.colour = "#74ccf4" ;
                        some_falling_box.counted = true; //checks that a collsion has occured
                       
                        
                }
     

                    //circles collide
                    if(me.hit == 3){
                        stop_game(); //stops game when player has been hit 3 times
                    }
        
                }else if (distance > sumOfRadius){
                    //no collision
                }
                }




        /* constructor for creating new falling boxes */
        class Falling_box {
            constructor(x, y, dx, mass, colour) {
                this.x = x;
                this.y = y;
                this.dx = dx; //velocity 
                this.mass = mass;
                this.radius = 40;
                this.colour = colour;
                this.counted = false;
                this.level = 1;

                this.height = 1* this.mass;
                this.width = 1 * this.mass;
                this.top = this.y;
                this.bottom = this.y + this.height;
                this.left = this.x;
                this.right = this.x + this.width;

                this.update_position = function () {
                    this.x += dx;
                    this.top = this.x;
                    this.bottom = this.x + this.height;
                },

                    this.draw = function (ctx) {
                            var image = new Image(); //assigns the image to each object 
                            image.src = "../Img/shark.png";
                   
                            image.onload = () => { //if image is successfully loaded 
                            ctx.drawImage(image,this.x,this.y); // image has loaded and can be drawn
                    }}

                 
                    
            }
        }

              
    

 /* constructor for creating new falling boxes */
 class Health {
            constructor(x, y, dy, mass, colour) {
                this.x = x;
                this.y = y;
                this.dy = dy;
                this.mass = mass;
                this.radius = 15;
                this.colour = colour;
                this.counted = false;

                this.height = 2 * this.mass;
                this.width = 3 * this.mass;
                this.top = this.y;
                this.bottom = this.y + this.height;
                this.left = this.x;
                this.right = this.x + this.width;

                this.update_position_health = function () {
                    this.y += dy;
                    this.top = this.x;
                    this.bottom = this.x + this.height;
                },

                    this.draw = function (context) {
                    
                        context.fillStyle = this.colour;
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

                        ctx.fillStyle = this.colour;
                        ctx.fill();
                        ctx.restore();
                    }
                }}

/* constructor for creating new falling boxes */
        class Coins {
            constructor(x, y, dy, mass, colour) {
                this.x = x;
                this.y = y;
                this.dy = dy;
                this.mass = mass;
                this.radius = 20;
                this.colour = colour;
                this.counted = false;

                this.height = 2 * this.mass;
                this.width = 3 * this.mass;
                this.top = this.y;
                this.bottom = this.y + this.height;
                this.left = this.x;
                this.right = this.x + this.width;

                this.update_position_coins = function () {
                    this.y += dy;
                    this.top = this.x;
                    this.bottom = this.x + this.height;
                },

                    this.draw = function (context) {
                        context.fillStyle = this.colour;
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

                        ctx.fillStyle = this.colour;
                        ctx.fill();
                        ctx.restore();
                    }}
                   
                
        }




        //255 the general max
        // generates random colour 
        //could use to generate random colour for coin once collected
            function randomColourInt(maxVal){
                return Math.floor(Math.random()*(max + 1));

            }

            function randomColour(){
                var RGB1 = randomColourInt(max);
                var RGB2 = randomColourInt(max);
                var RGB3 = randomColourInt(max);
              
               ran_colour = ('rgb' + '(' + RGB1 + ','+ RGB2 + ',' + RGB3 + ')' )
               return ran_colour
            }

        


            var the_falling_health = { // an object with an array of health and two functions to add boxes to the array

                /* an empty array to store falling_boxes */
                falling_health: [],
    
                /* create a falling_box and add it to the array of falling_boxes */
                add_random_falling_health: function () {
    
                    //var x = Math.random() * canv.width;
                    var y = Math.random() * (canv.width);
                    var x = Math.random() * (canv.height);
                    //dx is velocity/speed
                    var dy = (Math.random() * 1) + 10;
                    var mass = (Math.random() * 1) + 1;
                    var randColour = "#BA55D3";
                    
              
                    this.falling_health.push( new Health(x, y, dy, mass, randColour, 1) )
                    console.log(this.falling_health);
                }
    
                , maybe_add_random_falling_health: function ( how_likely ) { //works out how many health items it should add
                    var maybe = Math.random();
                    if ( maybe < how_likely) {
                        this.add_random_falling_health()
                    }
                }
            }
        
           
            var the_falling_coins = { // an object with an array of health and two functions to add boxes to the array

                /* an empty array to store falling_boxes */
                falling_coins: [],
    
                /* create a falling_box and add it to the array of falling_boxes */
                add_random_falling_coins: function () {
    
                    var y = 1;
                    var x = Math.random() * (canv.height);
                    //dx is velocity/speed
                    var dy = (Math.random() * 2) + 2;
                    var mass = (Math.random() * 2) + 1;
                    var randColour = "#FFD700";
                    
                   

                
                    this.falling_coins.push(new Coins(x, y, dy, mass, randColour, 1) )//pushs coins into an array
                    console.log(this.falling_coins); //check its been added and its location on the game screen in gameplay
              
            
            }
    
                , maybe_add_random_falling_coins: function ( how_likely ) {
                    var maybe = Math.random();
                    if ( maybe < how_likely) {
                        this.add_random_falling_coins()
                    }
                }
            }

        var the_falling_boxes = { // an object with an array of boxes and two functions to add boxes to the array

            /* an empty array to store falling_boxes */
            falling_boxes: [],

            /* create a falling_box and add it to the array of falling_boxes */
            add_random_falling_box: function () {

                //var x = Math.random() * canv.width;
                var y = Math.random() * (canv.height);
                var x = 1;
                //dx is velocity/speed
                var dx = (Math.random() * 15) + 3;
                var mass = (Math.random() * 25) + 10;
                var randColour = randomColour();
                
           
                this.falling_boxes.push( new Falling_box(x, y, dx, mass, randColour, 1) )
                console.log(this.falling_boxes);


            
        }

            , maybe_add_random_falling_box: function ( how_likely ) {
                var maybe = Math.random();
                if ( maybe < how_likely) {
                    this.add_random_falling_box()
                }
            }
        }

    

        var game_interval;

        function start_game() {
            game_interval = setInterval(game_loop, 50);
            mySound.play();//plays sound when game starts
            document.getElementById("startbtn").disabled = true;//once game in action it disables it for the user until the game is paused.
        }

        function draw_everything() {
            /* first thing to do each frame is clear the canvas */
            ctx.clearRect(0, 0, canv.width, canv.height);

            /* and draw the player */

            me.draw(ctx);
           

            for (i=0; i<the_falling_health.falling_health.length; i++) {
                the_falling_health.falling_health[i].draw(ctx);
            }
         
            /* and draw all the falling_boxes */
            for (i=0; i<the_falling_boxes.falling_boxes.length; i++) {
                the_falling_boxes.falling_boxes[i].draw(ctx);
            }

            for (i=0; i<the_falling_coins.falling_coins.length; i++) {
                the_falling_coins.falling_coins[i].draw(ctx);
            }
            
            const btn = document.getElementById('startbtn');

            btn.addEventListener('click', function onClick() {
              btn.style.backgroundColor = 'salmon';
              btn.style.color = 'white';//change colour of button when they are clicked
            });
        }
        

        function game_loop() { //could add requestAnimationFrame
            
            
            /* update falling_box positions and remove falling_boxes that have gone off the canvas */
            var i;
            var j;

            /* randomly add some new falling boxes */
            // ive used different for loops to stop flickering and lagging as we have seperated the fuctions of adding, drawing and updating, and removing
         
            
            
            the_falling_boxes.maybe_add_random_falling_box( 0.06 ); //adds objects to the game

            for (i=0; i<the_falling_boxes.falling_boxes.length; i++) {

                the_falling_boxes.falling_boxes[i].update_position(); //updates the position of object on screen
                console.log(this.falling_boxes);
                if ( (the_falling_boxes.falling_boxes[i].dx == 0)
                    || (the_falling_boxes.falling_boxes[i].x > canv.width)
                ) {
                    the_falling_boxes.falling_boxes.splice( i, 1 ); //removes
                }
            } 

            the_falling_health.maybe_add_random_falling_health( 0.01 );

            for (j=0; j<the_falling_health.falling_health.length; j++) {

                the_falling_health.falling_health[j].update_position_health();
                console.log(this.falling_health); //to check how many are being added and its atributes
                if ( (the_falling_health.falling_health[j].dx == 0)
                    || (the_falling_health.falling_health[j].x > canv.width)
                ) {
                    the_falling_health.falling_health.splice( j, 1 ); //removes
                }
            } 

            the_falling_coins.maybe_add_random_falling_coins( 0.02);

            for (j=0; j<the_falling_coins.falling_coins.length; j++) {

                the_falling_coins.falling_coins[j].update_position_coins();

                if ( (the_falling_coins.falling_coins[j].dx == 0)
                    || (the_falling_coins.falling_coins[j].x > canv.width)
                ) {
                    the_falling_coins.falling_coins.splice( j, 1 ); //removes
                }
            } 
            //bonus level chance to collect coins in a s et time limit 
            if(me.points == bonusPoints){
                setTimeout(() => {
                    the_falling_coins.maybe_add_random_falling_coins(1);
                   
                    console.log(this.falling_coins); //testing purposes

                },1000)


                 //bonus level chance to collect coins in a s et time limit 
            if(me.points == 200){
                setTimeout(() => {
                    the_falling_coins.maybe_add_random_falling_coins(1);
                    
                    console.log(this.falling_coins);


                },1500) //Only allows the bonus level for a set amount of time.

                 //bonus level chance to collect coins in a s et time limit 
            if(me.points == bonusPoints2){
                setTimeout(() => {
                    the_falling_coins.maybe_add_random_falling_coins(1);
                    
                    console.log(this.falling_coins);


                },2000)
            }
            }
            }
            
            //calls the collision detection  fucntions and uses a loop to try to prevent lagging and flashes images
            for (i=0; i<the_falling_boxes.falling_boxes.length; i++) {

                damageCollide( the_falling_boxes.falling_boxes[i] );
            }

          //calls the collision detection  fucntions and uses a loop to try to prevent lagging and flashes images
            for (j=0; j<the_falling_health.falling_health.length; j++) {

                healthCollide( the_falling_health.falling_health[j] );
            }
              //calls the collision detection  fucntions and uses a loop to try to prevent lagging and flashes images
            for (j=0; j<the_falling_coins.falling_coins.length; j++) {

                coinsCollide(the_falling_coins.falling_coins[j] );
                

            }

            draw_everything();


            if (me.points == bonusPoints){
            
             setTimeout(() => {
                ctx.font = " bold 30px Arial";
                ctx.fillStyle = '#FFFF00';
                 ctx.fillText('BONUS LEVEL!', 375,200); //adds text to screen when user is about to start the bonus level
             }, "0.1")
            }

            if (me.points == bonusPoints1){
            
                setTimeout(() => {
                   ctx.font = " bold 30px Arial";
                   ctx.fillStyle = '#FFFF00';
                    ctx.fillText('BONUS LEVEL!', 375,200);
                }, "0.1")
               }

               if (me.points == bonusPoints2){
            
                setTimeout(() => {
                   ctx.font = " bold 30px Arial";
                   ctx.fillStyle = '#FFFF00';
                    ctx.fillText('BONUS LEVEL!', 375,200);
                }, "0.1")
               }
            ctx.font = "30px Arial";
            ctx.fillStyle = 'black';
            ctx.fillText('Points: ' + me.points, 300 ,50);

            ctx.font = "30px Arial";
            ctx.fillStyle = 'black';
            ctx.fillText('Damage: ' +  me.hit,  620 ,50);
            
            if(me.hit >= 3){ // if damage is 3 or greater it calls the stopgame function to stop the game
                
                stop_game();
                
            } 
        }
        
        function full_screen(){ //makes screen full screen, more accessible, better gameplay 
            canv.width  = window.innerWidth;
            canv.height = window.innerHeight;
            const btn = document.getElementById('fullsc');
            btn.addEventListener('click', function onClick() {//changes colour when buttons are clicked
                btn.style.backgroundColor = 'salmon';
                btn.style.color = 'white';
              });
        }

        function reduce_screen(){ //reduces the screen if player has selected full screen
            canv.width  = 800;
            canv.height = 500;
            const btn = document.getElementById('reducesc');
            btn.addEventListener('click', function onClick() {
                btn.style.backgroundColor = 'salmon';
                btn.style.color = 'white';
              });
        }
    function mute_sound(){ //mutes sound
        mySound.pause();//when game stops it pauses the music when button is pressed
        const btn = document.getElementById('mute');
        btn.addEventListener('click', function onClick() {
            btn.style.backgroundColor = 'salmon';
            btn.style.color = 'white';
          });
    }
    function play_sound(){
        mySound.play()
        hitSound.play();
        const btn = document.getElementById('playsd');
        btn.addEventListener('click', function onClick() {
            btn.style.backgroundColor = 'salmon';
            btn.style.color = 'white';
          });
    }
    function mutesfx(){ //mutes sound effects
        hitSound.pause();
        const btn = document.getElementById('mutesfx');
        btn.addEventListener('click', function onClick() {
            btn.style.backgroundColor = 'salmon';
            btn.style.color = 'white';
          });
    }



        /* stop updating and re-drawing the screen */
        function stop_game() {
            document.getElementById("startbtn").disabled = false;
           if(me.hit == 3){ // only shows the game over text when damage is 3 
            ctx.font = " bold 25px Arial";
                ctx.fillStyle = 'white';
                ctx.textAlign = "center";
                ctx.fillText('GAME OVER', 375,240);//game over text
                ctx.fillText('Enter your name below and submit to save your score',375,280)
           }
            mySound.pause();//when game stops it pauses the music 
            clearInterval(game_interval);//clears the interval 
            const btn = document.getElementById('endbtn');

            btn.addEventListener('click', function onClick() {
              btn.style.backgroundColor = 'salmon';
              btn.style.color = 'white';
            });

        }

        return { // an object with two attributes, start_game whose value is the function (method) start_game() and stop_game whose value is stop_game()
            start_game: start_game,
            mute_sound: mute_sound,
            mutesfx: mutesfx,
            play_sound: play_sound,
            reduce_screen: reduce_screen,
            full_screen: full_screen,
            stop_game: stop_game
        }

    }() // execute the anonymous function in order to return the object with attributes start_game and stop_game, which is assigned to falling_stuff_namespace



    //To handle this error, we use a wrapper around console.log that only makes the call if the function is supported. 
    //The wrapper creates a class named Debugger,
    //uses this if browsers don't support console.log and if not throws and error
/* var Debugger = function () { };
Debugger.log = function (message) {
   try {
      console.log(message);
   } catch (exception) {
      return;
   }
}
Debugger.log('Drawing Canvas');
*/

