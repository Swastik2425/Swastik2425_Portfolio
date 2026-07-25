/**
 * Swastik Jaiswal — Glossy 3D Portfolio, AI Assistant, Tech Matrix & UI Sound Effects Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initAudioUnlock();
    initAiAssistant();
    initSkillFilters();
    initSkillMeters();
    initScrollReveal();
    initClickExplosion();
    initSpotlightCards();
    initProminent3DBackground();
    init3DTilt();
    initCustomCursor();
    initNavbarScroll();
    initStatCounters();
    initProjectFilters();
    initCaseStudyModals();
    initContactForm();
    initSoundEffects();
});

/* ==========================================================================
   0. Audio Context Unlocker
   ========================================================================== */
let globalAudioCtx = null;

function getAudioContext() {
    if (!globalAudioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            globalAudioCtx = new AudioContextClass();
        }
    }
    if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
        globalAudioCtx.resume();
    }
    return globalAudioCtx;
}

function initAudioUnlock() {
    const unlock = () => {
        getAudioContext();
        document.removeEventListener('click', unlock);
        document.removeEventListener('keydown', unlock);
    };
    document.addEventListener('click', unlock);
    document.addEventListener('keydown', unlock);
}

/* ==========================================================================
   1. UI Sound Effects
   ========================================================================== */
let soundEnabled = true;

function initSoundEffects() {
    const toggle = document.getElementById('soundToggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        soundEnabled = !soundEnabled;
        toggle.classList.toggle('active');
        toggle.innerHTML = soundEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
        showGlobalToast(soundEnabled ? 'UI Sound Effects Enabled' : 'UI Sound Effects Muted');
        if (soundEnabled) playUiClickSound();
    });

    document.querySelectorAll('.btn, .filter-btn, .tool-btn, .skill-filter-btn, .nav-link').forEach(btn => {
        btn.addEventListener('click', () => {
            if (soundEnabled) playUiClickSound();
        });
    });
}

function playUiClickSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
}

/* ==========================================================================
   2. Creative Skill Domain Filters & Interactive Tech Insights
   ========================================================================== */
function initSkillFilters() {
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-category-card[data-domain]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const domain = btn.getAttribute('data-skill-filter');

            skillCards.forEach(card => {
                const cardDomain = card.getAttribute('data-domain');
                if (domain === 'all' || cardDomain === domain) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initSkillMeters() {
    const meterItems = document.querySelectorAll('.skill-meter-item');
    const insightBox = document.getElementById('insightText');

    meterItems.forEach(item => {
        const insightText = item.getAttribute('data-insight');

        item.addEventListener('mouseenter', () => {
            if (insightBox && insightText) {
                insightBox.innerHTML = `<strong>Architectural Insight:</strong> ${insightText}`;
            }
        });

        item.addEventListener('click', () => {
            if (insightBox && insightText) {
                insightBox.innerHTML = `<strong>Architectural Insight:</strong> ${insightText}`;
            }
        });
    });
}

/* ==========================================================================
   3. Live Swastik AI Assistant & Chatbot Engine
   ========================================================================== */
function initAiAssistant() {
    const trigger = document.getElementById('aiFloatingTrigger');
    const heroAiBtn = document.getElementById('heroAiBtn');
    const chatWindow = document.getElementById('aiChatWindow');
    const chatClose = document.getElementById('aiChatClose');
    const chatForm = document.getElementById('aiChatForm');
    const chatInput = document.getElementById('aiInput');
    const chatBody = document.getElementById('aiChatBody');
    const promptChips = document.querySelectorAll('.ai-prompt-chip');

    if (!trigger || !chatWindow) return;

    const toggleChat = () => chatWindow.classList.toggle('active');

    trigger.addEventListener('click', toggleChat);
    if (heroAiBtn) heroAiBtn.addEventListener('click', () => chatWindow.classList.add('active'));
    if (chatClose) chatClose.addEventListener('click', () => chatWindow.classList.remove('active'));

    const aiKnowledge = {
        skills: "Swastik specializes in **Full-Stack Web Development, System Design, Data Structures & Algorithms, Machine Learning, and Low-Latency Systems**. Core tech stack includes **Java, Python, C++, React.js, Node.js, Express, Socket.IO, Redis, MongoDB, and TensorFlow.js**.",
        safex: "<strong>SAFEX</strong> is Swastik's flagship Real-Time Chat App built with React.js, Node.js, Socket.IO, and Redis. It features a custom **TensorFlow.js AI Moderation Layer** that detects and blocks toxic language dynamically in real-time!",
        tradex: "<strong>TradeX</strong> is a high-performance Fintech platform designed for high-frequency scalping trading and digital options. It is optimized for ultra-low latency and high-volume market data handling.",
        hiring: "🎯 **Yes! Swastik Jaiswal is available for immediate joining** and is 100% open to relocation across India for Software Engineering (SDE), Full-Stack, or AI/ML roles!"
    };

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-msg ${sender}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processAiResponse(userQuery) {
        const query = userQuery.toLowerCase();
        let reply = "I am trained on Swastik Jaiswal's full engineering resume! You can ask me about his **projects (SAFEX, TradeX, Likhajhoka)**, **250+ LeetCode DSA milestone**, **AWS AI/ML certifications**, or **immediate hiring availability**.";

        if (query.includes('skill') || query.includes('language') || query.includes('stack') || query.includes('java') || query.includes('python')) {
            reply = aiKnowledge.skills;
        } else if (query.includes('safex') || query.includes('chat') || query.includes('socket')) {
            reply = aiKnowledge.safex;
        } else if (query.includes('tradex') || query.includes('fintech') || query.includes('trade')) {
            reply = aiKnowledge.tradex;
        } else if (query.includes('hire') || query.includes('job') || query.includes('relocate') || query.includes('join') || query.includes('availabl')) {
            reply = aiKnowledge.hiring;
        } else if (query.includes('project')) {
            reply = "Swastik's flagship projects include:\n1. **SAFEX**: AI-Moderated Real-Time Chat App (Node, Socket.IO, Redis, TensorFlow.js)\n2. **TradeX**: Low-Latency Scalping Fintech Platform\n3. **Likhajhoka**: SMB Digital Bahi Khata Ledger System.";
        } else if (query.includes('education') || query.includes('college') || query.includes('psit')) {
            reply = "Swastik is pursuing his B.Tech in Information Technology at **Pranveer Singh Institute of Technology (PSIT), Kanpur** (2023 - 2027).";
        } else if (query.includes('certification') || query.includes('aws') || query.includes('infosys') || query.includes('leetcode')) {
            reply = "Swastik has solved **250+ DSA problems on LeetCode & GFG**, holds **AWS AI/ML Certifications** in Generative AI & ML Security, and is certified by **Infosys Springboard** in Python & Web Technologies!";
        }

        setTimeout(() => appendMessage(reply, 'bot'), 400);
    }

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const key = chip.getAttribute('data-prompt');
            appendMessage(chip.innerText, 'user');
            setTimeout(() => appendMessage(aiKnowledge[key], 'bot'), 300);
        });
    });

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            appendMessage(text, 'user');
            chatInput.value = '';
            processAiResponse(text);
        });
    }
}

