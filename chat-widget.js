(() => {
  const endpoint = 'https://formspree.io/f/xeeynzzz';

  function createWidget() {
    const widget = document.createElement('section');
    widget.className = 'site-chat';
    widget.innerHTML = `
      <div class="site-chat__panel" id="site-chat-panel" aria-hidden="true">
        <div class="site-chat__header">
          <div>
            <p class="site-chat__eyebrow">GRC Training Online</p>
            <h2>How can we help?</h2>
          </div>
          <button class="site-chat__close" type="button" aria-label="Close chat">&times;</button>
        </div>
        <p class="site-chat__intro">Send us a message and our team will get back to you as soon as possible.</p>
        <form class="site-chat__form">
          <label>Name<input name="name" autocomplete="name" required></label>
          <label>Email<input name="email" type="email" autocomplete="email" required></label>
          <label>Message<textarea name="message" rows="4" required placeholder="How can we help?"></textarea></label>
          <input type="hidden" name="_subject" value="New website chat message">
          <input type="hidden" name="source" value="Website chat">
          <button type="submit" class="site-chat__send">Send message</button>
          <p class="site-chat__status" aria-live="polite"></p>
        </form>
      </div>
      <button class="site-chat__toggle" type="button" aria-expanded="false" aria-controls="site-chat-panel">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.8 9.8 0 0 1-4.3-1L3 20l1.5-4.2A8.3 8.3 0 0 1 3 11.5a8.5 8.5 0 0 1 9-8.5 8.5 8.5 0 0 1 9 8.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>
        <span>Chat with us</span>
      </button>`;
    document.body.append(widget);

    const panel = widget.querySelector('.site-chat__panel');
    const toggle = widget.querySelector('.site-chat__toggle');
    const close = widget.querySelector('.site-chat__close');
    const form = widget.querySelector('.site-chat__form');
    const send = widget.querySelector('.site-chat__send');
    const status = widget.querySelector('.site-chat__status');

    const setOpen = (open) => {
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      if (open) panel.querySelector('input').focus();
    };
    toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
    close.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      send.disabled = true;
      send.textContent = 'Sending…';
      status.textContent = '';
      try {
        const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Message could not be sent');
        form.reset();
        status.textContent = 'Thanks — your message has been sent.';
      } catch (_) {
        status.textContent = 'We could not send your message. Please use our Contact page.';
      } finally {
        send.disabled = false;
        send.textContent = 'Send message';
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createWidget);
  else createWidget();
})();
