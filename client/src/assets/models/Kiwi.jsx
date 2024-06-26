import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'

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

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/food_kiwi_01_4k.gltf')

  useEffect(() => {
    if (nodes && nodes.food_kiwi_01) {
      const points = transformMesh(nodes.food_kiwi_01)
      group.current.add(points)
    }
  }, [nodes])

  return (
    <group ref={group} {...props} dispose={null} scale={30}>
      {/* The original mesh is not rendered */}
      {/* <mesh geometry={nodes.food_kiwi_01.geometry} material={nodes.food_kiwi_01.material} /> */}
    </group>
  )
}

useGLTF.preload('/food_kiwi_01_4k.gltf')
