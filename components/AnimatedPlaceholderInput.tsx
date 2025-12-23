import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

/**
 * Hook: cycles through `phrases` typing and erasing each in turn.
 */
function useAnimatedPlaceholder(
  phrases: string[],
  typingSpeed = 75,
  erasingSpeed = 25,
  pauseAfterTyping = 5000,
  pauseAfterErasing = 500
) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timeoutId: number;

    if (!deleting) {
      if (displayed.length < current.length) {
        timeoutId = window.setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          typingSpeed
        );
      } else {
        timeoutId = window.setTimeout(() => setDeleting(true), pauseAfterTyping);
      }
    } else {
      if (displayed.length > 0) {
        timeoutId = window.setTimeout(
          () => setDisplayed(current.slice(0, displayed.length - 1)),
          erasingSpeed
        );
      } else {
        timeoutId = window.setTimeout(() => {
          setDeleting(false);
          setIndex(i => i + 1);
        }, pauseAfterErasing);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayed, deleting, index, phrases]);

  return displayed;
}

/**
 * AnimatedPlaceholderInput wraps <Input> and cycles its own internal placeholder prompts.
 */
export function AnimatedPlaceholderInput(props: Omit<React.ComponentProps<typeof Input>, 'placeholder'>) {
  // Hard-coded prompts inside the component
  const prompts = [
    "I can’t sleep because…",
    "Brain reset before investor meeting",
    "Feeling groggy after lunch",
  ];

  const animated = useAnimatedPlaceholder(prompts);
  return <Input placeholder={animated} {...props} />;
}
