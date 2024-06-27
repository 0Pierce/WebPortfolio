import "/src/styles/Landing.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef, useEffect, Suspense } from 'react';
import Kiwi from '/src/assets/models/Kiwi.jsx'
import Brain from '/src/assets/models/Brain.jsx'



//React


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

let oldx = 0
let oldy = 0

function MouseCamera() {
  const { camera } = useThree();
  const canvas = document.querySelector('.landingCanvas');
  useEffect(() => {
    const handleMouseMove = (e) => {
      console.log("MOVE")
      let newx =( e.clientX - oldx) * 0.03;
      let newy = (e.clientY - oldy)*0.03;
      camera.position.x +=newx/100
      camera.position.y -=newy/100

      oldx = e.clientX;
      oldy = e.clientY;
      
    };



    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
}



function Landing() {
  const brainRef = useRef();








  return (
    <div className="landingBody">
      <div className="landingContent">
        <div className="landingCanvas">
        
    <Canvas
      camera={{
         
        position:[0,3,0],
        fov: 55,
        near: 0.1,
        far: 500
      }}
    >
        {/* <MouseCamera/> */}
        
        <pointLight position={[0, 5, 5]} intensity={35} />
        <ambientLight intensity={0.5} />
        {/* <pointLight/> */}
        
        <Suspense fallback={null}>
          
            {/* Rotation in radiants, so I convered into degrees for easier manipulation */}
            <Brain
            ref={brainRef}
            rotation={[0 * ( Math.PI/180), 0 * ( Math.PI/180), 0 * ( Math.PI/180)]}
            position={[0, 0, 0]}
             />
          
         
        </Suspense>
        <gridHelper/>
        
        <Controls/>
    </Canvas>
          
        </div>
        
       

        
      </div>
    </div>
  );
}

export default Landing;
