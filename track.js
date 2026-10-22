/* GRC Training Online: sends a "buy_click" event to Google Analytics when a visitor
   clicks a checkout link (Stripe, Lemon Squeezy, or an Eventbrite ticket page).
   Mark "buy_click" as a key event in Analytics to see it under Key events. */
(function () {
  "use strict";
  function provider(u) {
    var h = u.hostname.toLowerCase(), p = u.pathname;
    if (h === "buy.stripe.com") return "stripe";
    if (h.slice(-16) === "lemonsqueezy.com") return "lemonsqueezy";
    if ((h === "www.eventbrite.com" || h === "eventbrite.com") && p.indexOf("/e/") === 0) return "eventbrite";
    return "";
  }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a || typeof window.gtag !== "function") return;
    var u;
    try { u = new URL(a.href, location.href); } catch (x) { return; }
    var pr = provider(u);
    if (!pr) return;
    window.gtag("event", "buy_click", {
      provider: pr,
      button_text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
      link_url: (u.origin + u.pathname).slice(0, 200),
      page_path: location.pathname,
      transport_type: "beacon"
    });
  }, true);
})();
