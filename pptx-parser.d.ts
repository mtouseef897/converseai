// pptx-parser.d.ts
declare module 'pptx-parser' {
    export function parse(filePath: string): Promise<{ text: string }[]>;
  }