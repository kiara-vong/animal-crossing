
import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export default function useHouse() {
  const { nodes, materials } = useGLTF(`${process.env.PUBLIC_URL}/assets/house.glb`);

  return useMemo( () => ({
    geometries: [ nodes.door.geometry, nodes.wall.geometry ] ,
    materials: [ materials.door, materials.wall ],
    }), [nodes, materials]);
}

useGLTF.preload(`${process.env.PUBLIC_URL}/assets/house.glb`)