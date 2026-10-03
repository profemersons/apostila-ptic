(function(){
var d=document,r=d.documentElement,$=function(s){return d.querySelector(s)},t='dark';
var OK='#34d399',NO='#fb7185',TX='#e8ecfb',MU='#8f9bbd',AC='#22d3ee';
try{t=localStorage.getItem('tema')||'dark'}catch(e){}
function ap(){r.dataset.theme=t;var b=$('#tt');if(b)b.innerHTML='<i class="fa-solid fa-'+(t=='dark'?'sun':'moon')+'"></i>'}
ap();
function sh(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.random()*(i+1)|0,x=a[i];a[i]=a[j];a[j]=x}return a}
function agora(){return new Date().toLocaleString('pt-BR')}
d.addEventListener('DOMContentLoaded',function(){
ap();$('#tt').onclick=function(){t=t=='dark'?'light':'dark';try{localStorage.setItem('tema',t)}catch(e){}ap()};
var bar=$('#bar');if(bar)addEventListener('scroll',function(){var h=r.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%'});
var fs=17;[['#fm',-1],['#fp',1]].forEach(function(x){var b=$(x[0]);if(b)b.onclick=function(){fs=Math.min(24,Math.max(14,fs+x[1]));r.style.fontSize=fs+'px'}});
var m=$('#conteudo');if(m&&m.dataset.md)md(m);
if(window.QUIZ)quiz();if(window.ATIV)ativ();
});
function md(m){fetch(m.dataset.md).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(s){
m.innerHTML=marked.parse(s.split('# ATIVIDADE 1')[0]);
m.querySelectorAll('table').forEach(function(tb){var w=d.createElement('div');w.className='tw';tb.parentNode.insertBefore(w,tb);w.appendChild(tb)});
var tc=$('#toc');if(tc){var h='<summary>Nesta aula</summary>';m.querySelectorAll('h2').forEach(function(e,i){e.id='s'+i;h+='<a href="#s'+i+'">'+e.textContent+'</a>'});tc.innerHTML=h}
}).catch(function(){m.innerHTML='<div class="box">Não foi possível carregar a aula. Abra o site publicado no GitHub Pages (não o arquivo direto do computador).</div>'})}
function img(tit,nome,L,tot,o,fn){
var W=1080,P=60,c=d.createElement('canvas'),x=c.getContext('2d'),F=' system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',R=[],y=70;
function add(s,wt,sz,col){x.font=wt+' '+sz+'px'+F;var a=s.split(' '),l='';
function push(q){R.push([q,wt+' '+sz+'px'+F,col,y]);y+=sz*1.4}
a.forEach(function(p){var u=l?l+' '+p:p;if(x.measureText(u).width>W-2*P&&l){push(l);l=p}else l=u});push(l)}
add(tit,800,44,'#fff');y+=10;add('Aluno(a): '+nome,700,32,TX);add('Gerado em: '+agora(),400,28,MU);y+=24;
L.forEach(function(l){add(l[0],l[2]?700:400,28,l[1]);y+=6});
y+=24;add(tot,800,64,AC);var H=y+50;
c.width=W;c.height=H;var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#070b16');g.addColorStop(1,'#2a1a63');x.fillStyle=g;x.fillRect(0,0,W,H);
var b=x.createLinearGradient(0,0,W,0);b.addColorStop(0,'#22d3ee');b.addColorStop(.5,'#8b5cf6');b.addColorStop(1,'#f472b6');x.fillStyle=b;x.fillRect(0,0,W,14);
x.textBaseline='top';R.forEach(function(l){x.font=l[1];x.fillStyle=l[2];x.fillText(l[0],P,l[3])});
c.toBlob(function(bl){var u=URL.createObjectURL(bl),f;try{f=new File([bl],fn+'.png',{type:'image/png'})}catch(e){}
o.innerHTML='<img alt="Imagem do resultado" src="'+u+'" style="width:100%;border-radius:1rem;margin-top:.8rem"><p class=mu>Se o download não funcionar, segure o dedo sobre a imagem e escolha Salvar.</p>';
var a=d.createElement('a');a.href=u;a.download=fn+'.png';a.className='btn pri';a.textContent='Baixar imagem';o.appendChild(a);
if(f&&navigator.canShare&&navigator.canShare({files:[f]})){var s=d.createElement('button');s.textContent='Compartilhar (Teams)';s.onclick=function(){navigator.share({files:[f]}).catch(function(){})};o.appendChild(s)}
o.scrollIntoView({behavior:'smooth'})},'image/png')}
function quiz(){var el=$('#quiz'),i=0,pt=0,Q=QUIZ,R=[];
function show(){var q=Q[i],o=sh(q.o.map(function(x,k){return{x:x,k:k}}));
el.innerHTML='<p class=mu>Pergunta '+(i+1)+' de '+Q.length+'</p><p><b>'+q.q+'</b></p>';
o.forEach(function(p){var b=d.createElement('button');b.className='opt';b.textContent=p.x;
b.onclick=function(){var bs=el.querySelectorAll('.opt');
bs.forEach(function(x){x.disabled=true;if(x.textContent==q.o[q.a])x.classList.add('ok')});
if(p.k==q.a)pt++;else b.classList.add('bad');R.push({q:q,t:p.x,ok:p.k==q.a});
var n=d.createElement('div');n.className='box';n.innerHTML=q.e;el.appendChild(n);
var nx=d.createElement('button');nx.className='pri';nx.textContent=i<Q.length-1?'Próxima pergunta':'Ver resultado';
nx.onclick=function(){i++;i<Q.length?show():fim()};el.appendChild(nx)};el.appendChild(b)})}
function fim(){el.innerHTML='<h3>Resultado: '+pt+' de '+Q.length+' acertos</h3><p class=mu>Digite seu nome e gere a imagem para enviar pelo Teams.</p><input id=qn placeholder="Seu nome" autocomplete=name><button class=pri id=qg>Gerar imagem</button><div id=qo></div>';
$('#qg').onclick=function(){var n=$('#qn').value.trim();if(!n){alert('Digite seu nome antes de gerar a imagem.');return}
var L=[];R.forEach(function(e,k){L.push(['Pergunta '+(k+1)+' — '+(e.ok?'Certo':'Errado'),e.ok?OK:NO,1]);L.push([e.q.q.slice(0,90)+'…',MU]);L.push(['Sua resposta: '+e.t,TX]);if(!e.ok)L.push(['Correta: '+e.q.o[e.q.a],OK])});
img('Quiz · '+TIT,n,L,'Acertos: '+pt+' / '+Q.length,$('#qo'),'quiz-'+ARQ)}}
show()}
function ativ(){var el=$('#ativ'),A=ATIV,ans={},pc={},ord=sh(A.b.map(function(_,i){return i}));
function ch(id,tt,p){return '<h3>'+tt+'</h3><p>'+p.q+'</p>'+p.o.map(function(o,i){return '<button class=opt data-c='+id+' data-v='+i+'>'+o+'</button>'}).join('')}
var h='<h3>'+A.ta+'</h3><p class=mu>'+A.ia+'</p>';
A.a.forEach(function(it,k){h+='<div class=row><span>'+it[0]+'</span><span>'+A.la.map(function(l,j){return '<button data-a='+k+' data-v='+j+'>'+l+'</button>'}).join(' ')+'</span></div>'});
h+='<h3>'+A.tb+'</h3><p class=mu>'+A.ib+'</p><div id=ob></div>';
h+=ch('c',A.tc,A.c)+ch('d',A.td,A.d);
h+='<h3>Gerar imagem</h3><input id=nm placeholder="Seu nome" autocomplete=name><button class=pri id=gi>Gerar imagem</button><div id=out></div>';
el.innerHTML=h;
function rb(){$('#ob').innerHTML=ord.map(function(k,p){return '<div class=row><span>'+A.b[k]+'</span><span><button data-m='+p+' data-d=-1>↑</button> <button data-m='+p+' data-d=1>↓</button></span></div>'}).join('')}rb();
el.onclick=function(e){var b=e.target.closest('button');if(!b)return;var g=b.dataset;
if(g.a!==undefined){ans[g.a]=+g.v;el.querySelectorAll('[data-a="'+g.a+'"]').forEach(function(x){x.classList.toggle('sel',x===b)})}
else if(g.m!==undefined){var p=+g.m,q=p+ +g.d;if(q>=0&&q<ord.length){var s=ord[p];ord[p]=ord[q];ord[q]=s;rb()}}
else if(g.c!==undefined){pc[g.c]=+g.v;el.querySelectorAll('[data-c="'+g.c+'"]').forEach(function(x){x.classList.toggle('sel',x===b)})}
else if(b.id=='gi')gerar()};
function gerar(){var nm=$('#nm').value.trim();if(!nm){alert('Digite seu nome antes de gerar a imagem.');return}
var n=A.a.length,pa=0;A.a.forEach(function(it,k){if(ans[k]===it[1])pa++});
var po=0;ord.forEach(function(k,p){if(k==p)po++});var pb=po==ord.length?2:po>=2?1:0,pcc=pc.c===A.c.r?2:0,pd=pc.d===A.d.r?1:0,tot=pa+pb+pcc+pd;
var L=[[A.ta+' ('+pa+'/'+n+')',AC,1]];
A.a.forEach(function(it,k){var v=ans[k];L.push([it[0]+': '+(v===undefined?'sem resposta':A.la[v]),v===it[1]?OK:NO])});
L.push([A.tb+' ('+pb+'/2)',AC,1]);
ord.forEach(function(k,p){L.push([(p+1)+'. '+A.b[k],k==p?OK:NO])});
[['c',A.tc+' ('+pcc+'/2)',A.c],['d',A.td+' ('+pd+'/1)',A.d]].forEach(function(z){var q=z[2],v=pc[z[0]];L.push([z[1],AC,1]);L.push(['Sua resposta: '+(v===undefined?'sem resposta':q.o[v]),v===q.r?OK:NO]);if(v!==q.r)L.push(['Correta: '+q.o[q.r],OK])});
img('Atividade · '+TIT,nm,L,'Total: '+tot+' / '+(n+5),$('#out'),'atividade-'+ARQ)}}
})();
