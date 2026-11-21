(function(){

  // ==================== # CONFIGURACAO ====================
  // Informe somente o número comercial real (DDI + DDD) antes de publicar.
  // Enquanto estiver vazio, o formulário não abre nenhum contato demonstrativo.
  var WHATSAPP='';


  // ==================== # MENU DO CELULAR ====================
  var burger=document.getElementById('burger'),menu=document.getElementById('menu');
  function closeMenu(){menu.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Abrir menu')}
  burger.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',String(open));
    burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });
  menu.addEventListener('click',function(e){if(e.target.closest('a'))closeMenu()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu()});


  // ==================== # MENU: SECAO ATUAL ====================
  // Marks the current section in the menu
  var links=[].slice.call(menu.querySelectorAll('a[href^="#"]:not(.btn)'));
  function spy(){
    var cur=links[0];
    links.forEach(function(a){
      var el=document.querySelector(a.getAttribute('href'));
      if(el&&a!==links[0]&&el.getBoundingClientRect().top<=140)cur=a;
    });
    links.forEach(function(a){if(a===cur)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  }
  window.addEventListener('scroll',spy,{passive:true});spy();


  // ==================== # BOTOES DOS PLANOS (preenchem o formulario) ====================
  var tipo=document.getElementById('f-tipo');
  document.querySelectorAll('[data-plan]').forEach(function(a){
    a.addEventListener('click',function(){
      var plano=a.getAttribute('data-plan');
      if ([].some.call(tipo.options,function(option){return option.value===plano;})) tipo.value=plano;
    });
  });


  // ==================== # EFEITOS 3D ====================
  // 3D: the hero phones lean slightly toward the mouse; case phones turn as you scroll
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    var hero=document.querySelector('.hero'),rig=document.querySelector('.rig');
    if(matchMedia('(hover:hover) and (pointer:fine)').matches){
      hero.addEventListener('pointermove',function(e){
        var r=hero.getBoundingClientRect();
        rig.style.setProperty('--ry',(((e.clientX-r.left)/r.width-.5)*-8).toFixed(2));
        rig.style.setProperty('--rx',(((e.clientY-r.top)/r.height-.5)*5).toFixed(2));
      });
      hero.addEventListener('pointerleave',function(){rig.style.setProperty('--ry',0);rig.style.setProperty('--rx',0)});
    }

    var stages=[].slice.call(document.querySelectorAll('.case-stage')),ticking=false;
    function turn(){
      ticking=false;
      var vh=window.innerHeight;
      stages.forEach(function(st){
        var r=st.getBoundingClientRect();
        if(r.bottom<-100||r.top>vh+100)return;
        var p=(vh-r.top)/(vh+r.height);
        st.style.setProperty('--p',Math.max(0,Math.min(1,p)).toFixed(3));
      });
    }
    window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(turn)}},{passive:true});
    window.addEventListener('resize',turn);
    turn();
  }


  // ==================== # FORMULARIO -> WHATSAPP ====================
  var form=document.getElementById('form'),status=document.getElementById('status');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var nome=form.nome.value.trim(),fone=form.fone.value.trim(),msg=form.msg.value.trim(),email=form.email.value.trim();
    var missing=!nome?form.nome:!fone?form.fone:!msg?form.msg:null;
    if(missing){
      status.textContent='Preencha nome, WhatsApp e uma descrição do projeto para enviar.';
      missing.focus();return;
    }
    if(!WHATSAPP){
      status.textContent='O canal de WhatsApp ainda não foi configurado. Atualize o número comercial da AppVia antes de publicar.';
      return;
    }
    var text='Olá, AppVia! Quero um orçamento.\n\nNome: '+nome+'\nWhatsApp: '+fone+(email?'\nE-mail: '+email:'')+'\nProjeto: '+tipo.value+'\n\n'+msg;
    var url='https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(text);
    status.innerHTML='Abrimos o WhatsApp com sua mensagem pronta. Se não abriu, <a target="_blank" rel="noopener">toque aqui</a>.';
    status.querySelector('a').href=url;
    window.open(url,'_blank','noopener');
  });
})();
