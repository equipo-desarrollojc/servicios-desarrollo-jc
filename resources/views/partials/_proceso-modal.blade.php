<div class="pm" id="processModal" role="dialog" aria-modal="true" aria-labelledby="pmTitle" hidden>
    <div class="pm__overlay" data-pm-close></div>

    <div class="pm__dialog">
        <header class="pm__header">
            <div>
                <span class="pm__step-label" id="pmStepLabel">Paso 1 de 5</span>
                <h3 class="pm__title" id="pmTitle">Nos contactas</h3>
            </div>
            <button class="pm__close" type="button" data-pm-close aria-label="Cerrar">
                <i class="ti ti-x" aria-hidden="true"></i>
            </button>
        </header>

        <div class="pm__stage">
            {{-- ============ ESCENA 1: cliente llena el formulario, el desarrollador lo recibe ============ --}}
            <svg class="pm-scene" viewBox="0 0 560 300" data-title="Nos contactas"
                 data-desc="Llenas el formulario o nos escribes por WhatsApp, y tu mensaje nos llega al instante.">
                {{-- cliente --}}
                <circle cx="105" cy="76" r="17" fill="#dfe6f5"/>
                <rect x="82" y="98" width="46" height="54" rx="15" fill="#ff4d7e"/>
                {{-- formulario --}}
                <rect x="62" y="168" width="166" height="100" rx="12" fill="#10141f" stroke="#2a3350"/>
                <rect x="80" y="188" width="130" height="8" rx="4" fill="#232b42"/>
                <rect x="80" y="210" width="130" height="8" rx="4" fill="#232b42"/>
                <rect x="80" y="232" width="92" height="8" rx="4" fill="#232b42"/>
                <rect class="s1-line s1-line1" x="80" y="188" width="130" height="8" rx="4" fill="#4f8cff"/>
                <rect class="s1-line s1-line2" x="80" y="210" width="130" height="8" rx="4" fill="#4f8cff"/>
                <rect class="s1-line s1-line3" x="80" y="232" width="92" height="8" rx="4" fill="#4f8cff"/>
                {{-- mensaje volando --}}
                <g class="s1-plane">
                    <path d="M0 0 L30 9 L0 18 L7 9 Z" fill="#a855f7"/>
                </g>
                {{-- desarrollador --}}
                <circle cx="452" cy="118" r="17" fill="#dfe6f5"/>
                <rect x="429" y="140" width="46" height="54" rx="15" fill="#4f8cff"/>
                {{-- laptop --}}
                <rect x="408" y="198" width="94" height="58" rx="8" fill="#10141f" stroke="#2a3350"/>
                <rect x="420" y="212" width="70" height="6" rx="3" fill="#232b42"/>
                <rect x="420" y="226" width="52" height="6" rx="3" fill="#232b42"/>
                <rect x="396" y="256" width="118" height="9" rx="4" fill="#232b42"/>
                {{-- notificación --}}
                <circle class="s1-ring" cx="502" cy="190" r="13" fill="none" stroke="#ff4d7e" stroke-width="2"/>
                <g class="s1-notif">
                    <circle cx="502" cy="190" r="13" fill="#ff4d7e"/>
                    <circle cx="502" cy="190" r="4.5" fill="#fff"/>
                </g>
            </svg>

            {{-- ============ ESCENA 2: ideas y definición del diseño con el cliente ============ --}}
            <svg class="pm-scene" viewBox="0 0 560 300" data-title="Planificamos juntos"
                 data-desc="Conversamos contigo, proponemos ideas y definimos juntos el diseño y el alcance.">
                {{-- cliente --}}
                <circle cx="95" cy="120" r="17" fill="#dfe6f5"/>
                <rect x="72" y="142" width="46" height="60" rx="15" fill="#ff4d7e"/>
                {{-- desarrollador --}}
                <circle cx="465" cy="120" r="17" fill="#dfe6f5"/>
                <rect x="442" y="142" width="46" height="60" rx="15" fill="#4f8cff"/>
                {{-- burbuja del cliente --}}
                <g class="s2-buba">
                    <rect x="130" y="58" width="96" height="46" rx="14" fill="#161b29" stroke="#ff4d7e"/>
                    <path d="M142 104 L134 120 L158 104 Z" fill="#161b29" stroke="#ff4d7e"/>
                    <circle class="s2-dot" cx="160" cy="81" r="4.5" fill="#ff4d7e"/>
                    <circle class="s2-dot" cx="178" cy="81" r="4.5" fill="#ff4d7e" style="animation-delay: .15s"/>
                    <circle class="s2-dot" cx="196" cy="81" r="4.5" fill="#ff4d7e" style="animation-delay: .3s"/>
                </g>
                {{-- burbuja del desarrollador --}}
                <g class="s2-bubb">
                    <rect x="334" y="58" width="96" height="46" rx="14" fill="#161b29" stroke="#4f8cff"/>
                    <path d="M418 104 L426 120 L402 104 Z" fill="#161b29" stroke="#4f8cff"/>
                    <circle class="s2-dotb" cx="364" cy="81" r="4.5" fill="#4f8cff"/>
                    <circle class="s2-dotb" cx="382" cy="81" r="4.5" fill="#4f8cff" style="animation-delay: .15s"/>
                    <circle class="s2-dotb" cx="400" cy="81" r="4.5" fill="#4f8cff" style="animation-delay: .3s"/>
                </g>
                {{-- foco de idea --}}
                <g class="s2-bulbwrap">
                    <circle class="s2-halo" cx="465" cy="46" r="22" fill="#ffd166"/>
                    <circle class="s2-bulb" cx="465" cy="46" r="11" fill="#232b42"/>
                    <rect x="461" y="58" width="8" height="6" rx="2" fill="#232b42"/>
                    <g class="s2-rays" stroke="#ffd166" stroke-width="2.5" stroke-linecap="round">
                        <line x1="465" y1="24" x2="465" y2="16"/>
                        <line x1="484" y1="32" x2="490" y2="26"/>
                        <line x1="446" y1="32" x2="440" y2="26"/>
                        <line x1="488" y1="46" x2="496" y2="46"/>
                    </g>
                </g>
                {{-- boceto del diseño --}}
                <rect x="220" y="164" width="120" height="96" rx="10" fill="#10141f" stroke="#2a3350"/>
                <rect class="s2-wire s2-wire1" x="232" y="176" width="96" height="12" rx="4" fill="#4f8cff"/>
                <rect class="s2-wire s2-wire2" x="232" y="196" width="44" height="50" rx="4" fill="#232b42"/>
                <rect class="s2-wire s2-wire3" x="284" y="196" width="44" height="50" rx="4" fill="#a855f7" opacity="0.7"/>
            </svg>

            {{-- ============ ESCENA 3: el desarrollador trabaja en el proyecto ============ --}}
            <svg class="pm-scene" viewBox="0 0 560 300" data-title="Desarrollamos"
                 data-desc="Manos a la obra: construimos tu proyecto línea por línea y te compartimos cada avance.">
                {{-- monitor --}}
                <rect x="130" y="58" width="230" height="150" rx="12" fill="#10141f" stroke="#2a3350"/>
                <rect x="235" y="208" width="20" height="18" fill="#232b42"/>
                <rect x="205" y="226" width="80" height="9" rx="4" fill="#232b42"/>
                {{-- líneas de código --}}
                <rect class="s3-code s3-c1" x="150" y="78" width="150" height="9" rx="4" fill="#4f8cff"/>
                <rect class="s3-code s3-c2" x="166" y="98" width="120" height="9" rx="4" fill="#a855f7"/>
                <rect class="s3-code s3-c3" x="166" y="118" width="160" height="9" rx="4" fill="#96a0b5"/>
                <rect class="s3-code s3-c4" x="150" y="138" width="100" height="9" rx="4" fill="#ff4d7e"/>
                <rect class="s3-code s3-c5" x="166" y="158" width="140" height="9" rx="4" fill="#4f8cff"/>
                <rect class="s3-cursor" x="150" y="178" width="12" height="10" fill="#f4f6fb"/>
                {{-- desarrollador --}}
                <circle cx="435" cy="120" r="17" fill="#dfe6f5"/>
                <g class="s3-dev">
                    <rect x="412" y="142" width="46" height="58" rx="15" fill="#4f8cff"/>
                    <rect x="398" y="168" width="30" height="10" rx="5" fill="#4f8cff" transform="rotate(-18 398 168)"/>
                </g>
                {{-- café --}}
                <rect x="86" y="238" width="26" height="22" rx="4" fill="#232b42"/>
                <path d="M112 244 q10 3 0 10" fill="none" stroke="#232b42" stroke-width="3"/>
                <path class="s3-steam s3-st1" d="M94 232 q3 -6 0 -12" fill="none" stroke="#96a0b5" stroke-width="2" stroke-linecap="round"/>
                <path class="s3-steam s3-st2" d="M103 232 q-3 -6 0 -12" fill="none" stroke="#96a0b5" stroke-width="2" stroke-linecap="round"/>
                {{-- barra de progreso --}}
                <rect x="130" y="266" width="230" height="8" rx="4" fill="#232b42"/>
                <rect class="s3-progress" x="130" y="266" width="230" height="8" rx="4" fill="url(#s3grad)"/>
                <defs>
                    <linearGradient id="s3grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stop-color="#4f8cff"/>
                        <stop offset="1" stop-color="#a855f7"/>
                    </linearGradient>
                </defs>
            </svg>

            {{-- ============ ESCENA 4: primera presentación, el cliente pide cambios ============ --}}
            <svg class="pm-scene" viewBox="0 0 560 300" data-title="Te lo presentamos"
                 data-desc="Te mostramos la primera versión funcionando y tomamos nota de tus cambios.">
                {{-- pantalla de presentación --}}
                <rect x="120" y="52" width="240" height="164" rx="12" fill="#10141f" stroke="#2a3350"/>
                <rect x="240" y="216" width="20" height="16" fill="#232b42"/>
                <rect x="180" y="232" width="120" height="9" rx="4" fill="#232b42"/>
                <rect x="136" y="66" width="208" height="16" rx="5" fill="#232b42"/>
                <rect x="136" y="92" width="208" height="52" rx="6" fill="#4f8cff" opacity="0.85"/>
                <rect x="136" y="154" width="98" height="48" rx="6" fill="#232b42"/>
                <rect x="246" y="154" width="98" height="48" rx="6" fill="#232b42"/>
                {{-- desarrollador presentando --}}
                <circle cx="66" cy="120" r="16" fill="#dfe6f5"/>
                <rect x="44" y="140" width="44" height="56" rx="14" fill="#4f8cff"/>
                <rect x="80" y="146" width="34" height="10" rx="5" fill="#4f8cff" transform="rotate(-24 80 146)"/>
                {{-- cliente --}}
                <circle cx="475" cy="120" r="17" fill="#dfe6f5"/>
                <rect x="452" y="142" width="46" height="58" rx="15" fill="#ff4d7e"/>
                {{-- burbuja pidiendo cambios --}}
                <g class="s4-bub">
                    <rect x="404" y="56" width="92" height="44" rx="13" fill="#161b29" stroke="#ff9f43"/>
                    <path d="M478 100 L488 116 L462 100 Z" fill="#161b29" stroke="#ff9f43"/>
                    <path d="M425 88 L444 66 L452 73 L433 95 L423 97 Z" fill="#ff9f43"/>
                </g>
                {{-- marcadores de cambios sobre la pantalla --}}
                <g class="s4-mark s4-m1">
                    <circle cx="190" cy="112" r="10" fill="#ff9f43"/>
                    <circle cx="190" cy="112" r="3.5" fill="#0b0f1a"/>
                </g>
                <g class="s4-mark s4-m2">
                    <circle cx="300" cy="130" r="10" fill="#ff9f43"/>
                    <circle cx="300" cy="130" r="3.5" fill="#0b0f1a"/>
                </g>
                <g class="s4-mark s4-m3">
                    <circle cx="270" cy="178" r="10" fill="#ff9f43"/>
                    <circle cx="270" cy="178" r="3.5" fill="#0b0f1a"/>
                </g>
            </svg>

            {{-- ============ ESCENA 5: ajustes, nueva presentación y visto bueno ============ --}}
            <svg class="pm-scene" viewBox="0 0 560 300" data-title="Ajustes y visto bueno"
                 data-desc="Aplicamos tus cambios, te lo volvemos a presentar y, con tu aprobación, ¡tu proyecto se lanza!">
                {{-- pantalla --}}
                <rect class="s5-glow" x="150" y="52" width="240" height="164" rx="12" fill="#10141f" stroke="#2a3350" stroke-width="2"/>
                <rect x="270" y="216" width="20" height="16" fill="#232b42"/>
                <rect x="210" y="232" width="120" height="9" rx="4" fill="#232b42"/>
                <g class="s5-content">
                    <rect x="166" y="66" width="208" height="16" rx="5" fill="#232b42"/>
                    <rect x="166" y="92" width="208" height="52" rx="6" fill="#4f8cff" opacity="0.85"/>
                    <rect x="166" y="154" width="98" height="48" rx="6" fill="#232b42"/>
                    <rect x="276" y="154" width="98" height="48" rx="6" fill="#232b42"/>
                </g>
                {{-- marcadores que se corrigen --}}
                <g class="s5-mark s5-m1">
                    <circle cx="220" cy="112" r="10"/>
                    <path d="M215 112 l4 4 l7 -8" fill="none" stroke="#0b0f1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <g class="s5-mark s5-m2">
                    <circle cx="330" cy="130" r="10"/>
                    <path d="M325 130 l4 4 l7 -8" fill="none" stroke="#0b0f1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <g class="s5-mark s5-m3">
                    <circle cx="300" cy="178" r="10"/>
                    <path d="M295 178 l4 4 l7 -8" fill="none" stroke="#0b0f1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                {{-- desarrollador con herramienta --}}
                <circle cx="80" cy="120" r="16" fill="#dfe6f5"/>
                <rect x="58" y="140" width="44" height="56" rx="14" fill="#4f8cff"/>
                <g class="s5-wrench">
                    <path d="M108 150 a11 11 0 1 0 8 18 l16 14 6 -7 -16 -14 a11 11 0 0 0 -14 -11 z" fill="#96a0b5"/>
                </g>
                {{-- cliente --}}
                <circle cx="490" cy="120" r="17" fill="#dfe6f5"/>
                <rect x="467" y="142" width="46" height="58" rx="15" fill="#ff4d7e"/>
                {{-- pulgar arriba del cliente --}}
                <g class="s5-thumb">
                    <circle cx="490" cy="66" r="20" fill="#161b29" stroke="#22c55e"/>
                    <path d="M482 68 v8 h5 v-8 z M488 76 h10 q4 0 4 -4 l-1 -6 q0 -3 -3 -3 h-5 l1 -5 q0 -3 -3 -3 l-4 8 v13 z"
                          fill="#22c55e" transform="translate(0 -4)"/>
                </g>
                {{-- sello de aprobado --}}
                <g class="s5-check">
                    <circle cx="270" cy="128" r="27" fill="rgba(34,197,94,0.12)" stroke="#22c55e" stroke-width="3"/>
                    <path class="s5-check-path" d="M256 128 l10 10 l19 -21" fill="none" stroke="#22c55e" stroke-width="5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                {{-- confeti --}}
                <g class="s5-confetti">
                    <rect class="s5-cf s5-cf1" x="210" y="60" width="7" height="7" rx="1" fill="#4f8cff"/>
                    <circle class="s5-cf s5-cf2" cx="250" cy="52" r="4" fill="#ff4d7e"/>
                    <rect class="s5-cf s5-cf3" x="290" y="56" width="7" height="7" rx="1" fill="#ffd166"/>
                    <circle class="s5-cf s5-cf4" cx="330" cy="50" r="4" fill="#a855f7"/>
                    <rect class="s5-cf s5-cf5" x="360" y="62" width="7" height="7" rx="1" fill="#22c55e"/>
                    <circle class="s5-cf s5-cf6" cx="190" cy="54" r="4" fill="#ffd166"/>
                </g>
            </svg>
        </div>

        <footer class="pm__footer">
            <p class="pm__desc" id="pmDesc"></p>
            <div class="pm__nav">
                <button class="btn btn--ghost btn--sm" type="button" id="pmPrev">
                    <i class="ti ti-chevron-left" aria-hidden="true"></i>
                    Anterior
                </button>
                <button class="btn btn--primary btn--sm" type="button" id="pmNext">
                    Siguiente
                    <i class="ti ti-chevron-right" aria-hidden="true"></i>
                </button>
            </div>
        </footer>
    </div>
</div>
