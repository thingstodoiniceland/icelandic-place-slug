/**
 * Transliteration and collision-safe slugs for Icelandic place names.
 *
 * The functions are deliberately small and dependency-free. They do not try
 * to translate names or decide which spelling is correct.
 *
 * @module
 */

const ICELANDIC_LETTERS: Readonly<Record<string, string>> = {
  "Þ": "Th",
  "þ": "th",
  "Ð": "D",
  "ð": "d",
  "Æ": "Ae",
  "æ": "ae",
};

/**
 * Converts Icelandic letters and accented Latin characters to ASCII.
 *
 * Letter case is preserved where practical. Whitespace and punctuation are
 * left alone so callers can decide how to format the result.
 *
 * @example
 * ```ts
 * transliterateIcelandicPlaceName("Þingvellir");
 * // "Thingvellir"
 *
 * transliterateIcelandicPlaceName("Seyðisfjörður");
 * // "Seydisfjordur"
 * ```
 */
export function transliterateIcelandicPlaceName(input: string): string {
  const expanded = Array.from(input, (character) =>
    ICELANDIC_LETTERS[character] ?? character
  ).join("");

  return expanded.normalize("NFD").replace(/\p{Mark}+/gu, "");
}

/**
 * Produces a lowercase, hyphen-separated ASCII slug.
 *
 * @example
 * ```ts
 * slugIcelandicPlaceName("Jökulsárlón Glacier Lagoon");
 * // "jokulsarlon-glacier-lagoon"
 * ```
 */
export function slugIcelandicPlaceName(input: string): string {
  return transliterateIcelandicPlaceName(input)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Creates stable slugs for an ordered list and numbers collisions from 2.
 *
 * The first occurrence keeps the plain slug. Later occurrences receive
 * `-2`, `-3`, and so on. Empty results use `place`.
 *
 * @example
 * ```ts
 * uniqueIcelandicPlaceSlugs(["Ás", "As", "Ás!"]);
 * // ["as", "as-2", "as-3"]
 * ```
 */
export function uniqueIcelandicPlaceSlugs(
  names: readonly string[],
): string[] {
  const counts = new Map<string, number>();

  return names.map((name) => {
    const base = slugIcelandicPlaceName(name) || "place";
    const count = (counts.get(base) ?? 0) + 1;
    counts.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  });
}
