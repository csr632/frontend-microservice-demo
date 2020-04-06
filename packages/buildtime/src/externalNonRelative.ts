import type { Plugin } from "rollup";
export function externalNonRelative () {
  return {
    name: 'external-non-relative',
    resolveId ( source ) {
      if (source.startsWith('./')||source.startsWith('../')) {
      return null;
      }
      return false; 
    }
  } as Plugin;
}