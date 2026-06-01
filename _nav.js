// Shared nav + cursor + lang helper — included in every subpage
(function(){
  const cursor = document.getElementById('cursor');
  if(cursor){
    document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
    document.querySelectorAll('a,button,.card,.tool-pill').forEach(el=>{
      el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));
      el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'));
    });
  }
  // Page transition
  document.querySelectorAll('a[href]').forEach(a=>{
    if(a.target||a.href.startsWith('mailto:')||a.href.startsWith('tel:')) return;
    a.addEventListener('click',e=>{
      const dest=a.href;
      if(!dest||dest.startsWith('#')) return;
      e.preventDefault();
      const ov=document.getElementById('overlay');
      if(ov){ov.classList.add('exit');setTimeout(()=>{window.location.href=dest},520);}
      else{window.location.href=dest;}
    });
  });
  
  // Lang button
  const langBtn=document.getElementById('langBtn');
  const savedLang = localStorage.getItem('lang');
  const lang = savedLang || 'zh';
  
  // Create custom event for language change
  const langChangeEvent = new Event('languagechange', { bubbles: true });
  
  function applyLang(l){
    document.querySelectorAll('[data-zh],[data-en]').forEach(el=>{
      const t=el.getAttribute('data-'+l);
      if(t!==null) el.innerHTML=t;
    });
    document.querySelectorAll('[data-zh-placeholder],[data-en-placeholder]').forEach(el=>{
      const t=el.getAttribute('data-'+l+'-placeholder');
      if(t!==null) el.placeholder=t;
    });
    document.documentElement.lang=l==='zh'?'zh':'en';
    localStorage.setItem('lang',l);
    
    // Trigger custom event for dynamic content re-render
    document.documentElement.dispatchEvent(langChangeEvent);
  }
  
  // Make applyLang global for other scripts
  window._applyLang = applyLang;
  
  // 页面加载时立即应用保存的语言（默认中文）
  applyLang(lang);
  
  // 只在存在语言按钮时添加切换事件
  if(!langBtn) return;
  langBtn.textContent=lang==='zh'?'EN':'中';
  langBtn.addEventListener('click',()=>{
    const cur=localStorage.getItem('lang')||'zh';
    const next=cur==='zh'?'en':'zh';
    applyLang(next);
    langBtn.textContent=next==='zh'?'EN':'中';
  });
})();