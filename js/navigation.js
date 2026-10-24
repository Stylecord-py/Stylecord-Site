import { block } from './code-blocks.js';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const slug = s => s.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');

const inl = s => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

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

    const h = l.match(/^(#{1,3}) (.+)/);
    if (h) {
      const id = slug(h[2]);
      const n = h[1].length;
      if (n > 1) toc.push([id, h[2]]);
      o.push(`<h${n} id="${id}">${inl(h[2])}${n > 1 ? `<a class=hl href="#" data-a="${id}" aria-label="Link direto">#</a>` : ''}</h${n}>`);
      i++;
      continue;
    }

    if (l.startsWith('>')) {
      const q = [];
      while (i < L.length && L[i].startsWith('>')) {
        q.push(L[i++].slice(1).trim());
      }
      o.push(`<blockquote${/^\*\*(Aviso|Planejado)/.test(q[0]) ? ' class=warn' : ''}>${inl(q.join(' '))}</blockquote>`);
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
      const p = [];
      while (i < L.length && L[i].trim() && !/^(#|```|>|- )/.test(L[i])) {
        p.push(L[i++]);
      }
      o.push(`<p>${inl(p.join(' '))}</p>`);
      continue;
    }

    i++;
  }

  return { html: o.join(''), toc };
}