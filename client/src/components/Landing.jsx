import "/src/styles/Landing.css";
import React, { useEffect } from 'react';
import * as THREE from 'three';

function Landing() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);

    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const MAX_CAMERA_DISTANCE = 30;

    function main() {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.setZ(30);
      camera.position.setX(-3);

      // const spaceTexture = new THREE.TextureLoader().load('/src/assets/space.jpg');
      // scene.background = spaceTexture;

      window.addEventListener('resize', onWindowResize);
      document.addEventListener('mousemove', onDocumentMouseMove);

      scene.add(torus);

      const pointLight = new THREE.PointLight(0xffffff);
      pointLight.position.set(20, 20, 20);
      const ambientLight = new THREE.AmbientLight(0xffffff);

      scene.add(pointLight, ambientLight);

      Array(200).fill().forEach(addStars);
    }

    function addStars() {
      const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
      });
      const star = new THREE.Mesh(starGeometry, starMaterial);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    }

    function Points(){
      
    }

    function animate() {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      render();
    }

    function render() {

      if (camera.position.x > MAX_CAMERA_DISTANCE) {
        camera.position.x = MAX_CAMERA_DISTANCE;
      }
      if (camera.position.x < -MAX_CAMERA_DISTANCE) {
        camera.position.x = -MAX_CAMERA_DISTANCE;
      }
      if (camera.position.y > MAX_CAMERA_DISTANCE) {
        camera.position.y = MAX_CAMERA_DISTANCE;
      }
      if (camera.position.y < -MAX_CAMERA_DISTANCE) {
        camera.position.y = -MAX_CAMERA_DISTANCE;
      }


      camera.position.x += (mouseX - camera.position.x) * 0.0005; // Reduced multiplier for gentler movement
      camera.position.y += (-mouseY - camera.position.y) * 0.0005;
      
     

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    main();
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="landingBody">
      <div className="landingContent">
        <div className="landingCanvas">
          <canvas id="bg"></canvas>
        </div>
        
      

        
      </div>
    </div>
  );
}

export default Landing;
