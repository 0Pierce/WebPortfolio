/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 ./brain.gltf 
Author of 3D Model: 3DRT STUDIOS (https://sketchfab.com/Hanako.com)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/human-brain-7a27c17fd6c0488bb31ab093236a47fb
Title: Human Brain
*/

import React, { useRef,useEffect,useState} from 'react'
import {useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'
// import {vertexShader, fragmentShader} from '/src/components/Shaders.jsx'

function transformMesh(mesh) {
  const pointsGeometry = new THREE.BufferGeometry()
  const vertices = []
  const tempPosition = new THREE.Vector3()

  const sampler = new MeshSurfaceSampler(mesh).build()

  for (let i = 0; i < 69000; i++) {
    sampler.sample(tempPosition)
    vertices.push(tempPosition.x, tempPosition.y, tempPosition.z)
  }

  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xff0026,
    size: 0.005,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    sizeAttenuation: true
  })

  return new THREE.Points(pointsGeometry, pointsMaterial)
}





export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/brain.gltf')
  const [rotationSpeed, setRotationSpeed] = useState(0.001);
  const pointsRef = useRef();
  const [hovered, setHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  const brainRef = useRef();

  //Handles the slow rotation of the brain
  useFrame(() => {
    if (brainRef.current) {
      brainRef.current.rotation.y += rotationSpeed;
      pointsRef.current.rotation.y = brainRef.current.rotation.y; 
         

      
    }

    brainRef.current.visible = !hovered;
    pointsRef.current.visible = hovered;

  });

  useEffect(() => {
    if (nodes && nodes.brain) {
      const points = transformMesh(nodes.Object_5)
      pointsRef.current = points
      

      //group.current.add(points)
      console.log("USEEffect ran")
      

      


    }
  }, [nodes])


  document.body.style.cursor = hovered ? 'pointer' : 'auto'

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  return (
    
    <group ref={group} {...props} dispose={null} scale={0.02}  >
      <mesh 
      ref={brainRef}
      geometry={nodes.Object_5.geometry}
      material={materials.material_0}
      castShadow receiveShadow
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
           />

    {pointsRef.current && (
      <points
        ref={pointsRef}
        geometry={pointsRef.current.geometry}
        material={pointsRef.current.material}
      />
    )}

    </group>
  )
}





useGLTF.preload('/brain.gltf')
