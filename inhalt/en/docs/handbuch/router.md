---
titel: Setting up Yapaia Router
kurz: Connect the GL.iNet router, assign SIM cards to countries, let it switch automatically.
reihenfolge: 5
---

## Connect

1. **Settings → Devices & services → Add integration** → **Yapaia**.
2. Choose **GL.iNet router**.
3. Enter:
    - Address: `192.168.8.1` (or your router’s address)
    - Username: `root`
    - Password: the admin password of the router interface

The device **Yapaia Router** then appears with all its sensors.

## SIM by country

On the device, tap **Configure**:

| Setting | Example |
| --- | --- |
| SIM by country | on |
| Countries for SIM 1 | `DE` |
| Countries for SIM 2 | `AT, CH, IT` |
| All other countries | don’t switch, SIM 1 or SIM 2 |
| Wait after country change | 3 minutes |

The waiting time prevents flip-flopping near borders: only when the new country has been stable for a few minutes does it switch.

> **Important:** In the router interface, turn off the router’s own **auto switch** feature. Two things switching work against each other.

## The first switch

GL.iNet has not published the command for switching SIMs. So the first time, Yapaia tries the known ways and waits each time to see whether the router really reports the new SIM. This can take **a few minutes**. After that, Yapaia remembers the way and switches immediately.

If none works, you get a notification. Then go to **Devices & services → Yapaia → Yapaia Router → ⋮ → Download diagnostics** – the file helps us find the right command. Passwords and card numbers are redacted.

## Your own automations

Instead of the built-in automation you can build your own: trigger **Country changed**, action **Select SIM**. Or: on “roaming on”, send a message to your phone.
