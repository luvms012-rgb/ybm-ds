/* YBM DS 문서 사이트 - 사이트 틀 동작 (DS 동작은 ybm-ds.js 가 맡는다) */
(function () {
  "use strict";
  var KEY = "ybm-site-theme";
  var root = document.documentElement;

  function frames() { return [].slice.call(document.querySelectorAll("iframe[data-site-frame]")); }
  function themeFrame(f) {
    try { var d = f.contentDocument; if (!d) return; if (root.dataset.theme) d.documentElement.dataset.theme = root.dataset.theme; else delete d.documentElement.dataset.theme; } catch (e) {}
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
      navigator.clipboard.writeText(text).then(function () { if (window.YBM) YBM.snackbar("안내문을 복사했어요. AI 도구에 붙여 넣으세요.", { variant: "positive" }); });
      return;
    }

    // Lucide 전체 목록: CSS 에 있으면 클래스 이름, 없으면 icons.css 에 넣을 줄을 복사
    var lu = t.closest("[data-site-lucide]");
    if (lu && navigator.clipboard) {
      var nm = lu.getAttribute("data-site-lucide"), inCss = !!lu.querySelector(".site-icon__css");
      navigator.clipboard.writeText(inCss ? "ds-icon--" + nm : lucideCss(nm)).then(function () { if (window.YBM) YBM.snackbar(inCss ? "복사했어요: ds-icon--" + nm : "icons.css 에 넣을 줄을 복사했어요: " + nm); });
      return;
    }

    // 아이콘 이름 복사
    var icon = t.closest("[data-site-copy]");
    if (icon && navigator.clipboard) {
      navigator.clipboard.writeText(icon.getAttribute("data-site-copy")).then(function () { if (window.YBM) YBM.snackbar("복사했어요: " + icon.getAttribute("data-site-copy")); });
    }
  });

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { document.body.removeAttribute("data-side-open"); } });

  // 템플릿 원본 코드 불러오기 (http 로 열었을 때만)
  function loadSource(box) {
    var pre = box.querySelector("[data-site-src]");
    if (!pre || pre.getAttribute("data-loaded")) return;
    fetch(pre.getAttribute("data-site-src")).then(function (r) { return r.text(); }).then(function (txt) {
      pre.querySelector("code").textContent = txt.replace(/(\.\.\/)+dist\//g, "https://luvms012-rgb.github.io/ybm-ds/dist/");
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
      nav.querySelectorAll(".site-nav__item").forEach(function (a) { a.hidden = !!q && a.textContent.toLowerCase().indexOf(q) < 0; });
      nav.querySelectorAll(".site-nav__group").forEach(function (g) { g.hidden = !g.querySelector(".site-nav__item:not([hidden])"); if (q) g.open = true; });
    }
  }
  document.addEventListener("input", function (e) { if (e.target.matches("[data-site-search]")) filter(); if (e.target.matches("[data-site-lucide-search]")) lucideFilter(); });

  // Lucide 전체 아이콘 (아이콘 페이지): 자료는 assets/lucide-icons.js 의 window.LUCIDE
  function lucideCss(name) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + window.LUCIDE.icons[name] + "</svg>";
    var uri = svg.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/#/g, "%23");
    return "/* Lucide " + name + " */\n:root {\n  --ds-icon-" + name + ': url("data:image/svg+xml,' + uri + '");\n}\n.ds-icon--' + name + " { --ds-icon: var(--ds-icon-" + name + "); }";
  }
  function lucideGrid() {
    var grid = document.getElementById("site-lucide");
    if (!grid || !window.LUCIDE) return;
    var ds = {}, html = "", L = window.LUCIDE;
    (grid.getAttribute("data-site-ds-icons") || "").split(" ").forEach(function (n) { ds[n] = true; });
    Object.keys(L.icons).forEach(function (n) {
      html += '<button type="button" class="site-icon" data-site-lucide="' + n + '" title="' + n + (ds[n] ? " 클래스 복사" : " icons.css 줄 복사") + '">'
        + (ds[n] ? '<b class="ds-badge site-icon__css" data-tone="brand">CSS</b>' : "")
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + L.icons[n] + "</svg><span>" + n + "</span></button>";
    });
    grid.innerHTML = html;
    lucideFilter();
  }
  function lucideFilter() {
    var input = document.querySelector("[data-site-lucide-search]");
    var q = input ? input.value.trim().toLowerCase() : "", tags = (window.LUCIDE && window.LUCIDE.tags) || {}, n = 0;
    document.querySelectorAll("#site-lucide .site-icon").forEach(function (b) {
      var name = b.getAttribute("data-site-lucide");
      var ok = !q || name.indexOf(q) >= 0 || (tags[name] || "").indexOf(q) >= 0;
      b.hidden = !ok; if (ok) n++;
    });
    var c = document.querySelector("[data-site-lucide-count]");
    if (c) c.textContent = n.toLocaleString() + "개";
  }
  // 찾기 칸에서 Enter: 걸러진 메뉴의 첫 컴포넌트로
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || !e.target.matches("[data-site-search]") || !e.target.value.trim()) return;
    var first = document.querySelector("[data-site-navfilter] .site-nav__group .site-nav__item:not([hidden])");
    if (first) location.href = first.href;
  });
  // 좁은 화면 목차 고르기
  document.addEventListener("change", function (e) {
    if (!e.target.matches("[data-site-toc]")) return;
    var h = document.getElementById(e.target.value);
    if (h) { h.scrollIntoView({ behavior: "smooth" }); history.replaceState(null, "", "#" + e.target.value); }
  });

  // 템플릿 썸네일 크기 맞춤
  function fitThumbs() {
    document.querySelectorAll(".site-tpl-thumb").forEach(function (box) {
      var f = box.querySelector("iframe"); if (f) f.style.transform = "scale(" + box.clientWidth / 1280 + ")";
    });
  }
  window.addEventListener("resize", fitThumbs);

  // 컴포넌트 썸네일: 작은 부품은 실제 크기, 상자보다 크면 들어가게 줄인다(최소 0.5배, 그래도 크면 가운데만 보임)
  // 컴포넌트 첫 그림(data-site-fit-max="2")은 상자에 맞게 최대 2배까지 키운다
  function fitTiles() {
    document.querySelectorAll(".site-tile__inner > .pv-stage").forEach(function (st) {
      var box = st.parentElement, cs = getComputedStyle(box);
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
    lucideGrid();
    spy();
    // 왼쪽 메뉴: 지금 페이지 항목이 안 보이면 보이는 곳까지 내린다
    var side = document.querySelector(".site-side");
    var cur = side && side.querySelector(".site-nav:not(.site-side__mobile .site-nav) [aria-current='page']");
    if (cur && cur.offsetTop + cur.offsetHeight > side.clientHeight) side.scrollTop = cur.offsetTop - side.clientHeight / 3;
  });
})();
