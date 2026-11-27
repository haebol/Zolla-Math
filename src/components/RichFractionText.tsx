import React from 'react';

interface InlineFractionProps {
  whole?: string;
  numerator: string;
  denominator: string;
  small?: boolean;
  onDarkHeader?: boolean;
}

const InlineFraction: React.FC<InlineFractionProps> = ({
  whole,
  numerator,
  denominator,
  small = false,
  onDarkHeader = false,
}) => (
  <span className="inline-flex items-center gap-[2px] align-middle mx-[2px]">
    {whole && (
      <span
        className={`font-game font-bold leading-none ${
          onDarkHeader ? 'text-yellow-200' : 'text-emerald-700'
        } ${small ? 'text-[12px]' : 'text-[14px]'}`}
      >
        {whole}
      </span>
    )}
    <span className="inline-flex flex-col items-center justify-center leading-none">
      <span
        className={`font-game font-bold leading-none ${
          onDarkHeader ? 'text-white' : 'text-orange-600'
        } ${
          onDarkHeader
            ? 'text-[11px] pb-[1px]'
            : small
            ? 'text-[9.5px] pb-[1px]'
            : 'text-[10.5px] pb-[1.5px]'
        }`}
      >
        {numerator}
      </span>
      <span
        className={`w-full rounded-full ${
          onDarkHeader ? 'bg-white h-[1.8px] min-w-[12px]' : 'bg-slate-900'
        } ${
          !onDarkHeader && (small ? 'h-[1.3px] min-w-[10px]' : 'h-[1.6px] min-w-[12px]')
        }`}
      />
      <span
        className={`font-game font-bold leading-none ${
          onDarkHeader ? 'text-white' : 'text-blue-700'
        } ${
          onDarkHeader
            ? 'text-[11px] pt-[1px]'
            : small
            ? 'text-[9.5px] pt-[1px]'
            : 'text-[10.5px] pt-[1.5px]'
        }`}
      >
        {denominator}
      </span>
    </span>
  </span>
);

interface RichFractionTextProps {
  text: string;
  small?: boolean;
  onDarkHeader?: boolean;
  className?: string;
}

/**
 * Parses tokens like [[3/4]] or [[1|1/4]] into real horizontal-bar fractions
 * so elementary students never see slash (/) notation.
 */
export const RichFractionText: React.FC<RichFractionTextProps> = ({
  text,
  small = false,
  onDarkHeader = false,
  className = '',
}) => {
  const parts = text.split(/(\[\[(?:[^\]|]+\|)?[^\]/]+\/[^\]]+\]\]|\{\{[^}]+\}\})/g);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        const highlightMatch = part.match(/^\{\{([^}]+)\}\}$/);
        if (highlightMatch) {
          return (
            <span
              key={idx}
              className="bg-yellow-200 border-b-[2px] border-red-500 px-[2px] font-bold text-slate-900 rounded-[1px]"
            >
              {highlightMatch[1]}
            </span>
          );
        }
        const match = part.match(/^\[\[(?:([^\]|]+)\|)?([^\]/]+)\/([^\]]+)\]\]$/);
        if (!match) {
          return <React.Fragment key={idx}>{part}</React.Fragment>;
        }
        const [, whole, num, den] = match;
        return (
          <InlineFraction
            key={idx}
            whole={whole}
            numerator={num}
            denominator={den}
            small={small}
            onDarkHeader={onDarkHeader}
          />
        );
      })}
    </span>
  );
};
