# Primeiro bot

> **Aviso:** exemplo conceitual. Os nomes de classes e métodos abaixo ilustram a ideia e ainda não foram confirmados contra a API real.

```python
# demonstração conceitual — não é a API final
import stylecord

bot = stylecord.Bot(token="SEU_TOKEN")

# ... registre comandos e eventos aqui ...

bot.run()
```

## Boas práticas

- Nunca coloque o token no código. Use variáveis de ambiente.
- Rode o bot em um servidor de testes primeiro.
