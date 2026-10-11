---
titel: Yapaia Router
claim: New country, right SIM. Automatically.
kurz: Your GL.iNet router’s mobile connection in Home Assistant – with signal, roaming indicator and automatic SIM switching when you cross a border.
punkte: SIM 1 or SIM 2 at a tap | Switches automatically by country | Signal, network, roaming and data usage at a glance | Local, no cloud account
icon: router
status: beta
reihenfolge: 3
handbuch: /docs/handbuch/router/
---

## Border? No problem.

If you travel Europe a lot, you often carry two SIM cards: one for home, one for your favourite travel country. But you always forget to switch. Yapaia Router does it for you.

## How SIM switching by country works

The modem always registers with a network of the country you are in – even when roaming. From the **network’s country code**, Yapaia knows where you are, no GPS required. You decide once which SIM to use in which country and switch on **SIM by country**. The router takes care of the rest when you cross the border.

## What you see in Home Assistant

| | |
| --- | --- |
| **SIM selection** | Shows the active SIM, switch with a tap. |
| **Country and roaming** | Which country you are registered in, and whether you are roaming. |
| **Network and signal** | Operator, LTE or 5G, frequency bands, signal strength. |
| **Data usage** | The router’s data counter. |
| **Triggers** | “Country changed”, “SIM changed”, “SIM switch failed” – for your automations. |

## Which router?

Built for the **GL.iNet GL-X3000 (Spitz AX)** with firmware 4.x. Everything runs locally through the router’s own interface – no GL.iNet account, no cloud.

> GL.iNet has not documented the command for switching SIMs. The first time, Yapaia tries the known ways and remembers the one that works on your router.
