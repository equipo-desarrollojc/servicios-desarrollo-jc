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

    /* ================= Animación del flujo de trabajo (5 pasos) ================= */
    function initFlowAnimation() {
        var flow = document.getElementById("flow");
        if (!flow) return;
        var steps = flow.querySelectorAll(".flow-step");

        if (prefersReducedMotion) {
            flow.style.setProperty("--flow-progress", 1);
            steps.forEach(function (step) {
                step.classList.add("is-active");
            });
            return;
        }

        var update = function () {
            var rect = flow.getBoundingClientRect();
            var viewportH = window.innerHeight;

            var start = viewportH * 0.8;
            var end = viewportH * 0.45 - rect.height;
            var raw = (start - rect.top) / (start - end);
            var progress = Math.min(Math.max(raw, 0), 1);

            flow.style.setProperty("--flow-progress", progress.toFixed(4));

            steps.forEach(function (step, i) {
                var threshold = i === 0 ? 0.02 : i / (steps.length - 1) - 0.04;
                step.classList.toggle("is-active", progress >= threshold);
            });
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
    }

    /* ================= Modal del proceso con escenas animadas ================= */
    function initProcessModal() {
        var modal = document.getElementById("processModal");
        if (!modal) return;

        var steps = document.querySelectorAll(".flow-step");
        var scenes = modal.querySelectorAll(".pm-scene");
        var titleEl = document.getElementById("pmTitle");
        var labelEl = document.getElementById("pmStepLabel");
        var descEl = document.getElementById("pmDesc");
        var prevBtn = document.getElementById("pmPrev");
        var nextBtn = document.getElementById("pmNext");
        var closeEls = modal.querySelectorAll("[data-pm-close]");
        var current = 0;
        var lastFocus = null;

        function show(index) {
            current = (index + scenes.length) % scenes.length;

            scenes.forEach(function (scene) {
                scene.classList.remove("is-current");
            });

            var scene = scenes[current];
            void scene.getBoundingClientRect();
            scene.classList.add("is-current");

            titleEl.textContent = scene.dataset.title;
            labelEl.textContent = "Paso " + (current + 1) + " de " + scenes.length;
            descEl.textContent = scene.dataset.desc;
            prevBtn.disabled = current === 0;
            nextBtn.textContent = "";
            if (current === scenes.length - 1) {
                nextBtn.insertAdjacentText("afterbegin", "Volver al inicio ");
            } else {
                nextBtn.insertAdjacentText("afterbegin", "Siguiente ");
            }
            nextBtn.insertAdjacentHTML("beforeend", '<i class="ti ti-chevron-right" aria-hidden="true"></i>');
        }

        function open(index) {
            lastFocus = document.activeElement;
            modal.hidden = false;
            modal.classList.add("is-open");
            document.body.classList.add("pm-open");
            show(index);
            modal.querySelector(".pm__close").focus();
        }

        function close() {
            modal.classList.remove("is-open");
            modal.hidden = true;
            document.body.classList.remove("pm-open");
            scenes.forEach(function (scene) {
                scene.classList.remove("is-current");
            });
            if (lastFocus) lastFocus.focus();
        }

        steps.forEach(function (stepEl, i) {
            stepEl.setAttribute("role", "button");
            stepEl.setAttribute("tabindex", "0");
            stepEl.addEventListener("click", function () {
                open(i);
            });
            stepEl.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open(i);
                }
            });
        });

        closeEls.forEach(function (el) {
            el.addEventListener("click", close);
        });

        prevBtn.addEventListener("click", function () {
            if (current > 0) show(current - 1);
        });

        nextBtn.addEventListener("click", function () {
            show(current + 1);
        });

        document.addEventListener("keydown", function (e) {
            if (!modal.classList.contains("is-open")) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") show(current + 1);
            if (e.key === "ArrowLeft" && current > 0) show(current - 1);
        });
    }

    /* ================= Hero: globo de partículas 3D reactivo al puntero ================= */
    function initHeroCanvas() {
        var canvas = document.getElementById("heroCanvas");
        if (!canvas) return;
        var ctx = canvas.getContext("2d");

        var hero = canvas.closest(".hero");
        var width, height, dpr, cx, cy, radius;
        var points = [];
        var links = [];
        var projected = [];
        var rafId = null;

        var POINT_COUNT = 240;
        var LINK_NEIGHBORS = 3;
        var FOV = 2.4;

        var rotY = 0;
        var tiltX = -0.35;
        var targetTiltX = -0.35;
        var speedY = 0.0032;
        var targetSpeedY = 0.0032;

        var colors = ["79, 140, 255", "79, 140, 255", "110, 120, 250", "168, 85, 247", "255, 77, 126"];

        function buildSphere() {
            points = [];
            var golden = Math.PI * (3 - Math.sqrt(5));
            for (var i = 0; i < POINT_COUNT; i++) {
                var t = i / (POINT_COUNT - 1);
                var y = 1 - t * 2;
                var r = Math.sqrt(Math.max(0, 1 - y * y));
                var theta = golden * i;
                points.push({
                    x: Math.cos(theta) * r,
                    y: y,
                    z: Math.sin(theta) * r,
                    size: 1.5 + Math.random() * 2.1,
                    twinkle: Math.random() * Math.PI * 2,
                    color: colors[(Math.random() * colors.length) | 0],
                });
            }

            links = [];
            var seen = {};
            for (var a = 0; a < points.length; a++) {
                var dists = [];
                for (var b = 0; b < points.length; b++) {
                    if (a === b) continue;
                    var dx = points[a].x - points[b].x;
                    var dy = points[a].y - points[b].y;
                    var dz = points[a].z - points[b].z;
                    dists.push({ b: b, d: dx * dx + dy * dy + dz * dz });
                }
                dists.sort(function (m, n) { return m.d - n.d; });
                for (var k = 0; k < LINK_NEIGHBORS; k++) {
                    var other = dists[k].b;
                    var key = Math.min(a, other) + "-" + Math.max(a, other);
                    if (!seen[key]) {
                        seen[key] = true;
                        links.push([a, other]);
                    }
                }
            }
        }

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

            cx = width * 0.5;
            cy = height * 0.47;
            radius = Math.max(Math.min(width * 0.36, height * 0.44), 170);
        }

        function drawGlow() {
            var glow = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.6);
            glow.addColorStop(0, "rgba(79, 140, 255, 0.14)");
            glow.addColorStop(0.55, "rgba(120, 90, 240, 0.07)");
            glow.addColorStop(1, "rgba(5, 6, 11, 0)");
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, width, height);
        }

        function step(now) {
            ctx.clearRect(0, 0, width, height);
            drawGlow();

            speedY += (targetSpeedY - speedY) * 0.04;
            tiltX += (targetTiltX - tiltX) * 0.06;
            rotY += speedY;

            var cosY = Math.cos(rotY), sinY = Math.sin(rotY);
            var cosT = Math.cos(tiltX), sinT = Math.sin(tiltX);
            var globeScale = radius / 320;

            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                var x1 = p.x * cosY + p.z * sinY;
                var z1 = -p.x * sinY + p.z * cosY;
                var y1 = p.y * cosT - z1 * sinT;
                var z2 = p.y * sinT + z1 * cosT;

                var pers = FOV / (FOV + z2);
                var depth = (z2 + 1) / 2;
                var alpha = 0.2 + depth * 0.8;
                alpha *= 0.82 + 0.18 * Math.sin(now * 0.0022 + p.twinkle);

                projected[i] = {
                    sx: cx + x1 * radius * pers,
                    sy: cy + y1 * radius * pers,
                    size: p.size * (0.55 + depth * 1.05) * globeScale,
                    alpha: alpha,
                    depth: depth,
                    color: p.color,
                };
            }

            for (var l = 0; l < links.length; l++) {
                var pa = projected[links[l][0]];
                var pb = projected[links[l][1]];
                var avg = (pa.depth + pb.depth) / 2;
                ctx.beginPath();
                ctx.moveTo(pa.sx, pa.sy);
                ctx.lineTo(pb.sx, pb.sy);
                ctx.strokeStyle = "rgba(125, 155, 230, " + (0.04 + avg * 0.3).toFixed(3) + ")";
                ctx.lineWidth = 0.6 + avg * 0.9;
                ctx.stroke();
            }

            for (var j = 0; j < projected.length; j++) {
                var q = projected[j];

                ctx.beginPath();
                ctx.arc(q.sx, q.sy, q.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(" + q.color + ", " + (q.alpha * 0.14).toFixed(3) + ")";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(q.sx, q.sy, q.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(" + q.color + ", " + q.alpha.toFixed(3) + ")";
                ctx.fill();
            }

            rafId = requestAnimationFrame(step);
        }

        function onPointerMove(e) {
            var rect = hero.getBoundingClientRect();
            var nx = (e.clientX - rect.left) / rect.width - 0.5;
            var ny = (e.clientY - rect.top) / rect.height - 0.5;
            targetSpeedY = 0.0032 + nx * 0.007;
            targetTiltX = -0.35 + ny * 0.55;
        }

        function onPointerLeave() {
            targetSpeedY = 0.0032;
            targetTiltX = -0.35;
        }

        buildSphere();
        resize();

        if (prefersReducedMotion) {
            step(0);
            cancelAnimationFrame(rafId);
        } else {
            rafId = requestAnimationFrame(step);
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
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(step);
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
        initFlowAnimation();
        initProcessModal();
        initHeroCanvas();
        initActiveNavLinks();
    });
})();
