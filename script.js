// ══ CONFIG — CHANGE THESE ══
const PASSWORD = '061422'; // change to your secret word

// Quiz questions per year — change the text and mark correct:true on the right answer
const YQ = {
    '2023': [
        {
            q: 'Where did we have our first date? 🍽',
            opts: [
                { t: 'The Mall', c: false },
                { t: 'Local diner', c: true },
                { t: 'A coffee shop', c: false },
                { t: 'The park', c: false }
            ]
        },
        {
            q: 'What first gift that i gave you? 🎁',
            opts: [
                { t: 'Ring', c: false },
                { t: 'Stuffed Toy', c: true },
                { t: 'Necklace', c: false },
                { t: 'Watch', c: false }
            ]
        },
        {
            q: 'What was the date we became official? ♥',
            opts: [
                { t: 'January 21, 2023', c: false },
                { t: 'July 17, 2022', c: false },
                { t: 'June 14, 2022', c: true },
                { t: 'December 31, 2023', c: false }
            ]
        }
    ],

    '2024': [
        {
            q: 'What is our favorite restaurant? 🍜',
            opts: [
                { t: 'Jollibee', c: false },
                { t: 'Inasal', c: true },
                { t: 'Greenwich', c: false },
                { t: 'Mcdo', c: false }
            ]
        },
        {
            q: 'What nickname do i call you most often? 😘',
            opts: [
                { t: 'Bebe', c: true },
                { t: 'Love', c: false },
                { t: 'Wife', c: false },
                { t: 'Bading', c: false }
            ]
        },
        {
            q: 'What is my favorite thing you do for me? 💛',
            opts: [
                { t: 'Listen to my problems', c: false },
                { t: 'Make me laugh', c: false },
                { t: 'Cook for me', c: false },
                { t: 'Make me angry', c: true }
            ]
        }
    ],

    '2025': [
        {
            q: 'Where did we go on our first trip together? ✈',
            opts: [
                { t: 'Manila', c: false },
                { t: 'Baguio', c: true },
                { t: 'Cuyapo', c: false },
                { t: 'Switzerland', c: false }
            ]
        },
        {
            q: 'What song always reminds me of you? 🎵',
            opts: [
                { t: 'Palagi by Tj Monterde', c: false },
                { t: 'Birds of a feather', c: false },
                { t: 'Constant by Jeremy Passion', c: true },
                { t: 'Since Day One by Skusta Clee', c: false }
            ]
        },
        {
            q: 'What is something I always order when we eat out? 🍟',
            opts: [
                { t: 'Fries', c: true },
                { t: 'Burgers', c: false },
                { t: 'Pizza', c: false },
                { t: 'Ice Cream', c: false }
            ]
        }
    ],

    '2026': [
        {
            q: 'What is my favorite thing to do with you? ❤️',
            opts: [
                { t: 'Listen to music together', c: false },
                { t: 'Watch movies', c: false },
                { t: 'Cook together', c: false },
                { t: 'Eat together', c: true }
            ]
        },
        {
            q: 'What is one thing I always miss when we\'re apart? 💭',
            opts: [
                { t: 'Your hugs', c: false },
                { t: 'Your kisses', c: false },
                { t: 'Your voice', c: false },
                { t: 'All of you', c: true }
            ]
        },
        {
            q: 'How many years have we been together? ♥',
            opts: [
                { t: '2 years', c: false },
                { t: '3 years', c: false },
                { t: '4 years', c: true },
                { t: '5 years', c: false }
            ]
        }
    ]

   
};

// ── PARTICLES ──
const pc = document.getElementById('pts');

for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');

    p.className = 'pt';

    p.style.cssText = `
        left:${Math.random() * 100}%;
        animation-duration:${8 + Math.random() * 12}s;
        animation-delay:${Math.random() * 10}s;
        width:${1 + Math.random() * 2}px;
        height:${1 + Math.random() * 2}px
    `;

    pc.appendChild(p);
}

// ── LOGIN ──
document.getElementById('pwd').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        doLogin();
    }
});

