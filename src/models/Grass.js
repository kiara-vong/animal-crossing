import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export default function useGrass() {
  const { nodes, materials } = useGLTF(`${process.env.PUBLIC_URL}/assets/grass.glb`)

return useMemo( () => ({
	geometries: [ ] ,
	materials: [ materials.grass,materials.grass,materials.grass ],
  }), [nodes, materials]);
}

useGLTF.preload(`${process.env.PUBLIC_URL}/assets/grass.glb`)
