function Car(image, frame_width, frame_height, frame_duration) {

    const USERNAME_OFFSET = {
        x: -45,
        y: -15
    }

    var m_car;
    var m_speed;
    var m_carFilename;
    //this variable define your position by the algorithm made in the track class
    var m_score;
    var m_isIA;
    var m_username;
    var pushed;
    var accel = {
        id: 0,
        percent: 0
    }

    this.constructor = function() {
        m_carFilename = image;
        m_car = new jaws.Sprite({
            image: m_carFilename,
            scale_image: 0.10,
            anchor_x: 0.25,
            anchor_y: 0.5,
            angle: 180
        });
        //m_car.animation = new jaws.Animation({sprite_sheet: jaws.assets.get(image), frame_size: [frame_width,frame_height], frame_duration: frame_duration , orientation :"right"});
        //m_car.setImage(m_car.animation.frames[1]);
        m_username = new jaws.Text({
            text: "player",
            x: 0,
            y: 0,
            fontSize: 17,
            color: "rgb(128,208,64)",
            wordWrap: true,
            style: "bold",
            shadowColor: "black",
            shadowBlur: 4
        });
        console.log(m_username.toJSON());
        //creating 4 new variables for the sprite
        m_car.vx = m_car.vy = 0;
        m_car.agx = m_car.agy = 0;

        m_isIA = false;
        pushed = false;
    }

    this.move = function(elapsedTime /*,tile_map*/ ) {
        m_car.vx = m_car.agx;
        m_car.vy = m_car.agy;

        m_car.move(elapsedTime * m_car.vx, elapsedTime * m_car.vy);
        debug = document.getElementById("debug");
        debug.innerHTML = "<p> move " + this.getX() + " :: " + this.getY() + "</p>";
    }

    this.update = function(socket) {
        jaws.on_keydown(["up", "space"], function() {
            accel.percent = 1;
            socket.emit(jaws.constants.acceleration, accel);
        })

        jaws.on_keydown("right", function() {
            if (jaws.pressed(["up", "space", "shift"]))
                accel.percent = 1;
            else
                accel.percent = 0.5;

            socket.emit(jaws.constants.acceleration, accel);
        })
        jaws.on_keydown("shift", function() {
            if (jaws.pressed(["right"]))
                accel.percent = 1;

            socket.emit(jaws.constants.acceleration, accel);
        })

         jaws.on_keyup(["right", "up", "space", "shift"], function() {
            if (jaws.pressed(["up", "space"]) || jaws.pressed(["right", "shift"], true))
                accel.percent = 1;
            else if (jaws.pressed("right"))
                accel.percent = 0.5;
            else
                accel.percent = 0;

            socket.emit(jaws.constants.acceleration, accel);
        })

        if (jaws.pressed('w'))
            m_car.rotate(5);

        //need smartphone-controls.js
        if(jaws.mobileVersion) {
            if(window.screenTouched) {
                accel.percent = 1;
                socket.emit(jaws.constants.acceleration, accel);
            }
            else {
                accel.percent = 0;
                socket.emit(jaws.constants.acceleration, accel);
            }
        }
    }

    this.setMyID = function(_id) {
        accel.id = _id;
    }

    this.draw = function(viewport) {
        viewport.draw(m_car);
        viewport.draw(m_username);
    }

    /**
     * @brief : gestion des sprites
     **/
    // this.show = function ()
    // {
    //  if ( m_goRight )
    //  {
    //      m_car.setImage( m_car.go_right.next() );
    //  }
    // }

    this.haveToSend = function() {
        return pushed;
    }

    this.getSprite = function() {
        return m_car;
    }

    this.setPosition = function(carInfos, cellSize, trackOffsetPosition) {

        carInfos.position.y *= -1;

        m_car.moveTo(carInfos.position.x * cellSize + trackOffsetPosition.x + cellSize, carInfos.position.y * cellSize + trackOffsetPosition.y + cellSize);
        m_car.rotateTo(carInfos.angle * 180 / Math.PI + 90);
        // m_car.rotateTo( Math.PI * carInfos.angle / 180 );
        m_username.x = m_car.x + USERNAME_OFFSET.x;
        m_username.y = m_car.y + USERNAME_OFFSET.y;
    }

    this.getX = function() {
        return m_car.x;
    }

    this.getY = function() {
        return m_car.y;
    }

    this.setAccelerationX = function(agx) {
        m_car.agx = agx;
    }

    this.setAccelerationY = function(agy) {
        m_car.agy = agy;
    }

    this.getAccelerationX = function() {
        return m_car.agx;
    }

    this.getAccelerationY = function() {
        return m_car.agy;
    }

    this.setUsername = function(user) {
        m_username.text = user;
    }

    this.switchToIA = function() {


    }

    this.switchToPlayer = function() {


        }
        //end of class

}
