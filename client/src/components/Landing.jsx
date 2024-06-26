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


function Landing() {
  useEffect(() => {

    

    // Cleanup function
    return () => {
     
     
      //renderer.dispose();
    };
  }, []);


  const Box = () => {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="royalblue" />
      </mesh>
    );
  };




  return (
    <div className="landingBody">
      <div className="landingContent">
        <div className="landingCanvas">
        
    <Canvas
      camera={{
        position:[0,3,0],
        rotation: [50, 30, 0],
        fov: 55,
        near: 0.1,
        far: 500
      }}
    >

        
        <ambientLight />
        {/* <pointLight/> */}
        
        <Suspense fallback={null}>
          
            {/* Rotation in radiants, so I convered into degrees for easier manipulation */}
            <Brain 
            rotation={[300 * ( Math.PI/180), 0 * ( Math.PI/180), 0 * ( Math.PI/180)]}
            position={[0, 0, 0.5]}
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
