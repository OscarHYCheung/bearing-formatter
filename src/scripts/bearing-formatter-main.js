(()=>{const e=document.querySelector("#bearing-formatter-input"),t=document.querySelector("#bearing-formatter-output"),o=document.querySelector("#input-line-numbers"),n=document.querySelector("#output-line-numbers"),l=/^\s*(\d+|\.\d+|\d+\.\d*)\s*$/;let r=1;const s=e=>{if(e=e.trim(),!e)return"";if(!l.test(e))return"Invalid Input Format";let t=parseFloat(e);if(t=parseInt((1e4*t).toFixed(0)),isNaN(t))return"Invalid Input Format";let o=0,n=t%100;n>=60&&(o=parseInt(n/60),n%=60),t=parseInt(t/100);let r=t%100;r+=o,r>=60?(o=parseInt(r/60),r%=60):o=0,t=parseInt(t/100),t+=o;const s=n<10?`0${n}`:n,c=r<10?`0${r}`:r,a=t;return`${a}%%d${c}'${s}"`},c=()=>{const n=o.clientWidth;e.style.paddingLeft=`${n}px`,t.style.paddingLeft=`${n}px`};c();const a=()=>{const l=e.value,a=l.split("\n"),i=a.map(e=>s(e)),d=a.length;if(d>r){const e=document.createDocumentFragment();for(let t=r;t<d;t++){const o=document.createElement("span");o.innerHTML=`${t+1}:`,e.appendChild(o)}o.appendChild(e.cloneNode(!0)),n.appendChild(e)}else if(d<r){const e=o.parentNode,t=n.parentNode;e.removeChild(o),t.removeChild(n);for(let e=r;e>d;e--)o.removeChild(o.lastChild),n.removeChild(n.lastChild);e.appendChild(o),t.appendChild(n)}r=d,c();const p=i.join("\n");t.value=p};let i;e.addEventListener("input",a),e.addEventListener("scroll",()=>{i&&cancelAnimationFrame(i),i=requestAnimationFrame(()=>{o.scrollTop=e.scrollTop,n.scrollTop=t.scrollTop,t.scrollTop=e.scrollTop,i=null})},{passive:!0}),t.addEventListener("scroll",()=>{i&&cancelAnimationFrame(i),i=requestAnimationFrame(()=>{isUpdatingScrollPosition=!0,o.scrollTop=t.scrollTop,e.scrollTop=t.scrollTop,n.scrollTop=t.scrollTop,i=null})},{passive:!0});let d=null,p=null;const u=e=>{const t=document.querySelector("#toast");t.innerText=e,t.classList.add("shown"),t.classList.add("enlarge"),d&&clearTimeout(d),p&&clearTimeout(p),d=setTimeout(()=>{t.classList.remove("shown")},3e3),p=setTimeout(()=>{t.classList.remove("enlarge")},100)},m=document.querySelector("#copy-btn");m.addEventListener("click",()=>{const e=t.value;e?(t.select(),document.execCommand("copy"),u("Copied")):u("No output to copy")})})();