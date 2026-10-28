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
    document.querySelectorAll(".ds-popover[id]:not([hidden])").forEach(function (p) { if (p !== except) setPopover(p, false); });
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
    if (!t.closest(".ds-popover")) closePopovers();

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
    if (t.tagName === "DIALOG" && (t.classList.contains("ds-dialog") || t.classList.contains("ds-bottomsheet")) && t.getAttribute("role") !== "alertdialog") closeDialog(t);
  });

  // Esc = 열린 Popover 닫기 / Time Picker 열에서 위아래 화살표 = 한 칸씩
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var open = document.querySelector(".ds-popover[id]:not([hidden])");
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

  window.YBM = { openDialog: openDialog, closeDialog: closeDialog, snackbar: snackbar, init: init };
})();
