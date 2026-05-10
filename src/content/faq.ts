export interface FaqEntry {
  q: string;
  a: string;
}

export const faqEntries: FaqEntry[] = [
  {
    q: 'What exactly is Provekit?',
    a: "A lightweight, modular zero-knowledge proving toolkit written in Rust. It is designed for client-side execution, so proofs can be generated directly on a user's device — including mobile — without heavy server infrastructure.",
  },
  {
    q: 'Does it work in the browser?',
    a: 'Yes. Provekit compiles to WebAssembly and runs in modern browsers, with a footprint small enough to ship in production web apps.',
  },
  {
    q: 'What ZK proof system does it use?',
    a: 'Provekit uses a SNARK backend optimized for client-side proving and on-chain verification. See the docs for current scheme details and roadmap.',
  },
  {
    q: 'How does it compare to other ZK toolkits?',
    a: 'On commodity hardware, Provekit generates proofs ~36% faster than comparable client-side toolkits and uses ~24% less memory. See the benchmarks page for the full methodology.',
  },
  {
    q: 'Is it production-ready?',
    a: 'Provekit is actively developed by World, Atheon, and Reilabs and is being used in production-track integrations. Treat the latest release notes and benchmarks as the source of truth.',
  },
  {
    q: 'Where can I get help?',
    a: 'Open an issue on GitHub or join the Telegram listed in the footer.',
  },
];
