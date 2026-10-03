(() => {
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('.collection').forEach(section=>{
  const slider=section.querySelector('.slider'),prev=section.querySelector('[data-prev]'),next=section.querySelector('[data-next]');
  const stride=()=>slider.querySelector('li').getBoundingClientRect().width+16;
  const update=()=>{prev.disabled=slider.scrollLeft<2;next.disabled=slider.scrollLeft>=slider.scrollWidth-slider.clientWidth-2;};
  const move=d=>slider.scrollBy({left:d*stride(),behavior:reduced.matches?'instant':'smooth'});
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  slider.addEventListener('scroll',update,{passive:true});
  slider.addEventListener('keydown',e=>{if(e.target!==slider)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}});
  if('ResizeObserver'in window)new ResizeObserver(update).observe(slider);update();
 });
 const form=document.querySelector('#area-search-form');if(!form)return;
 const input=document.querySelector('#area-search'),results=document.querySelector('#search-results'),status=document.querySelector('#search-status'),directory=document.querySelector('#directory');
 let indexPromise,timer,sequence=0;
 const getIndex=()=>indexPromise||(indexPromise=fetch('/region-index.json').then(r=>{if(!r.ok)throw Error('검색 목록 오류');return r.json();}).catch(e=>{indexPromise=null;throw e;}));
 async function search(updateUrl=true){
  const current=++sequence,q=input.value.trim().slice(0,80),tokens=q.replace(/눈썹문신/g,'').split(/\s+/).filter(Boolean);
  if(updateUrl){const url=new URL(location.href);if(q)url.searchParams.set('q',q);else url.searchParams.delete('q');history.replaceState(null,'',url);}
  results.replaceChildren();results.hidden=!q;status.hidden=!q;directory.hidden=!!q;
  if(!q)return;status.textContent='지역을 찾고 있습니다.';
  try{const index=await getIndex();if(current!==sequence)return;const matches=index.filter(r=>tokens.every(t=>r.fullName.includes(t))).sort((a,b)=>(a.name===q?-1:b.name===q?1:a.fullName.length-b.fullName.length));
   status.textContent=matches.length?`${matches.length}개 지역을 찾았습니다.`:'일치하는 지역이 없습니다. 시·군·구 또는 동네 이름으로 다시 찾아주세요.';
   const fragment=document.createDocumentFragment();
   for(const r of matches){const a=document.createElement('a'),name=document.createElement('strong'),detail=document.createElement('span');a.href=r.path;name.textContent=r.name+'눈썹문신';detail.textContent=r.fullName;a.append(name,detail);fragment.append(a);}results.append(fragment);
  }catch{if(current!==sequence)return;status.textContent='검색 목록을 불러오지 못했습니다. 아래 지역 목록에서 선택해 주세요.';directory.hidden=false;}
 }
 form.addEventListener('submit',e=>{e.preventDefault();clearTimeout(timer);search();});
 input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(search,180);});
 input.value=new URL(location.href).searchParams.get('q')||'';if(input.value)search(false);
})();
