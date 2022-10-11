const ORIGINAL_WIDTH = 50;

function Editor() {
    console.log("Editor called by");
    console.log(arguments.callee.caller);
    var m_viewport;
    this.m_level;
    var m_background;
    this.copyLevel;
    var cameraSpeed = 5;
    var cell_size = 50;
    background = new jaws.Sprite({
        image: ''
    });

    this.setup = function() {
        live_info = document.getElementById("live_info");
        liste_image = document.getElementById("liste-image");
        current_cursor_image = document.getElementById('current-cursor-image');

        //Viewport
        m_viewport = new jaws.Viewport({
            max_x: jaws.width * 1.5,
            max_y: jaws.height * 1.5
        });

        m_level = new MakeLevel(cell_size, m_listImgURL, m_viewport);
        m_level.constructor();

        drawListImage();

        jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
    }

    this.update = function() {
        moveCamera();
        m_level.update(m_viewport);

        //Infos
        live_info.innerHTML = jaws.game_loop.fps + " fps. X: " + parseInt(jaws.mouse_x) + "/ Y : " + parseInt(jaws.mouse_y) + ". ";
        live_info.innerHTML += "Viewport: " + parseInt(m_viewport.x) + "/" + parseInt(m_viewport.y) + ".";

        moveScreen();
        mouseFollow();
    }

    function test(i) {
        m_indiceIMG = i;
    }

    function moveCamera() {
        var _x = 0;
        var _y = 0;

        if (jaws.pressed("up"))
            _y -= cameraSpeed;
        if (jaws.pressed("down"))
            _y += cameraSpeed;
        if (jaws.pressed("left"))
            _x -= cameraSpeed;
        if (jaws.pressed("right"))
            _x += cameraSpeed;

        m_viewport.move(_x, _y);
    }

    this.draw = function() {
        jaws.clear();
        m_viewport.draw(background);
        if ($('#grid').is(":checked")) {
            drawGrid();
        }
        m_viewport.draw(m_level.getSpriteList());
    }

    function moveScreen() {
        var offset = 20;
        var movement = 5;
        if (jaws.mouse_x > jaws.width - offset && jaws.mouse_x < jaws.width)
            m_viewport.move(movement, 0);
        if (jaws.mouse_x > 0 && jaws.mouse_x < 0 + offset)
            m_viewport.move(-movement, 0);
        if (jaws.mouse_y > jaws.height - offset && jaws.mouse_y < jaws.height)
            m_viewport.move(0, movement);
        if (jaws.mouse_y > 0 && jaws.mouse_y < 0 + offset)
            m_viewport.move(0, -movement);

    }

    //draw grid in function of camera position
    function drawGrid() {
        jaws.context.save();
        jaws.context.strokeStyle = "rgba(5,119,17,0.7)";
        jaws.context.beginPath();

        for (var x = 0; x < m_viewport.max_x; x += cell_size) {
            jaws.context.moveTo(x - m_viewport.x, 0);
            jaws.context.lineTo(x - m_viewport.x, jaws.height);
        }
        for (var y = 0; y < m_viewport.max_y; y += cell_size) {
            jaws.context.moveTo(0, y - m_viewport.y);
            jaws.context.lineTo(jaws.width, y - m_viewport.y);
        }

        jaws.context.closePath()
        jaws.context.stroke()
        jaws.context.restore()
    }

    function mouseFollow() {
        if (jaws.mouse_x >= 0 && jaws.mouse_x < jaws.width && jaws.mouse_y >= 0 && jaws.mouse_y < jaws.height) {
            current_cursor_image.style.display = 'inline';
            current_cursor_image.style.opacity = 0.7;
            document.onmousemove = function(e) {
                var $img = $('#subImg');
                //ratio = document.getElementById('scale').value;
                $img.offset({
                    top: e.pageY + 5,
                    left: e.pageX - 5
                });
                $img.rotate(parseInt($("#rotate").val()));
                m_level.setCursorImage(); 
                var ratio = parseInt($("#scale").val());
                $img.css("width", ORIGINAL_WIDTH * ratio);

            };
        } else
            current_cursor_image.style.display = 'none';
    }

    //end of class
}
