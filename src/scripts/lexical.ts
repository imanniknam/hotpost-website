/**
 * Minimal Lexical document builder. Payload stores richText as a Lexical editor
 * state, and seeding needs to produce that shape without running the editor.
 */
export const paragraphs = (texts: string[]) => ({
  root: {
    type: "root",
    format: "" as const,
    indent: 0,
    version: 1,
    direction: "rtl" as const,
    children: texts.map((text) => ({
      type: "paragraph",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "rtl" as const,
      textFormat: 0,
      textStyle: "",
      children: [
        {
          type: "text",
          text,
          format: 0,
          style: "",
          mode: "normal" as const,
          detail: 0,
          version: 1,
        },
      ],
    })),
  },
});
