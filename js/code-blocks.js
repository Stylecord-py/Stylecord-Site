export function highlight(s) {
  const e = s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return e.replace(
    /(#.*$)|("[^"\n]*"|'[^'\n]*')|(@[\w.]+)\b|(\b\w+)(?=\s*\()|\b(import|from|def|async|await|class|return|if|else|for|in|as|with|None|True|False)\b/gm,
    (x, c, st, d, f, k) => {
      if (c) return `<span class="c" translate="yes">${c}</span>`;       // Comentários (permite tradução)
      if (st) return `<span class="s" translate="yes">${st}</span>`;     // Strings (permite tradução)
      if (d) return `<span class="d" translate="no">${d}</span>`;       // Decoradores (ignora)
      if (f) return `<span class="f" translate="no">${f}</span>`;       // Funções (ignora)
      if (k) return `<span class="k" translate="no">${k}</span>`;       // Palavras-chave (ignora)
      return x;
    }
  );
}

export function wire(root = document) {
  root.querySelectorAll('.copy').forEach(b => {
    b.onclick = async () => {
      try {
        await navigator.clipboard.writeText(b.closest('.code').querySelector('pre').innerText);
        b.textContent = 'Copied!';
        b.classList.add('ok');
      } catch {
        b.textContent = 'Failed';
      }
      setTimeout(() => {
        b.textContent = 'Copy';
        b.classList.remove('ok');
      }, 1500);
    };
  });
}

export function block(code, file) {
  return `<div class="code"><div class="bar"><span>${file || 'python'}</span><button class="copy" type="button">Copy</button></div><pre translate="no"><code>${highlight(code)}</code></pre></div>`;
}
