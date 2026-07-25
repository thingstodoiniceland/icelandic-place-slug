# Icelandic place slugs

I kept running into the same small problem while cleaning Iceland location
data: a URL should be easy to type, but changing `Þingvellir` to
`ingvellir` throws away a real letter. This package makes that conversion
explicit and testable.

```ts
import {
  slugIcelandicPlaceName,
  uniqueIcelandicPlaceSlugs,
} from "jsr:@thingstodoiniceland/icelandic-place-slug";

slugIcelandicPlaceName("Seyðisfjörður");
// "seydisfjordur"

uniqueIcelandicPlaceSlugs(["Ás", "As", "Ás!"]);
// ["as", "as-2", "as-3"]
```

## The six Icelandic letters that need a decision

| Input | ASCII output | Example |
| --- | --- | --- |
| Þ / þ | Th / th | Þórsmörk → Thorsmork |
| Ð / ð | D / d | Seyðisfjörður → Seydisfjordur |
| Æ / æ | Ae / ae | Æðey → Aedey |
| Á / á | A / a | Ásbyrgi → Asbyrgi |
| É, Í, Ó, Ú, Ý | E, I, O, U, Y | Hólmavík → Holmavik |
| Ö / ö | O / o | Jökulsárlón → Jokulsarlon |

The first three conversions are handled directly. The accented vowels use
Unicode decomposition, which also covers ordinary Latin accents in mixed
datasets.

## One warning from real place lists

ASCII conversion can create collisions. `Ás` and `As` both become `as`.
`uniqueIcelandicPlaceSlugs()` keeps the first slug and numbers later ones in
input order. Keep a stable source order if these slugs become permanent URLs.

The package does not translate names, guess spelling, or claim that an ASCII
form is the proper Icelandic name. Keep the original name as your display
value. Use the slug only where an ASCII identifier is useful.

If you want to check the spellings against real visitor-facing examples, the
[Iceland attractions directory](https://thingstodoiniceland.is/attractions)
keeps the Icelandic place names visible.

## API

- `transliterateIcelandicPlaceName()` keeps spaces and punctuation.
- `slugIcelandicPlaceName()` returns one lowercase ASCII slug.
- `uniqueIcelandicPlaceSlugs()` resolves collisions for an ordered list.

There are no runtime dependencies. Tests cover Þ, ð, æ, accented vowels,
punctuation, empty input, and collisions.

MIT licensed.
