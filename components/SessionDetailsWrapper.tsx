"use client"

import { useState } from "react";
import { DetailsButton } from "./DetailsButton";
import { SessionCardModal } from "./SessionCardModal";

interface SessionDetailsWrapperProps {
  title: string;
  description: string;
  duration: string;
  language: string;
  level: string;
  technique: string;
  voice: string;
  track: string;
  generatedDate: string;
}

export function SessionDetailsWrapper({
  title,
  description,
  duration,
  language,
  level,
  technique,
  voice,
  track,
  generatedDate,
}: SessionDetailsWrapperProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenChange = (newOpenState: boolean) => {
    setOpen(newOpenState);
  };

  return (
    <>
      {/* When the button is clicked, we open the modal */}
      <DetailsButton onClick={handleOpen} />

      {/* Modal that renders the session details */}
      <SessionCardModal
        title={title}
        description={description}
        duration={duration}
        language={language}
        level={level}
        technique={technique}
        voice={voice}
        track={track}
        generatedDate={generatedDate}
        open={open}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
