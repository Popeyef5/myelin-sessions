import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useEffect, useRef, useState } from "react";

interface RouletteProps {
  texts: string[];
  spinQueue: number;
}

const SPIN_TURNS = 5;
const ANIMATION_DURATION = 5;

export const Roulette = ({ texts, spinQueue }: RouletteProps) => {
  const frames = texts.length * SPIN_TURNS + 2;
  const [frame, setFrame] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);

  const [isRolling, setIsRolling] = useState(false);

  const step = (currentFrame: number) => {
    const time = (100 * frames) / (frames - currentFrame + 3);
    setTimeout(() => {
      if (currentFrame < frames) {
        setFrame(currentFrame);
        setAnimationDuration(time / 1000);
        step(currentFrame + 1);
      } else {
        setIsRolling(false);
      }
    }, time * 0.7);
  };

  const spin = () => {
    if (!spinQueue) return;
    if (isRolling) return;
    setIsRolling(true);
    step(0);
  };

  useEffect(spin, [spinQueue]);

  const offset = (x: number) => Math.floor(texts.length / 2) - x;
  const shift = (x: number) =>
    (x +
      1 +
      Math.floor(texts.length / 2) -
      (frame % texts.length) +
      texts.length) %
    texts.length;
  const split = (x: number) => offset(shift(x));

  return (
    <Box position="relative" flexGrow="1" overflow="hidden">
      {texts.map((t, i) => (
        <Heading
          key={i}
          position="absolute"
          transform={`translateY(${split(i) * 200}%)`}
          transitionDuration={`${animationDuration}s`}
          transitionTimingFunction="ease-in-out"
          opacity={`${1 - 0.8 * Math.abs(split(i))}`}
          top="50%"
        >
          {t}
        </Heading>
      ))}
    </Box>
  );
};
