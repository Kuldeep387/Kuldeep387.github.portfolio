const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");
const themeBtn=document.getElementById("themeBtn");
const topBtn=document.getElementById("topBtn");

menuBtn.addEventListener("click",()=>{
  navLinks.classList.toggle("active");
  const i=menuBtn.querySelector("i");
  i.classList.toggle("fa-bars");
  i.classList.toggle("fa-xmark");
});

document.querySelectorAll(".nav-links a").forEach(a=>{
  a.addEventListener("click",()=>{
    navLinks.classList.remove("active");
    const i=menuBtn.querySelector("i");
    i.classList.add("fa-bars");
    i.classList.remove("fa-xmark");
  });
});

const savedTheme=localStorage.getItem("portfolio-theme");
if(savedTheme==="dark"){
  document.body.classList.add("dark");
  themeBtn.querySelector("i").className="fa-solid fa-sun";
}

themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  const dark=document.body.classList.contains("dark");
  themeBtn.querySelector("i").className=dark?"fa-solid fa-sun":"fa-solid fa-moon";
  localStorage.setItem("portfolio-theme",dark?"dark":"light");
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add("visible");
    if(entry.target.classList.contains("skill")){
      const level=entry.target.dataset.level;
      const bar=entry.target.querySelector(".bar span");
      setTimeout(()=>bar.style.width=level+"%",150);
    }
    observer.unobserve(entry.target);
  });
},{threshold:.15});

document.querySelectorAll(".reveal,.skill").forEach(el=>observer.observe(el));

window.addEventListener("scroll",()=>{
  topBtn.classList.toggle("show",window.scrollY>450);
});

topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

const contactForm=document.getElementById("contactForm");
const sendBtn=document.getElementById("sendBtn");
const formStatus=document.getElementById("formStatus");

contactForm.addEventListener("submit",()=>{
  sendBtn.disabled=true;
  sendBtn.innerHTML='Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
  formStatus.textContent="Sending your message...";
});


// =========================
// SUBTLE INTERACTION ANIMATION
// =========================

const revealItems = document.querySelectorAll(
  ".about-grid .reveal, .projects-grid .reveal, .education-grid .reveal, .skills-grid .reveal"
);

revealItems.forEach((item,index)=>{
  item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
});

const heroPhoto = document.querySelector(".hero-photo");
if (heroPhoto && window.matchMedia("(pointer:fine)").matches) {
  heroPhoto.addEventListener("mousemove",(e)=>{
    const rect = heroPhoto.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    heroPhoto.style.transform = `translate(${x*7}px,${y*7}px)`;
  });

  heroPhoto.addEventListener("mouseleave",()=>{
    heroPhoto.style.transform = "";
  });
}
