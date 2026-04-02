import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import React from 'react';
import { IntroScene } from './scenes/IntroScene';
import { BookingScene } from './scenes/BookingScene';
import { NurseScene } from './scenes/NurseScene';
import { MapScene } from './scenes/MapScene';
import { OutroScene } from './scenes/OutroScene';

// Brand colors
export const COLORS = {
  navy: '#003366',
  navyLight: '#004080',
  green: '#98B690',
  greenDark: '#7da074',
  bg: '#f5f7fa',
  bgDark: '#e8ecf2',
  text: '#1a1a24',
  muted: '#5a5a6a',
  white: '#ffffff',
  accent: '#007BFF',
  slate: '#f7f9fa',
};

export const MobiSoinsPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Scene 1: Brand intro — 0-70f (2.3s) */}
      <Sequence from={0} durationInFrames={70}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Patient booking — 60-240f (6s), overlaps for smooth transition */}
      <Sequence from={60} durationInFrames={180}>
        <BookingScene />
      </Sequence>

      {/* Scene 3: Nurse match + map — 230-430f (6.7s) */}
      <Sequence from={230} durationInFrames={200}>
        <NurseScene />
      </Sequence>

      {/* Scene 4: Map + arrival — 420-520f (3.3s) */}
      <Sequence from={420} durationInFrames={110}>
        <MapScene />
      </Sequence>

      {/* Scene 5: Outro CTA — 510-600f (3s) */}
      <Sequence from={510} durationInFrames={90}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
