/* Renders data.js into the page and wires the theme switch and the RL-loop figure. */
(function () {
  "use strict";
  var S = window.SITE, P = S.profile;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var GH_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>';

  /* ---------- Profile and links ---------- */
  var mail = "mailto:" + P.email.user + "@" + P.email.host;  // assembled here, not in the HTML, to keep scrapers off
  $("hero-role").textContent = P.title + " · " + P.org;
  $("hero-statement").textContent = P.statement;
  $("hero-meta").textContent = P.location;
  ["hero-cv", "contact-cv", "cv-link"].forEach(function (id) { $(id).href = P.cv; });
  /* Email: a small panel with the address, a copy button and webmail links, because a bare
     mailto: does nothing for visitors without a configured mail app. */
  var addr = P.email.user + "@" + P.email.host;
  function closeEmail() {
    Array.prototype.forEach.call(document.querySelectorAll(".email-pop"), function (p) { p.remove(); });
    Array.prototype.forEach.call(document.querySelectorAll("[aria-haspopup=dialog]"), function (b) { b.setAttribute("aria-expanded", "false"); });
  }
  function openEmail(btn) {
    var open = btn.getAttribute("aria-expanded") === "true";
    closeEmail();
    if (open) return;
    var pop = document.createElement("div");
    pop.className = "email-pop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", "Email address");
    pop.innerHTML =
      '<p class="email-addr mono">' + esc(addr) + "</p>" +
      '<button type="button" class="btn btn-small btn-primary email-copy">Copy address</button>' +
      '<p class="email-links">Write from ' +
        '<a href="https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(addr) + '" target="_blank" rel="noopener">Gmail</a> · ' +
        '<a href="https://outlook.live.com/mail/0/deeplink/compose?to=' + encodeURIComponent(addr) + '" target="_blank" rel="noopener">Outlook</a> · ' +
        '<a href="' + mail + '">mail app</a></p>';
    btn.parentNode.appendChild(pop);
    btn.setAttribute("aria-expanded", "true");
    var copy = pop.querySelector(".email-copy");
    copy.addEventListener("click", function () {
      var done = function () { copy.textContent = "Copied"; };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(addr).then(done, function () { selectAddr(pop); });
      } else { selectAddr(pop); }
    });
    copy.focus();
  }
  function selectAddr(pop) {
    var r = document.createRange();
    r.selectNodeContents(pop.querySelector(".email-addr"));
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    try { if (document.execCommand("copy")) pop.querySelector(".email-copy").textContent = "Copied"; } catch (e) {}
  }
  ["hero-email", "contact-email"].forEach(function (id) {
    $(id).addEventListener("click", function (e) { e.stopPropagation(); openEmail($(id)); });
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".email-pop")) closeEmail(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeEmail(); });
  $("hero-github").href = P.links.github;
  $("hero-linkedin").href = P.links.linkedin;
  $("year").textContent = new Date().getFullYear();

  /* ---------- At a glance ---------- */
  $("glance").innerHTML = S.glance.map(function (g) {
    return '<div class="glance-item"><dt>' + esc(g[0]) + "</dt><dd>" + esc(g[1]) + "</dd></div>";
  }).join("");

  /* ---------- Work ---------- */
  $("work-list").innerHTML = S.work.map(function (w) {
    return '<article class="card work" id="' + w.id + '">' +
      '<header class="work-head"><p class="work-org mono">' + esc(w.org) + "</p>" +
        (w.status ? '<span class="badge">' + esc(w.status) + "</span>" : "") +
        "<h3>" + esc(w.title) + "</h3></header>" +
      '<dl class="metrics">' + w.metrics.map(function (m) {
        return '<div class="metric"><dt>' + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>";
      }).join("") + "</dl>" +
      '<ul class="bullets">' + w.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>" +
      '<ul class="tags" aria-label="Tools and topics">' + w.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      "</article>";
  }).join("");

  $("earlier").innerHTML = S.earlier.map(function (e) {
    return '<li><span class="when mono">' + esc(e.when) + "</span><div><h4>" + esc(e.title) +
      ' <span class="where">' + esc(e.where) + "</span></h4><p>" + e.text + "</p></div></li>";
  }).join("");

  /* ---------- chronobox ---------- */
  var C = S.chronobox, B = C.bench;
  $("cb-since").textContent = C.since;
  var bar = function (v, cls) { return '<span class="bar-cell"><span class="meter ' + cls + '"><i style="width:' + v + '%"></i></span><span class="bar-v">' + v + "%</span></span>"; };
  $("cb").innerHTML =
    '<div class="cb-intro">' +
      '<p class="lede">' + C.pitch + "</p>" +
      '<a class="btn" href="' + C.repo + '" rel="noopener">' + GH_ICON + " Geawher/chronobox</a>" +
    "</div>" +
    '<ul class="features">' + C.features.map(function (f) {
      return '<li class="card feature"><h4>' + esc(f[0]) + "</h4><p>" + esc(f[1]) + "</p></li>";
    }).join("") + "</ul>" +
    '<div class="card bench">' +
      '<div class="bench-head"><h3>' + esc(B.title) + ': does it help?</h3>' +
        '<a class="btn btn-small" href="' + B.repo + '" rel="noopener">' + GH_ICON + " Geawher/chronobox-ops</a></div>" +
      '<p class="bench-pitch">' + esc(B.pitch) + "</p>" +
      '<div class="table-wrap"><table class="results">' +
        "<caption>" + esc(B.caption) + "</caption>" +
        '<thead><tr><th scope="col">Model</th><th scope="col">Success, alone</th><th scope="col">Success, chronobox</th><th scope="col">Harmed users, alone</th><th scope="col">Harmed users, chronobox</th></tr></thead>' +
        "<tbody>" + B.rows.map(function (r) {
          return '<tr><th scope="row">' + esc(r[0]) + "</th><td>" + bar(r[1], "ok dim") + "</td><td>" + bar(r[2], "ok") +
            "</td><td>" + bar(r[3], "harm dim") + "</td><td>" + bar(r[4], "harm") + "</td></tr>";
        }).join("") + "</tbody></table></div>" +
      '<ul class="findings">' + B.findings.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>" +
    "</div>";

  /* ---------- Teaching ---------- */
  $("teaching-list").innerHTML = S.teaching.map(function (t) {
    return '<li><span class="when mono">' + esc(t.when) + '</span><div class="tl-body"><h3>' + esc(t.where) +
      ' <span class="role">' + esc(t.role) + "</span></h3><p>" + esc(t.text) + "</p></div></li>";
  }).join("");

  /* ---------- Mentoring ---------- */
  $("mentor-intro").textContent = S.mentoring.intro;
  $("mentor-grid").innerHTML = S.mentoring.projects.map(function (m) {
    return '<article class="card mentor"><p class="mentor-meta mono"><span>' + esc(m.when) + '</span><span class="badge">' +
      esc(m.outcome) + "</span></p><h3>" + esc(m.title) + "</h3><p>" + esc(m.text) + "</p></article>";
  }).join("");

  /* ---------- About ---------- */
  $("about-text").innerHTML = P.about.map(function (p) { return "<p>" + p + "</p>"; }).join("");
  $("edu").innerHTML = S.education.map(function (e) {
    return "<li><strong>" + esc(e[0]) + "</strong><span>" + esc(e[1]) + "</span><span class=\"mono\">" + esc(e[2]) + "</span></li>";
  }).join("");
  $("langs").textContent = S.languages;

  /* ---------- "What I build" figure ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".loop-tabs button"));
  function select(part) {
    var L = S.showcase[part];
    tabs.forEach(function (t) {
      var on = t.dataset.part === part;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      $("panel-" + t.dataset.part).hidden = !on;
    });
    $("loop-caption").innerHTML = L.text + ' <a href="' + L.href + '">See the work →</a>';
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(t.dataset.part); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      var n = tabs[(i + d + tabs.length) % tabs.length];
      n.focus(); select(n.dataset.part);
    });
  });
  select("rl");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    Array.prototype.forEach.call(document.querySelectorAll(".pulse"), function (p) { p.remove(); });
  }

  /* ---------- Links ---------- */
  /* Anything that leaves the page (other sites, the CV PDF) opens in a new tab; in-page anchors
     and mailto: stay as they are. Runs on rendered links and on ones added later (email panel). */
  function newTab(a) {
    var href = a.getAttribute("href") || "";
    if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0) return;
    a.target = "_blank";
    a.rel = "noopener";
  }
  Array.prototype.forEach.call(document.querySelectorAll("a[href]"), newTab);
  document.addEventListener("click", function (e) { var a = e.target.closest("a[href]"); if (a) newTab(a); }, true);

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  function current() {
    return root.getAttribute("data-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function label() { $("theme-toggle").setAttribute("aria-label", current() === "dark" ? "Switch to light theme" : "Switch to dark theme"); }
  $("theme-toggle").addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });
  label();
})();
