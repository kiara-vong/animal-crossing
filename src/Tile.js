import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei'

import { Mesh, Group } from 'three';

import { Rocks }  from './Rocks';
import { Bushes }  from './Bushes';
import { Flowers } from './Flowers';
import { Trees } from './Trees';
import { Grasses } from './Grasses';
import { Houses } from './Houses';

const scatterMap = {
  flowers: Flowers,
  trees: Trees,
  rocks: Rocks,
  bushes: Bushes,
  grasses: Grasses,
  houses: Houses,
}

function traverse(children) {
  return children.map( (c,i) => {
	if (c instanceof Mesh) {
	  const Tag = c.userData.scatter ? scatterMap[c.userData.scatter] : "mesh";

	  return <Tag key={i}
			   material={c.material}
			   geometry={c.geometry}
			   position={c.position}
			   density={c.userData.density} />;
	} else if (c instanceof Group) {
	  return <group key={i} position={c.position}> { traverse(c.children) } </group>;
	} else {
	  throw `I can't deal with ${c}`;
	}
  });
}

export default function Tile(props) {

  const fn = t => t === undefined ? 'empty' : 'tile'+t;

  const { nodes } = useGLTF(`${process.env.PUBLIC_URL}/assets/${fn(props.t)}.glb`)

  const meshes = useMemo( () => traverse(nodes.Scene.children), [ nodes ] );

  return (
	<group {...props} dispose={null}>
	  { meshes }
	</group>
  )
}

// 11 physical tile models (tile0.glb through tile10.glb) get reused across
// the 27 logical tile/rotation entries in tv3.js's tile_map.
//
// PUBLIC_URL (not a bare relative path) matters here: "homepage" in
// package.json is an absolute URL, so CRA bakes the "/animal-crossing"
// path into PUBLIC_URL even in development. A relative path like
// "assets/tile0.glb" resolves against whatever URL happens to be in the
// browser's address bar, which is almost never the same as where the dev
// server actually serves the public/ folder from — it 404s, falls through
// to the SPA history fallback, and useGLTF ends up trying to parse an HTML
// page as a glTF file.
const asset = name => `${process.env.PUBLIC_URL}/assets/${name}`;
[...Array(11).keys()].forEach( i => useGLTF.preload(asset(`tile${i}.glb`)) );
useGLTF.preload(asset('empty.glb'));
useGLTF.preload(asset('flower.glb'));
useGLTF.preload(asset('tree.glb'));
useGLTF.preload(asset('grass.glb'));
useGLTF.preload(asset('house.glb'));
