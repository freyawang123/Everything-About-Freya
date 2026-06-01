// Shared nav + cursor + lang helper — included in every subpage
(function(){
  var cursor = document.getElementById('cursor');
  if(cursor){
    document.addEventListener('mousemove', function(e){
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    var els = document.querySelectorAll('a,button,.card,.tool-pill');
    for(var i = 0; i < els.length; i++){
      els[i].addEventListener('mouseenter', function(){
        cursor.classList.add('hover');
      });
      els[i].addEventListener('mouseleave', function(){
        cursor.classList.remove('hover');
      });
    }
  }
  
  // Page transition
  var links = document.querySelectorAll('a[href]');
  for(var j = 0; j < links.length; j++){
    (function(a){
      if(a.target || a.href.indexOf('mailto:') === 0 || a.href.indexOf('tel:') === 0) return;
      a.addEventListener('click', function(e){
        var dest = a.href;
        if(!dest || dest.indexOf('#') === 0) return;
        e.preventDefault();
        var ov = document.getElementById('overlay');
        if(ov){
          ov.classList.add('exit');
          setTimeout(function(){
            window.location.href = dest;
          }, 520);
        } else {
          window.location.href = dest;
        }
      });
    })(links[j]);
  }
  
  // Lang button
  var langBtn = document.getElementById('langBtn');
  if(!langBtn) return;
  var lang = localStorage.getItem('lang') || 'zh';
  langBtn.textContent = lang === 'zh' ? 'EN' : '中';
  applyLang(lang);
  
  langBtn.addEventListener('click', function(){
    var cur = localStorage.getItem('lang') || 'zh';
    var next = cur === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', next);
    langBtn.textContent = next === 'zh' ? 'EN' : '中';
    applyLang(next);
  });
  
  function applyLang(l){
    var els1 = document.querySelectorAll('[data-zh],[data-en]');
    for(var k = 0; k < els1.length; k++){
      var t = els1[k].getAttribute('data-' + l);
      if(t !== null) els1[k].innerHTML = t;
    }
    
    var els2 = document.querySelectorAll('[data-zh-placeholder],[data-en-placeholder]');
    for(var m = 0; m < els2.length; m++){
      var t2 = els2[m].getAttribute('data-' + l + '-placeholder');
      if(t2 !== null) els2[m].placeholder = t2;
    }
    
    document.documentElement.lang = l === 'zh' ? 'zh' : 'en';
  }
})();
