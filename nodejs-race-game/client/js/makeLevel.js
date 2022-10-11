// push tile in m_spriteList,
// after checking if there isn't already a sprite at this position
function pushInSpriteList(spriteList, tile) {
    var spaceFree = true;
    for (var i = 0; i < spriteList.length; i++) {

        if (spriteList.sprites[i].x == tile.x && spriteList.sprites[i].y == tile.y) {

            spaceFree = false;
            break;

        }
    }

    if (spaceFree) {

        spriteList.push(tile);

    }
}

function MakeLevel(cell_size, listeURLimg, viewport, listEnnemies) {

    var m_currentImg;
    var m_viewport;
    var saveName = "nom_du_level";
    var m_indiceIMG = 0;
    var m_spriteList;

    this.constructor = function() {
        //console.log("MakeLevel.constructor() called by");
        //console.log(arguments.callee.caller);
        if (leveljson != "") {
            saveName = leveljson;
        }

        current_image = document.getElementById('current-image');

        m_currentImg = new Array();

        for (var i = 0; i < listeURLimg.length; i++)
            m_currentImg[i] = listeURLimg[i];

        m_viewport = viewport;
        m_viewport.x = 0;
        m_viewport.y = 0;

        m_spriteList = new jaws.SpriteList();

        if (leveljson != "") {
            console.log("assets :");
            console.log(jaws.assets.src_list);
            // m_spriteList.load(jaws.assets.get("../"+leveljson+".json"));

            var tileSet = new TileSet(m_viewport, cell_size, "../" + leveljson);
            tileSet.constructor();

            m_spriteList = tileSet.getSpriteList();

        }
        this.drawImageCurrent();

        //Draw a tile
        // if ( jaws.pressed("left_mouse_button") )
        jaws.on_keydown("left_mouse_button", function() {
            var tangle = document.getElementById('rotate').value;
            tangle = parseInt(tangle);
            var anchor = "top_left";
            //yurk but haven't got so much time
            if (tangle == 90) {
                anchor = "bottom_left";
            } else if (tangle == 180 || tangle == 380) {
                anchor = "bottom_right";
            } else if (tangle == 270 || tangle == -90) {
                anchor = "top_right"
            }
            temp = new Tile({
                x: (jaws.mouse_x + viewport.x) -
                    (jaws.mouse_x + viewport.x) % cell_size,

                y: (jaws.mouse_y + viewport.y) - (jaws.mouse_y + viewport.y) % cell_size,

                image: m_currentImg[m_indiceIMG],

                scale: document.getElementById('scale').value,
                angle: tangle,
                anchor: anchor
            });
            temp.setMyImage(m_currentImg[m_indiceIMG]);
            for (var i = 0; i < ArrayTileInfo.length; i++) {
                if (ArrayTileInfo[i].url == m_currentImg[m_indiceIMG]) {
                    // var list = temp.loadCurves(ArrayTileInfo[i].ListPoint);
                    break;
                }
            }
            pushInSpriteList(m_spriteList, temp);
        });

        //delete the last tile
        jaws.on_keydown("z", function() {
            m_spriteList.pop();
        });

        //Save the tilemap
        jaws.on_keydown("s", this.save);
    }

    this.update = function(viewport) {

        //Delete the selected tile
        if (jaws.pressed("right_mouse_button")) {
            m_spriteList.removeIf(foundSprite);
        }

        if (jaws.pressed("p")) {
            m_indiceIMG = (m_indiceIMG + 1) % m_listImgURL.length;
            this.updateRotationTiles();
        }

        if (jaws.pressed("m")) {
            m_indiceIMG = (m_indiceIMG - 1 < 0) ? m_listImgURL.length - 1 : m_indiceIMG - 1;
            this.updateRotationTiles();
        }
    }


    this.getSpriteList = function() {
        return m_spriteList;
    }

    this.updateRotationTiles = function() {
        this.drawImageCurrent();
        reloadListImage();
        this.setCursorImage();
    }

    this.setCursorImage = function() {
        $('#subImg').attr("src", this.getCurrentImgUrl());
    }


    this.save = function() {
        console.log('MakeLevel.save()');

        var trackParts = []

        var partsId = {};

        for (var i = 0; i < ArrayTileInfo.length; i++) {

            partsId[ArrayTileInfo[i].url] = ArrayTileInfo[i].id;

        };

        console.log("save / partsId : ");
        console.log(partsId);

        for (var i = 0; i < m_spriteList.length; i++) {

            trackParts.push({

                id: partsId[m_spriteList.at(i).m_image],
                rotation: m_spriteList.at(i).angle

            });

        };

        var track = {
            reversed: false,
            parts: trackParts
        };

        var jsonTrack = JSON.stringify(track, null, 4);

        console.log("save / m_spriteList : ");
        console.log(m_spriteList);
        console.log("jsonTrack : ");
        console.log(jsonTrack);

        // the remaining code below will output the json txt representing the track
        // (the content of jsonTrack)
        // in the space at the bottom of the editor
        sessionStorage.setItem('saveName', jsonTrack);

        var saveText = document.getElementById("save");
        saveText.value = sessionStorage.saveName + '\n';
        saveName = '';
    }

  this.drawImageCurrent = function()
  {
    var path = 'assets/';
    var url = path + m_currentImg[ m_indiceIMG ] ;

    var idImage = document.getElementById(m_indiceIMG);
    var ratio = 1 ;
    if ( idImage != null )
    {
        for ( var i = 0 ; i < idImage.width && idImage.width % 3 != 0 ; i+=10)
        {
        	if ( i % 3 == 0 )
        	{
        	  ratio = i/100;
        	}
        }
    }

    var _scale = document.getElementById('scale');
    _scale.value = ratio  ;
    drawImageByContext(url, current_image.id, null, this.width);
  }

  this.getCurrentImgUrl = function() {
    var path = 'assets/';
    return path + m_currentImg[ m_indiceIMG ];
  }

    this.setIndice = function(newIndice) {
        m_indiceIMG = newIndice;
    }

    this.changeBackground = function() {
        background.setImage(document.getElementById('background').value);
    }

    this.getWidth = function(index) {
        return m_spriteList.at(index); //.rect().width;
    }

    this.getHeight = function(index) {
        return m_spriteList.at(index).rect().height;
    }

    this.getCamX = function() {
        return m_viewport.x;
    }

    this.getCamY = function() {
        return m_viewport.y;
    }

    function foundSprite(sprite) {
        return (
            (sprite.x == (jaws.mouse_x + viewport.x) - (jaws.mouse_x + viewport.x) % cell_size) &&
            (sprite.y == (jaws.mouse_y + viewport.y) - (jaws.mouse_y + viewport.y) % cell_size)
        )
    }
    //end of class
}
