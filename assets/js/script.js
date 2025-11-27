const btn=document.getElementById('btn');
const status=document.getElementById('status');
btn.addEventListener('click',()=>{status.textContent='Status: clicked';btn.textContent='Clicked';btn.disabled=true});
document.addEventListener('DOMContentLoaded',()=>{status.textContent='Status: loaded'});