export function highlight(s) {
  const e = s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return e.replace(
    /(#.*$)|("[^"\n]*"|'[^'\n]*')|(@[\w.]+)\b|(\b\w+)(?=\s*\()|\b(import|from|def|async|await|class|return|if|else|for|in|as|with|None|True|False)\b/gm,
    (x, c, st, d, f, k) => {
      if (c) return `<span class="c">${c}</span>`;       // Comentários
      if (st) return `<span class="s">${st}</span>`;     // Strings
      if (d) return `<span class="d">${d}</span>`;       // Decoradores (@decorador)
      if (f) return `<span class="f">${f}</span>`;       // Funções (nome antes do parêntese)
      if (k) return `<span class="k">${k}</span>`;       // Palavras-chave (def, import)
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
  return `<div class=code><div class=bar><span>${file || 'python'}</span><button class=copy type=button>Copy</button></div><pre><code>${highlight(code)}</code></pre></div>`;
}
