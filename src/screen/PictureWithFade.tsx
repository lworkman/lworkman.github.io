import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const PictureContainer = styled.div`
  width: 100%;
  flex: 1 1 0px;
  position: relative;
`;

const Picture = styled.div<{ src: string; opacity: number }>`
  position: absolute;
  inset: 0;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.75s ease-in-out;
`;

interface PictureState {
  alphaSrc: string;
  betaSrc: string;
  showAlpha: boolean;
}

export interface PictureWithFade {
  src: string;
}

export function PictureWithFade({ src }: PictureWithFade) {
  const [state, setState] = useState<PictureState>({
    alphaSrc: src,
    betaSrc: src,
    showAlpha: false,
  });
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    setState((current) => {
      if (current.showAlpha) {
        return {
          alphaSrc: current.alphaSrc,
          betaSrc: src,
          showAlpha: false,
        };
      }
      return {
        alphaSrc: src,
        betaSrc: current.betaSrc,
        showAlpha: true,
      };
    });
  }, [src]);

  return (
    <PictureContainer>
      <Picture src={state.alphaSrc} opacity={state.showAlpha ? 1 : 0} />
      <Picture src={state.betaSrc} opacity={!state.showAlpha ? 1 : 0} />
    </PictureContainer>
  );
}
