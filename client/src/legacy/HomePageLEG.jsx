import "/src/styles/HomePage.css"
import Header from "/src/components/Header.jsx"
import Landing from "/src/components/Landing.jsx"
import { useEffect, useRef } from "react"
import * as THREE from 'three';


function HomePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const vertexShader = `
      uniform sampler2D map;
      uniform float width;
      uniform float height;
      uniform float nearClipping, farClipping;
      uniform float pointSize;
      uniform float zOffset;
      varying vec2 vUv;
      const float XtoZ = 1.11146; // tan( 1.0144686 / 2.0 ) * 2.0;
      const float YtoZ = 0.83359; // tan( 0.7898090 / 2.0 ) * 2.0;
      void main() {
        vUv = vec2( position.x / width, position.y / height );
        vec4 color = texture2D( map, vUv );
        float depth = ( color.r + color.g + color.b ) / 3.0;
        float z = ( 1.0 - depth ) * (farClipping - nearClipping) + nearClipping;
        vec4 pos = vec4(
          ( position.x / width - 0.5 ) * z * XtoZ,
          ( position.y / height - 0.5 ) * z * YtoZ,
          - z + zOffset,
          1.0);
        gl_PointSize = pointSize;
        gl_Position = projectionMatrix * modelViewMatrix * pos;
      }
    `;

    const fragmentShader = `
      uniform sampler2D map;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D( map, vUv );
        gl_FragColor = vec4( color.r, color.g, color.b, 0.2 );
      }
    `;

    let scene, camera, renderer;
    let geometry, mesh, material;
    let mouse, center;

    function init() {
      const container = containerRef.current;
      if (!container) return;

      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 0, 500);

      scene = new THREE.Scene();
      center = new THREE.Vector3();
      center.z = -1000;

      const video = document.getElementById('video');
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.NearestFilter;

      const width = 640, height = 480;
      const nearClipping = 850, farClipping = 4000;

      geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array(width * height * 3);
      for (let i = 0, j = 0, l = vertices.length; i < l; i += 3, j++) {
        vertices[i] = j % width;
        vertices[i + 1] = Math.floor(j / width);
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

      material = new THREE.ShaderMaterial({
        uniforms: {
          'map': { value: texture },
          'width': { value: width },
          'height': { value: height },
          'nearClipping': { value: nearClipping },
          'farClipping': { value: farClipping },
          'pointSize': { value: 2 },
          'zOffset': { value: 1000 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true
      });

      mesh = new THREE.Points(geometry, material);
      scene.add(mesh);



      video.play();

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      mouse = new THREE.Vector3(0, 0, 1);

      document.addEventListener('mousemove', onDocumentMouseMove);
      window.addEventListener('resize', onWindowResize);

      animate();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      //camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
      mouse.x = (event.clientX - window.innerWidth / 2) * 8;
      mouse.y = (event.clientY - window.innerHeight / 2) * 8;
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      camera.position.x += (mouse.x - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y - camera.position.y) * 0.05;
      camera.lookAt(center);
      renderer.render(scene, camera);
    }

    init();

    return () => {
      // Cleanup function to remove event listeners and dispose objects
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        scene.traverse(object => {
          if (!object.isMesh) return;
          object.geometry.dispose();
          object.material.dispose();
        });
      }
    };
  }, []);

  return (
    <>
      <Landing />
      <Header />
      <div className="homePageBody" ref={containerRef}>
        <video id="video" loop muted autoplay crossOrigin="anonymous" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
  <source src="/src/assets/kinect.mp4" />
</video>
      </div>
    </>
  );
}

export default HomePage;
