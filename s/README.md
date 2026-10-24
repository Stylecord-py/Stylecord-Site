# Stylecord.py — site

Site estático (HTML, CSS, JS puro). Sem build.

## Rodar local
`python -m http.server 8000` e abra http://localhost:8000 (necessário por causa do `fetch`).

## Publicar
- **Netlify:** arraste a pasta ou conecte o repositório (`netlify.toml` incluso).
- **GitHub Pages:** publique a raiz. Troque `/` por o caminho do repositório em `404.html`.

## Docs
Adicione um `.md` em `docs/` e registre em `data/docs-index.json`. A busca lê esse índice.

## Pendências
- Colocar `logo.png` e `banner.png` oficiais em `assets/images/` (o `logo.svg` é provisório).
- Trocar os links do GitHub e conferir os exemplos com a API real.
