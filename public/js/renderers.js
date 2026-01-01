/**
 * UI Rendering Components
 * Responsible for rendering ProjectionOutput verbatim.
 */

const Renderers = {
    /**
     * Renders the main stream entries.
     * @param {Array} entries - Array of entry objects from ProjectionOutput.stream.entries
     * @param {HTMLElement} container - The DOM element to render into
     */
    renderStream: (entries, container) => {
        // Note: We append new entries. In a real app, we might reconcile.
        // For this phase, we just append what we get.
        // Actually, the contract says "Projection MUST be consistent across idempotency replay".
        // If we get a full list, we should probably clear and re-render or be smart.
        // For simplicity and correctness, we'll clear and re-render the current view 
        // (assuming the backend sends the relevant slice).
        // Wait, contract says "cursor_before/after". This implies pagination.
        // We will append if it's a new page, but for now let's just render what we are given.
        
        // Clear for now to avoid duplicates if the backend sends the whole history.
        container.innerHTML = ''; 

        if (!entries || entries.length === 0) {
            // Silence is valid. Render nothing.
            return;
        }

        entries.forEach(entry => {
            const el = document.createElement('div');
            el.className = `entry channel-${entry.channel}`;
            el.dataset.entryId = entry.entry_id;

            if (entry.author_label) {
                const label = document.createElement('span');
                label.className = 'author-label';
                label.textContent = entry.author_label;
                el.appendChild(label);
            }

            const text = document.createElement('div');
            text.className = 'entry-text';
            text.textContent = entry.text; // Verbatim text
            el.appendChild(text);

            container.appendChild(el);
        });

        // Auto-scroll to bottom
        container.scrollTop = container.scrollHeight;
    },

    /**
     * Renders the Pocket overlay.
     * @param {Object} pocket - The pocket object from ProjectionOutput.pocket
     * @param {HTMLElement} container - The DOM element for the pocket
     */
    renderPocket: (pocket, container) => {
        if (!pocket || !pocket.is_available) {
            container.classList.add('hidden');
            return;
        }

        container.classList.remove('hidden');
        
        // Clock
        const clockEl = container.querySelector('#world-time');
        if (clockEl && pocket.clock) {
            clockEl.textContent = pocket.clock.world_time || '--:--';
        }

        // Calendar
        const calendarContainer = container.querySelector('#pocket-calendar');
        if (calendarContainer) {
            calendarContainer.innerHTML = '<div class="pocket-section-title">Calendar</div>';
            if (pocket.calendar && pocket.calendar.items) {
                pocket.calendar.items.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'pocket-item';
                    el.textContent = `${item.time || ''} ${item.title}`;
                    calendarContainer.appendChild(el);
                });
            }
        }

        // Messages
        const messagesContainer = container.querySelector('#pocket-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '<div class="pocket-section-title">Messages</div>';
            if (pocket.messages && pocket.messages.items) {
                pocket.messages.items.forEach(msg => {
                    const el = document.createElement('div');
                    el.className = 'pocket-item';
                    el.textContent = `${msg.from}: ${msg.text}`;
                    messagesContainer.appendChild(el);
                });
            }
        }
    }
};
