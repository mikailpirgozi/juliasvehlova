/**
 * Serialize a JSON-LD object for safe inline injection via
 * dangerouslySetInnerHTML. JSON.stringify does NOT escape `<`, `>`, `&` or the
 * U+2028/U+2029 line separators, so a value containing a closing script tag (or
 * those separators) could break out of the script tag or the HTML parse. This
 * escapes them to their \uXXXX forms, which remain valid inside a JSON string.
 *
 * Uses String.fromCharCode + split/join so the source contains no literal
 * (invisible) separator characters.
 */
const LINE_SEPARATOR = String.fromCharCode(0x2028)
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029)

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .split('<').join('\\u003c')
    .split('>').join('\\u003e')
    .split('&').join('\\u0026')
    .split(LINE_SEPARATOR).join('\\u2028')
    .split(PARAGRAPH_SEPARATOR).join('\\u2029')
}
