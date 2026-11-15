# Intents

---

## 1. Parameters
### \_\_init\_\_ (Constructor)
> Initializes the Intents instance either using a raw bitwise integer value or by specifying individual intent flags as boolean keyword arguments.
- `Value` `(Type: Integer || Flag: Optional || Default: None)` -> A raw bitwise integer representing the combined intent flags.
- `**Kwargs` `(Type: Boolean || Flag: Vacantable)` -> Individual intent names as keyword arguments (e.g., guilds=True, messages=False) to enable or disable specific flags dynamically.

```python
import stylecord

intents = stylecord.Intents(value=0, guilds=True, ...)
```

### \_\_add\_\_ (Addition) -> `+`
> Combines the intent flags of two instances. Internally, this delegates to the bitwise OR operation, providing a natural syntax for adding features.

```python
import stylecord

intents_bans = stylecord.Intents(bans=True) 
intents_emojis = stylecord.Intents(emojis=True)

intents = intents_bans + intents_emojis

print("result: ", int(intents))
```
```bash
result: 7
```

### \_\_sub\_\_ (Subtraction) -> `-`
> Removes the intent flags present in the second instance from the first instance using bitwise negation.

```python
import stylecord

all_intents = stylecord.Intents.all()
intents_typing = stylecord.Intents(message_typing=True)

intents = all_intents - intents_typing

print("result: ", int(intents))
```
```bash
result: 32255
```

### \_\_or\_\_ (Bitwise OR) -> `|`
> Performs the "OR" operation between the numeric values of two instances. If a bit is set in either of the two objects, it will remain set in the result.

```python
import stylecord

intents_guilds = stylecord.Intents(guilds=True) 
intents_members = stylecord.Intents(members=True)

intents = intents_guilds | intents_members

print("result: ", int(intents))
```
```bash
result: 3
```

### __and__ (Bitwise AND) -> `&`
> Returns a new instance containing only the intent flags that are active in both instances simultaneously (intersection).

```python
import stylecord

intents1 = stylecord.Intents(guilds=True, messages=True)
intents2 = stylecord.Intents(messages=True, presences=True)

intents = intents1 & intents2

print("result: ", int(intents))
```
```bash
result: 512
```

### \_\_int\_\_ (Method to Integers) -> `int()`
> When converting an `Intents` class to an integer using the int() method, the result will be the value attribute.

```python
import stylecord

intents = stylecord.Intents.all()

print("result: ", int(intents))
```
```bash
result: 53608447
```

---

## 2. Functions & Methods

### all()
> Class method that returns a new Intents instance with all available gateway intent flags enabled.

```python
import stylecord

intents = stylecord.Intents.all()
```

### none()
> Class method that returns a new Intents instance with all gateway intent flags disabled (value equals 0).

```python
import stylecord

intents = stylecord.Intents.none()
```

### default()
> Class method that returns a standard set of intents that do not require privileged gateway intents approval on the Discord Developer Portal.

```python
import stylecord

intents = stylecord.Intents.default()
```

---

## 3. Properties & Attributes

### Attributes
```python
value: int
```

---

## 4. Groups

> Groups allow you to enable or disable multiple related intent flags simultaneously using a single keyword argument, simplifying configuration for common use cases.

### Available Groups
- `guild` -> Enables or disables all server-related intents (e.g., guilds, members, moderation, emojis, integrations, webhooks, invites, voice states, and presences).
- `messages` -> Enables or disables all message-related intents (guild messages, reactions, typing, and message content).
- `direct` -> Enables or disables all direct message (DM) related intents (direct messages, reactions, and typing).

```python
import stylecord

# Enables all server and message intents at once
intents = stylecord.Intents(guild=True, messages=True)

print("result:", int(intents))
```
```bash
result: 36351
```

---

## 5. How to use

```python
import stylecord
from stylecord.ext import commands

intents = stylecord.Intents.default()
bot = commands.Bot(prefix="!", intents=intents)

@bot.event()
async def on_ready():
    print(f"The bot {bot.user.tag} logged in successfully!")

bot.run("<YOU TOKEN HERE>")
```

---

## 6. Look for
- [Fhist bot](../docs/#/getting-started/first-bot)