/* ==========================================================================
   4. Prominent 3D WebGL Background Engine with Scroll Flight
   ========================================================================== */
function initProminent3DBackground() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const torusGeometry = new THREE.TorusKnotGeometry(11, 3.2, 160, 20);
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x6366F1,
        wireframe: true,
        emissive: 0x4F46E5,
        emissiveIntensity: 0.65,
        roughness: 0.1,
        metalness: 0.9
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    torusKnot.position.set(10, 0, -10);
    scene.add(torusKnot);

    const icoGeometry = new THREE.IcosahedronGeometry(22, 2);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0x06B6D4,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const icoSphere = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icoSphere);

    const octaGeometry = new THREE.OctahedronGeometry(6, 0);
    const octaMaterial = new THREE.MeshStandardMaterial({
        color: 0xA855F7,
        wireframe: true,
        emissive: 0xA855F7,
        emissiveIntensity: 0.7
    });
    const octaCrystal = new THREE.Mesh(octaGeometry, octaMaterial);
    octaCrystal.position.set(-22, 14, -8);
    scene.add(octaCrystal);

    const particleCount = 3000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialY = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x6366F1);
    const color2 = new THREE.Color(0x06B6D4);
    const color3 = new THREE.Color(0xA855F7);

    for (let i = 0; i < particleCount * 3; i += 3) {
        let px = (Math.random() - 0.5) * 160;
        let py = (Math.random() - 0.5) * 160;
        let pz = (Math.random() - 0.5) * 160;

        positions[i] = px;
        positions[i + 1] = py;
        positions[i + 2] = pz;
        initialY[i / 3] = py;

        let mixedColor = color1.clone();
        const rand = Math.random();
        if (rand > 0.6) mixedColor = color2;
        else if (rand > 0.3) mixedColor = color3;

        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x6366F1, 3, 120);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x06B6D4, 3, 120);
    scene.add(light2);

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let targetScrollY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowHalfX) * 0.002;
        mouseY = (e.clientY - windowHalfY) * 0.002;
    });

    window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    function animate3D() {
        const elapsedTime = clock.getElapsedTime();

        torusKnot.rotation.x = elapsedTime * 0.25;
        torusKnot.rotation.y = elapsedTime * 0.3;

        icoSphere.rotation.x = -elapsedTime * 0.12;
        icoSphere.rotation.y = -elapsedTime * 0.18;

        octaCrystal.rotation.x = elapsedTime * 0.5;
        octaCrystal.rotation.y = elapsedTime * 0.6;
        octaCrystal.position.y = 14 + Math.sin(elapsedTime * 1.8) * 3;

        light1.position.x = Math.sin(elapsedTime * 0.8) * 30;
        light1.position.y = Math.cos(elapsedTime * 0.8) * 30;
        light1.position.z = 20;

        light2.position.x = -Math.sin(elapsedTime * 0.6) * 30;
        light2.position.y = Math.cos(elapsedTime * 0.6) * 30;
        light2.position.z = -20;

        const posAttr = particleGeometry.attributes.position;
        for (let i = 0; i < particleCount; i++) {
            const x = posAttr.getX(i);
            const z = posAttr.getZ(i);
            const newY = initialY[i] + Math.sin(elapsedTime * 2 + x * 0.05 + z * 0.05) * 2.5;
            posAttr.setY(i, newY);
        }
        posAttr.needsUpdate = true;
        particleSystem.rotation.y = elapsedTime * 0.03;

        targetMouseX += (mouseX - targetMouseX) * 0.05;
        targetMouseY += (mouseY - targetMouseY) * 0.05;

        camera.position.y = -targetScrollY * 0.015;
        camera.rotation.y = targetMouseX;
        camera.rotation.x = targetMouseY;

        renderer.render(scene, camera);
        requestAnimationFrame(animate3D);
    }
    animate3D();
}

