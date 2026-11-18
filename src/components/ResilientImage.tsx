import { useState } from 'react';
import { Package } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 flex flex-col items-center justify-center p-6 text-center text-slate-500"
      >
        <Package className="w-8 h-8 mb-2 text-slate-400" strokeWidth={1.5} />
        <span className="text-xs font-medium text-slate-600 max-w-[22ch]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
