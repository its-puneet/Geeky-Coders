/**
This module manages the physics of the game
it computes position from players and notify them
**/
var levelModel = require('./levelModel');

var VMAX = 10; // u/sec
var VMAX_STABLE = 900;
var FACTOR = 3;
// var ACCEL_FACTOR = 3;
// var SLOWDOWN_FACTOR = 3;

exports.Engine = function(trackName, railsCount) {

    this.rails = levelModel.loadLevel(trackName, railsCount);


    this.getStart = function(railNumber) {

        return this.rails[railNumber][0];
    }

    this.updateMove = function(carInfos, elapsedTime) {
        carInfos.speed += (carInfos.accel * VMAX * FACTOR - carInfos.speed * FACTOR) * elapsedTime;

        var distance = carInfos.speed * elapsedTime;
        var x = this.rails[carInfos.id][carInfos.nextTrajectoryIndex].x - carInfos.position.x;
        var y = this.rails[carInfos.id][carInfos.nextTrajectoryIndex].y - carInfos.position.y;

        distance -= Math.sqrt(x * x + y * y);

        while (distance > 0) {
            carInfos.position.x = this.rails[carInfos.id][carInfos.nextTrajectoryIndex].x;
            carInfos.position.y = this.rails[carInfos.id][carInfos.nextTrajectoryIndex].y;

            if (++carInfos.nextTrajectoryIndex >= this.rails[carInfos.id].length) {
                carInfos.nextTrajectoryIndex = 0;
                carInfos.lap++;
                console.log("car " + carInfos.id + " in the lap '" + carInfos.lap + "'");
            }


            x = this.rails[carInfos.id][carInfos.nextTrajectoryIndex].x - carInfos.position.x;
            y = this.rails[carInfos.id][carInfos.nextTrajectoryIndex].y - carInfos.position.y;

            // console.log("in x : "+x+" ; y "+y);

            distance -= Math.sqrt(x * x + y * y);
        }

        var newAngle = Math.atan2(x, y);
        // if(carInfos.angle != newAngle && carInfos.speed>VMAX_STABLE)
        // 	carInfos.angle -= Math.PI/90*carInfos.speed/VMAX_STABLE;
        // else
        // {
        // 	if(carInfos.angle<newAngle-Math.PI/90* VMAX_STABLE/carInfos.speed)
        // 		carInfos.angle += Math.PI/90* VMAX_STABLE/carInfos.speed;
        // 	else
        // 		carInfos.angle = newAngle;
        // }
        carInfos.angle = newAngle;

        distance = distance / Math.sqrt(x * x + y * y) + 1;

        carInfos.position.x += distance * x;
        carInfos.position.y += distance * y;
    }
}

// var rails = [];
// for(var i=0; i<2; i++)
// 	rails[i] = [];

// for(var j=0; j<2; j++)
// {
// 	for(var i=0; i<80; i++)
// 	{
// 		rail = {
// 					x: 70+i*6,
// 					y: 20+j*40
// 			   }
// 		rails[j].push(rail);
// 	}
// 	for(var i=0; i<180; i++)
// 	{
// 		rail = {
// 					x: 70+80*6+(50+40*(1-j))*Math.cos((90-i)/180*Math.PI),
// 					y: 20+40+50-(50+40*(1-j))*Math.sin((90-i)/180*Math.PI)
// 			   }
// 		rails[j].push(rail);
// 	}
// }

// console.log(JSON.stringify(rails));
//var tiles = JSON.parse(fs.readFileSync('public/assets/tracks/default.json', 'utf8'));
