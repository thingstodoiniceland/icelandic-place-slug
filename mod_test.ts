import assert from "node:assert/strict";
import {
  slugIcelandicPlaceName,
  transliterateIcelandicPlaceName,
  uniqueIcelandicPlaceSlugs,
} from "./mod.ts";

Deno.test("transliterates Icelandic letters and accents", () => {
  assert.equal(
    transliterateIcelandicPlaceName("Þingvellir – Seyðisfjörður – Æðey"),
    "Thingvellir – Seydisfjordur – Aedey",
  );
});

Deno.test("builds readable ASCII slugs", () => {
  assert.equal(
    slugIcelandicPlaceName("Jökulsárlón Glacier Lagoon"),
    "jokulsarlon-glacier-lagoon",
  );
  assert.equal(slugIcelandicPlaceName("  Mývatn & Krafla  "), "myvatn-krafla");
});

Deno.test("numbers transliteration collisions in input order", () => {
  assert.deepEqual(
    uniqueIcelandicPlaceSlugs(["Ás", "As", "Ás!", ""]),
    ["as", "as-2", "as-3", "place"],
  );
});
