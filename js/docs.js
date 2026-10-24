import { md } from './navigation.js';
import { wire } from './code-blocks.js';
import { search } from './search.js';

const $ = s => document.querySelector(s);
let items = [];

const cur = () => (location.hash.slice(2).split('#')[0]) || 'index';

async function load() {
  const p = cur();
  const i = items.findIndex(x => x.path === p);

  $('#side').querySelectorAll('a[data-p]').forEach(a => a.toggleAttribute('aria-current', a.dataset.p === p));

  if (i < 0) {
    $('#art').innerHTML = '<h1>Página não encontrada</h1><p>Esse documento não existe. Use a busca ou volte ao <a href="#/index">início da documentação</a>.</p>';
    return;
  }

  const r = await fetch(p + '.md');
  if (!r.ok) {
    $('#art').innerHTML = '<h1>Erro ao carregar</h1><p>Não foi possível ler este arquivo. Recarregue a página.</p>';
    return;
  }

  const { html, toc } = md(await r.text());
  const it = items[i];
  const pv = items[i - 1];
  const nx = items[i + 1];

  $('#art').innerHTML = `<div class=crumb>Docs / ${it.section} / ${it.title}</div>${html}<div class=pn>${pv ? `<a href="#/${pv.path}">← ${pv.title}</a>` : '<span></span>'}${nx ? `<a href="#/${nx.path}" style="text-align:right">${nx.title} →</a>` : ''}</div>`;
  $('#toc').innerHTML = toc.map(([id, t]) => `<a href="#/${p}#${id}">${t}</a>`).join('');
  $('#art').querySelectorAll('.hl').forEach(a => a.href = `#/${p}#${a.dataset.a}`);

  document.title = it.title + ' — Stylecord.py';
  wire($('#art'));
  $('#side').classList.remove('open');

  const h = location.hash.split('#')[2];
  h ? document.getElementById(h)?.scrollIntoView() : scrollTo(0, 0);
}

const d = await (await fetch('../data/docs-index.json')).json();
items = d.pages;

let sec = '';
$('#nav').innerHTML = items.map(x => {
  const h = x.section !== sec ? `<h4>${sec = x.section}</h4>` : '';
  return h + `<a data-p="${x.path}" href="#/${x.path}">${x.title}</a>`;
}).join('');

$('#q').addEventListener('input', async e => {
  const r = await search(e.target.value, items);
  $('#res').innerHTML = e.target.value.trim() ? (r.length ? r.map(x => `<a href="#/${x.path}"><b>${x.title}</b><br><small>${x.section}</small></a>`).join('') : '<small>Nenhum resultado.</small>') : '';
});

$('#sb').onclick = () => $('#side').classList.toggle('open');

addEventListener('hashchange', load);
load();