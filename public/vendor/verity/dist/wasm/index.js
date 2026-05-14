// Index re-export so `wasm-bindgen-rayon`'s `import('../../..')` from the
// worker helper resolves to a real ESM module (the parent dir, not a file).
// This crate uses `await import('../../..')` to pull `default` + `initSync`
// + `wbg_rayon_start_worker` back into the spawned worker.
export * from './provekit_wasm.js';
export { default } from './provekit_wasm.js';
