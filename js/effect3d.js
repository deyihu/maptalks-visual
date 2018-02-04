function drawElements() {
    var scene = threeLayer.getScene();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }

    // hemi-sphere
    var hemi_sphere_geometry = new THREE.SphereGeometry(1600, 32, 32);
    var hemi_sphere_material = new THREE.MeshPhongMaterial({
        color: 0xaa6666,
        transparent: true,
        opacity: 0.45,
        shininess: 60,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, 0, -1))]
    });
    var hemi_sphere = new THREE.Mesh(hemi_sphere_geometry, hemi_sphere_material);
    hemi_sphere.position.set(-27589453.947005168, -16645787.262404276, 0);
    scene.add(hemi_sphere);

    // circle-plane
    var circle_plane_geometry = new THREE.CircleGeometry(1600, 64);
    var circle_plane_material = new THREE.MeshBasicMaterial({
        color: 0x220000,
        opacity: 0.1,
        side: THREE.BackSide
    });
    var circle_plane = new THREE.Mesh(circle_plane_geometry, circle_plane_material);
    circle_plane.position.set(-27589453.947005168, -16645787.262404276, 0);
    scene.add(circle_plane);

    // add spot light
    var spotLightGeometry = new THREE.CylinderGeometry(0.1, 1.5, 5, 32 * 2, 20, true);
    // geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -geometry.parameters.height / 2, 0));
    // geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    refreshMap();
}