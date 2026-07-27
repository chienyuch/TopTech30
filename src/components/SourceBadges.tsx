import React from 'react';
import { TechSource } from '../types';

interface SourceBadgesProps {
  source: TechSource;
  size?: 'sm' | 'md' | 'lg';
}

export const SOURCE_CONFIG: Record<TechSource, { name: string; color: string; bg: string; border: string; logoLetter: string }> = {
  TechCrunch: {
    name: 'TechCrunch',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-700/50',
    logoLetter: 'TC'
  },
  'The Verge': {
    name: 'The Verge',
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-950/60',
    border: 'border-fuchsia-700/50',
    logoLetter: 'VERGE'
  },
  Wired: {
    name: 'Wired',
    color: 'text-amber-400',
    bg: 'bg-amber-950/60',
    border: 'border-amber-700/50',
    logoLetter: 'WIRED'
  },
  'Ars Technica': {
    name: 'Ars Technica',
    color: 'text-cyan-400',
    bg: 'bg-cyan-950/60',
    border: 'border-cyan-700/50',
    logoLetter: 'ARS'
  },
  Engadget: {
    name: 'Engadget',
    color: 'text-blue-400',
    bg: 'bg-blue-950/60',
    border: 'border-blue-700/50',
    logoLetter: 'ENG'
  }
};

export const SourceBadge: React.FC<SourceBadgesProps> = ({ source, size = 'md' }) => {
  const config = SOURCE_CONFIG[source] || {
    name: source,
    color: 'text-gray-300',
    bg: 'bg-gray-800',
    border: 'border-gray-700',
    logoLetter: 'NEWS'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-medium',
    lg: 'px-3 py-1.5 text-sm gap-2 font-semibold'
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-md border ${config.bg} ${config.color} ${config.border} ${sizeClasses} shadow-sm backdrop-blur-sm transition-all hover:brightness-110`}
    >
      <span className="font-mono font-bold tracking-wider text-[10px] opacity-80 uppercase px-1 rounded bg-black/40">
        {config.logoLetter}
      </span>
      <span>{config.name}</span>
    </span>
  );
};
