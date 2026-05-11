export interface FaqEntry {
  q: string;
  a?: string;
  open?: boolean;
}

// Exact copy from the Figma source.
export const faqEntries: FaqEntry[] = [
  {
    q: 'What exactly is Provekit?',
    a: 'Provekit is a lightweight assertion and verification library for JavaScript and TypeScript. It lets you write expressive, readable checks for both runtime validation and unit tests without pulling in a full testing framework.',
    open: true,
  },
  { q: 'Does it work in the browser?' },
  { q: 'Is TypeScript supported?' },
  { q: 'Can I use it for runtime validation in production?' },
];
