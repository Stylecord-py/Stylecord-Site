# Primeiro bot

> **Aviso:** esse modelo é para bots, não para clients.

> Aprenda a iniciar o client e fazer coisas básicas.

---

1. Vamos começar importando as blibiotecas nessesarias:
```py
import stylecord
```

2. **Definir os __itents__ nescessário para o client:**
```py
intents = stylecord.Intents()
```


3. **Criar uma variável para representar o client:**
```py
client = stylecord.Client(intents=intents)
```

4. **Função __on_ready__ para capturar o início da aplicação:**
```py
@client.event # decorador que diz ao python: Ei! essa função é um evento que teve ser chamado.
async def on_ready():
    print(f"O client {client.user.tag} acabou de logar!")
```

5. **Finalmente, chegou a hora de iniciar o client:**
```
client.run!("<SEU-TOKEN-AQUI>")
```
#### *Troque 'SEU-TOKEN' pelo token da sua aplicação do [Discord Devloper Portal](https://www.discord.com/developers/applications)

### 📜 CÓDIGO COMPLETO:
```
import stylecord

intents = stylecord.Intents()

client = stylecord.Client(intents=intents)

@client.event # decorador que diz ao python: Ei! essa função é um evento que teve ser chamado.
async def on_ready():
    print(f"O client {client.user.tag} acabou de logar!")

client.run("SEU-TOKEN")
```

![Application online.](../assets/examples/bot-online.png)

## Boas práticas

- Nunca coloque o token no código. Use variáveis de ambiente.
- Defina apenas os intents nescessários.

## Dúvidas
- [Como construir um **Bot**.](../ext/commands/bot.md)
- [Diferença de **Client** e **Bot**.](../doubts/client-or-bot.md)