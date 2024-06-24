import "/src/styles/Landing.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef, useEffect, Suspense } from 'react';
import Kiwi from '/src/assets/models/Kiwi.jsx'




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
        
    <Canvas>

        
        <ambientLight />
        <pointLight/>
        
        <Suspense fallback={null}>
          
            <Kiwi/>
          
         
        </Suspense>
        <Controls/>
    </Canvas>
          
        </div>
        
       

        
      </div>
    </div>
  );
}

export default Landing;
