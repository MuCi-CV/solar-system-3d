import { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { CelestialBodyData } from '../types.ts';

interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

interface CameraManagerProps {
  selectedBody: CelestialBodyData | null;
  controlsRef: React.RefObject<any>;
  isInteracting: boolean;
  keysPressed: KeyState;
}

// Reusable vectors to avoid creating new instances in the render loop
const tempTargetVec3 = new THREE.Vector3();
const idealCamPos = new THREE.Vector3();
const offset = new THREE.Vector3();
const moveDirection = new THREE.Vector3();

const CameraManager: React.FC<CameraManagerProps> = ({ selectedBody, controlsRef, isInteracting, keysPressed }) => {
  const { camera, scene } = useThree();
  const [isAnimating, setIsAnimating] = useState(false);

  // This effect triggers/stops animations when the selection changes.
  useEffect(() => {
    if (selectedBody) {
      // A new body is selected, start the transition animation.
      setIsAnimating(true);
    } else {
      // A body was just deselected. Stop any ongoing animations.
      // The camera will now remain stationary until moved by the user.
      setIsAnimating(false);
    }
  }, [selectedBody]);

  // This effect stops the animation if the user starts interacting with the mouse.
  useEffect(() => {
    if (isInteracting) {
      setIsAnimating(false);
    }
  }, [isInteracting]);


  useFrame((state, delta) => {
    if (!controlsRef.current) return;
    
    if (selectedBody) {
      const bodyObject = scene.getObjectByName(selectedBody.id);
      if (bodyObject) {
        bodyObject.getWorldPosition(tempTargetVec3);
        
        // ALWAYS update the controls' target to follow the object.
        controlsRef.current.target.lerp(tempTargetVec3, 0.2); 

        // Animate the camera to the ideal position ONLY if `isAnimating` is true.
        // This stops if the user interacts with the mouse.
        if (isAnimating) {
          offset.set(0, selectedBody.size * 1.5, selectedBody.size * 3.5);
          idealCamPos.copy(tempTargetVec3).add(offset);
          
          camera.position.lerp(idealCamPos, 0.04);

          // Stop animating when we get close enough.
          if (camera.position.distanceTo(idealCamPos) < 0.1) {
            setIsAnimating(false);
          }
        }
      }
    } else {
      // Free-roam logic when no body is selected
      const moveSpeed = 30 * delta; // Frame-rate independent speed
          
      moveDirection.set(0, 0, 0);

      if (keysPressed.forward) moveDirection.z -= 1;
      if (keysPressed.backward) moveDirection.z += 1;
      if (keysPressed.left) moveDirection.x -= 1;
      if (keysPressed.right) moveDirection.x += 1;

      if (moveDirection.lengthSq() > 0) {
          // Apply movement relative to camera direction
          moveDirection.normalize().applyQuaternion(camera.quaternion).multiplyScalar(moveSpeed);
          
          camera.position.add(moveDirection);
          // Also move the orbit controls target so the camera pivots around its new center
          controlsRef.current.target.add(moveDirection);
      }
      // NOTE: The logic to animate back to an overview position has been removed.
      // When no object is selected and no keys are pressed, the camera remains stationary.
    }
    
    // Crucial: This applies the new target position to the controls.
    controlsRef.current.update();
  });

  return null;
};

export default CameraManager;
