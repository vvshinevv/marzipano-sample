import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RoomEnvironment } from "../../../../assets/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "../../../../assets/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../../../../assets/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "../../../../assets/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "../../../../assets/jsm/libs/meshopt_decoder.module.js";
import { RoughnessMipmapper } from "../../../../assets/jsm/utils/RoughnessMipmapper.js";
import * as THREE from "three";
@Component({
  selector: 'app-songhae',
  templateUrl: './songhae.component.html',
  styleUrls: ['./songhae.component.scss']
})
export class SonghaeComponent implements OnInit {

  camera: any;
  scene: any;
  renderer: any;
  mixer: any;

  constructor() {}

  ngOnInit() {
    this.init();
    this.render(this.renderer);
  }

  init() {
    const container = document.createElement("div");
    document.body.appendChild(container);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    this.camera.position.set(1000, 100, 100);

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbbbbbb);
    this.scene.environment = pmremGenerator.fromScene(environment).texture;

    var geometry = new THREE.SphereGeometry( 800, 260, 140 );
    geometry.scale( - 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {
      map: new THREE.TextureLoader().load( '../../../../assets/models/gltf/space.png' )
    } );
    let mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );



    const ktx2Loader = new KTX2Loader()
      .setTranscoderPath("../../../../assets/js/libs/basis/")
      .detectSupport(this.renderer);

    const loader = new GLTFLoader().setPath("../../../../assets/models/gltf/");
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load("bentley.glb", (gltf: any) => {
      gltf.scene.position.y = -200;
      gltf.scene.position.x = -750;
      
      var meshToRotate = new THREE.Mesh( geometry, material );
      meshToRotate.rotateZ( Math.PI / 2 );
      const mesh = gltf.scene.children[2];

      gltf.scene.rotation.y += 0.45;

      mesh.scale.set(72, 72, 72);
      this.scene.add(gltf.scene);
      this.render(this.renderer);
    });

  
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener("change", () => this.render(this.renderer)); // use if there is no animation loop
    controls.minDistance = 50;
    controls.maxDistance = 500;
    controls.target.set(0, 0, 0);
    controls.update();
    window.addEventListener("resize", () => this.onWindowResize(this.renderer));
  }

  onWindowResize(renderer: any) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.render(renderer);
  }

  render(renderer: any) {
    renderer.render(this.scene, this.camera);
  }
}
