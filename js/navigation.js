import { block } from './code-blocks.js';

// Separador: ---, *** ou ___ (3 ou mais) sozinho na linha
const HR = /^\s*([-*_])(\s*\1){2,}\s*$/;

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const slug = s => s.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');

// Formatação inline: **negrito**, __negrito__, *itálico*, _itálico_, `código`, links e imagens.
// Código, imagens e links são guardados antes para não serem alterados pelo negrito/itálico.
const fmt = s => s
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/(^|[^\w])__(.+?)__(?!\w)/g, '$1<b>$2</b>')
  .replace(/\*([^*\s][^*]*?)\*/g, '<i>$1</i>')
  .replace(/(^|[^\w])_([^_\s][^_]*?)_(?!\w)/g, '$1<i>$2</i>');

// Texto puro (sem Markdown) para o índice lateral
const plain = s => s
  .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/[`*]/g, '')
  .replace(/(^|\W)_+|_+(?=\W|$)/g, '$1')
  .trim();

const inl = s => {
  const st = [];
  const keep = h => `\u0000${st.push(h) - 1}\u0000`;
  s = esc(s)
    .replace(/`([^`]+)`/g, (_, c) => keep(`<code>${c}</code>`))
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, (_, a, u) => keep(`<img src="${u}" alt="${a}">`))
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => keep(`<a href="${u}">`) + t + keep('</a>'));
  return fmt(s).replace(/\u0000(\d+)\u0000/g, (_, n) => st[n]);
};

export function md(t) {
  const L = t.split('\n');
  const o = [];
  const toc = [];
  let i = 0;

  while (i < L.length) {
    const l = L[i];

    if (l.startsWith('```')) {
      const f = l.slice(3).trim();
      const c = [];
      i++;
      while (i < L.length && !L[i].startsWith('```')) {
        c.push(L[i++]);
      }
      i++;
      o.push(block(c.join('\n'), f));
      continue;
    }

    const h = l.match(/^(#{1,6}) (.+)/);
    if (h) {
      const id = slug(h[2]);
      const n = h[1].length;
      if (n === 2 || n === 3) toc.push([id, esc(plain(h[2]))]);
      o.push(`<h${n} id="${id}">${inl(h[2])}${n > 1 ? `<a class=hl href="#" data-a="${id}" aria-label="Direct link">#</a>` : ''}</h${n}>`);
      i++;
      continue;
    }

    if (HR.test(l)) {
      o.push('<hr>');
      i++;
      continue;
    }

    if (l.startsWith('>')) {
      const q = [];
      while (i < L.length && L[i].startsWith('>')) {
        q.push(L[i++].slice(1).trim());
      }
      o.push(`<blockquote${/^\*\*(Warning|Planned)/.test(q[0]) ? ' class=warn' : ''}>${inl(q.join(' '))}</blockquote>`);
      continue;
    }

    if (/^- /.test(l)) {
      const u = [];
      while (i < L.length && /^- /.test(L[i])) {
        u.push(`<li>${inl(L[i++].slice(2))}</li>`);
      }
      o.push(`<ul>${u.join('')}</ul>`);
      continue;
    }

    if (l.trim()) {
      const p = [L[i++]]; // sempre consome a 1ª linha: evita loop infinito
      while (i < L.length && L[i].trim() && !/^(#{1,6} |```|>|- )/.test(L[i]) && !HR.test(L[i])) {
        p.push(L[i++]);
      }
      o.push(`<p>${inl(p.join(' '))}</p>`);
      continue;
    }

    i++;
  }

  return { html: o.join(''), toc };
}