/* ==========================================================================
   5. Scroll Reveal & Click Explosions
   ========================================================================== */
function initScrollReveal() {
    const revealTargets = document.querySelectorAll(
        '.bento-card, .skill-category-card, .project-card, .edu-card, .achieve-card, .section-header, .hero-content, .hero-visual'
    );

    revealTargets.forEach((target, idx) => {
        target.classList.add('scroll-reveal');
        target.style.transitionDelay = `${(idx % 4) * 0.12}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealTargets.forEach(target => observer.observe(target));
}

function initClickExplosion() {
    const colors = ['#6366F1', '#A855F7', '#06B6D4', '#10B981'];

    document.addEventListener('click', (e) => {
        const particleCount = 12;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * 60 + 30;

            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.cssText = `
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                box-shadow: 0 0 10px ${color};
                --tx: ${tx}px;
                --ty: ${ty}px;
            `;

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 600);
        }
    });
}

/* ==========================================================================
   6. Spotlight Cards & 3D Tilt
   ========================================================================== */
function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card, .glass-card, .project-card, .bento-card, .edu-card, .skill-category-card, .achieve-card');

    cards.forEach(card => {
        card.classList.add('spotlight-card');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

function init3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* ==========================================================================
   7. Custom Dual-Ring Cursor & Navbar
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.16;
        followerY += (mouseY - followerY) * 0.16;
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const hoverElements = document.querySelectorAll('a, button, .project-card, .spotlight-card, input, select, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   8. Stat Counters
   ========================================================================== */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function countUp() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        const sectionPos = heroSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !animated) {
            animated = true;
            statNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = Math.ceil(target / 40);

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = count + (counter.innerText.includes('%') ? '%' : '+');
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
                    }
                };
                updateCount();
            });
        }
    }

    countUp();
    window.addEventListener('scroll', countUp);
}

/* ==========================================================================
   9. Project Filters & Modals
   ========================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

const projectData = {
    safex: {
        image: "assets/safex.png",
        tag: "MICROSERVICES & AI MODERATION",
        title: "SAFEX — Microservices Real-Time Chat Application",
        date: "Jun 2026 – Present",
        problem: "Modern chat applications require instant message delivery across concurrent users without latency bottlenecks, while maintaining strict content safety and automated toxicity detection.",
        highlights: [
            "Developed a secure, real-time messaging platform using React.js, Node.js, and MongoDB.",
            "Integrated Socket.IO for instant WebSocket chat delivery with sub-10ms transmission speeds.",
            "Utilized Redis caching to manage concurrent user sessions and message queue throughput.",
            "Designed a unique AI moderation layer using TensorFlow.js that dynamically detects and blocks toxic language in real-time."
        ],
        results: [
            { val: "Socket.IO", label: "Real-Time WebSockets" },
            { val: "Redis", label: "High-Speed Memory Cache" },
            { val: "TF.js", label: "AI Toxicity Moderation" }
        ],
        techStack: "React.js, Node.js, Express, MongoDB, Socket.IO, Redis, TensorFlow.js"
    },
    tradex: {
        image: "assets/tradex.png",
        tag: "FINTECH & LOW-LATENCY TRADING",
        title: "TradeX — Real-Time Fintech Platform",
        date: "Jan 2026",
        problem: "High-frequency scalping trading and digital options demand ultra-low latency execution to prevent slippage during volatile financial market movements.",
        highlights: [
            "Designed a high-performance trading architecture tailored for high-frequency scalping and short-term options.",
            "Optimized memory management and network routing for high-volume market data streams to minimize execution slippage.",
            "Implemented real-time data handling feeds to empower rapid algorithmic decision-making."
        ],
        results: [
            { val: "Low-Latency", label: "Slippage Optimization" },
            { val: "High Volume", label: "Real-time Stream Engine" },
            { val: "Scalping UI", label: "Rapid Options Trading" }
        ],
        techStack: "Java, Node.js, WebSockets, System Architecture, Financial Stream Data"
    },
    likhajhoka: {
        image: "assets/likhajhoka.jpg",
        tag: "FULL-STACK DIGITAL LEDGER",
        title: "Likhajhoka — Digital Ledger System for SMBs",
        date: "Aug 2025",
        problem: "Small Indian merchants rely on traditional physical paper bahi khatas (ledger books), leading to lost records, untracked credit/debit balances, and manual calculation errors.",
        highlights: [
            "Developed a full-stack digital ledger application to digitize traditional Indian bahi khata books for small businesses.",
            "Designed an encrypted transaction module enabling merchants to digitally record and track all credit/debit entries.",
            "Streamlined financial accessibility by replacing physical paper record-keeping with a scalable cloud transition platform."
        ],
        results: [
            { val: "100%", label: "Paperless Ledger Digitization" },
            { val: "Encrypted", label: "Credit/Debit Tracking" },
            { val: "Scalable", label: "Cloud DBMS Transition" }
        ],
        deliverables: "React.js, Node.js, MongoDB, RESTful Transaction APIs, Security Encryption"
    }
};

function initCaseStudyModals() {
    const modal = document.getElementById('caseStudyModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-modal');
            const data = projectData[key];

            if (!data) return;

            modalContent.innerHTML = `
                ${data.image ? `<div style="width: 100%; height: 240px; margin-bottom: 2rem; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.5);"><img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;"></div>` : ''}
                <span class="modal-header-tag">${data.tag}</span>
                <h2 class="modal-title">${data.title}</h2>
                <p style="color: var(--cyan-accent); font-weight: 700; margin-bottom: 1.5rem;"><i class="fa-regular fa-calendar"></i> Timeline: ${data.date}</p>

                <div class="modal-body-section">
                    <h4><i class="fa-solid fa-triangle-exclamation"></i> Problem & Industry Context</h4>
                    <p style="color: var(--text-secondary); font-size: 1rem;">${data.problem}</p>
                </div>

                <div class="modal-body-section">
                    <h4><i class="fa-solid fa-code-branch"></i> Engineering Highlights & Architectural Solutions</h4>
                    <ul style="list-style: none; padding: 0;">
                        ${data.highlights.map(step => `
                            <li style="margin-bottom: 0.8rem; display: flex; gap: 0.8rem; color: var(--text-secondary);">
                                <i class="fa-solid fa-circle-check" style="color: var(--cyan-accent); margin-top: 4px;"></i>
                                <span>${step}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="modal-body-section">
                    <h4><i class="fa-solid fa-chart-line"></i> Performance Metrics & Outcomes</h4>
                    <div class="modal-metrics-row">
                        ${data.results.map(r => `
                            <div class="metric-box">
                                <h3>${r.val}</h3>
                                <p>${r.label}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="modal-body-section">
                    <h4><i class="fa-solid fa-cubes"></i> Core Tech Stack Used</h4>
                    <p style="color: var(--cyan-accent); font-weight: 700; font-size: 1.05rem;">${data.techStack}</p>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('formToast');
    const copyBtn = document.getElementById('copyEmailBtn');
    const emailText = document.getElementById('emailText');

    if (copyBtn && emailText) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailText.innerText).then(() => {
                showGlobalToast('Swastik\'s email copied to clipboard!');
            });
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (toast) {
                toast.classList.add('active');
                form.reset();
                setTimeout(() => toast.classList.remove('active'), 4000);
            }
        });
    }
}

function showGlobalToast(msg) {
    let toast = document.createElement('div');
    toast.className = 'global-toast glossy-card';
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 0.9rem 1.6rem;
        background: rgba(99, 102, 241, 0.95);
        color: #fff;
        font-weight: 700;
        font-size: 0.9rem;
        border-radius: 99px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        z-index: 99999;
        transition: opacity 0.3s ease;
    `;
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
