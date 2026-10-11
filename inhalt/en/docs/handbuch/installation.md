---
titel: Installation
kurz: What you need and how Yapaia gets into your Home Assistant – step by step, no terminal.
reihenfolge: 1
---

## What you need

| What | For | Note |
| --- | --- | --- |
| Computer running **Home Assistant OS** | everything | An N100 mini-PC with **8 GB RAM** and a 128 GB SSD is ideal. x86-64 or ARM64. |
| **USB GPS receiver** | Yapaia Go | An inexpensive u-blox receiver will do. Alternatively: your phone’s GPS via the Home Assistant app. |
| **RTL-SDR stick** + antenna for FM and DAB | Yapaia Beat | e.g. RTL-SDR Blog V3/V4. In a camper, an active roof antenna is ideal. |
| **GL.iNet GL-X3000** | Yapaia Router | Firmware 4.x, with two SIM cards. |
| **ESP32 Audio Kit V2.2 (A436)** + speaker | Yapaia Satellite | Board with the ES8388 codec. |
| Internet | once | to install and to get maps. On the road everything works offline. |

You do **not** need everything. Every module works on its own – take only what you want.

## 1. Add the Yapaia store

1. Open Home Assistant → **Settings → Add-ons → Add-on store**.
2. Top right **⋮ → Repositories**.
3. Enter `https://github.com/Yapaia/yapaia` → **Add**.
4. Close the dialog, reload the page. A **Yapaia** section appears at the bottom.

> Tip: switch on **Advanced mode** in your profile (bottom left) first. Otherwise Home Assistant hides some menus.

## 2. Install modules

1. Tap a module in the store, e.g. **Yapaia Go** → **Install**.
2. **Info** tab: switch on **Show in sidebar** → **Start**.
3. With the **first** Yapaia add-on, a notification asks you to **restart Home Assistant once** (Settings → System → Restart).

Installation can take a few minutes. A progress bar sitting at 0 % for a while is normal.

## 3. Set up in Home Assistant

After the restart: **Settings → Devices & services**. At the top you will see **“Yapaia Go discovered”**. Tap **Configure** – done. No password, no address.

Every further module appears the same way. Only the **router** is added by hand: **Add integration → Yapaia → GL.iNet router** (details in [Yapaia Router](/en/docs/handbuch/router/)).

## 4. Get going

- **Go**: open it from the sidebar. A wizard asks for language, map, vehicle dimensions and position source. Continue in [Yapaia Go](/en/docs/handbuch/go/).
- **Beat**: open it from the sidebar → **Scan**. Continue in [Yapaia Beat](/en/docs/handbuch/beat/).

## Updates

New versions appear as usual under **Settings → Add-ons** and in the updates list. Your maps, profiles and favourites are kept.
