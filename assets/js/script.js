document.addEventListener('DOMContentLoaded',()=>{
  const menuWrap=document.querySelector('.menu-wrap');
  const menuBtn=document.getElementById('menu');
  const dropdown=document.querySelector('.dropdown');

  if(!menuWrap || !menuBtn || !dropdown) return;

  function closeMenu(){
    menuWrap.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    dropdown.setAttribute('aria-hidden','true');
  }

  menuBtn.addEventListener('click',(e)=>{
    e.stopPropagation();
    menuWrap.classList.toggle('open');
    const opened=menuWrap.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', String(opened));
    dropdown.setAttribute('aria-hidden', String(!opened));
  });

  document.addEventListener('click',(e)=>{
    if(!menuWrap.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape') closeMenu();
  });
});
