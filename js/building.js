// building textures
var materials = (function () {
    var materials = [];
    var loader = new THREE.TextureLoader();
    for (let i = 1; i < 8; i++) {
        var texture = loader.load("./textures/" + i + ".jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.002, 0.002);
        materials.push(new THREE.MeshPhongMaterial({
            blending: THREE.AdditiveBlending,
            map: texture
        }));
    }
    return materials;
})();

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var maxHeight = 200;
        var features = JSON.parse(this.responseText);
        var materialDic = {}; // index by height
        var scene = threeLayer.getScene();

        features.forEach(function (g) {
            g.type = 'Feature';
            g.geometry = {
                type: 'Polygon',
                coordinates: [g.polygon]
            };
            var geo = maptalks.GeoJSON.toGeometry(g);
            var material = materialDic[g.height] ? materialDic[g.height] : materials[Math.floor(Math.random() * materials.length)];
            if (!materialDic[g.height])
                materialDic[g.height] = material;
            var mesh = threeLayer.toExtrudeMesh(geo, g.height, material, true);
            if (Array.isArray(mesh)) {
                scene.add.apply(scene, mesh);
            } else {
                scene.add(mesh);
            }
        });
        refreshMap();
    }
};

function loadBuildings() {
    xhttp.open("GET", "./data/deck_buildings.json", true);
    xhttp.send();
}