const UNLOCK_DATE = new Date('2026-06-14T00:00:00');

function showScreen(id) {
    ['lp', 'cdp', 'lsmp', 'ap'].forEach(function(s) {
        document.getElementById(s).classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

function doLogin() {
    const typed = document.getElementById('pwd').value.trim().toLowerCase();

    if (typed === PASSWORD) {
        const now = new Date();

        if (now >= UNLOCK_DATE) {
            const lsmSeen = sessionStorage.getItem('lsmSeen');

            if (!lsmSeen) {
                showScreen('lsmp');
            } else {
                openApp();
            }
        } else {
            showScreen('cdp');
            startLoginCountdown();
        }

    } else {
        const e = document.getElementById('lerr');
        e.textContent = "Hmm, that's not right. Try again po, my bebe!";
        document.getElementById('pwd').value = '';

        setTimeout(() => {
            e.textContent = '';
        }, 3000);
    }
}

function startLoginCountdown() {
    updateLoginCD();
    const t = setInterval(function() {
        const now = new Date();
        if (now >= UNLOCK_DATE) {
            clearInterval(t);
            showScreen('lsmp');
        } else {
            updateLoginCD();
        }
    }, 1000);
}

function updateLoginCD() {
    const now = new Date();
    const diff = UNLOCK_DATE - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('lcd-d').textContent = String(d).padStart(2,'0');
    document.getElementById('lcd-h').textContent = String(h).padStart(2,'0');
    document.getElementById('lcd-m').textContent = String(m).padStart(2,'0');
    document.getElementById('lcd-s').textContent = String(s).padStart(2,'0');
}

function doLogout() {
    stopAllA();
    showScreen('lp');
    document.getElementById('pwd').value = '';
    sessionStorage.removeItem('lsmSeen');
}

// ── TABS ──
function switchTab(t, b) {
    document.querySelectorAll('.tbtn').forEach(x => {
        x.classList.remove('active');
    });

    document.querySelectorAll('.tc').forEach(x => {
        x.classList.remove('active');
    });

    b.classList.add('active');

    document.getElementById('tab-' + t)
        .classList.add('active');
}

// ── ACCORDION ──
function toggleY(yr) {
    const b = document.getElementById('yb-' + yr);
    const o = b.classList.contains('open');

    document.querySelectorAll('.yblk').forEach(x => {
        x.classList.remove('open');
    });

    if (!o) {
        b.classList.add('open');
    }
}
// ── YEAR QUIZZES ──
const ystate = {};

function initYQ() {
    ['2023', '2024', '2025', '2026'].forEach(yr => {
        ystate[yr] = {
            qi: 0,
            score: 0,
            done: false
        };

        renderYQ(yr);
    });
}

function renderYQ(yr) {
    const st = ystate[yr];
    const qs = YQ[yr];
    const q = qs[st.qi];
    const tot = qs.length;

    document.getElementById('qgp-' + yr).style.width =
        (st.score / tot * 100) + '%';

    let h =
        `<div class="qqt">Q${st.qi + 1} of ${tot}: ${q.q}</div>` +
        `<div class="qopts">`;

    q.opts.forEach((o, i) => {
        h +=
            `<button class="qopt" onclick="yana('${yr}',${i},${o.c})">` +
            `${o.t}` +
            `</button>`;
    });

    h += `</div><div class="qfb" id="yfb-${yr}"></div>`;

    if (st.qi > 0) {
        h += `
            <div class="qnav">
                <button
                    class="qnbtn"
                    onclick="ynav('${yr}',-1)"
                >
                    ‹ Back
                </button>
                <span></span>
            </div>
        `;
    }

    document.getElementById('qgc-' + yr).innerHTML = h;
}

function yana(yr, oi, ok) {
    const st = ystate[yr];

    if (st.done) {
        return;
    }

    st.done = true;

    const qs = YQ[yr];
    const tot = qs.length;

    const opts = document.querySelectorAll(
        `#qgc-${yr} .qopt`
    );

    opts.forEach(o => {
        o.disabled = true;
    });

    // Only highlight chosen answer, never reveal correct one
    opts[oi].classList.add(ok ? 'ok' : 'bad');

    if (ok) {
        st.score++;
    }

    document.getElementById('yfb-' + yr).textContent =
        ok
            ? 'Correct! ♥'
            : 'Hmm, not quite! ♥';

    document.getElementById('qgp-' + yr).style.width =
        ((st.score / tot) * 100) + '%';

    const c = document.getElementById('qgc-' + yr);

    let nav = c.querySelector('.qnav');

    if (!nav) {
        nav = document.createElement('div');
        nav.className = 'qnav';

        c.appendChild(nav);
    }

    if (st.qi === tot - 1) {
        // Last question — check if perfect
        setTimeout(() => {
            if (st.score === tot) {
                doUnlock(yr);
            } else {
                document.getElementById(
                    'qgc-' + yr
                ).innerHTML = `
                    <div style="text-align:center;padding:.75rem 0">
                        <div style="font-size:22px;margin-bottom:.5rem">
                            😅
                        </div>

                        <div style="font-size:14px;color:var(--cream);margin-bottom:.25rem">
                            You got
                            <strong style="color:var(--gold)">
                                ${st.score}/${tot}
                            </strong>
                            — need a perfect score to unlock!
                        </div>

                        <div style="font-size:12px;color:var(--muted);margin-bottom:.85rem">
                            Think harder, you know us! ♥
                        </div>

                        <button
                            class="unlockbtn"
                            onclick="retryYQ('${yr}')"
                        >
                            Try Again 🔄
                        </button>
                    </div>
                `;
            }
        }, 700);
    } else {
        // Not last — just show Next
        nav.innerHTML = `
            <span></span>
            <button
                class="qnbtn"
                onclick="ynav('${yr}',1)"
            >
                Next ›
            </button>
        `;
    }
}

function ynav(yr, d) {
    const st = ystate[yr];

    st.qi = Math.max(
        0,
        Math.min(
            YQ[yr].length - 1,
            st.qi + d
        )
    );

    st.done = false;

    renderYQ(yr);
}

function retryYQ(yr) {
    ystate[yr] = {
        qi: 0,
        score: 0,
        done: false
    };

    renderYQ(yr);
}

function doUnlock(yr) {
    document.getElementById('lkb-' + yr).textContent =
        '🔓 Unlocked!';

    document.getElementById('ys-' + yr).textContent =
        'Photos unlocked ♥';

    document.getElementById('qg-' + yr).style.display =
        'none';

    document.getElementById('pg-' + yr).style.display =
        'grid';

    document.getElementById('yb-' + yr).style.borderColor =
        'rgba(201,149,106,0.4)';

    injectDelButtons(yr);

    toast('Year ' + yr + ' unlocked! ♥');
}


// ── LIGHTBOX ──
let lbImgs = [];
let lbI = 0;
let lbYr = '';

let tsX = 0;
let tsY = 0;

function openLB(card, yr) {
    const img = card.querySelector('img');

    if (!img) {
        toast('Add your real photo to see it here!');
        return;
    }

    lbYr = yr;

    const grid = document.getElementById('pg-' + yr);

    // Collect only cards that have a real image
    const allCards = [
        ...grid.querySelectorAll('.pcard')
    ];

    lbImgs = allCards
        .filter(c => c.querySelector('img'))
        .map(c => ({
            src: c.querySelector('img').src,
            cap: c.dataset.cap || ''
        }));

    lbI = lbImgs.findIndex(i => i.src === img.src);

    if (lbI < 0) {
        lbI = 0;
    }

    showLBSlide();

    document.getElementById('lb')
        .classList.add('open');

    document.addEventListener('keydown', lbKey);
}

function showLBSlide() {
    const it = lbImgs[lbI];

    const im = document.getElementById('lbimg');

    im.style.opacity = '0';

    setTimeout(() => {
        im.src = it.src;
        im.style.opacity = '1';
    }, 150);

    document.getElementById('lbcap').textContent =
        it.cap;

    document.getElementById('lbcount').textContent =
        (lbI + 1) + ' / ' + lbImgs.length;

    document.getElementById('lbprev').disabled =
        lbI === 0;

    document.getElementById('lbnext').disabled =
        lbI === lbImgs.length - 1;
}

function lbgo(d) {
    lbI = Math.max(
        0,
        Math.min(
            lbImgs.length - 1,
            lbI + d
        )
    );

    showLBSlide();
}

function closeLB() {
    document.getElementById('lb')
        .classList.remove('open');

    document.removeEventListener(
        'keydown',
        lbKey
    );
}

function lbKey(e) {
    if (e.key === 'ArrowLeft') {
        lbgo(-1);
    } else if (e.key === 'ArrowRight') {
        lbgo(1);
    } else if (e.key === 'Escape') {
        closeLB();
    }
}

// Touch swipe
document.getElementById('lb').addEventListener(
    'touchstart',
    e => {
        tsX = e.touches[0].clientX;
        tsY = e.touches[0].clientY;
    },
    { passive: true }
);

document.getElementById('lb').addEventListener(
    'touchend',
    e => {
        const dx =
            e.changedTouches[0].clientX - tsX;

        const dy =
            e.changedTouches[0].clientY - tsY;

        if (
            Math.abs(dx) > Math.abs(dy) &&
            Math.abs(dx) > 40
        ) {
            lbgo(dx < 0 ? 1 : -1);
        } else if (
            Math.abs(dy) < 40 &&
            Math.abs(dx) < 20
        ) {
            closeLB();
        }
    }
);

// ── ADD PHOTOS ──
function triggerAdd(yr) {
    document.getElementById('fi-' + yr).click();
}

function addPhotos(yr, inp) {
    const grid =
        document.getElementById('pg-' + yr);

    const addBtn =
        grid.querySelector('.addpcard');

    Array.from(inp.files).forEach(f => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const cap =
                f.name.replace(/\.[^.]+$/, '');

            const c =
                document.createElement('div');

            c.className = 'pcard';
            c.dataset.cap = cap;
            c.dataset.yr = yr;

            const img =
                document.createElement('img');

            img.src = e.target.result;
            img.alt = cap;

            img.style.cssText =
                'width:100%;height:100%;object-fit:cover;display:block';

            const capDiv =
                document.createElement('div');

            capDiv.className = 'pcap';
            capDiv.textContent = cap;

            const delBtn =
                document.createElement('button');

            delBtn.className = 'pdel';
            delBtn.title = 'Delete photo';
            delBtn.innerHTML = '&times;';

            delBtn.onclick = function (ev) {
                ev.stopPropagation();

                if (
                    confirm(
                        'Remove this photo?'
                    )
                ) {
                    c.remove();

                    toast(
                        'Photo removed'
                    );
                }
            };

            c.appendChild(img);
            c.appendChild(capDiv);
            c.appendChild(delBtn);

            c.onclick = function (ev) {
                if (
                    !ev.target.classList.contains(
                        'pdel'
                    )
                ) {
                    openLB(this, yr);
                }
            };

            grid.insertBefore(
                c,
                addBtn
            );
        };

        reader.readAsDataURL(f);
    });

    inp.value = '';

    toast('Photos added! ♥');
}

function deleteCard(btn, ev) {
    ev.stopPropagation();

    if (confirm('Remove this photo?')) {
        btn.closest('.pcard').remove();

        toast('Photo removed');
    }
}

// ── INJECT DELETE BUTTONS into pre-existing hardcoded cards after unlock ──
function injectDelButtons(yr) {
    const grid =
        document.getElementById('pg-' + yr);

    if (!grid) {
        return;
    }

    grid.querySelectorAll('.pcard')
        .forEach(c => {
            if (c.querySelector('.pdel')) {
                return;
            }

            const delBtn =
                document.createElement('button');

            delBtn.className = 'pdel';
            delBtn.title = 'Delete photo';
            delBtn.innerHTML = '&times;';

            delBtn.onclick = function (ev) {
                ev.stopPropagation();

                if (
                    confirm(
                        'Remove this photo?'
                    )
                ) {
                    c.remove();

                    toast(
                        'Photo removed'
                    );
                }
            };

            c.appendChild(delBtn);
        });
}

// ── SPOTIFY-STYLE MUSIC PLAYER ──
const SP_TRACKS = [
    { id: 1, title: "Swear it again", sub: "Cover by Me ❤️", src: "Music/au1.mp3" },
    { id: 2, title: "Westlife", sub: "Cover by Me ❤️", src: "Music/au2.mp3" },
    { id: 3, title: "Back at one", sub: "Brian McKinight", src: "Music/au3.mp3" },
    { id: 4, title: "When She Loved Me", sub: "Sarah McLachlan", src: "Music/au4.mp3" },
    { id: 5, title: "All That I Need", sub: "Cover by Me ❤️", src: "Music/au5.mp3" },
    { id: 6, title: "Ikaw Lang Ang Aking Mahal", sub: "Cover by Me ❤️", src: "Music/au6.mp3" },
    { id: 7, title: "Ikaw Lamang", sub: "Cover by Me ❤️", src: "Music/au7.mp3" },
    { id: 8, title: "Palagi", sub: "Cover by Me ❤️", src: "Music/au8.mp3" },
    { id: 9, title: "Para Sa Akin", sub: "Cover by Me ❤️", src: "Music/au9.mp3" },
    { id: 10, title: "A Thousand Years", sub: "Cover by Me ❤️", src: "Music/au10.mp3" },
    { id: 11, title: "Sway", sub: "Cover by Me ❤️", src: "Music/au11.mp3" },
    { id: 12, title: "Tattoo", sub: "Cover by Me ❤️", src: "Music/au12.mp3" },
    { id: 13, title: "Sigurado", sub: "Cover by Me ❤️", src: "Music/au13.mp3" },

    { id: 14, title: "Babalik Sa'yo", sub: "Cover by Me ❤️", src: "Music/au14.mp3" },
    { id: 15, title: "Nasa Iyo Na Ang Lahat", sub: "Cover by Me ❤️", src: "Music/au15.mp3" },
    { id: 16, title: "Glimpse of Us", sub: "Cover by Me ❤️", src: "Music/au16.mp3" },
    { id: 17, title: "What Are We", sub: "Cover by Me ❤️", src: "Music/au17.mp3" },
    { id: 18, title: "Mahika", sub: "Cover by Me ❤️", src: "Music/au18.mp3" },
    { id: 19, title: "Back at One", sub: "Cover by Me ❤️", src: "Music/au19.mp3" },
    { id: 20, title: "You Are My Sunshine", sub: "Cover by Me ❤️", src: "Music/au20.mp3" },
    { id: 21, title: "Tulad Mo", sub: "Cover by Me ❤️", src: "Music/au21.mp3" },
    { id: 22, title: "Sundo", sub: "Cover by Me ❤️", src: "Music/au22.mp3" },
    { id: 23, title: "A Thousand Years", sub: "Cover by Me ❤️", src: "Music/au23.mp3" },

    { id: 24, title: "Until Death Do Us Part ", sub: "Cover by Me ❤️", src: "Music/au24.mp3" },
    { id: 25, title: "Cool-Off", sub: "Cover by Me ❤️", src: "Music/au25.mp3" },
    { id: 26, title: "Angel Baby", sub: "Cover by Me ❤️", src: "Music/au26.mp3" },
    { id: 27, title: "Somebody Out There", sub: "Cover by Me ❤️", src: "Music/au27.mp3" },
    { id: 28, title: "Akoy Sa'yo", sub: "Cover by Me ❤️", src: "Music/au28.mp3" },
    { id: 29, title: "They Don't Know About Us", sub: "Cover by Me ❤️", src: "Music/au29.mp3" },
    { id: 30, title: "Ang Wakas", sub: "Cover by Me ❤️", src: "Music/au30.mp3" },
    { id: 31, title: "Paninindigan Kita", sub: "Cover by Me ❤️", src: "Music/au31.mp3" },
    { id: 32, title: "Grown Old With You", sub: "Cover by Me ❤️", src: "Music/au32.mp3" },
    { id: 33, title: "Walang iba", sub: "Cover by Me ❤️", src: "Music/au33.mp3" },

    { id: 34, title: "Paniwalaan", sub: "Cover by Me ❤️", src: "Music/au34.mp3" },
    { id: 35, title: "You'll Be Safe Here", sub: "Cover by Me ❤️", src: "Music/au35.mp3" },
    { id: 36, title: "Sun And Moon", sub: "Cover by Me ❤️", src: "Music/au36.mp3" },
    { id: 37, title: "Biyahe", sub: "Cover by Me ❤️", src: "Music/au37.mp3" },
    { id: 38, title: "Bulong", sub: "Cover by Me ❤️", src: "Music/au38.mp3" },
    { id: 39, title: "YOUTH", sub: "Cover by Me ❤️", src: "Music/au39.mp3" },
    { id: 40, title: "The Only Exception", sub: "Cover by Me ❤️", src: "Music/au40.mp3" }
   
];


let spIdx = 0;
let spPlaying = false;
let spTimer = null;

function buildTrackList() {
    const list = document.getElementById('sp-list');

    list.innerHTML = '';

    SP_TRACKS.forEach((track, index) => {
        list.innerHTML += `
        <div class="sp-item ${index === 0 ? 'active' : ''}" id="spi-${track.id}" onclick="spGoto(${index})">
            <span class="sp-num">${track.id}</span>

            <div class="sp-item-info">
                <div class="sp-item-title">${track.title}</div>
                <div class="sp-item-sub">${track.sub}</div>
            </div>

            <span class="sp-item-eq" id="speq-${index}">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </span>
        </div>`;
    });
}
function spAudio() {
    return document.getElementById('a-' + SP_TRACKS[spIdx].id);
}

function spFmt(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + String(sec).padStart(2, '0');
}

function spUpdateUI() {
    const t = SP_TRACKS[spIdx];
    document.getElementById('sp-track').textContent = t.title;
    document.getElementById('sp-sub').textContent = t.sub;

    // Update track list highlight
    document.querySelectorAll('.sp-item').forEach((el, i) => {
        el.classList.toggle('active', i === spIdx);
        const num = el.querySelector('.sp-num');
        const eq = el.querySelector('.sp-item-eq');
        if (i === spIdx && spPlaying) {
            num.style.display = 'none';
            eq.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><rect x="4" y="4" width="4" height="16"/><rect x="10" y="8" width="4" height="12"/><rect x="16" y="2" width="4" height="18"/></svg>';
        } else {
            num.style.display = '';
            eq.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M8 5v14l11-7z"/></svg>';
        }
    });

    // Prev/Next buttons
    document.getElementById('sp-prev').disabled = spIdx === 0;
    document.getElementById('sp-next').disabled = spIdx === SP_TRACKS.length - 1;

    // Reset progress
    document.getElementById('sp-fill').style.width = '0%';
    document.getElementById('sp-thumb').style.left = '0%';
    document.getElementById('sp-cur').textContent = '0:00';
    document.getElementById('sp-dur').textContent = '0:00';
}

function spSetPlayUI(playing) {
    spPlaying = playing;
    const icon = document.getElementById('sp-icon');
    const disc = document.getElementById('sp-disc');
    if (playing) {
        icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
        disc.classList.add('spin');
    } else {
        icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        disc.classList.remove('spin');
    }
    buildTrackList();
    spUpdateUI();
}

function spStartTimer() {
    clearInterval(spTimer);
    spTimer = setInterval(() => {
        const a = spAudio();
        if (!a) return;
        if (a.duration) {
            const pct = (a.currentTime / a.duration) * 100;
            document.getElementById('sp-fill').style.width = pct + '%';
            document.getElementById('sp-thumb').style.left = pct + '%';
            document.getElementById('sp-cur').textContent = spFmt(a.currentTime);
            document.getElementById('sp-dur').textContent = spFmt(a.duration);
        }
        if (a.ended) {
            spSetPlayUI(false);
            clearInterval(spTimer);
            // Auto-advance to next track
            if (spIdx < SP_TRACKS.length - 1) {
                setTimeout(() => spNext(), 600);
            }
        }
    }, 300);
}

function spToggle() {
    const a = spAudio();
    if (!a) return;
    if (spPlaying) {
        // PAUSE only — do not reset
        a.pause();
        spSetPlayUI(false);
        clearInterval(spTimer);
    } else {
        a.play().catch(() => {
            toast('Add your MP3 to Music/au' + SP_TRACKS[spIdx].id + '.mp3');
        });
        spSetPlayUI(true);
        spStartTimer();
    }
}

function spGoto(idx) {
    const wasPlaying = spPlaying;
    // Pause current
    const prev = spAudio();
    if (prev) { prev.pause(); prev.currentTime = 0; }
    spPlaying = false;
    clearInterval(spTimer);

    spIdx = idx;
    spUpdateUI();
    spSetPlayUI(false);

    // Auto-play if was playing
    if (wasPlaying) {
        setTimeout(() => spToggle(), 100);
    }
}

function spPrev() {
    if (spIdx > 0) spGoto(spIdx - 1);
}

function spNext() {
    if (spIdx < SP_TRACKS.length - 1) spGoto(spIdx + 1);
}

function spSeek(ev) {
    const a = spAudio();
    if (!a || !a.duration) return;
    const bar = document.getElementById('sp-prog');
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
    a.currentTime = pct * a.duration;
}

function spVol(val) {
    const a = spAudio();
    if (a) a.volume = parseFloat(val);
}

// Init
spUpdateUI();

function stopAllA() {
    const a = spAudio();
    if (a) { a.pause(); a.currentTime = 0; }
    spSetPlayUI(false);
    clearInterval(spTimer);
}


function toast(m) {
    const t = document.getElementById('toast');
    t.textContent = m;
    t.classList.add('show');
    clearTimeout(tt);
    tt = setTimeout(() => { t.classList.remove('show'); }, 3000);
}

// ── VIDEO CAROUSEL ──
let vcIdx = 0;
const vcTotal = 3;

function vcUpdateUI() {
    document.getElementById('vtrack').style.transform = `translateX(-${vcIdx * 100}%)`;
    document.querySelectorAll('.vdot').forEach((d, i) => d.classList.toggle('active', i === vcIdx));
    document.getElementById('vcprev').disabled = vcIdx === 0;
    document.getElementById('vcnext').disabled = vcIdx === vcTotal - 1;
}

function vcGo(dir) {
    vcIdx = Math.max(0, Math.min(vcTotal - 1, vcIdx + dir));
    vcUpdateUI();
}

function vcGoto(i) {
    vcIdx = i;
    vcUpdateUI();
}

// Touch swipe for video carousel
(function initVCSwipe() {
    let vTsX = 0, vTsY = 0;
    const vc = document.getElementById('vcarousel');
    if (!vc) return;
    vc.addEventListener('touchstart', e => { vTsX = e.touches[0].clientX; vTsY = e.touches[0].clientY; }, { passive: true });
    vc.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - vTsX;
        const dy = e.changedTouches[0].clientY - vTsY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) vcGo(dx < 0 ? 1 : -1);
    }, { passive: true });
})();

vcUpdateUI();

// ── VIDEO UNLOCK CHECK ──
function checkVideoUnlock() {
    const now = new Date();
    if (now >= UNLOCK_DATE) {
        document.getElementById('vlock').style.display = 'none';
        document.getElementById('vunlocked').style.display = 'block';
    }
}
