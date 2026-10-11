---
titel: Developed in the open
kurz: Where the source lives, how Yapaia is tested and how you can join in.
reihenfolge: 6
---

## Everything on GitHub

The complete source lives publicly in the monorepo [github.com/Yapaia/yapaia](https://github.com/Yapaia/yapaia):

| Folder | Contents |
| --- | --- |
| `go/` | Yapaia Go: core, web app, add-on |
| `beat/` | Yapaia Beat: radio service, add-on |
| `satellite/` | ESPHome configuration for the voice satellite |
| `integration/` | the “Yapaia” Home Assistant integration incl. router module |
| `docs/` | protocol and capabilities |

One add-on store, one integration, shared rules – and still every module has its own version and changelog.

## Tested before it reaches you

Every change runs through automatic checks, only for the modules it touches:

- Unit and integration tests (Go alone: several thousand)
- End-to-end tests in the browser
- **Golden routes**: real routes on real maps that must not get worse
- Building the add-on image and looking inside
- Security tests (sandbox, authentication, dependencies)

Only when everything is green is it merged.

## Open data

All maps come from [OpenStreetMap](https://www.openstreetmap.org/). If a height limit on a bridge is missing, you can add it there yourself – everyone benefits.

## Join in

- **Report bugs or share ideas:** [issues on GitHub](https://github.com/Yapaia/yapaia/issues)
- **Build your own module:** the [Yapaia protocol](/en/docs/technik/protokoll/) is made for exactly that.
- **Contribute code:** please open an issue first. The licence for contributions is being settled right now; until then we hold back pull requests so that it applies cleanly later.
