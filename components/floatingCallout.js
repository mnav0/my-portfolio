import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PrismicRichText } from "@prismicio/react";
import Swoop from "./decorations/Swoop";
import { devices } from "../styles/devices";
import { colors } from "../styles/colors";

const SPEED = 0.55;
const ENTER_SPEED = 1.05;
const Y_RATIO = 0.7;
const SLOWDOWN = 0.06;

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
`;

const extLinkResolver = (doc) => {
  if (doc.link_type === "Document") {
    return `/${doc.slug}`;
  } else if (doc.link_type === "Web" || doc.link_type === "Media") {
    return doc.url;
  }
  return "/";
};

export default function FloatingCallout({ callout, arenaRef, href }) {
  const itemRef = useRef(null);
  const motionRef = useRef({
    x: -9999,
    y: 20,
    dirX: -1,
    dirY: 1,
    speed: ENTER_SPEED,
    entered: false,
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
    if (!arena || !item) return;

    let frameId;
    let lastTime = performance.now();

    const placeOffscreenRight = () => {
      const maxY = Math.max(0, arena.clientHeight - item.offsetHeight);
      motionRef.current = {
        x: arena.clientWidth + 16,
        y: Math.min(maxY, Math.max(0, maxY * 0.25)),
        dirX: -1,
        dirY: 1,
        speed: ENTER_SPEED,
        entered: false,
      };
      setPos({ x: motionRef.current.x, y: motionRef.current.y });
    };

    const clampAndBounce = () => {
      const maxX = Math.max(0, arena.clientWidth - item.offsetWidth);
      const maxY = Math.max(0, arena.clientHeight - item.offsetHeight);
      let { x, y, dirX, dirY, speed, entered } = motionRef.current;

      if (!entered) {
        if (x <= maxX) {
          entered = true;
          x = Math.min(maxX, x);
        }
      } else if (x >= maxX) {
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

      motionRef.current = { x, y, dirX, dirY, speed, entered };
    };

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 16.67, 2);
      lastTime = now;

      if (!pausedRef.current) {
        let { x, y, dirX, dirY, speed, entered } = motionRef.current;

        if (entered && speed > SPEED) {
          speed += (SPEED - speed) * (1 - Math.exp(-SLOWDOWN * dt));
          if (speed - SPEED < 0.01) speed = SPEED;
        }

        x += dirX * speed * dt;
        y += dirY * speed * Y_RATIO * dt;
        motionRef.current = { x, y, dirX, dirY, speed, entered };
        clampAndBounce();
        setPos({ x: motionRef.current.x, y: motionRef.current.y });
      }

      frameId = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(() => {
      if (motionRef.current.entered) clampAndBounce();
    });
    observer.observe(arena);
    observer.observe(item);

    placeOffscreenRight();
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [callout, arenaRef, reducedMotion]);

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
      <PrismicRichText
        field={callout}
        components={{
          hyperlink: ({ node, children }) => {
            const href = extLinkResolver(node.data);
            const target = node.data.target;
            return (
              <a
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      />
    </Floater>
  );
}
