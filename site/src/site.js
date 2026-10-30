/* YBM DS 문서 사이트 - 사이트 틀 동작 (DS 동작은 ybm-ds.js 가 맡는다) */
(function () {
  "use strict";
  var KEY = "ybm-site-theme";
  var root = document.documentElement;

  function frames() { return [].slice.call(document.querySelectorAll("iframe[data-site-frame]")); }
  function themeFrame(f) {
    try { var d = f.contentDocument; if (!d) return; if (root.dataset.theme) d.documentElement.dataset.theme = root.dataset.theme; else delete d.documentElement.dataset.theme; } catch (e) {}
  }
  function setTheme(t) {
    if (t) root.dataset.theme = t; else delete root.dataset.theme;
    try { if (t) localStorage.setItem(KEY, t); else localStorage.removeItem(KEY); } catch (e) {}
    document.querySelectorAll("[data-site-theme-toggle]").forEach(function (b) { b.setAttribute("aria-pressed", String(t === "dark")); b.setAttribute("aria-label", t === "dark" ? "밝은 화면으로 바꾸기" : "어두운 화면으로 바꾸기"); });
    frames().forEach(themeFrame);
  }

  // 세그먼트 한 묶음 안에서 하나만 눌림
  function press(btn) {
    btn.closest(".ds-segmented").querySelectorAll(".ds-segmented__item").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("[data-site-theme-toggle]")) { setTheme(root.dataset.theme === "dark" ? "" : "dark"); return; }

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

    // 아이콘 이름 복사
    var icon = t.closest("[data-site-copy]");
    if (icon && navigator.clipboard) {
      navigator.clipboard.writeText(icon.getAttribute("data-site-copy")).then(function () { if (window.YBM) YBM.snackbar("복사했어요: " + icon.getAttribute("data-site-copy")); });
    }
  });

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.body.removeAttribute("data-side-open"); });

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
  document.addEventListener("input", function (e) { if (e.target.matches("[data-site-search]")) filter(); });
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
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { var a = map[en.target.id]; if (a) mark(a); }
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) io.observe(h); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTheme(root.dataset.theme || "");
    frames().forEach(function (f) { f.addEventListener("load", function () { themeFrame(f); }); themeFrame(f); });
    fitThumbs();
    spy();
    // 왼쪽 메뉴: 지금 페이지 항목이 안 보이면 보이는 곳까지 내린다
    var side = document.querySelector(".site-side");
    var cur = side && side.querySelector(".site-nav:not(.site-side__mobile .site-nav) [aria-current='page']");
    if (cur && cur.offsetTop + cur.offsetHeight > side.clientHeight) side.scrollTop = cur.offsetTop - side.clientHeight / 3;
  });
})();
