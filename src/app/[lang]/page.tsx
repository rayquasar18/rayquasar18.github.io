'use client';

import {HeroSection} from '@/components/hero/HeroSection';
import {RobotShowcase} from '@/components/robot/RobotShowcase';

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      {/* Hero section */}
      <HeroSection />

      {/* Section 2: Robot Showcase */}
      <RobotShowcase />
    </div>
  );
}
