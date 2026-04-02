import { Composition } from 'remotion';
import { MobiSoinsPromo } from './MobiSoinsPromo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MobiSoinsPromo"
      component={MobiSoinsPromo}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
