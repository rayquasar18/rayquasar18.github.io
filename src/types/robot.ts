/**
 * Robot type definitions and configuration constants.
 *
 * Shared contracts consumed by the 3D scene, emotion controller,
 * and Zustand store. No runtime dependencies on Three.js -- safe
 * to import from any module (SSR or client).
 */

/** The five emotions the robot can express. */
export type RobotEmotion = 'idle' | 'happy' | 'sad' | 'excited' | 'thinking';

/**
 * Maps each emotion to its animation clip name inside the .glb file.
 *
 * The placeholder dragon model has a single clip named "Take 001",
 * so every emotion maps to it for now.
 *
 * Update these clip names when the actual robot model is provided.
 * Run `console.log(gltf.animations.map(a => a.name))` to discover clip names.
 */
export const EMOTION_CLIP_MAP: Record<RobotEmotion, string> = {
  idle: 'Take 001',
  happy: 'Take 001',
  sad: 'Take 001',
  excited: 'Take 001',
  thinking: 'Take 001',
};

/** Static path to the 3D model served from /public. */
export const MODEL_PATH = '/models/robot.glb' as const;

/** Full robot state shape, including setters (used by the Zustand store). */
export interface RobotState {
  emotion: RobotEmotion;
  isModelLoaded: boolean;
  performanceTier: 'high' | 'low';
  setEmotion: (emotion: RobotEmotion) => void;
  setModelLoaded: (loaded: boolean) => void;
  setPerformanceTier: (tier: 'high' | 'low') => void;
}
