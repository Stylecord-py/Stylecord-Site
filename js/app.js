const m=document.getElementById('menu'),n=document.querySelector('nav.main');
m&&m.addEventListener('click',()=>{const o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)});
