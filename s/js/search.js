let idx=null;
export async function search(q,items){q=q.trim().toLowerCase();if(!q)return[];
if(!idx)idx=await Promise.all(items.map(async i=>{let t='';try{t=await (await fetch(i.path+'.md')).text()}catch{}return{...i,t:t.toLowerCase()}}));
return idx.filter(i=>i.title.toLowerCase().includes(q)||i.t.includes(q)).slice(0,8)}
