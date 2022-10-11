function TileSet(viewport, cell_size, trackName) {

    var m_viewport;
    var m_spriteList;
    var m_currentLevel;
    var m_tile_map;

    this.constructor = function() {
        m_viewport = viewport;
        m_currentLevel = 1;
        m_tile_map = new jaws.TileMap({
            size: [m_viewport.max_x / cell_size, m_viewport.max_y / cell_size],
            cell_size: [cell_size, cell_size]
        });

        m_spriteList = new jaws.SpriteList();

        this.loadLevel();

    }

    this.draw = function() {
        m_spriteList.draw();

    }

    this.getSpriteList = function() {
        return m_spriteList;

    }

    this.getTileMap = function() {
        return m_tile_map;
    }


    this.getcurrentLevel = function() {
        return m_currentLevel;
    }


    this.setcurrentLevel = function(value) {
        m_currentLevel = value;
    }

    this.incrementcurrentLevel = function() {
        m_currentLevel++;
    }

    this.loadLevel = function() {
        m_spriteList = new jaws.SpriteList();

        // console.log("fdsgsdfs trackName : ");
        // console.log(trackName);

        var url = 'tracks/' + trackName + ".json";

        ParseJsonFile.parseJson(url, function(parsedTrack) {

            // console.log('-----------------');
            // console.log('parsedTrack :');
            // console.log(parsedTrack);

            var TileInfo = [];
            ParseJsonFile.getTileInfo(function(TileInfo) {

                var arrayTileInfo = [];

                for (var i = 0; i < TileInfo.length; i++) {
                    arrayTileInfo[TileInfo[i].id] = TileInfo[i];
                };

                var tile = this.makeTile(parsedTrack.parts[0], arrayTileInfo);
                m_spriteList.push(tile);

                for (var i = 1; i < parsedTrack.parts.length; i++) {

                    tile = this.makeTile(parsedTrack.parts[i], arrayTileInfo, m_spriteList, parsedTrack.parts[i - 1]);
                    m_spriteList.push(tile);

                }

                m_tile_map = new jaws.TileMap({
                    size: [m_viewport.max_x / cell_size + 10, m_viewport.max_y / cell_size + 10],
                    cell_size: [cell_size, cell_size]
                });
                m_tile_map.push(m_spriteList);

            });

        });

        // m_spriteList.load(jaws.assets.get(this.getLevelName()));
    }
}

function rotate(tileInfo, rotation) {

    resultCoords = { in : {
            x: 0,
            y: 0
        },
        out: {
            x: 0,
            y: 0
        }
    };

    rotation = Math.PI * rotation / 180;

    resultCoords.in.x = tileInfo.in.x * Math.cos(rotation) - tileInfo.in.y * Math.sin(rotation);
    resultCoords.in.y = tileInfo.in.y * Math.cos(rotation) + tileInfo.in.x * Math.sin(rotation);

    resultCoords.out.x = tileInfo.out.x * Math.cos(rotation) - tileInfo.out.y * Math.sin(rotation);
    resultCoords.out.y = tileInfo.out.y * Math.cos(rotation) + tileInfo.out.x * Math.sin(rotation);

    // console.log(' original tileInfo');
    // console.log(tileInfo);

    resultCoords.in.x = Math.round((resultCoords.in.x) * 10) / 10;
    resultCoords.in.y = Math.round((resultCoords.in.y) * 10) / 10;
    resultCoords.out.x = Math.round((resultCoords.out.x) * 10) / 10;
    resultCoords.out.y = Math.round((resultCoords.out.y) * 10) / 10;

    return resultCoords;

}

function makeTile(trackPart, arrayTileInfo, spriteList, previousPart) {

    // console.log('-----------------makeTile-----------------');
    var part = trackPart;

    var tileInfo = arrayTileInfo[trackPart.id];

    var connexionsCoordinates = rotate(tileInfo, part.rotation);

    // console.log('connexionsCoordinates after rotation :');
    // console.log(connexionsCoordinates);

    var pos = {
        x: 100,
        y: 100
    }

    if (spriteList && spriteList.length > 0) {

        var lastConnexCoords = rotate(arrayTileInfo[previousPart.id], previousPart.rotation);

        var lastPos = {
            x: spriteList.at(spriteList.length - 1).x,
            y: spriteList.at(spriteList.length - 1).y
        };

        pos.x = lastPos.x + lastConnexCoords.out.x * 50 - connexionsCoordinates.in.x * 50;
        pos.y = lastPos.y + lastConnexCoords.out.y * 50 - connexionsCoordinates.in.y * 50;
    }

    // console.log("pos : ");
    // console.log(pos);

    var tangle = part.rotation;

    temp = new Tile({

        x: pos.x,
        y: pos.y,

        image: tileInfo.url,

        scale: 1,
        angle: tangle

    });

    //yurk but haven't got so much time
    // if (tangle == 90) {
    //     temp.x += cell_size;
    // } else if (tangle == 180 || tangle == 380) {
    //     temp.x += cell_size;
    //     temp.y += cell_size;
    // } else if (tangle == 270 || tangle == -90) {
    //     temp.y += cell_size;
    // }

    // for (var i = 0; i < ArrayTileInfo.cases.length; i++) {

    //     if (ArrayTileInfo.cases[i].url == m_currentImg[m_indiceIMG]) {

    //         console.log(JSON.stringify(ArrayTileInfo.cases[i].ListPoint));

    //         var list = temp.loadCurves(ArrayTileInfo.cases[i].ListPoint);

    //         break;

    //     }
    // }

    return temp;

}
