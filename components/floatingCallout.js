import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PrismicRichText } from "@prismicio/react";
import Swoop from "../components/decorations/Swoop";
import { devices } from "../styles/devices";
import { colors } from "../styles/colors";
import { richTextComponents } from "../components/richText";

const SPEED = 0.55;
const Y_RATIO = 0.7;
const START_DELAY = 1500;

const Floater = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 22.5em;
  padding: 1em;
  cursor: pointer;
  text-decoration: none;
  text-transform: none;
  color: ${colors.primaryDark};
  will-change: transform;

  & p {
    position: relative;
    left: 1em;
    top: 0.25em;
  }

  & svg {
    position: absolute;
    z-index: -1;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &:hover {
    text-decoration: none;
  }

  @media ${devices.mobile} {
    max-width: 18em;
    padding: 1.75em 2em;

    & p {
      font-size: 0.95rem;
    }
  }
`

export default function FloatingCallout({ callout, arenaRef, anchorRef, href }) {
  const itemRef = useRef(null);
  const motionRef = useRef({
    x: -9999,
    y: 20,
    dirX: -1,
    dirY: 1,
  });
  const pausedRef = useRef(false);
  const [pos, setPos] = useState({ x: -9999, y: 20 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || !callout) return;

    const arena = arenaRef?.current;
    const item = itemRef.current;
    const anchor = anchorRef?.current;
    if (!arena || !item || !anchor) return;

    let frameId;
    let delayId;
    let lastTime;
    let started = false;

    const placeInitial = () => {
      const arenaBox = arena.getBoundingClientRect();
      const itemBox = item.getBoundingClientRect();
      const textBox = item.querySelector("p")?.getBoundingClientRect();
      const anchorBox = anchor.getBoundingClientRect();
      const textOffset = textBox ? textBox.left - itemBox.left : 0;
      const maxX = Math.max(0, arena.clientWidth - item.offsetWidth);
      const maxY = Math.max(0, arena.clientHeight - item.offsetHeight);
      motionRef.current = {
        x: Math.min(maxX, Math.max(0, anchorBox.left - arenaBox.left - textOffset)),
        y: Math.max(0, maxY - 56),
        dirX: -1,
        dirY: 1,
      };
      setPos({ x: motionRef.current.x, y: motionRef.current.y });
    };

    const clampAndBounce = () => {
      const maxX = Math.max(0, arena.clientWidth - item.offsetWidth);
      const maxY = Math.max(0, arena.clientHeight - item.offsetHeight);
      let { x, y, dirX, dirY } = motionRef.current;

      if (x >= maxX) {
        x = maxX;
        dirX = -1;
      }

      if (x <= 0) {
        x = 0;
        dirX = 1;
      }

      if (y <= 0) {
        y = 0;
        dirY = 1;
      } else if (y >= maxY) {
        y = maxY;
        dirY = -1;
      }

      motionRef.current = { x, y, dirX, dirY };
    };

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 16.67, 2);
      lastTime = now;

      if (!pausedRef.current) {
        let { x, y, dirX, dirY } = motionRef.current;

        x += dirX * SPEED * dt;
        y += dirY * SPEED * Y_RATIO * dt;
        motionRef.current = { x, y, dirX, dirY };
        clampAndBounce();
        setPos({ x: motionRef.current.x, y: motionRef.current.y });
      }

      frameId = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(() => {
      if (started) {
        clampAndBounce();
        setPos({ x: motionRef.current.x, y: motionRef.current.y });
      } else {
        placeInitial();
      }
    });
    observer.observe(arena);
    observer.observe(item);
    observer.observe(anchor);

    placeInitial();
    delayId = window.setTimeout(() => {
      started = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(tick);
    }, START_DELAY);

    return () => {
      clearTimeout(delayId);
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [callout, arenaRef, anchorRef, reducedMotion]);

  if (!callout) return null;

  return (
    <Floater
      ref={itemRef}
      href={href}
      style={
        reducedMotion
          ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
          : { transform: `translate(${pos.x}px, ${pos.y}px)` }
      }
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <Swoop />
      <PrismicRichText field={callout} components={richTextComponents} />
    </Floater>
  );
}
