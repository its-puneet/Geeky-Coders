Tile = function Tile(options) {

    // console.log("Tile");

    // console.log("options : ");
    // console.log(options);

    var listPoint = new Array();
    if (typeof options.listPoint !== 'undefined') {
        this.listPoint = options.listPoint;
        delete options.listPoint;
    }
    // console.log("listPoint : ");
    // console.log(listPoint);

    if (!(this instanceof arguments.callee)) return new arguments.callee(options);
    jaws.Sprite.call(this, options);

    //supringly, the value image is not read as it does,then this variable store it
    var m_image = "";
    if (typeof options.image !== 'undefined') {
        this.m_image = options.image;
    }
}

Tile.prototype = jaws.Sprite.prototype


//only used in the editor in order to make track with the rail points
Tile.prototype.loadCurves = function(points) {
    this.listPoint = [];
    var offsetX = 30 / points.length;
    var offsetY = 30 / points.length;

    //disgusting but it works
    for (var i = 0; i < points.length; i++) {
        var point = {
            x: points[i].x,
            y: points[i].y
        };
        this.listPoint.push(point);
    }

    for (var i = 0; i < this.listPoint.length; i++) {
        if (this.angle == 90 || this.angle == -270) {
            var tempX = this.listPoint[i].x;
            this.listPoint[i].x = -this.listPoint[i].y;
            this.listPoint[i].y = tempX;
        } else if (this.angle == 180 || this.angle == -180) {
            this.listPoint[i].x = -this.listPoint[i].x;
            this.listPoint[i].y = -this.listPoint[i].y;
        } else if (this.angle == 270 || this.angle == -90) {
            var tempX = this.listPoint[i].x;
            this.listPoint[i].x = this.listPoint[i].y;
            this.listPoint[i].y = -tempX;
        }
    }

    for (var i = 0; i < points.length; i++) {
        this.listPoint[i].x = this.listPoint[i].x * offsetX + this.x;
        this.listPoint[i].y = this.listPoint[i].y * offsetY + this.y;
    }
}

//only for the editor
Tile.prototype.setMyImage = function(image) {
    this.m_image = String(image);
}



Tile.prototype.toJSON = function() {
    var object = this.attributes();


    if (object['image'] == null) {
        //to set the right url image
        //console.log(this.m_image);
        this.setImage(this.image);
        object['image'] = this.m_image;
    }
    object["_constructor"] = "Tile";
    object["listPoint"] = this.listPoint;
    return JSON.stringify(object);
}
