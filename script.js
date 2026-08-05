const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
const langOptions=document.querySelectorAll(".lang-option");
let language=localStorage.getItem("tusf-language")||"pt";

function applyLanguage(){
  document.documentElement.lang=language==="pt"?"pt-BR":"en";
  document.querySelectorAll("[data-pt][data-en]").forEach(el=>{
    el.textContent=el.dataset[language];
  });
  langOptions.forEach(button=>{
    const active=button.dataset.lang===language;
    button.classList.toggle("active",active);
    button.setAttribute("aria-pressed",String(active));
  });
  document.title=language==="pt"
    ?"Tenda de Umbanda Sagrada Família | Massachusetts"
    :"Tenda de Umbanda Sagrada Família | Umbanda in Massachusetts";
  localStorage.setItem("tusf-language",language);
}

langOptions.forEach(button=>{
  button.addEventListener("click",()=>{
    language=button.dataset.lang;
    applyLanguage();
  });
});

menuButton.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});

nav.querySelectorAll("a").forEach(link=>{
  link.addEventListener("click",()=>nav.classList.remove("open"));
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(section=>observer.observe(section));

const header=document.querySelector(".site-header");
window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>18);
},{passive:true});

document.getElementById("year").textContent=new Date().getFullYear();
applyLanguage();
