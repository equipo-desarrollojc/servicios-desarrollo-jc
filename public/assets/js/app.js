(function () {
    "use strict";

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ================= Mobile nav ================= */
    function initMobileNav() {
        var toggle = document.querySelector(".nav-toggle");
        if (!toggle) return;

        toggle.addEventListener("click", function () {
            var isOpen = document.body.classList.toggle("nav-open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.querySelectorAll(".mobile-nav a").forEach(function (link) {
            link.addEventListener("click", function () {
                document.body.classList.remove("nav-open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ================= Header scrolled state ================= */
    function initHeaderScrollState() {
        var header = document.querySelector(".site-header");
        if (!header) return;

        var onScroll = function () {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ================= Reveal on scroll ================= */
    function initScrollReveal() {
        var items = document.querySelectorAll("[data-reveal]");
        if (!items.length) return;

        if (!("IntersectionObserver" in window) || prefersReducedMotion) {
            items.forEach(function (el) {
                el.classList.add("is-visible");
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        items.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ================= FAQ accordion ================= */
    function initFaq() {
        var faqItems = document.querySelectorAll(".faq-item");
        if (!faqItems.length) return;

        faqItems.forEach(function (item) {
            var question = item.querySelector(".faq-item__question");
            question.addEventListener("click", function () {
                var willOpen = !item.classList.contains("is-open");

                faqItems.forEach(function (other) {
                    other.classList.remove("is-open");
                    other.querySelector(".faq-item__question").setAttribute("aria-expanded", "false");
                });

                if (willOpen) {
                    item.classList.add("is-open");
                    question.setAttribute("aria-expanded", "true");
                }
            });
        });
    }

    /* ================= Video fallback handling ================= */
    function initVideoFallback() {
        document.querySelectorAll(".video-card").forEach(function (card) {
            var video = card.querySelector("video");
            if (!video) return;

            video.addEventListener("loadeddata", function () {
                card.classList.add("has-video");
            });

            video.addEventListener("error", function () {
                card.classList.remove("has-video");
            });

            var source = video.querySelector("source");
            if (source && source.src) {
                fetch(source.src, { method: "HEAD" })
                    .then(function (res) {
                        if (res.ok) {
                            video.load();
                        }
                    })
                    .catch(function () {
                        /* keep fallback visible */
                    });
            }
        });
    }

    /* ================= Hero pointer-reactive particle network ================= */
    function initHeroCanvas() {
        var canvas = document.getElementById("heroCanvas");
        if (!canvas) return;
        var ctx = canvas.getContext("2d");

        var hero = canvas.closest(".hero");
        var width, height, dpr;
        var particles = [];
        var pointer = { x: null, y: null, active: false };
        var rafId = null;

        var PARTICLE_COUNT_BASE = 70;
        var LINK_DISTANCE = 130;
        var POINTER_RADIUS = 160;

        var colors = ["#4f8cff", "#a855f7", "#ff4d7e"];

        function resize() {
            var rect = hero.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seedParticles();
        }

        function seedParticles() {
            var count = Math.round((width * height) / 18000);
            count = Math.max(28, Math.min(count, PARTICLE_COUNT_BASE));
            particles = [];
            for (var i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    r: Math.random() * 1.6 + 1,
                    color: colors[i % colors.length],
                });
            }
        }

        function step() {
            ctx.clearRect(0, 0, width, height);

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];

                if (pointer.active) {
                    var dx = p.x - pointer.x;
                    var dy = p.y - pointer.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < POINTER_RADIUS) {
                        var force = (POINTER_RADIUS - dist) / POINTER_RADIUS;
                        p.x += (dx / (dist || 1)) * force * 1.6;
                        p.y += (dy / (dist || 1)) * force * 1.6;
                    }
                }

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
                p.x = Math.max(0, Math.min(width, p.x));
                p.y = Math.max(0, Math.min(height, p.y));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.85;
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            for (var a = 0; a < particles.length; a++) {
                for (var b = a + 1; b < particles.length; b++) {
                    var pa = particles[a];
                    var pb = particles[b];
                    var ddx = pa.x - pb.x;
                    var ddy = pa.y - pb.y;
                    var d = Math.sqrt(ddx * ddx + ddy * ddy);
                    if (d < LINK_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(pa.x, pa.y);
                        ctx.lineTo(pb.x, pb.y);
                        ctx.strokeStyle = "rgba(120, 150, 210, " + (1 - d / LINK_DISTANCE) * 0.35 + ")";
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            rafId = requestAnimationFrame(step);
        }

        function onPointerMove(e) {
            var rect = hero.getBoundingClientRect();
            pointer.x = e.clientX - rect.left;
            pointer.y = e.clientY - rect.top;
            pointer.active = true;
        }

        function onPointerLeave() {
            pointer.active = false;
        }

        resize();

        if (prefersReducedMotion) {
            step();
            cancelAnimationFrame(rafId);
        } else {
            step();
            hero.addEventListener("pointermove", onPointerMove);
            hero.addEventListener("pointerleave", onPointerLeave);
        }

        var resizeTimer;
        window.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 150);
        });

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                cancelAnimationFrame(rafId);
            } else if (!prefersReducedMotion) {
                step();
            }
        });
    }

    /* ================= Active nav link on scroll ================= */
    function initActiveNavLinks() {
        var links = document.querySelectorAll(".site-nav a[href^='#']");
        var sections = [];
        links.forEach(function (link) {
            var section = document.querySelector(link.getAttribute("href"));
            if (section) sections.push({ link: link, section: section });
        });
        if (!sections.length || !("IntersectionObserver" in window)) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    var match = sections.find(function (s) {
                        return s.section === entry.target;
                    });
                    if (!match) return;
                    if (entry.isIntersecting) {
                        links.forEach(function (l) {
                            l.classList.remove("is-active");
                        });
                        match.link.classList.add("is-active");
                    }
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        sections.forEach(function (s) {
            observer.observe(s.section);
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initMobileNav();
        initHeaderScrollState();
        initScrollReveal();
        initFaq();
        initVideoFallback();
        initHeroCanvas();
        initActiveNavLinks();
    });
})();
