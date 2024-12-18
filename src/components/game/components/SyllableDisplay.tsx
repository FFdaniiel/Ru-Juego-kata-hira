import { FC } from 'react';

interface SyllableDisplayProps {
  syllable: string;
}

export const SyllableDisplay: FC<SyllableDisplayProps> = ({ syllable }) => (
  <div className="text-text font-jp text-[12rem] leading-none animate-fade-in">
    {syllable}
  </div>
);