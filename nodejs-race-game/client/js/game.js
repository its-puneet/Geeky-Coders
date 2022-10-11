var VMAX = 200;

const CELL_SIZE = 25;
const TRACK_OFFSET_POSITION = {
    x: 100,
    y: 100
};

function Game(socket, myId, trackName, cars) {

    var m_viewport;
    var m_cars;
    var m_date;
    var m_speed;
    var m_counting;
    var m_myId;
    var m_ping;
    var m_hubTxt;
    var m_positionTxt;
    var m_lapsTxt;
    var m_positionTrack;

    this.setup = function() {

        live_info = document.getElementById("live_info");
        cell_size = 50;

        m_counting = -1;
        m_positionTrack = 1;
        m_speed = 0;
        m_myId = myId;
        m_date = new Date();

        m_hubTxt = new jaws.Text({
            text: "En attente",
            x: jaws.width / 2 - 100,
            y: jaws.height / 2,
            style: "bold"
        });
        m_hubTxt.color = "Red";
        m_hubTxt.fontSize = 54;

        m_positionTxt = new jaws.Text({
            x: jaws.width - 150,
            y: jaws.height - 10,
            style: "bold"
        });
        m_positionTxt.fontSize = 18;

        m_lapsTxt = new jaws.Text({
            x: 5,
            y: jaws.height - 10,
            style: "bold"
        });
        m_lapsTxt.fontSize = 18;

        //Viewport
        m_viewport = new jaws.Viewport({
            max_x: jaws.width * 1.5,
            max_y: jaws.height * 1.5
        });
        m_cars = new Array();

        // var x = Math.floor((Math.random() * jaws.width) + 1);
        // var y = Math.floor((Math.random() * jaws.height) + 1);

        for (var i = 0; i < cars.length; i++) {
            m_cars[i] = new Car('cars/' + cars[i] + '.png', 0, 0, 50);
            m_cars[i].constructor();

        };

        console.log(cars);

        m_cars[m_myId].setMyID(m_myId);
        m_cars[m_myId].setUsername(username);

        m_level = new TileSet(m_viewport, cell_size, trackName);
        m_level.constructor();


        socket.on(jaws.constants.position, function(carInfos) {
            //fetch postion from another players
            game.setPosition(carInfos);
        });

        socket.on(jaws.constants.logins, function(infosLogin) {
            m_cars[infosLogin.id].setUsername(infosLogin.username);
        });

        socket.on(jaws.constants.counting, function(count) {
            console.log("console : couting " + count);
            m_counting = count;
            m_hubTxt.text = m_counting;
        });

        socket.on(jaws.constants.endGame, this.endGameFunction.bind(this));

        socket.on(jaws.constants.closeCo, function() {
            socket.disconnect();
            console.log("disconnection");
        });

        socket.on(jaws.constants.myPosition, function(carInfos) {
            //fetch new position
            game.setPosition(carInfos);
            m_lapsTxt.text = "Laps : " + carInfos.lap + " / " + laps;
        });

        socket.on(jaws.constants.trackPosition, function(position) {
            m_positionTxt.text = "Position : " + position + " / " + nbCarsPlayed;
            m_positionTrack = position;
        });

        setInterval(function() {
                var date = new Date();
                socket.emit(jaws.constants.ping, date.getTime());
            },
            1000
        );

        socket.on(jaws.constants.ping, function(oldTime) {
            var date = new Date();
            m_ping = date.getTime() - oldTime;
        });

        jaws.preventDefaultKeys(["up", "down", "left", "right"]);
    }

    this.update = function() {
        var oldDate = m_date;
        m_date = new Date();

        var elapsedTime = (m_date.getTime() - oldDate.getTime()) / 1000;

        if (m_hubTxt.text == 0) {
            m_cars[m_myId].update(socket);
        }
        //m_cars[m_myId].move(elapsedTime);

        //reset
        if (jaws.pressed('r')) {}

        //Infos
        live_info.innerHTML = "<p>" + jaws.game_loop.fps + " fps</p>" + "<p> Ping : " + m_ping + " ms</p>"; //. Player: " ;+ parseInt(m_perso.getX()) + "/" + parseInt(m_perso.getY()) + ". ";
        //  live_info.innerHTML /*+*/= "Viewport: " + parseInt(m_viewport.x) + "/" + parseInt(m_viewport.y) + ".";
    }

    this.draw = function() {
        jaws.clear();
        jaws.fill("rgba(200,200,200,1");

        m_viewport.centerAround(m_cars[m_myId].getSprite());

        m_viewport.drawTileMap(m_level.getTileMap());
        for (var i = 0; i < m_cars.length; i++) {
            m_cars[i].draw(m_viewport);
        }

        if (m_hubTxt.text != 0) {
            m_hubTxt.draw();
        }
        m_positionTxt.draw();
        m_lapsTxt.draw();
    }

    this.isNeededToUpdate = function() {
        return m_cars[m_myId].haveToSend();
    }

    this.getMyPositionY = function() {
        return m_cars[m_myId].getY();
    }

    this.getMyPositionX = function() {
        return m_cars[m_myId].getX();
    }

    this.getMyAgX = function() {
        return m_cars[m_myId].getAccelerationX();
    }

    this.getMyAgY = function() {
        return m_cars[m_myId].getAccelerationY();
    }

    this.setPosition = function(carInfos) {
        //alert(index+", "+ x+", "+y);
        if (carInfos.id > m_cars.length && carInfos.id != m_myId) {
            alert("Restart the game because an error was detected");
        } else {
            if (m_myId == carInfos.id)
                m_speed = carInfos.speed;

            speed = document.getElementById("speed");
            speed.innerHTML = "<p>speed : " + m_speed.toFixed(2) + "</p>";

            m_cars[carInfos.id].setPosition(carInfos, CELL_SIZE, TRACK_OFFSET_POSITION);

            debug = document.getElementById("debug");
            debug.innerHTML = "<p> move " + this.getMyPositionX().toFixed(2) + " :: " + this.getMyPositionY().toFixed(2) + "</p>";
        }
    }

    this.addCar = function(carId, carName) {

        m_cars[carId] = new Car('cars/' + carName + '.png', 0, 0, 50);
        m_cars[carId].constructor();

    }

    this.formatPositionText = function() {
        switch(m_positionTrack) {
            case 1: 
                return "1st";
            break;
            case 2:
                return "2nd";
            break;
            case 3:
                return "3rd";
            break;
            default:
                return m_positionTrack+"th";
            break;
        }
    }

    this.endGameFunction = function() {
        m_hubTxt.text = "You are finished "+this.formatPositionText();
        socket.emit(jaws.constants.disconnection, 'fin');
    }

    //end of class
}
