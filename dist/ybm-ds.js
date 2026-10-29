/* ==========================================================================
   YBM Design System — 공통 인터랙션 (의존성 없음, 모든 서비스 공용)
   --------------------------------------------------------------------------
   원칙: 모양은 CSS, 스크립트는 "CSS만으로 안 되는 동작"만.
     · Text Field clear 버튼 — 값 지우기 (노출/숨김은 CSS 가 처리)
     · Dialog — data-ds-open / data-ds-close 속성으로 열고 닫기, 바깥(dim) 클릭 닫기
     · Snackbar — YBM.snackbar("문구", { variant: "positive"|"critical", action: "확인", onAction, duration })
     · Slider — <input class="ds-slider"> 채움 길이(--ds-slider-value) 동기화
     · Checkbox — data-indeterminate 속성 → input.indeterminate
     · Popover — data-ds-popover="id" 로 열고 닫기, 바깥 클릭과 Esc, 안의 data-ds-close 로 닫기
     · Time Picker — 가운데 온 항목에 aria-selected, 멈추면 열에서 change(detail.value), 항목 누름과 화살표 키로 이동
     · Chat Composer — 입력이 비면 보내기 비활성, field-sizing 이 없는 브라우저에서 높이 맞춤
     · Search Suggestion — 입력 칸(role=combobox, aria-controls)에서 위아래 화살표로 줄 고르기, Enter 로 그 줄 누르기
     · Menu Sheet — Dialog 와 같이 열고 닫기, 바깥(dim) 클릭 닫기
     · Timer — data-start(흐른 시간) / data-end(남은 시간)로 1초마다 글자를 바꾸고, 남은 시간이 0 이면 ds-timer-end 이벤트
     · Side Panel — Dialog 와 같이 열고 닫기, 본문이 스크롤되면 data-scrolled
     · Pull To Refresh — 터치로 당긴 거리 표시, 넘겨 놓으면 ds-refresh 이벤트, YBM.endRefresh(요소) 로 되돌리기
     · Carousel — 처음/끝이면 data-at-start / data-at-end, 버튼으로 한 화면씩 넘기기
     · Code Block — data-ds-copy 버튼으로 코드 복사
     · Multi Select — Popover 와 같이 열고 닫기, 고른 값을 칸에 Badge 로 채우기
     · File Attach — 파일을 끌어 놓는 칸 위로 끌고 오면 data-state="dragover", 벗어나거나 놓으면 뺀다
   사용: <script src="…/ybm-ds/dist/ybm-ds.js" defer></script>
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Dialog ----------------------------------------------------------- */
  function openDialog(id) {
    var dialog = document.getElementById(id);
    if (dialog && !dialog.open) dialog.showModal();
    return dialog;
  }
  function closeDialog(dialog, value) {
    if (typeof dialog === "string") dialog = document.getElementById(dialog);
    if (dialog && dialog.open) dialog.close(value || "");
  }

  /* ---- Snackbar --------------------------------------------------------- */
  var snackbarTimer;
  var SNACK_ICON = { positive: "circle-check-solid", critical: "circle-alert-solid" };
  function snackbar(message, opts) {
    if (typeof opts === "number") opts = { duration: opts };   // 하위호환: snackbar(msg, ms)
    opts = opts || {};
    var el = document.querySelector(".ds-snackbar");
    if (!el) {
      el = document.createElement("div");
      el.className = "ds-snackbar";
      el.setAttribute("role", "status");
      el.setAttribute("data-state", "closed");
      document.body.appendChild(el);
    }
    el.textContent = "";
    if (opts.variant && opts.variant !== "default") el.setAttribute("data-variant", opts.variant);
    else el.removeAttribute("data-variant");
    if (SNACK_ICON[opts.variant]) {
      var icon = document.createElement("i");
      icon.className = "ds-icon ds-icon--" + SNACK_ICON[opts.variant];
      icon.setAttribute("aria-hidden", "true");
      el.appendChild(icon);
    }
    var msg = document.createElement("span");
    msg.className = "ds-snackbar__message";
    msg.textContent = message;
    el.appendChild(msg);
    if (opts.action) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ds-snackbar__action";
      btn.textContent = opts.action;
      btn.addEventListener("click", function () {
        if (opts.onAction) opts.onAction();
        el.setAttribute("data-state", "closed");
      });
      el.appendChild(btn);
    }
    requestAnimationFrame(function () { el.setAttribute("data-state", "open"); });
    clearTimeout(snackbarTimer);
    snackbarTimer = setTimeout(function () { el.setAttribute("data-state", "closed"); }, opts.duration || 4000);
  }

  /* ---- Slider: 채움 길이 ---------------------------------------------------- */
  function syncSlider(input) {
    var min = parseFloat(input.min || 0), max = parseFloat(input.max || 100), v = parseFloat(input.value);
    input.style.setProperty("--ds-slider-value", ((v - min) / (max - min || 1)) * 100 + "%");
  }
  document.addEventListener("input", function (e) {
    if (e.target.classList && e.target.classList.contains("ds-slider")) syncSlider(e.target);
  });

  /* ---- Popover: data-ds-popover="id" 로 열고 닫기 --------------------------- */
  function setPopover(pop, open) {
    if (!pop || pop.hidden === !open) return;
    pop.hidden = !open;
    document.querySelectorAll('[data-ds-popover="' + pop.id + '"]').forEach(function (b) { b.setAttribute("aria-expanded", String(open)); });
  }
  function closePopovers(except) {
    document.querySelectorAll(".ds-popover[id]:not([hidden]), .ds-multiselect__panel[id]:not([hidden])").forEach(function (p) { if (p !== except) setPopover(p, false); });
  }

  /* ---- Time Picker: 가운데 온 항목 = 선택값 ---------------------------------- */
  function syncWheel(col, notify) {
    var opts = col.querySelectorAll(".ds-timepicker__option");
    if (!opts.length) return;
    var h = opts[0].offsetHeight || 44;
    var idx = Math.max(0, Math.min(opts.length - 1, Math.round(col.scrollTop / h)));
    opts.forEach(function (o, i) {
      if (i === idx) o.setAttribute("aria-selected", "true"); else o.removeAttribute("aria-selected");
      if (Math.abs(i - idx) === 1) o.setAttribute("data-near", ""); else o.removeAttribute("data-near");
    });
    // 굴리는 동안은 표시만 바꾸고, 멈춘 뒤 값이 바뀌었을 때만 change 를 보낸다
    if (!notify) { if (!wheelValue.has(col)) wheelValue.set(col, opts[idx]); return; }
    if (wheelValue.get(col) === opts[idx]) return;
    wheelValue.set(col, opts[idx]);
    col.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: opts[idx].getAttribute("data-value") || opts[idx].textContent.trim() } }));
  }
  var wheelValue = new WeakMap();
  function scrollWheelTo(col, opt, smooth) {
    col.scrollTo({ top: opt.offsetTop - col.querySelector(".ds-timepicker__option").offsetTop, behavior: smooth ? "smooth" : "auto" });
  }
  var wheelTimer = new WeakMap();
  document.addEventListener("scroll", function (e) {
    var col = e.target;
    if (!col.classList || !col.classList.contains("ds-timepicker__column")) return;
    syncWheel(col, false);
    clearTimeout(wheelTimer.get(col));
    wheelTimer.set(col, setTimeout(function () { syncWheel(col, true); }, 120));
  }, true);

  /* ---- Chat Composer: 비어 있으면 보내기 비활성 + 줄 수만큼 늘이기 ------------- */
  function syncComposer(input) {
    var send = input.closest(".ds-chat-composer").querySelector('.ds-chat-send:not([data-state="stop"])');
    if (send) send.disabled = !input.value.trim();
    if (!CSS.supports || !CSS.supports("field-sizing", "content")) { input.style.height = "auto"; input.style.height = input.scrollHeight + "px"; }
  }
  document.addEventListener("input", function (e) {
    if (e.target.classList && e.target.classList.contains("ds-chat-composer__input")) syncComposer(e.target);
  });

  /* ---- Timer: data-start 부터 흐른 시간 / data-end 까지 남은 시간 ------------ */
  function toTime(v) { var n = Number(v); return isNaN(n) ? Date.parse(v) : n; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function formatTime(sec, format) {
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    if (format === "elapsed") return h ? h + "시간 " + pad(m) + "분" : m ? m + "분 " + pad(s) + "초" : s + "초";
    return h ? h + ":" + pad(m) + ":" + pad(s) : m + ":" + pad(s);
  }
  function tickTimers() {
    var now = Date.now();
    document.querySelectorAll(".ds-timer").forEach(function (el) {
      var end = el.getAttribute("data-end"), start = el.getAttribute("data-start");
      if (end == null && start == null) return;
      var ms = end != null ? toTime(end) - now : now - toTime(start);
      var sec = Math.max(0, end != null ? Math.ceil(ms / 1000) : Math.floor(ms / 1000));
      if (isNaN(sec)) return;
      el.textContent = formatTime(sec, el.getAttribute("data-format"));
      el.setAttribute("datetime", "PT" + sec + "S");
      if (end != null && sec === 0 && !el.hasAttribute("data-ended")) {
        el.setAttribute("data-ended", "");
        el.dispatchEvent(new CustomEvent("ds-timer-end", { bubbles: true }));
      }
    });
  }
  setInterval(tickTimers, 1000);

  /* ---- Carousel 끝 표시 / Side Panel 본문 스크롤 표시 --------------------- */
  function syncCarousel(car) {
    var sc = car.querySelector(".ds-carousel__scroller");
    if (!sc) return;
    var max = sc.scrollWidth - sc.clientWidth;
    car.toggleAttribute("data-at-start", sc.scrollLeft <= 1);
    car.toggleAttribute("data-at-end", sc.scrollLeft >= max - 1);
  }
  document.addEventListener("scroll", function (e) {
    var el = e.target;
    if (!el.classList) return;
    if (el.classList.contains("ds-carousel__scroller")) syncCarousel(el.parentElement);
    else if (el.classList.contains("ds-sidepanel__body")) el.toggleAttribute("data-scrolled", el.scrollTop > 0);
  }, true);

  /* ---- Multi Select: 고른 값을 칸에 Badge 로 ------------------------------- */
  function syncMultiSelect(panel) {
    var trigger = document.querySelector('[data-ds-popover="' + panel.id + '"]');
    var box = trigger && trigger.querySelector(".ds-multiselect__values");
    if (!box) return;
    var labels = [];
    panel.querySelectorAll(".ds-multiselect__option").forEach(function (o) {
      var c = o.querySelector("input");
      if (c && c.checked) labels.push(o.querySelector(".ds-multiselect__label").textContent);
    });
    var max = parseInt(box.getAttribute("data-max"), 10) || 2;
    box.textContent = "";
    labels.slice(0, max).forEach(function (l) { var b = document.createElement("span"); b.className = "ds-badge"; b.textContent = l; box.appendChild(b); });
    if (labels.length > max) { var m = document.createElement("span"); m.className = "ds-multiselect__overflow"; m.textContent = "+" + (labels.length - max); box.appendChild(m); }
  }
  document.addEventListener("change", function (e) {
    var panel = e.target.closest && e.target.closest(".ds-multiselect__panel[id]");
    if (panel) syncMultiSelect(panel);
  });

  /* ---- Pull To Refresh: 맨 위에서 아래로 당기기 ---------------------------- */
  var pull = null;
  function ptrParts(el) { return { ind: el.querySelector(".ds-ptr__indicator"), circle: el.querySelector(".ds-ptr__indicator .ds-progress-circle") }; }
  document.addEventListener("touchstart", function (e) {
    var el = e.target.closest && e.target.closest(".ds-ptr");
    if (!el || el.hasAttribute("data-disabled") || el.getAttribute("data-state") === "refreshing") return;
    var content = el.querySelector(".ds-ptr__content");
    if ((content && content.scrollTop > 0) || window.scrollY > 0) return;
    pull = { el: el, y: e.touches[0].clientY, d: 0 };
  }, { passive: true });
  document.addEventListener("touchmove", function (e) {
    if (!pull) return;
    var p = ptrParts(pull.el), size = p.ind.offsetHeight || 88;
    pull.d = Math.max(0, Math.min(size * 1.5, (e.touches[0].clientY - pull.y) * 0.5));
    pull.el.setAttribute("data-dragging", "");
    pull.el.style.setProperty("--ds-ptr-displacement", pull.d + "px");
    if (p.circle) p.circle.style.setProperty("--ds-progress-value", Math.min(100, Math.round((pull.d / size) * 100)));
  }, { passive: true });
  document.addEventListener("touchend", function () {
    if (!pull) return;
    var el = pull.el, p = ptrParts(el), size = p.ind.offsetHeight || 88;
    el.removeAttribute("data-dragging");
    if (pull.d >= size) {
      el.setAttribute("data-state", "refreshing");
      el.style.setProperty("--ds-ptr-displacement", size + "px");
      if (p.circle) p.circle.setAttribute("data-type", "indeterminate");
      el.dispatchEvent(new CustomEvent("ds-refresh", { bubbles: true }));
    } else el.style.setProperty("--ds-ptr-displacement", "0px");
    pull = null;
  });
  function endRefresh(el) {
    var p = ptrParts(el);
    el.removeAttribute("data-state");
    el.style.setProperty("--ds-ptr-displacement", "0px");
    if (p.circle) { p.circle.removeAttribute("data-type"); p.circle.style.setProperty("--ds-progress-value", 0); }
  }

  /* ---- 초기화: 페이지에 이미 있는 요소 ------------------------------------- */
  function init(root) {
    (root || document).querySelectorAll(".ds-slider").forEach(syncSlider);
    (root || document).querySelectorAll(".ds-checkbox__control[data-indeterminate]").forEach(function (c) { c.indeterminate = true; });
    (root || document).querySelectorAll(".ds-timepicker__column").forEach(function (col) {
      var sel = col.querySelector('.ds-timepicker__option[aria-selected="true"]');
      if (sel) scrollWheelTo(col, sel, false);
      syncWheel(col, false);
    });
    (root || document).querySelectorAll(".ds-chat-composer__input").forEach(syncComposer);
    tickTimers();
    (root || document).querySelectorAll(".ds-carousel").forEach(syncCarousel);
    (root || document).querySelectorAll(".ds-multiselect__panel[id]").forEach(syncMultiSelect);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(); });
  else init();

  /* ---- 이벤트 위임: 페이지에 요소가 나중에 추가돼도 동작 ------------------ */
  document.addEventListener("click", function (e) {
    var t = e.target;

    // clear 버튼 → 값 비우고 input 이벤트 발생(화면 검증 로직이 그대로 반응)
    var clear = t.closest(".ds-input__clear");
    if (clear) {
      var control = clear.closest(".ds-input").querySelector(".ds-input__control");
      control.value = "";
      control.dispatchEvent(new Event("input", { bubbles: true }));
      control.focus();
      return;
    }

    var popTrigger = t.closest("[data-ds-popover]");
    if (popTrigger) {
      var pop = document.getElementById(popTrigger.getAttribute("data-ds-popover"));
      closePopovers(pop);
      setPopover(pop, pop && pop.hidden);
      return;
    }
    // 열린 Popover 바깥을 누르면 닫는다
    if (!t.closest(".ds-popover, .ds-multiselect__panel")) closePopovers();

    // Carousel 버튼 → 한 화면의 80% 만큼 넘긴다
    var carBtn = t.closest(".ds-carousel__button");
    if (carBtn) {
      var sc = carBtn.closest(".ds-carousel").querySelector(".ds-carousel__scroller");
      sc.scrollBy({ left: (carBtn.getAttribute("data-direction") === "previous" ? -1 : 1) * sc.clientWidth * 0.8, behavior: "smooth" });
      return;
    }

    // Code Block 복사 버튼 → 코드를 복사하고 2초 동안 data-copied
    var copyBtn = t.closest("[data-ds-copy]");
    if (copyBtn) {
      var code = copyBtn.closest(".ds-codeblock").querySelector(".ds-codeblock__code");
      if (code && navigator.clipboard) navigator.clipboard.writeText(code.textContent).then(function () {
        copyBtn.setAttribute("data-copied", "");
        setTimeout(function () { copyBtn.removeAttribute("data-copied"); }, 2000);
      });
      return;
    }

    // Time Picker 항목을 누르면 그 값으로 굴린다
    var wheelOpt = t.closest(".ds-timepicker__option");
    if (wheelOpt) { scrollWheelTo(wheelOpt.parentElement, wheelOpt, true); return; }

    var opener = t.closest("[data-ds-open]");
    if (opener) { openDialog(opener.getAttribute("data-ds-open")); return; }

    var closer = t.closest("[data-ds-close]");
    if (closer) {
      var inPop = closer.closest(".ds-popover");
      if (inPop) { setPopover(inPop, false); var back = document.querySelector('[data-ds-popover="' + inPop.id + '"]'); if (back) back.focus(); }
      else closeDialog(closer.closest("dialog"));
      return;
    }

    // dialog 바깥(backdrop) 클릭 = dialog 요소 자신이 target
    // 단, Alert(role="alertdialog")는 버튼으로만 닫는다
    if (t.tagName === "DIALOG" && (t.classList.contains("ds-dialog") || t.classList.contains("ds-bottomsheet") || t.classList.contains("ds-menusheet") || t.classList.contains("ds-sidepanel")) && t.getAttribute("role") !== "alertdialog") closeDialog(t);
  });

  // Search Suggestion: 입력 칸에서 위아래 화살표로 줄을 고르고 Enter 로 누른다
  function moveSuggestion(input, e) {
    var panel = document.getElementById(input.getAttribute("aria-controls"));
    if (!panel || panel.hidden || !panel.classList.contains("ds-search-suggest")) return false;
    var items = [].slice.call(panel.querySelectorAll(".ds-search-suggest__item"));
    var cur = panel.querySelector(".ds-search-suggest__item[data-highlighted]");
    if (e.key === "Enter") {
      if (!cur) return false;
      e.preventDefault(); cur.click(); return true;
    }
    if (!items.length) return false;
    e.preventDefault();
    var i = items.indexOf(cur) + (e.key === "ArrowDown" ? 1 : -1);
    if (i < 0) i = items.length - 1; else if (i >= items.length) i = 0;
    items.forEach(function (it) { it.removeAttribute("data-highlighted"); it.removeAttribute("aria-selected"); });
    items[i].setAttribute("data-highlighted", ""); items[i].setAttribute("aria-selected", "true");
    if (items[i].id) input.setAttribute("aria-activedescendant", items[i].id);
    items[i].scrollIntoView({ block: "nearest" });
    return true;
  }

  // Esc = 열린 Popover 닫기 / Time Picker 열에서 위아래 화살표 = 한 칸씩 / 추천어 입력 칸에서 줄 고르기
  document.addEventListener("keydown", function (e) {
    if (e.target.getAttribute && e.target.getAttribute("role") === "combobox" && e.target.getAttribute("aria-controls")
      && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") && moveSuggestion(e.target, e)) return;
    if (e.key === "Escape") {
      var open = document.querySelector(".ds-popover[id]:not([hidden]), .ds-multiselect__panel[id]:not([hidden])");
      if (open) { setPopover(open, false); var back = document.querySelector('[data-ds-popover="' + open.id + '"]'); if (back) back.focus(); }
      return;
    }
    var col = e.target.classList && e.target.classList.contains("ds-timepicker__column") ? e.target : null;
    if (col && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.preventDefault();
      var cur = col.querySelector('.ds-timepicker__option[aria-selected="true"]');
      var next = cur && (e.key === "ArrowUp" ? cur.previousElementSibling : cur.nextElementSibling);
      if (next) scrollWheelTo(col, next, true);
    }
  });

  // clear 버튼을 누르는 순간 input 포커스가 빠지지 않게 (버튼이 사라지는 깜빡임 방지)
  document.addEventListener("mousedown", function (e) {
    if (e.target.closest(".ds-input__clear")) e.preventDefault();
  });

  // File Attach: 파일을 끌어 놓는 칸 위로 끌고 오면 표시 (놓기는 칸을 덮은 input 이 기본 동작으로 받는다)
  function dropZone(e) {
    var zone = e.target.closest && e.target.closest(".ds-fileattach__dropzone");
    return zone && !zone.querySelector(".ds-fileattach__input:disabled") ? zone : null;
  }
  document.addEventListener("dragenter", function (e) {
    var zone = dropZone(e);
    if (zone) zone.setAttribute("data-state", "dragover");
  });
  document.addEventListener("dragleave", function (e) {
    var zone = dropZone(e);
    if (zone && !zone.contains(e.relatedTarget)) zone.removeAttribute("data-state");
  });
  document.addEventListener("drop", function (e) {
    var zone = dropZone(e);
    if (zone) zone.removeAttribute("data-state");
  });

  window.YBM = { openDialog: openDialog, closeDialog: closeDialog, snackbar: snackbar, endRefresh: endRefresh, init: init };
})();
