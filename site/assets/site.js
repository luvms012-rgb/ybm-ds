/* yds 문서 사이트 - 사이트 틀 동작 (DS 동작은 ybm-ds.js가 맡는다) */
(function () {
  "use strict";
  var KEY = "ybm-site-theme";
  var root = document.documentElement;

  // 템플릿 미리보기에도 가이드 모노톤(brand-mono.css)을 넣는다. 주소는 이 스크립트 옆
  var MONO_CSS = document.currentScript ? document.currentScript.src.replace(/site\.js(\?.*)?$/, "brand-mono.css$1") : "";

  function frames() { return [].slice.call(document.querySelectorAll("iframe[data-site-frame]")); }
  function themeFrame(f) {
    try {
      var d = f.contentDocument; if (!d) return;
      if (!f.hasAttribute("data-site-theme-frame")) { if (root.dataset.theme) d.documentElement.dataset.theme = root.dataset.theme; else delete d.documentElement.dataset.theme; }
      if (MONO_CSS && !f.hasAttribute("data-site-nomono") && d.head && !d.getElementById("site-brand-mono")) { var l = d.createElement("link"); l.id = "site-brand-mono"; l.rel = "stylesheet"; l.href = MONO_CSS; d.head.appendChild(l); }
    } catch (e) {}
  }
  // 처음에는 기기의 라이트 / 다크 설정을 따르고, 버튼으로 고르면 그 선택("dark" 또는 "light")을 기억해 우선한다
  var osDark = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  var NAV_KEY = "ybm-site-nav-closed";
  function navShut() { try { return JSON.parse(localStorage.getItem(NAV_KEY)) || []; } catch (e) { return []; } }
  function restoreNav() {
    var shut = navShut();
    document.querySelectorAll("[data-site-group]").forEach(function (g) {
      if (shut.indexOf(g.getAttribute("data-site-group")) < 0 || g.querySelector('[aria-current="page"]')) return;
      var b = g.querySelector(".site-nav__toggle");
      var panel = g.querySelector(".site-nav__panel");
      panel.style.transition = "none";  // 처음 그릴 때는 움직이지 않고 바로 접힌 채로
      b.setAttribute("aria-expanded", "false");
      requestAnimationFrame(function () { panel.style.transition = ""; });
    });
  }
  function savedTheme() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setTheme(t, remember) {
    if (t === "dark") root.dataset.theme = "dark"; else delete root.dataset.theme;
    if (remember) { try { localStorage.setItem(KEY, t === "dark" ? "dark" : "light"); } catch (e) {} }
    document.querySelectorAll("[data-site-theme-toggle]").forEach(function (b) { b.setAttribute("aria-pressed", String(t === "dark")); b.setAttribute("aria-label", t === "dark" ? "밝은 화면으로 바꾸기" : "어두운 화면으로 바꾸기"); });
    frames().forEach(themeFrame);
  }

  // 세그먼트 / 칩 탭 한 묶음 안에서 하나만 고름
  function press(btn) {
    var tabs = btn.closest(".ds-chiptabs");
    if (tabs) { tabs.querySelectorAll(".ds-chiptabs__trigger").forEach(function (b) { b.setAttribute("aria-selected", String(b === btn)); }); return; }
    btn.closest(".ds-segmented").querySelectorAll(".ds-segmented__item").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("[data-site-theme-toggle]")) { setTheme(root.dataset.theme === "dark" ? "light" : "dark", true); return; }

    // 왼쪽 메뉴 접는 묶음: 접은 묶음 이름을 기억한다 (지금 페이지가 들어 있는 묶음은 늘 펼친다)
    var tg = t.closest(".site-nav__toggle");
    if (tg) {
      var open = tg.getAttribute("aria-expanded") !== "true";
      tg.setAttribute("aria-expanded", String(open));
      var name = tg.closest("[data-site-group]").getAttribute("data-site-group");
      var shut = navShut().filter(function (n) { return n !== name; });
      if (!open) shut.push(name);
      try { localStorage.setItem(NAV_KEY, JSON.stringify(shut)); } catch (err) {}
      return;
    }

    if (t.closest("[data-site-menu]")) { document.body.toggleAttribute("data-side-open"); var open = document.body.hasAttribute("data-side-open"); document.querySelectorAll("[data-site-menu]").forEach(function (b) { b.setAttribute("aria-expanded", String(open)); }); return; }
    if (t.closest("[data-site-close]")) { document.body.removeAttribute("data-side-open"); return; }


    // 코드 탭 (Get Started 다크 모드: AI 요청 / HTML). 탭 줄은 상자마다 있고 고른 표시가 이미 맞으니 상자만 바꾼다
    var tab = t.closest("[data-site-tab]");
    if (tab) {
      var panels = tab.closest(".site-codetabs").querySelectorAll(".site-codetabs__panel");
      panels.forEach(function (p, i) { p.hidden = String(i) !== tab.getAttribute("data-site-tab"); });
      return;
    }

    // 예시: 미리보기 / 코드
    var view = t.closest("[data-site-view]");
    if (view) {
      press(view);
      var box = view.closest(".site-example, .site-frame");
      var code = view.getAttribute("data-site-view") === "code";
      box.querySelectorAll(".site-example__preview, .site-frame__stage").forEach(function (el) { el.hidden = code; });
      box.querySelectorAll(".site-example__code, .site-frame__code").forEach(function (el) { el.hidden = !code; });
      if (code) loadSource(box);
      return;
    }

    // 템플릿: 기기 폭
    var dev = t.closest("[data-site-device]");
    if (dev) {
      press(dev);
      var stage = dev.closest(".site-frame").querySelector(".site-frame__stage");
      stage.setAttribute("data-device", dev.getAttribute("data-site-device"));
      return;
    }

    // 목록 필터 칩
    var chip = t.closest("[data-site-filter]");
    if (chip) {
      chip.parentElement.querySelectorAll("[data-site-filter]").forEach(function (c) { c.setAttribute("aria-selected", String(c === chip)); });
      filter();
      return;
    }

    // AI 안내문 복사
    var promptBtn = t.closest("[data-site-prompt-copy]");
    if (promptBtn && navigator.clipboard) {
      var text = promptBtn.closest(".site-prompt").querySelector(".site-prompt__text").textContent;
      navigator.clipboard.writeText(text).then(function () { if (window.DS) DS.snackbar("안내문을 복사했어요. AI 도구에 붙여 넣으세요.", { variant: "positive" }); });
      return;
    }

    // Lucide 전체 목록: CSS에 있으면 클래스 이름, 없으면 icons.css에 넣을 줄을 복사
    var lu = t.closest("[data-site-lucide]");
    if (lu && navigator.clipboard) {
      var nm = lu.getAttribute("data-site-lucide"), inCss = !!lu.querySelector(".site-icon__css");
      navigator.clipboard.writeText(inCss ? "ds-icon--" + nm : lucideCss(nm)).then(function () { if (window.DS) DS.snackbar(inCss ? "복사했어요: ds-icon--" + nm : "icons.css에 넣을 줄을 복사했어요: " + nm); });
      return;
    }

    // 아이콘 이름 복사
    var icon = t.closest("[data-site-copy]");
    if (icon && navigator.clipboard) {
      navigator.clipboard.writeText(icon.getAttribute("data-site-copy")).then(function () { if (window.DS) DS.snackbar("복사했어요: " + icon.getAttribute("data-site-copy")); });
    }
  });

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { document.body.removeAttribute("data-side-open"); } });

  // 템플릿 원본 코드 불러오기 (http로 열었을 때만)
  function loadSource(box) {
    var pre = box.querySelector("[data-site-src]");
    if (!pre || pre.getAttribute("data-loaded")) return;
    fetch(pre.getAttribute("data-site-src")).then(function (r) { return r.text(); }).then(function (txt) {
      pre.querySelector("code").textContent = txt.replace(/(\.\.\/)+dist\//g, "https://luvms012-rgb.github.io/yds/dist/");
      pre.setAttribute("data-loaded", "");
    }).catch(function () { pre.querySelector("code").textContent = "코드는 웹 주소(http)로 열었을 때 보여요. 파일 위치: " + pre.getAttribute("data-site-src"); });
  }

  // 컴포넌트/템플릿 목록 검색과 필터
  function filter() {
    var input = document.querySelector("[data-site-search]");
    var q = input ? input.value.trim().toLowerCase() : "";
    var sel = document.querySelector("[data-site-filter][aria-selected='true']");
    var cat = sel ? sel.getAttribute("data-site-filter") : "";
    var shown = 0;
    document.querySelectorAll("[data-site-item]").forEach(function (el) {
      var ok = (!q || el.getAttribute("data-site-item").indexOf(q) >= 0) && (!cat || el.getAttribute("data-site-cat") === cat);
      el.hidden = !ok; if (ok) shown++;
    });
    document.querySelectorAll(".site-group").forEach(function (g) { g.hidden = !g.querySelector("[data-site-item]:not([hidden])"); });
    var empty = document.querySelector(".site-empty-result");
    if (empty) empty.hidden = shown > 0;
    // 왼쪽 메뉴 찾기 칸: 메뉴 항목도 함께 거른다
    var nav = document.querySelector("[data-site-navfilter]");
    if (nav) {
      // 한글 낱말(data-site-keys)도 함께 본다: "버튼" 으로 찾아도 Action Button이 나온다
      nav.querySelectorAll(".site-nav__item").forEach(function (a) { a.hidden = !!q && (a.textContent + " " + (a.getAttribute("data-site-keys") || "")).toLowerCase().indexOf(q) < 0; });
      nav.querySelectorAll(".site-nav__group").forEach(function (g) { g.hidden = !g.querySelector(".site-nav__item:not([hidden])"); if (q) g.open = true; });
    }
  }
  document.addEventListener("input", function (e) { if (e.target.matches("[data-site-search]")) filter(); });

  // Lucide 전체 아이콘 (아이콘 페이지): 자료는 assets/lucide-icons.js의 window.LUCIDE
  function lucideCss(name) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + window.LUCIDE.icons[name] + "</svg>";
    var uri = svg.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/#/g, "%23");
    return "/* Lucide " + name + " */\n:root {\n  --ds-icon-" + name + ': url("data:image/svg+xml,' + uri + '");\n}\n.ds-icon--' + name + " { --ds-icon: var(--ds-icon-" + name + "); }";
  }
  // 아이콘 라이브러리 (Iconography > Library, 레퍼런스 B): 묶음 전환, 찾기, 정사각 칸, 고른 아이콘 정보 칸.
  // 자료: window.YBM_ICONS (DS 아이콘 이름, 한국어 쓰임) + window.LUCIDE (Lucide 그림과 태그). ?icon=이름 으로 바로 열린다
  var lib = { set: "ds", q: "", cur: "" };
  function libSvg(n, size) {
    var L = window.LUCIDE, body = L && L.icons[n];
    return body ? '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>" : "";
  }
  function libEsc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function libList() {
    var D = window.YBM_ICONS || { names: [], use: {} }, L = window.LUCIDE || { icons: {}, tags: {} };
    var names = lib.set === "ds" ? D.names : Object.keys(L.icons);
    var q = lib.q.trim().toLowerCase();
    if (!q) return names;
    return names.filter(function (n) {
      var base = n.replace(/-solid$/, "");
      return n.indexOf(q) >= 0 || (L.tags[base] || "").toLowerCase().indexOf(q) >= 0 || (D.use[n] || "").indexOf(q) >= 0;
    });
  }
  function libTile(n) {
    var inDs = (window.YBM_ICONS || { names: [] }).names.indexOf(n) >= 0;
    var pic = inDs ? '<i class="ds-icon ds-icon--' + n + '" aria-hidden="true"></i>' : libSvg(n, 20);
    return '<button type="button" class="site-lib__tile" role="option" data-site-lib-icon="' + n + '" aria-label="' + n + '" aria-selected="' + (n === lib.cur) + '" title="' + n + '">' + pic + "</button>";
  }
  function libDraw() {
    var grid = document.querySelector("[data-site-lib-grid]"); if (!grid) return;
    var list = libList();
    grid.innerHTML = list.map(libTile).join("");
    var c = document.querySelector("[data-site-lib-count]");
    if (c) c.textContent = lib.q.trim() ? (list.length ? list.length.toLocaleString() + "개 찾았어요." : "찾는 아이콘이 없어요. Lucide 전체에서 찾아 보세요.") : "영어 이름, 태그, 한국어 쓰임으로 찾아 보세요.";
    if (!lib.cur || list.indexOf(lib.cur) < 0) { if (list.length) libPick(list[0], true); else libPanel(""); } else libPanel(lib.cur);
  }
  // 아이콘 카드 코드 글자 색: 사이트 코드 상자와 같은 규칙(site/highlight.mjs 의 HTML 쪽) - 태그 .hl-t, 속성 이름 .hl-f, 값 .hl-s
  function libHl(text) {
    var re = /(<\/?)([A-Za-z][\w:.-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)(\s*\/?>)?/g, out = "", last = 0, m;
    var span = function (c, s) { return '<span class="hl-' + c + '">' + libEsc(s) + "</span>"; };
    while ((m = re.exec(text))) {
      out += libEsc(text.slice(last, m.index)) + libEsc(m[1]) + span("t", m[2]);
      out += (m[3] || "").replace(/(\s+)([^\s=>\/]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+))?/g, function (a, sp, name, eq, val) { return libEsc(sp) + span("f", name) + (eq ? libEsc(eq) + span("s", val) : ""); });
      out += libEsc(m[4] || "");
      last = re.lastIndex;
    }
    return out + libEsc(text.slice(last));
  }
  function libCode(label, text) {
    return '<div class="site-lib__code"><div class="site-lib__codehead"><span>' + label + '</span><button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="' + label + ' 복사" data-site-lib-copy><i class="ds-icon ds-icon--copy ds-icon--sm" aria-hidden="true"></i></button></div><pre><code>' + libHl(text) + "</code></pre></div>";
  }
  function libPanel(n) {
    var panel = document.querySelector("[data-site-lib-panel]"); if (!panel) return;
    if (!n) { panel.innerHTML = ""; return; }
    var D = window.YBM_ICONS || { names: [], use: {} }, L = window.LUCIDE || { icons: {}, tags: {} };
    var inDs = D.names.indexOf(n) >= 0, base = n.replace(/-solid$/, "");
    var tags = (D.use[n] ? D.use[n].split(/,\s*/) : []).concat((L.tags[base] || "").split(/[,\s]+/).filter(Boolean).slice(0, 12));
    var html = '<div class="site-lib__name"><b>' + n + "</b>" + (inDs ? '<span class="ds-badge" data-tone="positive">yds</span>' : '<span class="ds-badge">Lucide</span>') + "</div>";
    if (tags.length) html += '<div class="site-lib__tags">' + tags.map(function (t) { return "<span>" + libEsc(t) + "</span>"; }).join("") + "</div>";
    html += '<div class="site-lib__preview">' + (inDs ? '<i class="ds-icon ds-icon--' + n + '" style="--ds-icon-size: 48px" aria-hidden="true"></i>' : libSvg(n, 48)) + "</div>";
    if (inDs) html += libCode("HTML", '<i class="ds-icon ds-icon--' + n + '" aria-hidden="true"></i>');
    else html += '<p class="site-lib__note">아직 DS에 없는 아이콘입니다. 아래 줄을 dist/icons.css 끝에 붙이면 바로 씁니다.</p>' + libCode("icons.css 줄", lucideCss(n));
    if (L.icons[base]) html += libCode("SVG", '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + L.icons[base] + "</svg>");
    panel.innerHTML = html;
  }
  function libPick(n, quiet) {
    lib.cur = n;
    document.querySelectorAll("[data-site-lib-icon]").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-site-lib-icon") === n ? "true" : "false"); });
    libPanel(n);
    if (!quiet && history.replaceState) history.replaceState(null, "", "?icon=" + encodeURIComponent(n));
  }
  function libInit() {
    if (!document.querySelector("[data-site-lib]")) return;
    var want = new URLSearchParams(location.search).get("icon") || "";
    var D = window.YBM_ICONS || { names: [] };
    if (want) { lib.cur = want; if (D.names.indexOf(want) < 0) lib.set = "all"; }
    document.querySelectorAll("[data-site-lib-set]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-site-lib-set") === lib.set ? "true" : "false"); });
    libDraw();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-site-lib-icon], [data-site-lib-set], [data-site-lib-copy]");
    if (!t) return;
    if (t.hasAttribute("data-site-lib-icon")) { libPick(t.getAttribute("data-site-lib-icon")); return; }
    if (t.hasAttribute("data-site-lib-set")) {
      lib.set = t.getAttribute("data-site-lib-set");
      document.querySelectorAll("[data-site-lib-set]").forEach(function (b) { b.setAttribute("aria-pressed", b === t ? "true" : "false"); });
      libDraw(); return;
    }
    var code = t.closest(".site-lib__code").querySelector("code").textContent;
    if (navigator.clipboard) navigator.clipboard.writeText(code).then(function () { if (window.DS) DS.snackbar("복사했어요", { variant: "positive" }); });
  });
  document.addEventListener("input", function (e) { if (e.target.matches("[data-site-lib-q]")) { lib.q = e.target.value; libDraw(); } });
  // 찾기 칸에서 Enter: 걸러진 메뉴의 첫 컴포넌트로
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || !e.target.matches("[data-site-search]") || !e.target.value.trim()) return;
    var first = document.querySelector("[data-site-navfilter] .site-nav__group .site-nav__item:not([hidden])");
    if (first) location.href = first.href;
  });
  // 좁은 화면 목차 고르기 (DS Select): 트리거로 여닫고, 항목을 누르면 그 제목으로
  function tocOpen(open) {
    var btn = document.querySelector("[data-site-toc]"), list = document.getElementById("site-toc-list");
    if (!btn || !list) return;
    list.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
  }
  function tocMark(id) {
    var btn = document.querySelector("[data-site-toc]");
    if (!btn) return;
    document.querySelectorAll("[data-site-toc-go]").forEach(function (o) {
      if (o.getAttribute("data-site-toc-go") === id) { o.setAttribute("aria-selected", "true"); btn.querySelector(".ds-select__value").textContent = o.textContent; }
      else o.removeAttribute("aria-selected");
    });
  }
  document.addEventListener("click", function (e) {
    var go = e.target.closest("[data-site-toc-go]");
    if (go) {
      var id = go.getAttribute("data-site-toc-go"), h = document.getElementById(id);
      tocOpen(false); tocMark(id);
      if (h) { h.scrollIntoView({ behavior: "smooth" }); history.replaceState(null, "", "#" + id); }
      return;
    }
    if (e.target.closest("[data-site-toc]")) { tocOpen(document.getElementById("site-toc-list").hidden); return; }
    if (!e.target.closest(".site-toc-list")) tocOpen(false);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") tocOpen(false); });

  // 템플릿 썸네일 크기 맞춤
  function fitThumbs() {
    document.querySelectorAll(".site-tpl-thumb").forEach(function (box) {
      var f = box.querySelector("iframe"); if (f) f.style.transform = "scale(" + box.clientWidth / 1440 + ")";
    });
  }
  window.addEventListener("resize", fitThumbs);

  // 컴포넌트 썸네일: 작은 부품은 실제 크기, 상자보다 크면 들어가게 줄인다(최소 0.5배, 그래도 크면 가운데만 보임)
  // 컴포넌트 첫 그림(data-site-fit-max="2")은 상자에 맞게 최대 2배까지 키운다
  function fitTiles() {
    document.querySelectorAll(".site-tile__inner > .pv-stage").forEach(function (st) {
      var box = st.parentElement, cs = getComputedStyle(box);
      // 넓은 화면의 구조 그림은 줄이지 않는다: 넓으면 양옆 이름 자리를, 높으면 그림 상자 높이를 늘린다 (휴대폰은 전처럼 줄인다)
      var fig = box.closest("[data-site-anatomy]");
      if (fig) { box.style.padding = ""; fig.style.height = fig.style.width = fig.style.aspectRatio = ""; st.style.transform = ""; cs = getComputedStyle(box); }
      // 휴대폰: 그림과 이름을 줄이지 않고 PC 처럼 넓은 상자에 그려 옆으로 밀어 보게 한다(처음에는 부품이 가운데)
      var wrap = fig && fig.parentElement;
      if (fig && wrap.clientWidth < 600) {
        st.style.width = "max-content";
        var pw = Math.max(st.offsetWidth, st.scrollWidth), W = Math.max(wrap.clientWidth, Math.ceil(pw + 280));
        fig.style.width = W + "px";
        box.style.padding = "64px " + (W - pw) / 2 + "px";
        cs = getComputedStyle(box);
        st.style.width = pw + "px";
        var need2 = st.scrollHeight + 128;
        if (need2 > box.clientHeight) { fig.style.aspectRatio = "auto"; fig.style.height = Math.ceil(need2) + "px"; }  // 비율과 최소 높이를 함께 두면 폭까지 늘어난다
        wrap.scrollLeft = (W - wrap.clientWidth) / 2;
      }
      else if (fig) {
        st.style.width = "max-content";
        var nw = Math.max(st.offsetWidth, st.scrollWidth);
        if (nw > box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) box.style.paddingLeft = box.style.paddingRight = Math.max(24, (box.clientWidth - nw) / 2) + "px";
        cs = getComputedStyle(box);
        st.style.width = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) + "px";
        var need = st.scrollHeight + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        if (need > box.clientHeight) { fig.style.aspectRatio = "auto"; fig.style.height = Math.ceil(need) + "px"; }
      }
      var aw = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var ah = box.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      if (!aw || !ah) return;
      var max = parseFloat(box.parentElement.getAttribute("data-site-fit-max")) || 1;
      var kids = [].slice.call(st.children), s;
      kids.forEach(function (k) { if ("siteHid" in k.dataset) { k.style.display = k.dataset.siteHid; delete k.dataset.siteHid; } });
      if (max > 1) {
        st.style.transform = ""; st.style.width = "max-content";
        s = Math.min(max, aw / st.offsetWidth, ah / st.offsetHeight);
        if (s >= 1) { st.style.transform = s > 1 ? "scale(" + s + ")" : ""; return; }
      }
      for (;;) {
        st.style.transform = ""; st.style.width = aw + "px";
        s = Math.min(1, aw / st.scrollWidth, ah / st.scrollHeight);
        if (s < 1) { st.style.width = aw / s + "px"; s = Math.min(1, aw / st.scrollWidth, ah / st.scrollHeight); }
        // 너무 많이 줄여야 하면 뒤 부품부터 하나씩 뺀다
        var shown = kids.filter(function (k) { return !("siteHid" in k.dataset); });
        if (s >= 0.6 || shown.length < 2) break;
        var last = shown[shown.length - 1]; last.dataset.siteHid = last.style.display; last.style.display = "none";
      }
      s = Math.max(s, 0.5);
      st.style.width = aw / s + "px";
      st.style.transform = s < 1 ? "scale(" + s + ")" : "";
    });
    pinAnatomy();
  }
  // 구조 그림 (레퍼런스 B Anatomy): 부품은 실제 크기로 가운데, 이름은 그림 바깥에 두고 곧은 화살표로 부품 가장자리를 가리킨다.
  // 나란한 부품은 위아래에서 세로 화살표로, 위아래로 쌓인 부품과 바깥 틀은 양옆에서 가로 화살표로 가리킨다.
  // 화살표는 다른 부품 위를 지나지 않고, 서로 엇갈리지 않으며, 이름끼리 겹치지 않는 자리를 고른다
  function pinAnatomy() {
    var NS = "http://www.w3.org/2000/svg", GAP = 28, ROW = 26;
    document.querySelectorAll("[data-site-anatomy]").forEach(function (box) {
      var old = box.querySelector(".site-anatomy__layer"); if (old) old.remove();
      [].slice.call(box.querySelectorAll(".site-anatomy__name")).forEach(function (n) { n.remove(); });
      var b = box.getBoundingClientRect(); if (!b.width) return;
      var names = (box.getAttribute("data-site-anatomy-names") || "").split("|");
      var rel = function (r) { return { l: r.left - b.left, t: r.top - b.top, r: r.right - b.left, b: r.bottom - b.top }; };
      // 그림에 보이는 부품만 모은다
      var parts = [];
      box.getAttribute("data-site-anatomy").split(" ").forEach(function (cls, i) {
        var el = [].slice.call(box.querySelectorAll(".site-tile__inner ." + cls)).filter(function (e) { var r = e.getBoundingClientRect(); return r.width >= 1 && r.height >= 1; })[0];
        if (el) parts.push({ el: el, name: names[i] || cls, R: rel(el.getBoundingClientRect()) });
      });
      if (!parts.length) return;
      var inside = function (a, c) { return a.l >= c.l - 0.5 && a.r <= c.r + 0.5 && a.t >= c.t - 0.5 && a.b <= c.b + 0.5; };
      parts.forEach(function (p) {
        p.kids = parts.filter(function (q) { return q !== p && (p.el.contains(q.el) || inside(q.R, p.R)); });
        p.outer = parts.filter(function (q) { return q !== p && (q.el.contains(p.el) || inside(p.R, q.R)); });
      });
      // 이름을 붙이지 않는 같은 부품(두 번째 항목 등)도 화살표가 지나가면 안 된다
      var others = [];
      box.getAttribute("data-site-anatomy").split(" ").forEach(function (cls) {
        [].slice.call(box.querySelectorAll(".site-tile__inner ." + cls)).forEach(function (e) {
          if (parts.some(function (p) { return p.el === e; })) return;
          var r = e.getBoundingClientRect(); if (r.width >= 1 && r.height >= 1) others.push({ el: e, R: rel(r) });
        });
      });
      // 이름이 없는 상자(바탕, 테두리, 그림자가 있는 것, 아이콘, 사진)도 화살표와 이름이 피한다
      [].slice.call(box.querySelectorAll(".site-tile__inner *")).forEach(function (e) {
        if (parts.some(function (p) { return p.el === e; }) || others.some(function (o) { return o.el === e; })) return;
        var r = e.getBoundingClientRect(); if (r.width < 8 || r.height < 8) return;
        var cs = getComputedStyle(e); if (cs.visibility === "hidden" || cs.opacity === "0") return;
        var bg = cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent";
        if (bg || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0 || cs.boxShadow !== "none" || e.tagName === "IMG") others.push({ el: e, R: rel(r) });
        // 글자도 지나가지 않는다 (글자가 차지한 자리만)
        [].forEach.call(e.childNodes, function (n) {
          if (n.nodeType !== 3 || !n.textContent.trim()) return;
          var rg = document.createRange(); rg.selectNodeContents(n); var tr = rg.getBoundingClientRect();
          if (tr.width >= 1 && tr.height >= 1) others.push({ el: e, R: rel(tr) });
        });
      });
      var U = parts.reduce(function (u, p) { return { l: Math.min(u.l, p.R.l), t: Math.min(u.t, p.R.t), r: Math.max(u.r, p.R.r), b: Math.max(u.b, p.R.b) }; }, { l: 1e9, t: 1e9, r: -1e9, b: -1e9 });
      var svg = document.createElementNS(NS, "svg"); svg.setAttribute("class", "site-anatomy__layer");
      svg.innerHTML = "<defs><marker id=\"site-arrow\" viewBox=\"0 0 6 6\" refX=\"6\" refY=\"3\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M0 0L6 3L0 6z\"/></marker></defs>";
      box.appendChild(svg);
      var segs, labels;
      // 선분이 상자를 지나는지 (가장자리에 닿기만 하면 괜찮다)
      var hitsRect = function (s, q, pad) {
        pad = pad || 0;
        if (s.x1 === s.x2) { var y0 = Math.min(s.y1, s.y2), y1 = Math.max(s.y1, s.y2); return s.x1 > q.l - pad && s.x1 < q.r + pad && y1 > q.t - pad && y0 < q.b + pad; }
        var x0 = Math.min(s.x1, s.x2), x1 = Math.max(s.x1, s.x2); return s.y1 > q.t - pad && s.y1 < q.b + pad && x1 > q.l - pad && x0 < q.r + pad;
      };
      var cross = function (a, c) {
        var av = a.x1 === a.x2, cv = c.x1 === c.x2;
        if (av === cv) return av ? Math.abs(a.x1 - c.x1) < 6 && Math.min(Math.max(a.y1, a.y2), Math.max(c.y1, c.y2)) > Math.max(Math.min(a.y1, a.y2), Math.min(c.y1, c.y2)) : Math.abs(a.y1 - c.y1) < 6 && Math.min(Math.max(a.x1, a.x2), Math.max(c.x1, c.x2)) > Math.max(Math.min(a.x1, a.x2), Math.min(c.x1, c.x2));
        var v = av ? a : c, h = av ? c : a;
        return v.x1 > Math.min(h.x1, h.x2) && v.x1 < Math.max(h.x1, h.x2) && h.y1 > Math.min(v.y1, v.y2) && h.y1 < Math.max(v.y1, v.y2);
      };
      var overlap = function (a, c, g) { return a.l < c.r + g && a.r > c.l - g && a.t < c.b + g && a.b > c.t - g; };
      // 이 자리에 두면 몇 군데가 겹치는지 센다 (0이면 깨끗한 자리).
      // 그림 속 부품과 상자는 바뀌지 않으니 자리마다 한 번만 세고(fixed), 이미 놓은 화살표와 이름만 매번 센다(live)
      var fixed = function (p, s, L) {
        var n = 0;
        if (L.l < 4 || L.t < 4 || L.r > b.width - 4 || L.b > b.height - 4) n += 10;
        for (var i = 0; i < p.obs.length; i++) { var q = p.obs[i]; if (hitsRect(s, q, 1)) n++; if (overlap(L, q, 4)) n += 3; }
        return n;
      };
      var live = function (s, L) {
        var n = 0;
        for (var j = 0; j < segs.length; j++) { if (cross(s, segs[j])) n++; if (hitsRect(segs[j], L, 3)) n += 2; }
        for (var k = 0; k < labels.length; k++) { if (overlap(L, labels[k], 6)) n += 5; if (hitsRect(s, labels[k], 3)) n += 2; }
        return n;
      };
      parts.forEach(function (p) {
        p.obs = parts.filter(function (q) { return q !== p && p.kids.indexOf(q) < 0 && p.outer.indexOf(q) < 0; }).map(function (q) { return q.R; })  // 바깥 틀의 테두리를 건너는 것은 괜찮다
          .concat(others.filter(function (e) { return !(e.el.contains(p.el) || p.el.contains(e.el) || inside(p.R, e.R) || inside(e.R, p.R)); }).map(function (e) { return e.R; }));
      });
      // 이름 크기를 먼저 잰다
      parts.forEach(function (p) {
        var name = document.createElement("span"); name.className = "site-anatomy__name"; name.textContent = p.name; box.appendChild(name);
        p.tag = name; p.w = name.offsetWidth; p.h = name.offsetHeight;
      });
      var choices = function (p) {
        var w = p.w, h = p.h, R = p.R, cx = (R.l + R.r) / 2, cy = (R.t + R.b) / 2, c = [];
        var vert = function (top) {
          var xs = [cx]; for (var d = 8; d < (R.r - R.l) / 2 - 4; d += 8) xs.push(cx - d, cx + d);
          for (var row = 0; row < 4; row++) xs.forEach(function (x) { [0, -0.35, 0.35].forEach(function (o) {
            var lx = x - w / 2 + o * w, ly = top ? U.t - GAP - row * ROW - h : U.b + GAP + row * ROW;
            c.push({ L: { l: lx, t: ly, r: lx + w, b: ly + h }, s: { x1: x, y1: top ? ly + h + 3 : ly - 3, x2: x, y2: top ? R.t - 1 : R.b + 1 } });
          }); });
        };
        var side = function (left) {
          var ys = [cy]; for (var d = 2; d < (R.b - R.t) / 2 - 2; d += 2) ys.push(cy - d, cy + d);
          ys.forEach(function (y) {
            var lx = left ? U.l - GAP - w : U.r + GAP;
            c.push({ L: { l: lx, t: y - h / 2, r: lx + w, b: y + h / 2 }, s: { x1: left ? lx + w + 4 : lx - 4, y1: y, x2: left ? R.l - 1 : R.r + 1, y2: y } });
          });
        };
        // 바깥 틀과 세로로 긴 부품은 옆, 그 밖은 위아래를 먼저 본다
        var tall = R.b - R.t > (R.r - R.l) * 0.9;
        if (p.kids.length || tall) { side(cx > (U.l + U.r) / 2 ? false : true); side(cx > (U.l + U.r) / 2); vert(cy < (U.t + U.b) / 2); vert(cy >= (U.t + U.b) / 2); }
        else { vert(cy < (U.t + U.b) / 2); vert(cy >= (U.t + U.b) / 2); side(cx < (U.l + U.r) / 2); side(cx >= (U.l + U.r) / 2); }
        return c;
      };
      parts.forEach(function (p) { p.c = choices(p); p.c.forEach(function (c) { c.base = fixed(p, c.s, c.L); }); });
      // 정한 순서대로 한 부품씩 가장 깨끗한 자리를 고른다 (fix 는 자리를 먼저 정해 둔 부품)
      var solve = function (order, fix) {
        segs = []; labels = [];
        var res = { total: 0, picks: [] };
        if (fix) { segs.push(fix.c.s); labels.push(fix.c.L); res.picks.push({ p: fix.p, pick: fix.c, best: 0 }); }
        order.forEach(function (p) {
          if (fix && p === fix.p) return;
          var pick = null, best = 1e9;
          for (var ci = 0; ci < p.c.length && best > 0; ci++) { var cc = p.c[ci]; if (cc.base >= best) continue; var sc = cc.base + live(cc.s, cc.L); if (sc < best) { best = sc; pick = cc; } }
          segs.push(pick.s); labels.push(pick.L); res.total += best; res.picks.push({ p: p, pick: pick, best: best });
        });
        return res;
      };
      // 안쪽 부품부터(자리가 좁다) 왼쪽에서 오른쪽 순서로, 바깥 틀은 마지막에.
      // 겹친 이름이 있으면 그 부품을 앞으로 옮겨 다시 풀고, 가장 덜 겹치는 배치를 쓴다
      var order = parts.slice().sort(function (a, c) { return a.kids.length - c.kids.length || a.R.l - c.R.l || a.R.t - c.R.t; });
      var top = solve(order);
      for (var tries = 0; tries < 6 && top.total > 0; tries++) {
        var forced = top.picks.filter(function (x) { return x.best > 0; }).map(function (x) { return x.p; });
        order = forced.concat(order.filter(function (p) { return forced.indexOf(p) < 0; }));
        var next = solve(order); if (next.total < top.total) top = next;
      }
      // 그래도 겹치면 겹친 부품의 다른 깨끗한 자리를 하나씩 먼저 정해 두고 나머지를 다시 푼다
      for (var round = 0; round < 3 && top.total > 0; round++) {
        var stuck = top.picks.filter(function (x) { return x.best > 0; }).map(function (x) { return x.p; }), gain = false;
        for (var si = 0; si < stuck.length && top.total > 0; si++) {
          var fp = stuck[si];
          for (var fc = 0; fc < fp.c.length && top.total > 0; fc++) {
            if (fp.c[fc].base > 0) continue;
            var alt = solve(order, { p: fp, c: fp.c[fc] });
            if (alt.total < top.total) { top = alt; gain = true; }
          }
        }
        if (!gain) break;
      }
      top.picks.forEach(function (x) {
        var name = x.p.tag, pick = x.pick;
        if (x.best > 0) name.setAttribute("data-forced", x.best);
        name.style.left = Math.round(pick.L.l) + "px"; name.style.top = Math.round(pick.L.t) + "px";
        var ln = document.createElementNS(NS, "line");
        ln.setAttribute("x1", pick.s.x1); ln.setAttribute("y1", pick.s.y1); ln.setAttribute("x2", pick.s.x2); ln.setAttribute("y2", pick.s.y2); ln.setAttribute("marker-end", "url(#site-arrow)");
        svg.appendChild(ln);
      });
    });
  }
  window.addEventListener("resize", fitTiles);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTiles);

  // 목차: 지금 읽는 제목 표시
  function spy() {
    var links = [].slice.call(document.querySelectorAll(".site-toc a"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var bar = document.querySelector(".site-toc__indicator");
    function mark(a) {
      links.forEach(function (l) { l.removeAttribute("aria-current"); });
      a.setAttribute("aria-current", "true");
      tocMark(a.getAttribute("href").slice(1));
      if (bar) { bar.style.translate = "0 " + a.offsetTop + "px"; bar.style.height = a.offsetHeight + "px"; }
    }
    mark(links[0]);  // 처음에는 첫 항목
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    // 목차를 누르면 막대가 누른 항목으로 바로 미끄러지고 본문은 부드럽게 스크롤한다.
    // 스크롤하는 동안에는 지나가는 제목이 막대를 끌고 다니지 않게 잠근다
    var lockUntil = 0;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    links.forEach(function (a) {
      a.addEventListener("click", function (e) {
        var h = document.getElementById(a.getAttribute("href").slice(1));
        if (!h) return;
        e.preventDefault();
        mark(a);
        lockUntil = Date.now() + 1200;
        h.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", "#" + h.id);
      });
    });
    window.addEventListener("scrollend", function () { lockUntil = 0; });
    var io = new IntersectionObserver(function (entries) {
      if (Date.now() < lockUntil) return;
      entries.forEach(function (en) {
        if (en.isIntersecting) { var a = map[en.target.id]; if (a) mark(a); }
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) io.observe(h); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    restoreNav();
    // 버튼으로 고른 적이 없으면 기기 설정이 바뀔 때(밤에 자동 다크 등) 같이 바뀐다
    if (osDark && osDark.addEventListener) osDark.addEventListener("change", function (e) { if (!savedTheme()) setTheme(e.matches ? "dark" : "light"); });
    frames().forEach(function (f) { f.addEventListener("load", function () { themeFrame(f); }); themeFrame(f); });
    fitThumbs();
    fitTiles();
    libInit();
    spy();
    // 왼쪽 메뉴: 지금 페이지 항목이 안 보이면 보이는 곳까지 내린다
    var side = document.querySelector(".site-side");
    var cur = side && side.querySelector(".site-nav:not(.site-side__mobile .site-nav) [aria-current='page']");
    if (cur && cur.offsetTop + cur.offsetHeight > side.clientHeight) side.scrollTop = cur.offsetTop - side.clientHeight / 3;
  });

  // 템플릿 보기 창: 목록에서 카드를 누르면 화면 100% 가 아닌 정해진 크기의 큰 창에서 템플릿을 보여 준다.
  // 주소에 ?preview=이름 을 남겨 그대로 공유할 수 있다. 새 탭으로 열기(Ctrl, Cmd, 가운데 버튼)는 상세 페이지로 간다.
  (function () {
    var cards = [].slice.call(document.querySelectorAll(".site-tpl"));
    if (!cards.length) return;
    var dlg = document.createElement("div");
    dlg.className = "site-tplv"; dlg.hidden = true;
    dlg.setAttribute("role", "dialog"); dlg.setAttribute("aria-modal", "true"); dlg.setAttribute("aria-labelledby", "site-tplv-title");
    dlg.innerHTML = '<div class="site-tplv__scrim" data-tplv-close></div>' +
      '<div class="site-tplv__box"><header class="site-tplv__head"><div class="site-tplv__texts"><h2 class="site-tplv__title" id="site-tplv-title"></h2><p class="site-tplv__desc"></p></div>' +
      '<button type="button" class="site-tplv__x" data-tplv-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></header>' +
      '<div class="site-tplv__frame"><iframe title="" data-site-frame></iframe></div>' +
      '<footer class="site-tplv__foot"><code class="site-tplv__path"></code><span class="site-tplv__acts"></span></footer></div>' +
      '<button type="button" class="site-tplv__nav" data-tplv-step="-1" aria-label="이전 템플릿"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>' +
      '<button type="button" class="site-tplv__nav" data-tplv-step="1" aria-label="다음 템플릿"><i class="ds-icon ds-icon--chevron-right" aria-hidden="true"></i></button>';
    document.body.appendChild(dlg);
    var frame = dlg.querySelector("iframe"), cur = null, back = null;
    frame.addEventListener("load", function () { themeFrame(frame); });
    function slugOf(card) { var a = card.querySelector(".site-tpl__link"); return a ? a.getAttribute("href").replace(/\.html$/, "") : ""; }
    function shown() { return cards.filter(function (c) { return !c.hidden; }); }
    function setUrl(slug) { try { var u = new URL(location.href); if (slug) u.searchParams.set("preview", slug); else u.searchParams.delete("preview"); history.replaceState(null, "", u); } catch (e) {} }
    function open(card) {
      var slug = slugOf(card); if (!slug) return;
      if (dlg.hidden) back = document.activeElement;
      cur = card;
      dlg.querySelector(".site-tplv__title").textContent = card.querySelector(".site-tpl__title").textContent;
      dlg.querySelector(".site-tplv__desc").textContent = card.querySelector(".site-tpl__desc").textContent;
      dlg.querySelector(".site-tplv__path").textContent = "site/templates/pages/" + slug + ".html";
      var fig = card.querySelector('.site-tpl__actions a[target="_blank"]');
      dlg.querySelector(".site-tplv__acts").innerHTML =
        (fig ? '<a class="ds-btn" data-variant="neutralWeak" data-size="small" href="' + fig.getAttribute("href") + '" target="_blank" rel="noopener">Figma에서 열기</a>' : "") +
        '<a class="ds-btn" data-variant="neutralWeak" data-size="small" href="' + slug + '.html">문서 보기</a>' +
        '<a class="ds-btn" data-variant="neutralSolid" data-size="small" href="pages/' + slug + '.html" target="_blank" rel="noopener">새 창으로 보기</a>';
      frame.title = card.querySelector(".site-tpl__title").textContent + " 미리보기";
      frame.src = "pages/" + slug + ".html";
      dlg.hidden = false; root.classList.add("site-tplv-open");
      setUrl(slug);
      dlg.querySelector(".site-tplv__x").focus();
    }
    function close() {
      if (dlg.hidden) return;
      dlg.hidden = true; root.classList.remove("site-tplv-open"); frame.src = "about:blank"; cur = null; setUrl("");
      if (back && back.focus) back.focus();
    }
    function step(n) { var list = shown(), i = list.indexOf(cur); if (i < 0) return; open(list[(i + n + list.length) % list.length]); }
    cards.forEach(function (card) {
      card.querySelectorAll('.site-tpl__link, .site-tpl__btn:not([target="_blank"])').forEach(function (a) {
        a.addEventListener("click", function (e) { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); open(card); });
      });
    });
    dlg.addEventListener("click", function (e) {
      if (e.target.closest("[data-tplv-close]")) close();
      var s = e.target.closest("[data-tplv-step]"); if (s) step(+s.getAttribute("data-tplv-step"));
    });
    document.addEventListener("keydown", function (e) {
      if (dlg.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft" && !e.target.closest("input, textarea")) step(-1);
      else if (e.key === "ArrowRight" && !e.target.closest("input, textarea")) step(1);
    });
    try { var want = new URL(location.href).searchParams.get("preview"); if (want) { var c = cards.filter(function (x) { return slugOf(x) === want; })[0]; if (c) open(c); } } catch (e) {}
  })();


  // 테마 보기 (레퍼런스 A Themes): 카드를 누르면 오른쪽에 그 테마의 화면(pages/<이름>.html)을 불러온다.
  // 기본은 지금 화면에서 data-ds-theme만 뺀다(같은 화면을 테마 없이 비교).
  // 달 버튼은 미리보기만 다크로. 화면은 높이 그대로 펼쳐 페이지와 함께 스크롤한다
  (function () {
    var frame = document.querySelector("[data-site-theme-frame]"); if (!frame) return;
    var page = (frame.getAttribute("src").match(/([^/]+).html/) || [])[1], open = document.querySelector("[data-site-theme-open]"), file = document.querySelector("[data-site-theme-file]"), mode = document.querySelector("[data-site-theme-mode]");
    var cards = [].slice.call(document.querySelectorAll("[data-site-theme]"));
    var cur = (cards.filter(function (c) { return c.getAttribute("aria-pressed") === "true"; })[0] || cards[0]).getAttribute("data-site-theme");
    var dark = false;
    // 높이는 html 상자 높이로 잰다(scrollHeight는 iframe 높이보다 작아지지 않아 짧은 화면으로 바꿔도 줄지 않는다)
    function fit() { try { frame.style.height = Math.ceil(frame.contentDocument.documentElement.getBoundingClientRect().height) + "px"; } catch (e) {} }
    function apply() {
      try {
        var h = frame.contentDocument.documentElement;
        if (cur) h.setAttribute("data-ds-theme", cur); else h.removeAttribute("data-ds-theme");
        if (dark) h.setAttribute("data-theme", "dark"); else h.removeAttribute("data-theme");
      } catch (e) {}
      if (open) open.href = "pages/" + page + ".html" + (cur ? "" : "#default");
      if (file) { file.hidden = !cur; if (cur) file.href = file.href.replace(/[^/]+.css$/, cur + ".css"); }
      if (mode) mode.setAttribute("aria-pressed", String(dark));
      fit();
    }
    cards.forEach(function (c) { c.addEventListener("click", function () { cur = c.getAttribute("data-site-theme"); cards.forEach(function (x) { x.setAttribute("aria-pressed", String(x === c)); }); if (cur && cur !== page) { page = cur; frame.src = "pages/" + cur + ".html"; } apply(); }); });
    if (mode) mode.addEventListener("click", function () { dark = !dark; apply(); });
    frame.addEventListener("load", function () { apply(); [300, 1000, 2500].forEach(function (t) { setTimeout(fit, t); }); try { frame.contentWindow.addEventListener("resize", fit); } catch (e) {} });
    window.addEventListener("resize", fit);
  })();

  // Markdown 메뉴: 링크 복사, 내용 복사 (AI 도구에 붙여 넣기용). 바깥을 누르거나 Esc로 닫는다
  (function () {
    var toggles = [].slice.call(document.querySelectorAll("[data-site-md-toggle]")); if (!toggles.length) return;
    function close() { toggles.forEach(function (t) { t.setAttribute("aria-expanded", "false"); t.nextElementSibling.hidden = true; }); }
    function done(msg) { if (window.YBM && DS.snackbar) DS.snackbar(msg, { variant: "positive" }); }
    toggles.forEach(function (t) { t.addEventListener("click", function (e) { e.stopPropagation(); var open = t.getAttribute("aria-expanded") !== "true"; close(); t.setAttribute("aria-expanded", String(open)); t.nextElementSibling.hidden = !open; }); });
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-site-md]");
      if (b) {
        var url = new URL(b.getAttribute("data-href"), location.href).href;
        if (b.getAttribute("data-site-md") === "link") navigator.clipboard.writeText(url).then(function () { done("마크다운 링크를 복사했어요"); });
        else fetch(url).then(function (r) { return r.text(); }).then(function (t) { return navigator.clipboard.writeText(t); }).then(function () { done("마크다운 내용을 복사했어요"); });
      }
      if (!e.target.closest(".site-md")) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  })();


})();
