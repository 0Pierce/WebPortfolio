import "/src/styles/Landing.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef, useEffect, Suspense, useState } from 'react';
import gsap from 'gsap';
import { CameraControls} from "@react-three/drei";
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'
import { useGLTF } from '@react-three/drei'
import Kiwi from '/src/assets/models/Kiwi.jsx'
import Brain from '/src/assets/models/Brain.jsx'
import Floor from '/src/assets/models/Floor.jsx'



const CamPos = [0,1.2,2.5]


//Sets up orbit controls
extend({ OrbitControls });
function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef();

  useFrame(() => controls.current.update());

  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    return () => controls.current.dispose();
  }, [camera, gl]);

  return null;
}



//Makes the camera move with the mouse
function MouseCamera() {
  let oldx = 0
  let oldy = 0
  
  const { camera } = useThree();
  const canvas = document.querySelector('.landingCanvas');
  useEffect(() => {
    const handleMouseMove = (e) => {
      
      let newx =( e.clientX - oldx) * 0.08;
      let newy = (e.clientY - oldy)*0.1;
      

      camera.position.x +=newx/100
      camera.position.y -=newy/100
      camera.lookAt(0, 1.2, 0)
      

      oldx = e.clientX;
      oldy = e.clientY;
      
      
    };

const handleMouseExit = (e) => {
      console.log("Exit");
      gsap.to(camera.position, {
        x: CamPos[0],
        y: CamPos[1],
        z: CamPos[2],
        duration: 1, 
        ease: "power2.inOut"
      });
      gsap.to(camera.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix() 
      });
    };



    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseExit);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseExit);
    };
  }, []);
}


function  SetCameraRotation() {
  const camera = useThree(state => state.camera)
  useEffect(() => {
    camera.rotation.set(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [])
  return null
}


function transformMesh(mesh) {
  const pointsGeometry = new THREE.BufferGeometry()
  const vertices = []
  const tempPosition = new THREE.Vector3()

  const sampler = new MeshSurfaceSampler(mesh).build()

  for (let i = 0; i < 99000; i++) {
    sampler.sample(tempPosition)
    vertices.push(tempPosition.x, tempPosition.y, tempPosition.z)
  }

  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x5c0b17,
    size: 0.005,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    sizeAttenuation: true
  })

  return new THREE.Points(pointsGeometry, pointsMaterial)
}


function Landing() {

  const groupRef = useRef();
  

  
  const [hovered, setHovered] = useState(false)
  const { nodes, isReady } = useGLTF('/brain.gltf');
  
  




    
      
      document.body.style.cursor = hovered ? 'pointer' : 'auto'
     
    





  return (
    <div className="landingBody">
      <div className="landingContent">
        <div className="landingCanvas">
        
    <Canvas
      shadows 
      camera={{
         
        position:CamPos,
        fov: 75,
        near: 0.1,
        far: 500
      }}
    >
        <MouseCamera/>
        
        <pointLight
         position={[4, 3, 3]}
         intensity={35}
         castShadow
         shadow-bias={-0.005}

          />
        <ambientLight intensity={0.3} />
        
        
        <Suspense fallback={null}>
          
            {/* Rotation in radiants, so I convered into degrees for easier manipulation */}
            <Brain
            // ref={brainRef}
            rotation={[0 * ( Math.PI/180), 35 * ( Math.PI/180), 0 * ( Math.PI/180)]}
            position={[0, 0.5, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
             />

             <Floor/>
          
         
        </Suspense>
        {/* <gridHelper/> */}
        <SetCameraRotation/>
        {/* <Controls/> */}
        {/* <CameraControls ref={controls} /> */}
    </Canvas>
          
        </div>
        
       

        
      </div>
    </div>
  );
}

export default Landing;
