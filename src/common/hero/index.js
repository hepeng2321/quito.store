import * as React from 'react';
import {HeroPictureImg, HeroWrapper} from "./style";

import backgroundImage from '../../statics/hero.jpg';

export default function ProductHero() {
  return (
    <HeroWrapper>
      <HeroPictureImg
        // style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
    </HeroWrapper>
  );
}
