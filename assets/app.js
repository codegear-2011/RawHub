function toRaw(input){
  var u;
  try{u=new URL(input.trim())}catch(e){return null}
  var p=u.pathname, m;
  if(u.hostname==="github.com"||u.hostname==="www.github.com"){
    m=p.match(/^\/([^\/]+)\/([^\/]+)\/(?:blob|raw)\/(.+)$/);
    if(!m)return null;
    return "https://raw.githubusercontent.com/"+m[1]+"/"+m[2]+"/"+m[3];
  }
  if(u.hostname==="gist.github.com"){
    m=p.match(/^\/([^\/]+)\/([a-f0-9]+)/);
    if(!m)return null;
    return "https://gist.githubusercontent.com/"+m[1]+"/"+m[2]+"/raw";
  }
  if(u.hostname==="raw.githubusercontent.com")return u.href;
  return null;
}
var urlEl=document.getElementById("url"),res=document.getElementById("res"),out=document.getElementById("out"),
label=document.getElementById("label"),icon=document.getElementById("stateIcon"),copyTxt=document.getElementById("copyTxt");
function run(){
  var raw=toRaw(urlEl.value);
  res.classList.remove("show");void res.offsetWidth;res.classList.add("show");
  copyTxt.textContent="Copy";
  if(raw){
    res.classList.remove("bad");label.textContent="Your Raw Link:";out.textContent=raw;
    icon.innerHTML='<path d="M5 12l5 5 9-10"/>';
  }else{
    res.classList.add("bad");label.textContent="Invalid link";
    out.textContent="Paste a GitHub file link that contains /blob/ (a folder or repo link has no raw version).";
    icon.innerHTML='<path d="M6 6l12 12M18 6 6 18"/>';
  }
}
document.getElementById("go").addEventListener("click",run);
urlEl.addEventListener("keydown",function(e){if(e.key==="Enter")run()});
document.getElementById("copy").addEventListener("click",function(){
  var t=out.textContent,b=document.getElementById("copy");
  function done(){copyTxt.textContent="Copied";b.classList.add("done");setTimeout(function(){copyTxt.textContent="Copy";b.classList.remove("done")},1600)}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,fallback)}else fallback();
  function fallback(){
    var ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();
    try{document.execCommand("copy");done()}catch(e){}
    document.body.removeChild(ta);
  }
});
(function(){
  var root=document.documentElement,t=null;
  try{t=localStorage.getItem("rawhub-theme")}catch(e){}
  if(t!=="dark"&&t!=="light")t=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
  root.setAttribute("data-theme",t);
  document.getElementById("theme").addEventListener("click",function(){
    var n=root.getAttribute("data-theme")==="dark"?"light":"dark";
    root.setAttribute("data-theme",n);
    try{localStorage.setItem("rawhub-theme",n)}catch(e){}
  });
  var sky=document.getElementById("sky"),h="",i,r=Math.random;
  for(i=0;i<170;i++){
    var sp=i%6===0,s=sp?(7+r()*8):(1+r()*2);
    h+='<i class="st'+(sp?' sp':'')+'" style="left:'+(r()*100).toFixed(1)+'%;top:'+(r()*100).toFixed(1)+'%;width:'+s.toFixed(1)+'px;height:'+s.toFixed(1)+'px;--d:'+(2+r()*4).toFixed(1)+'s;--l:-'+(r()*6).toFixed(1)+'s"></i>';
  }
  for(i=0;i<10;i++){
    h+='<i class="sh" style="left:'+(r()*100).toFixed(0)+'%;top:'+(r()*100).toFixed(0)+'%;--a:'+(r()*360).toFixed(0)+'deg;--d:'+(5+r()*7).toFixed(1)+'s;--l:-'+(r()*10).toFixed(1)+'s"></i>';
  }
  sky.innerHTML=h;
  sky.addEventListener("animationiteration",function(e){
    var el=e.target;
    if(el.className!=="sh")return;
    el.style.left=(r()*100).toFixed(0)+"%";
    el.style.top=(r()*100).toFixed(0)+"%";
    el.style.setProperty("--a",(r()*360).toFixed(0)+"deg");
  });
})();
(function(){
  var th=document.getElementById("theme");
  th.addEventListener("click",function(){th.classList.remove("spin");void th.offsetWidth;th.classList.add("spin")});
  var els=document.querySelectorAll(".sec>h2,.sec>p,.step,details,footer"),k;
  for(k=0;k<els.length;k++){
    var el=els[k],idx=Array.prototype.indexOf.call(el.parentNode.children,el);
    el.classList.add("rv");
    el.style.setProperty("--rd",(Math.min(idx,6)*0.07).toFixed(2)+"s");
  }
  if(!("IntersectionObserver" in window)){for(k=0;k<els.length;k++)els[k].classList.add("on");return}
  var io=new IntersectionObserver(function(en){
    en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}});
  },{threshold:.12,rootMargin:"0px 0px -30px 0px"});
  for(k=0;k<els.length;k++)io.observe(els[k]);
})();
