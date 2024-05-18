import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const earthRef = useRef();
  const cloudsRef = useRef();

  // Load textures
  const earthTexture = useLoader(THREE.TextureLoader, '/earth_texture.jpg');

  // Country data
  const countries = [
    { name: 'United States', lat: 37.0902, lon: -95.7129 },
    { name: 'Canada', lat: 56.1304, lon: -106.3468 },
    // Add more countries here...
  ];

  const radius = 32;

  // Convert latitude and longitude to 3D coordinates
  function latLonToXYZ(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return { x, y, z };
  }

  // Handle label click
  const handleLabelClick = (country) => {
    alert(`You clicked on ${country.name}`);
  };

  // // Animate the rotation
  // useFrame(() => {
  //   if (earthRef.current) {
  //     earthRef.current.rotation.y += 0.001;
  //   }
  //   if (cloudsRef.current) {
  //     cloudsRef.current.rotation.y += 0.001;
  //   }
  // });

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} />
      <Stars />

      {/* Earth Sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>

      {/* Country Labels */}
      {countries.map((country) => {
        const { x, y, z } = latLonToXYZ(country.lat, country.lon, 1.05); // 1.05 to place above the surface
        return (
          <Text
            key={country.name}
            position={[x, y, z]}
            fontSize={0.1}
            color="white"
            onClick={() => handleLabelClick(country)}
            anchorX="center"
            anchorY="middle"
          >
            {country.name}
          </Text>
        );
      })}

      <OrbitControls />
    </Canvas>
  );
}

export default Globe;
