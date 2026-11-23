/*
 * Fashion Browsing Study — single-item swipe vs. multi-item grid.
 *
 * Plain JavaScript, no build step. Product content lives in data/products.js.
 * The only thing kept in sessionStorage is the participant's position in the
 * flow (screen, current product, scroll position) so an accidental reload does
 * not reset the task. Nothing about the participant is recorded or exported.
 */
(function () {
  "use strict";

  var DATA = window.STUDY_DATA;
  var STORAGE_KEY = "fashion-study-session-v1";

  // Product Set 1 is always used in Part 1 and Set 2 in Part 2.
  var PART_SETS = ["set1", "set2"];
  var ORDERS = {
    "swipe-first": ["swipe", "grid"],
    "grid-first": ["grid", "swipe"]
  };

  var STANDARD_INSTRUCTION =
    "Browse the products and select the one you would be most likely to purchase.";

  var app = document.getElementById("app");

  /* ------------------------------------------------------------------------
     State
     ------------------------------------------------------------------------ */
  function initialState() {
    return {
      screen: "welcome",   // welcome | order | instructions | browse | transition | complete
      order: null,         // "swipe-first" | "grid-first"
      part: 0,             // 0 = first condition, 1 = second condition
      swipeIndex: 0,
      gridScroll: 0,
      detailId: null,      // product open in grid detail view
      confirmId: null      // product shown in confirmation modal
    };
  }

  function loadState() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var saved = JSON.parse(raw);
      var s = initialState();
      for (var k in s) if (k in saved) s[k] = saved[k];
      return s;
    } catch (e) {
      return null;
    }
  }

  function saveState() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  var state = loadState() || initialState();

  function currentMode() { return ORDERS[state.order][state.part]; }
  function currentProducts() { return DATA.sets[PART_SETS[state.part]]; }
  function findProduct(id) {
    var list = currentProducts();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function go(patch) {
    for (var k in patch) state[k] = patch[k];
    saveState();
    render();
  }

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function formatPrice(n) {
    return DATA.currency + Number(n).toLocaleString("en-US");
  }

  function mediaHTML(p, eager) {
    return (
      '<div class="product-media">' +
        '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" draggable="false" ' +
        'loading="' + (eager ? "eager" : "lazy") + '" decoding="async" ' +
        'onerror="this.style.visibility=\'hidden\'">' +
      "</div>"
    );
  }

  function infoHTML(p) {
    return (
      '<div class="product-info">' +
        '<h2 class="product-name">' + esc(p.name) + "</h2>" +
        (DATA.showPrices ? '<p class="product-price">' + formatPrice(p.price) + "</p>" : "") +
      "</div>"
    );
  }

  function preload(list) {
    list.forEach(function (p) { var i = new Image(); i.src = p.image; });
  }

  function on(selector, event, handler, root) {
    var els = (root || app).querySelectorAll(selector);
    Array.prototype.forEach.call(els, function (el) { el.addEventListener(event, handler); });
  }

  var ICON = {
    hanger:
      '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M20 13.5a4 4 0 1 1 5.6 3.7c-1 .4-1.6 1.4-1.6 2.5V21"/><path d="M24 21 6.5 33.2c-1.3.9-.7 2.8.9 2.8h33.2c1.6 0 2.2-1.9.9-2.8L24 21Z"/></svg>',
    swipe:
      '<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">' +
      '<rect x="9" y="5" width="18" height="24" rx="4"/><path d="M6 9.5v15a3 3 0 0 0 3 3" stroke-linecap="round"/></svg>',
    grid:
      '<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="2">' +
      '<rect x="5" y="5" width="10" height="10" rx="2.5"/><rect x="19" y="5" width="10" height="10" rx="2.5"/>' +
      '<rect x="5" y="19" width="10" height="10" rx="2.5"/><rect x="19" y="19" width="10" height="10" rx="2.5"/></svg>',
    check:
      '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="14" cy="14" r="11"/><path d="m9.5 14.2 3 3 6-6.2"/></svg>',
    hangerSmall:
      '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M20 13.5a4 4 0 1 1 5.6 3.7c-1 .4-1.6 1.4-1.6 2.5V21"/><path d="M24 21 6.5 33.2c-1.3.9-.7 2.8.9 2.8h33.2c1.6 0 2.2-1.9.9-2.8L24 21Z"/></svg>',
    left:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>',
    right:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>'
  };

  /* ------------------------------------------------------------------------
     Screens
     ------------------------------------------------------------------------ */
  var screens = {};

  // 1. Welcome
  screens.welcome = function () {
    app.innerHTML =
      '<section class="screen">' +
        '<div class="screen__body screen__body--center">' +
          '<div class="icon-tile">' + ICON.hanger + "</div>" +
          '<h1 class="h1">Fashion<br>Browsing Study</h1>' +
          '<p class="lead">You will browse a selection of fashion products and select the one you would most likely purchase. ' +
          "You will do this twice, using two different shopping interfaces.</p>" +
        "</div>" +
        '<div class="screen__footer"><button class="btn btn-primary" data-next>Start</button></div>' +
      "</section>";
    on("[data-next]", "click", function () { go({ screen: "order" }); });
  };

  // 2. Interface order (selected by the researcher)
  screens.order = function () {
    function option(key, icon, title, sub, detail) {
      var sel = state.order === key;
      return (
        '<button class="option' + (sel ? " is-selected" : "") + '" role="radio" aria-checked="' + sel + '" data-order="' + key + '">' +
          '<span class="option__icon">' + icon + "</span>" +
          '<span class="option__text">' +
            '<span class="option__title">' + title + "</span>" +
            '<span class="option__sub">' + sub + "</span>" +
            '<span class="option__detail">' + detail + "</span>" +
          "</span>" +
          '<span class="radio" aria-hidden="true"></span>' +
        "</button>"
      );
    }
    app.innerHTML =
      '<section class="screen">' +
        '<div class="top-bar"><button class="icon-btn" data-back aria-label="Back">' + ICON.left + "</button></div>" +
        '<div class="screen__body">' +
          '<div class="progress" aria-hidden="true"><span class="is-on"></span><span></span><span></span></div>' +
          '<h1 class="h2" style="text-align:center">Interface order</h1>' +
          '<p class="lead" style="text-align:center">Both interfaces will be used, in the assigned order.</p>' +
          '<div class="options" role="radiogroup" aria-label="Interface order">' +
            option("swipe-first", ICON.swipe, "Swipe first", "Then grid",
              "1st: Swipe · Product Set 1<br>2nd: Grid · Product Set 2") +
            option("grid-first", ICON.grid, "Grid first", "Then swipe",
              "1st: Grid · Product Set 1<br>2nd: Swipe · Product Set 2") +
          "</div>" +
          '<p class="researcher-note">For the researcher: select the sequence assigned to this participant before handing over the device.</p>' +
        "</div>" +
        '<div class="screen__footer"><button class="btn btn-primary" data-next' + (state.order ? "" : " disabled") + ">Continue</button></div>" +
      "</section>";

    on("[data-order]", "click", function (e) {
      go({ order: e.currentTarget.getAttribute("data-order") });
    });
    on("[data-back]", "click", function () { go({ screen: "welcome" }); });
    on("[data-next]", "click", function () {
      if (!state.order) return;
      go({ screen: "instructions", part: 0, swipeIndex: 0, gridScroll: 0, detailId: null, confirmId: null });
    });
  };

  // 3. Task instructions (identical text before both conditions)
  screens.instructions = function () {
    preload(currentProducts());
    app.innerHTML =
      '<section class="screen">' +
        '<div class="screen__body">' +
          '<div class="progress" aria-hidden="true" style="margin-top:52px"><span class="is-on"></span><span class="is-on"></span><span></span></div>' +
          '<p class="eyebrow" style="text-align:center">Part ' + (state.part + 1) + " of 2</p>" +
          '<h1 class="h1" style="text-align:center">Task</h1>' +
          '<ul class="task-list">' +
            "<li>" + ICON.hangerSmall + "<span>" + STANDARD_INSTRUCTION + "</span></li>" +
            "<li>" + ICON.check + "<span>When you have decided, tap <strong>Select This Item</strong> and confirm your choice.</span></li>" +
          "</ul>" +
        "</div>" +
        '<div class="screen__footer"><button class="btn btn-primary" data-start>Start Browsing</button></div>' +
      "</section>";
    on("[data-start]", "click", function () {
      go({ screen: "browse", swipeIndex: 0, gridScroll: 0, detailId: null, confirmId: null });
    });
  };

  // 4/5. Browsing
  screens.browse = function () {
    if (currentMode() === "swipe") renderSwipe(); else renderGrid();
    if (state.detailId) openDetail(state.detailId, true);
    if (state.confirmId) openConfirm(state.confirmId, true);
  };

  // 7. Between-conditions transition (researcher advances manually)
  screens.transition = function () {
    app.innerHTML =
      '<section class="screen">' +
        '<div class="screen__body screen__body--center">' +
          '<div class="icon-tile">' + ICON.check.replace('stroke-width="2"', 'stroke-width="1.6"') + "</div>" +
          '<p class="eyebrow">Part 1 of 2 complete</p>' +
          '<h1 class="h2">Thank you</h1>' +
          '<p class="lead">Please hand the device back to the researcher.</p>' +
        "</div>" +
        '<div class="screen__footer">' +
          '<button class="btn btn-secondary" data-next>Continue to Part 2</button>' +
          '<p class="researcher-note" style="margin-top:12px">Researcher: tap when the participant is ready for Part 2.</p>' +
        "</div>" +
      "</section>";
    on("[data-next]", "click", function () {
      if (!window.confirm("Continue to Part 2?")) return;
      go({ screen: "instructions", part: 1, swipeIndex: 0, gridScroll: 0, detailId: null, confirmId: null });
    });
  };

  // 8. Final completion (no automatic restart)
  screens.complete = function () {
    app.innerHTML =
      '<section class="screen">' +
        '<div class="screen__body screen__body--center">' +
          '<div class="icon-tile">' + ICON.check.replace('stroke-width="2"', 'stroke-width="1.6"') + "</div>" +
          '<p class="eyebrow">Study complete</p>' +
          '<h1 class="h1">Thank you for participating!</h1>' +
          '<p class="lead">You have completed both browsing tasks.<br>Please hand the device back to the researcher.</p>' +
        "</div>" +
        '<div class="screen__footer" style="text-align:center">' +
          '<button class="text-link" data-reset>Researcher: start a new session</button>' +
        "</div>" +
      "</section>";
    on("[data-reset]", "click", function () {
      if (!window.confirm("Start a new session for the next participant?")) return;
      state = initialState();
      saveState();
      render();
    });
  };

  /* ------------------------------------------------------------------------
     Swipe-based browsing (one product at a time)
     ------------------------------------------------------------------------ */
  function renderSwipe() {
    var products = currentProducts();
    var media = products.map(function (p, i) {
      return '<div class="swipe-slide" aria-hidden="' + (i !== state.swipeIndex) + '">' + mediaHTML(p, true) + "</div>";
    }).join("");
    var info = products.map(function (p, i) {
      return '<div class="swipe-slide" aria-hidden="' + (i !== state.swipeIndex) + '">' + infoHTML(p) + "</div>";
    }).join("");

    app.innerHTML =
      '<section class="screen browse" data-mode="swipe">' +
        '<header class="browse-header"><span class="browse-header__title">Products</span></header>' +
        '<div class="swipe-media" data-swipe>' +
          '<div class="swipe-track" data-track>' + media + "</div>" +
          '<button class="nav-arrow nav-arrow--prev" data-prev aria-label="Previous product">' + ICON.left + "</button>" +
          '<button class="nav-arrow nav-arrow--next" data-next aria-label="Next product">' + ICON.right + "</button>" +
        "</div>" +
        '<div class="swipe-info" data-swipe>' +
          '<div class="swipe-track" data-track>' + info + "</div>" +
        "</div>" +
        '<div class="action-bar"><button class="btn btn-primary" data-select>Select This Item</button></div>' +
      "</section>";

    var tracks = app.querySelectorAll("[data-track]");
    var prevBtn = app.querySelector("[data-prev]");
    var nextBtn = app.querySelector("[data-next]");
    var last = products.length - 1;

    function setTransform(dx, animate) {
      Array.prototype.forEach.call(tracks, function (t) {
        t.classList.toggle("is-animating", !!animate);
        t.style.transform = "translate3d(calc(" + (-state.swipeIndex * 100) + "% + " + dx + "px), 0, 0)";
      });
    }

    function update(animate) {
      setTransform(0, animate);
      prevBtn.disabled = state.swipeIndex === 0;
      nextBtn.disabled = state.swipeIndex === last;
      Array.prototype.forEach.call(tracks, function (t) {
        Array.prototype.forEach.call(t.children, function (slide, i) {
          slide.setAttribute("aria-hidden", String(i !== state.swipeIndex));
        });
      });
    }

    function goTo(i) {
      i = Math.max(0, Math.min(last, i));
      state.swipeIndex = i;
      saveState();
      update(true);
    }

    prevBtn.addEventListener("click", function () { goTo(state.swipeIndex - 1); });
    nextBtn.addEventListener("click", function () { goTo(state.swipeIndex + 1); });
    app.querySelector("[data-select]").addEventListener("click", function () {
      openConfirm(products[state.swipeIndex].id);
    });

    // Touch / mouse drag. Swiping only navigates — it never selects or removes anything.
    var drag = null;
    function onDown(e) {
      if (state.confirmId) return;
      if (e.target.closest("button")) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: Date.now(), active: false, el: e.currentTarget };
    }
    function onMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x;
      var dy = e.clientY - drag.y;
      if (!drag.active) {
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
          drag.active = true;
          try { drag.el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
        } else if (Math.abs(dy) > 10) {
          drag = null;
          return;
        } else {
          return;
        }
      }
      e.preventDefault();
      var atEdge = (dx > 0 && state.swipeIndex === 0) || (dx < 0 && state.swipeIndex === last);
      setTransform(atEdge ? dx * 0.3 : dx, false);
    }
    function onUp(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var wasActive = drag.active;
      var dx = e.clientX - drag.x;
      var velocity = Math.abs(dx) / Math.max(1, Date.now() - drag.t);
      drag = null;
      if (!wasActive) return;
      var width = app.querySelector("[data-swipe]").clientWidth;
      var passed = Math.abs(dx) > Math.min(70, width * 0.18) || (velocity > 0.45 && Math.abs(dx) > 24);
      if (passed && dx < 0) goTo(state.swipeIndex + 1);       // swipe left → next
      else if (passed && dx > 0) goTo(state.swipeIndex - 1);  // swipe right → previous
      else update(true);                                       // snap back
    }
    on("[data-swipe]", "pointerdown", onDown);
    on("[data-swipe]", "pointermove", onMove);
    on("[data-swipe]", "pointerup", onUp);
    on("[data-swipe]", "pointercancel", onUp);

    update(false);
  }

  /* ------------------------------------------------------------------------
     Grid-based browsing (two columns, vertical scroll)
     ------------------------------------------------------------------------ */
  function renderGrid() {
    var products = currentProducts();
    var cards = products.map(function (p, i) {
      return (
        '<button class="grid-card" data-id="' + esc(p.id) + '">' +
          mediaHTML(p, i < 6) +
          '<span class="grid-card__name">' + esc(p.name) + "</span>" +
          (DATA.showPrices ? '<span class="grid-card__price">' + formatPrice(p.price) + "</span>" : "") +
        "</button>"
      );
    }).join("");

    app.innerHTML =
      '<section class="screen browse" data-mode="grid">' +
        '<header class="browse-header"><span class="browse-header__title">Products</span></header>' +
        '<div class="grid-scroll" data-grid-scroll>' +
          '<div class="product-grid">' + cards + "</div>" +
        "</div>" +
      "</section>";

    var scroller = app.querySelector("[data-grid-scroll]");
    scroller.scrollTop = state.gridScroll;

    var pending = false;
    scroller.addEventListener("scroll", function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        state.gridScroll = scroller.scrollTop;
        saveState();
      });
    }, { passive: true });

    // Tapping a card only opens its detail page — it never selects the product.
    on(".grid-card", "click", function (e) {
      openDetail(e.currentTarget.getAttribute("data-id"));
    });
  }

  // Grid detail view: an overlay on top of the grid, so the grid (and its
  // scroll position) stays exactly as it was underneath.
  function openDetail(id, restoring) {
    var p = findProduct(id);
    if (!p) return;
    state.detailId = id;
    if (!restoring) saveState();
    closeEl("[data-detail]");

    var el = document.createElement("section");
    el.className = "screen browse detail";
    el.setAttribute("data-detail", "");
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", p.name);
    el.innerHTML =
      '<header class="browse-header">' +
        '<button class="icon-btn" data-close aria-label="Back to all products">' + ICON.left + "</button>" +
        '<span class="browse-header__title">Products</span>' +
      "</header>" +
      '<div class="detail-media">' + mediaHTML(p, true) + "</div>" +
      infoHTML(p) +
      '<div class="action-bar"><button class="btn btn-primary" data-select>Select This Item</button></div>';
    app.appendChild(el);

    el.querySelector("[data-close]").addEventListener("click", closeDetail);
    el.querySelector("[data-select]").addEventListener("click", function () { openConfirm(p.id); });
  }

  function closeDetail() {
    state.detailId = null;
    saveState();
    closeEl("[data-detail]");
  }

  /* ------------------------------------------------------------------------
     Selection confirmation (shared by both interfaces)
     ------------------------------------------------------------------------ */
  function openConfirm(id, restoring) {
    var p = findProduct(id);
    if (!p) return;
    state.confirmId = id;
    if (!restoring) saveState();
    closeEl("[data-confirm-modal]");

    var el = document.createElement("div");
    el.className = "modal-backdrop";
    el.setAttribute("data-confirm-modal", "");
    el.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">' +
        '<h2 class="h2" id="confirm-title">Confirm your selection</h2>' +
        '<div class="modal-media">' + mediaHTML(p, true) + "</div>" +
        infoHTML(p) +
        '<button class="btn btn-primary" data-confirm>Confirm Selection</button>' +
        '<button class="btn btn-secondary" data-cancel>Go Back</button>' +
      "</div>";
    app.appendChild(el);

    el.querySelector("[data-cancel]").addEventListener("click", closeConfirm);
    el.querySelector("[data-confirm]").addEventListener("click", finalizeSelection);
  }

  function closeConfirm() {
    state.confirmId = null;
    saveState();
    closeEl("[data-confirm-modal]");
  }

  function finalizeSelection() {
    // The choice itself is not stored; it is visible in the screen recording.
    var reset = { swipeIndex: 0, gridScroll: 0, detailId: null, confirmId: null };
    reset.screen = state.part === 0 ? "transition" : "complete";
    go(reset);
  }

  function closeEl(selector) {
    var el = app.querySelector(selector);
    if (el) el.parentNode.removeChild(el);
  }

  /* ------------------------------------------------------------------------
     Render + safety guards
     ------------------------------------------------------------------------ */
  function render() {
    if (state.order === null && state.screen !== "welcome" && state.screen !== "order") {
      state = initialState();
    }
    (screens[state.screen] || screens.welcome)();
  }

  // Block the browser/OS back gesture from leaving the study. While browsing,
  // "back" closes the confirmation modal or grid detail view instead.
  history.replaceState({ study: "base" }, "");
  history.pushState({ study: "guard" }, "");
  window.addEventListener("popstate", function () {
    if (state.screen === "browse") {
      if (state.confirmId) closeConfirm();
      else if (state.detailId) closeDetail();
    }
    history.pushState({ study: "guard" }, "");
  });

  // Warn before reloading / closing the tab mid-study (desktop browsers).
  window.addEventListener("beforeunload", function (e) {
    if (state.screen === "welcome" || state.screen === "complete") return;
    e.preventDefault();
    e.returnValue = "";
  });

  // Desktop convenience: arrow keys in the swipe interface.
  document.addEventListener("keydown", function (e) {
    if (state.screen !== "browse" || state.confirmId || currentMode() !== "swipe") return;
    if (e.key === "ArrowRight") { var n = app.querySelector("[data-next]"); if (n && !n.disabled) n.click(); }
    if (e.key === "ArrowLeft") { var b = app.querySelector("[data-prev]"); if (b && !b.disabled) b.click(); }
  });

  render();
})();
