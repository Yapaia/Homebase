---
titel: Questions and help
kurz: Frequent questions and what to do when something is stuck.
reihenfolge: 8
---

## Frequent questions

**Do I need internet on the road?**
No. Only to install and for map updates.

**Does Yapaia run on a Raspberry Pi?**
Yapaia runs on x86-64 and ARM64. For navigation with a country-sized map, though, you need enough memory – plan for 8 GB. An N100 mini-PC is the reference.

**Can I use Yapaia Go without Home Assistant?**
Yes, Go also runs standalone with Docker. Most vehicle features only really shine with Home Assistant, though.

**What does it cost?**
Nothing. No subscription, no account, no cloud.

## When something is stuck

| You see | This helps |
| --- | --- |
| “Yapaia” missing in the add-on store | Store → ⋮ → **Check for updates**, reload the page |
| “Yapaia Go discovered” does not appear | Restart Home Assistant once; the add-on must be running |
| Go shows no map | Manage maps → is a map installed? Open the installation check |
| Route is not calculated | After a map update, wait 30 seconds; otherwise restart the add-on |
| Map server: “token rejected” | Copy the token again, without spaces |
| Beat: no sound | Check the output (mini-PC or this device?), re-plug the stick |
| Router does not switch | Look at the **switching** sensor; download diagnostics |

## Get help

Open an issue on [GitHub](https://github.com/Yapaia/yapaia/issues). Best attach the add-on’s **log** (add-on → “Log” tab) – it lets us find almost anything.
