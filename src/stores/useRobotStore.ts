/**
 * Zustand store for robot state.
 *
 * Shared across the DOM tree and the R3F Canvas -- Zustand is the
 * correct bridge because React Context cannot cross the Canvas boundary.
 *
 * No 'use client' directive needed: `create` is a plain function call,
 * not a React hook. The store becomes a hook only when consumed inside
 * a component.
 */

import {create} from 'zustand';

import type {RobotEmotion, RobotState} from '@/types/robot';

export const useRobotStore = create<RobotState>((set) => ({
  emotion: 'idle' as RobotEmotion,
  isModelLoaded: false,
  performanceTier: 'high',
  setEmotion: (emotion) => set({emotion}),
  setModelLoaded: (loaded) => set({isModelLoaded: loaded}),
  setPerformanceTier: (tier) => set({performanceTier: tier}),
}));
