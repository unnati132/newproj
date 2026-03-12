document.addEventListener('DOMContentLoaded',()=>{

// Lucide icons
lucide.createIcons();

// Navbar scroll
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>50);});

// Mobile menu
const mobileBtn=document.getElementById('mobile-menu-btn');
const navLinks=document.getElementById('nav-links');
mobileBtn.addEventListener('click',()=>{
navLinks.classList.toggle('active');
mobileBtn.innerHTML=`<i data-lucide="${navLinks.classList.contains('active')?'x':'menu'}"></i>`;
lucide.createIcons();
});
navLinks.querySelectorAll('a').forEach(a=>{
a.addEventListener('click',()=>{
navLinks.classList.remove('active');
mobileBtn.innerHTML=`<i data-lucide="menu"></i>`;
lucide.createIcons();
});
});

// Fade-in observer
const observer=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('appear');observer.unobserve(entry.target);}});
},{threshold:0.15});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

// Profile picture upload
const profilePic=document.getElementById('profile-pic');
const profileInput=document.getElementById('profile-pic-input');
profilePic.addEventListener('click',()=>profileInput.click());
profileInput.addEventListener('change',e=>{
const file=e.target.files[0];
if(file){const reader=new FileReader();reader.onload=ev=>{profilePic.innerHTML=`<img src="${ev.target.result}">`;};reader.readAsDataURL(file);}
});

// Contact form via EmailJS (or fallback to mailto if not configured)
const EMAILJS_USER_ID = '9M8S5TwiwyaHc2UCm'; // replace with your EmailJS user ID
const EMAILJS_SERVICE_ID = 'service_itc7s57'; // replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_153luyz'; // replace with your EmailJS template ID

const contactForm = document.getElementById('contact-form');

const isEmailJsConfigured = () => {
    return ![EMAILJS_USER_ID, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].some(v => v.includes('YOUR_'));
};

if (isEmailJsConfigured()) {
    emailjs.init(EMAILJS_USER_ID);
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
            .then(() => {
                alert('Message sent!');
                this.reset();
            }, err => {
                alert('Error sending message. Please check your EmailJS configuration in script.js.');
                console.error('EmailJS error:', err);
            });
    });
} else {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('from_name') || '';
        const email = formData.get('reply_to') || '';
        const message = formData.get('message') || '';
        const subject = `New message from ${name || 'Portfolio visitor'}`;
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        window.location.href = `mailto:rijalunnati46@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}
});