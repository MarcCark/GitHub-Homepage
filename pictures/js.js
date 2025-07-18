document.addEventListener('DOMContentLoaded', () => {
    // BURGER-MENÜ
    const burgerToggle = document.getElementById('burger-toggle');
    const nav = document.querySelector('.nav');
    if (burgerToggle && nav) {
        burgerToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }

    // DROPDOWN-MENÜ
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const dropdown = btn.parentElement;
            dropdown.classList.toggle('show');
        });
    });

    // Dropdown schließt bei Klick außerhalb
    window.addEventListener('click', function (e) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });

    // DATENSCHUTZ-POPUP
    const popup = document.getElementById('privacy-popup');
    const button = document.getElementById('accept-privacy');
    if (popup && button && !localStorage.getItem('privacyAccepted')) {
        setTimeout(() => {
            popup.classList.add('show');
        }, 300);
        button.addEventListener('click', () => {
            popup.classList.remove('show');
            localStorage.setItem('privacyAccepted', 'true');
        });
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // SKILL-LEISTE
    const skills = [
        { 
            name: "Python", 
            level: 70,
            desc: "Solide Kenntnisse in Python: Datenverarbeitung, Dateizugriff, Fehlerbehandlung und Arbeiten mit Listen, Dictionaries & Co. Grundverständnis der objektorientierten Programmierung (Klassen, Objekte, Vererbung) vorhanden."
        },
        { 
            name: "C", 
            level: 35,
            desc: "Variablen, Kontrollstrukturen, Funktionen, Arrays und Zeiger sind bekannt. Erste kleinere Projekte umgesetzt, grundlegendes Verständnis von Speicher und einfachen Strukturen vorhanden."
        },
        { 
            name: "Bash", 
            level: 45,
            desc: "Vertraut mit typischen Shell-Befehlen, einfachen Skripten, Variablen und Kontrollstrukturen. Erste kleine Projekte umgesetzt, Fokus auf Automatisierung einfacher Aufgaben."
        },
        { 
            name: "HTML/CSS", 
            level: 75,
            desc: "Solide Kenntnisse in HTML & CSS: Semantischer Aufbau, Flexbox, Media Queries und sauberes Responsive Design sind vorhanden. Erste Projekte umgesetzt, gutes Verständnis für Layout, Struktur und Stiltrennung."
        },
        { 
            name: "IBM Z", 
            level: 30,
            desc: "Grundkenntnisse in IBM Z: Vertraut mit z/OS, TSO, ISPF und grundlegender JCL durch das IBM Z Xplore Concept Badge. Erste praktische Erfahrungen im Umgang mit Mainframe-Werkzeugen und Jobsteuerung gesammelt."
        }
    ];

    const skillsList = document.querySelector('.skills-list');

    function createSkillTree() {
        skillsList.innerHTML = '';
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.innerHTML = `
<div class="skill-title">${skill.name}</div>
<div class="skill-bar">
    <div class="skill-level" style="--target-width: ${skill.level}%"></div>
</div>
<div class="skill-desc">${skill.desc}</div>
            `;

            skillElement.addEventListener('click', () => {
                const isActive = skillElement.classList.contains('active');

                // Alle .skill-item deaktivieren
                document.querySelectorAll('.skill-item').forEach(item => item.classList.remove('active'));

                // Wenn vorher nicht aktiv → aktivieren
                if (!isActive) {
                    skillElement.classList.add('active');
                }
            });

            skillsList.appendChild(skillElement);
        });
    }

    function animateSkillBars() {
        const bars = skillsList.querySelectorAll('.skill-level');
        bars.forEach((bar, index) => {
            bar.style.animation = 'none';
            void bar.offsetWidth;
            bar.style.animation = `fillBar 1.5s ease-out forwards`;
            bar.style.animationDelay = `${index * 0.1}s`;
        });
    }

    createSkillTree();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsList);
});
