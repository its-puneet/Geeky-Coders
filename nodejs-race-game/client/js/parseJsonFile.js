var ParseJsonFile = {

    // callback needs an argument, the result of JSON.parse
    parseJson: function(jsonFile, callback) {

        var xmlhttp = new XMLHttpRequest();
        var url = jsonFile;

        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                callback(JSON.parse(xmlhttp.responseText));

            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    },

    createCarsSelectionMenu: function(menuId) {

        var url = "carsList.json";
        var carsList = [];

        ParseJsonFile.parseJson(url, function(carsList) {

            var select = document.getElementById(menuId);

            var option = document.createElement("option");
            option.text = 'chose your car !';
            option.value = '';
            select.appendChild(option);
            select.style.width =  253 / 2 + 60 +"px";

            for (var i = 0; i < carsList.length; i++) {

                option = document.createElement("option");
                option.text = carsList[i];
                option.style.background = 'url(assets/cars/previews/' + carsList[i] + '.png) no-repeat right 16px center';
                option.style.backgroundSize = 'auto 50%';
                option.style.padding = '4px';
                option.style.paddingBottom = '16px';
                //253 is the widthest car preview
                option.style.width = 253 / 2 + 60 + 'px';
                option.value = carsList[i];

                select.appendChild(option);

                jaws.assets.add('cars/' + carsList[i] + '.png');

            }

            select.onchange = function() {

                var selectedOption = select.options[select.options.selectedIndex];

                select.style.background = selectedOption.style.background;

            };

        });

    },

    createTracksSelectionMenu: function(menuId) {

        var url = "tracksList.json";
        var tracksList = [];

        ParseJsonFile.parseJson(url, function(tracksList) {

            var select = document.getElementById(menuId);

            for (var i = 0; i < tracksList.length; i++) {

                var option = document.createElement("option");
                option.text = tracksList[i];
                option.value = tracksList[i];
                select.appendChild(option);

            }

        });

    },

    // callback needs an argument, the result of JSON.parse
    getTileInfo: function(callback) {

        var url = "TileInfo.json";

        ParseJsonFile.parseJson(url, callback);

    }

}
