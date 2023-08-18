import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg'; 

const container = document.getElementById('container')

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(container.clientWidth, container.clientHeight)

container.appendChild(renderer.domElement)





const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
)


const loadingManager=  new THREE.LoadingManager();

const progressBar = document.getElementById('progress-bar')
loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total) * 100
}

const progressBarContainer = document.querySelector('.progress-container')
loadingManager.onLoad = function() {
    progressBarContainer.style.display = 'none'
}


const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(-90, 140, 140)
orbit.update()

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

//cosmic stars
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
])

const textureLoader = new THREE.TextureLoader(loadingManager)

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map:textureLoader.load(sunTexture)
})
const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun)


function createPlanets(size, texture, positionX, ring) {
    const geo = new THREE.SphereGeometry(3.2, 30, 30)
    const mat = new THREE.MeshStandardMaterial({
        map:textureLoader.load(texture)
    })
    const mesh = new THREE.Mesh(geo, mat)
    const obj = new THREE.Object3D()
    obj.add(mesh)

    if (ring) {
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32)
        const ringMat = new THREE.MeshBasicMaterial({
            map:textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        })
        const ringMesh = new THREE.Mesh(ringGeo, ringMat)
        
        obj.add(ringMesh)
        ringMesh.position.x = positionX
        ringMesh.rotation.x = -0.5 * Math.PI 
    }

    scene.add(obj)
    mesh.position.x = positionX

    return {mesh, obj}

}

const mercury = createPlanets(3.2, mercuryTexture, 28)
const venus = createPlanets(5.8, venusTexture, 44)
const earth = createPlanets(6, earthTexture, 62)
const mars = createPlanets(4, marsTexture, 78)
const jupiter = createPlanets(12, jupiterTexture, 100) 
const saturn = createPlanets(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
})
const uranus = createPlanets(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
})
const neptune = createPlanets(7, neptuneTexture, 200) 
const pluto = createPlanets(2.8, plutoTexture, 216) 
 


// const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30)
// const mercuryMat = new THREE.MeshStandardMaterial({
//     map:textureLoader.load(mercuryTexture)
// })
// const mercury = new THREE.Mesh(mercuryGeo, mercuryMat)
// const mercuryObj = new THREE.Object3D()
// mercuryObj.add(mercury)
// scene.add(mercuryObj)
// mercury.position.x = 28


  

const pointLight = new THREE.PointLight(0xffffff, 10000, 200)
scene.add(pointLight)


function animate() {
    sun.rotateY(0.004)
    mercury.mesh.rotateY(0.004)
    venus.mesh.rotateY(0.002)
    earth.mesh.rotateY(0.02)
    mars.mesh.rotateY(0.018)
    jupiter.mesh.rotateY(0.04)
    saturn.mesh.rotateY(0.038)
    uranus.mesh.rotateY(0.03)
    neptune.mesh.rotateY(0.032)
    pluto.mesh.rotateY(0.008) 

    mercury.obj.rotateY(0.04)
    venus.obj.rotateY(0.015)
    earth.obj.rotateY(0.01)
    mars.obj.rotateY(0.008)
    jupiter.obj.rotateY(0.002)
    saturn.obj.rotateY(0.0009)
    uranus.obj.rotateY(0.0004)
    neptune.obj.rotateY(0.0001)
    pluto.obj.rotateY(0.0007)

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function() {
    const width = container.clientWidth
    const height = container.clientHeight
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    
    // camera.aspect = window.innerWidth / window.innerHeight
    // camera.updateProjectionMatrix()
    // renderer.setSize( window.innerWidth / window.innerHeight )
})
 
