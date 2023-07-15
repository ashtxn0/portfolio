const scene = new THREE.Scene();

let camera = {};
if (innerWidth < 901) {
  camera = new THREE.PerspectiveCamera(90, innerWidth / innerHeight, 0.1, 1000);
} else {
  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
}

var canvas = document.getElementById("globe-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x000000, 0.0);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

Promise.all([
  fetch('./assets/shaders/vertex.glsl').then(response => response.text()),
  fetch('./assets/shaders/fragment.glsl').then(response => response.text()),
  fetch('./assets/shaders/atmosphereVertex.glsl').then(response => response.text()),
  fetch('./assets/shaders/atmosphereFragment.glsl').then(response => response.text()),
  new Promise((resolve, reject) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      './assets/images/blue-globe-uv2.jpg',
      (texture) => resolve(texture),
      undefined,
      (err) => reject(err)
    );
  })
])
  .then(([vertexShaderSource, fragmentShaderSource, atmosphereVertexShaderSource, atmosphereFragmentShaderSource, globeTexture]) => {
    const globeShader = new THREE.ShaderMaterial({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      uniforms: {
        globeTexture: { value: globeTexture }
      }
    });

    const atmosphereShader = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShaderSource,
      fragmentShader: atmosphereFragmentShaderSource,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(4, 50, 50),
      globeShader
    );

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(4, 50, 50),
      atmosphereShader
    );
    atmosphere.scale.set(1.1, 1.1, 1.1);
    scene.add(atmosphere);

    const group = new THREE.Group();
    group.add(sphere);
    scene.add(group);

    camera.position.z = 10;

    const mouse = {
      x: 0,
      y: 0
    };

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.003;
      if (!isMobileDevice) {
        gsap.to(group.rotation, {
          x: mouse.y * 0.3,
          y: mouse.x * 0.5,
          duration: 2
        });
      }
    }
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /mobile|android|iphone|ipad|iemobile|wpdesktop|windows phone|blackberry/i.test(
      userAgent
    );
    animate();

    function handleMouseMove(event) {
      mouse.x = (event.clientX / innerWidth) * 2 - 1;
      mouse.y = (event.clientY / innerHeight) * 2 + 1;
    }

    addEventListener("mousemove", handleMouseMove);


    handleMouseMove({
      clientX: innerWidth / 100,
      clientY: innerHeight / 100
    });

    if (isMobileDevice) {
      removeEventListener("mousemove", handleMouseMove);
    }

    render();
  })
  .catch((error) => {
    console.error("Error loading shaders or texture", error);
  });

function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});