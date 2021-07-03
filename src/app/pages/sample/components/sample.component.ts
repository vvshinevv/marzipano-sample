import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RoomEnvironment } from "../../../../assets/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "../../../../assets/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../../../../assets/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "../../../../assets/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "../../../../assets/jsm/libs/meshopt_decoder.module.js";
import { RoughnessMipmapper } from "../../../../assets/jsm/utils/RoughnessMipmapper.js";
import * as THREE from "three";

@Component({
  selector: "app-sample",
  templateUrl: "./sample.component.html",
  styleUrls: ["./sample.component.scss"],
})
export class SampleComponent implements OnInit {
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
    this.camera.position.set(100, 200, 300);

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbbbbbb);
    this.scene.environment = pmremGenerator.fromScene(environment).texture;

    const grid = new THREE.GridHelper(500, 10, 0xffffff, 0xffffff);
    grid.material.opacity = 0.5;
    grid.material.depthWrite = false;
    grid.material.transparent = true;
    this.scene.add(grid);

    var geometry = new THREE.SphereGeometry( 500, 60, 40 );
    geometry.scale( - 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {
      map: new THREE.TextureLoader().load( '../../../../assets/models/gltf/hdri.jpg' )
    } );
    let mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );



    const ktx2Loader = new KTX2Loader()
      .setTranscoderPath("../../../../assets/js/libs/basis/")
      .detectSupport(this.renderer);

    const loader = new GLTFLoader().setPath("../../../../assets/models/gltf/");
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load("modeling.glb", (gltf: any) => {
      gltf.scene.position.y = 8;
      const mesh = gltf.scene.children[0];
      mesh.scale.set(100, 100, 100);
      this.scene.add(gltf.scene);
      this.render(this.renderer);
    });

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener("change", () => this.render(this.renderer)); // use if there is no animation loop
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.target.set(0, 120, 0);
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
