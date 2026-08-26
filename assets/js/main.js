/* Cortessa site — minimal vanilla JS. No external calls.
   Responsibilities: accessible mobile nav toggle, header scroll state,
   and the progressive reveal-on-scroll (inert without JS; disabled under
   prefers-reduced-motion by the CSS media query that scopes .js .reveal). */
(function () {
  "use strict";

  // Signal that JS is live — reveal styles apply only under html.js.
  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu on Escape for keyboard users.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Subtle rule strengthening on the sticky header once scrolled.
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Reveal-on-scroll. Content must NEVER be stuck hidden, so this is layered:
  // anything already in the viewport shows immediately; IntersectionObserver
  // handles the rest; and a failsafe timer reveals whatever is left in case
  // the observer never fires (old engines, prerendering, hidden tabs).
  var revealed = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!revealed.length) return;

  var show = function (el) { el.classList.add("is-visible"); };

  var pending = revealed.filter(function (el) {
    var r = el.getBoundingClientRect();
    var inView = r.top < window.innerHeight * 0.92 && r.bottom > 0;
    if (inView) show(el);
    return !inView;
  });

  if (pending.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    pending.forEach(function (el) { io.observe(el); });
  } else {
    pending.forEach(show);
  }

  // Failsafe: after 2.5s, nothing may remain hidden regardless of observer state.
  window.setTimeout(function () { revealed.forEach(show); }, 2500);
})();
