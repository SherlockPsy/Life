/**
 * Main Application Logic
 * Handles State, HTTP Client, and Event Wiring.
 */

// Configuration
const API_URL = 'https://life-production.up.railway.app/invocations'; // Real URL
const INVOKER_ID = 'user_web_client_1'; // Static for this phase

// State Container
const State = {
    lastProjection: null,
    requestId: null,
    streamCursor: null
};

// HTTP Client
const Client = {
    /**
     * Sends an invocation to the backend.
     * @param {string} text - Operator input text
     * @returns {Promise<Object>} - The ProjectionOutput
     */
    invoke: async (text) => {
        const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        State.requestId = requestId;

        const payload = {
            request_id: requestId,
            invoker: {
                invoker_id: INVOKER_ID,
                invoker_role: 'INVOKER',
                notes: 'Web Client Phase 3'
            },
            operator: {
                operator_id: 'GEORGE',
                input_text: text
            },
            mode: {
                kind: 'BEAT',
                client_intent: null
            },
            declared_overrides: {
                time: {
                    declared_world_time: null,
                    timezone: null
                },
                pause_time: false
            },
            ui: {
                stream_cursor: State.streamCursor,
                client_timestamp_utc: new Date().toISOString()
            }
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.error('Invocation failed:', response.status, response.statusText);
                // We do NOT render fake errors. We just log.
                return null;
            }

            const projection = await response.json();
            return projection;

        } catch (error) {
            console.error('Network error:', error);
            return null;
        }
    }
};

// Event Wiring
document.addEventListener('DOMContentLoaded', () => {
    const streamContainer = document.getElementById('stream-entries');
    const pocketContainer = document.getElementById('pocket-container');
    const input = document.getElementById('operator-input');
    const btn = document.getElementById('invoke-btn');
    const debugStatus = document.getElementById('debug-status');

    const handleInvoke = async () => {
        const text = input.value;
        if (!text.trim()) return;

        // Clear input immediately (optimistic? No, contract says we wait for projection)
        // But for UI feel, we usually clear. 
        // However, if it fails, we might want to keep it.
        // Let's keep it until success? 
        // "UI must not infer...". 
        // We'll disable the button.
        
        input.disabled = true;
        btn.disabled = true;
        debugStatus.textContent = 'Invoking...';

        const projection = await Client.invoke(text);

        input.disabled = false;
        btn.disabled = false;
        input.focus();

        if (projection) {
            input.value = ''; // Clear on success
            debugStatus.textContent = 'Ready';
            
            // Update State
            State.lastProjection = projection;
            if (projection.stream && projection.stream.cursor_after) {
                State.streamCursor = projection.stream.cursor_after;
            }

            // Render
            Renderers.renderStream(projection.stream ? projection.stream.entries : [], streamContainer);
            Renderers.renderPocket(projection.pocket, pocketContainer);
        } else {
            debugStatus.textContent = 'Error (See Console)';
        }
    };

    btn.addEventListener('click', handleInvoke);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleInvoke();
        }
    });
});
