// Temporary shims for third-party modules without types.
declare module 'dotenv';
declare module 'react-day-picker';
declare module 'embla-carousel-react' {
  // Use a loose typing shape compatible with the existing codebase
  export type UseEmblaCarouselType = any[];
  const useEmblaCarousel: any;
  export default useEmblaCarousel;
}

declare module 'recharts' {
  export namespace RechartsPrimitive {
    export type LegendProps = any;
  }
  const anyExport: any;
  export = anyExport;
}
declare module 'tailwind-merge';

// Wildcard for many Radix primitives used across the project
declare module '@radix-ui/*' {
  const anyExport: any;
  export = anyExport;
}

// Generic catch-all to reduce friction during local development.
declare module '*';
