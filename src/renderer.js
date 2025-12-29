const VENICE_API_KEY = process.env.VENICE_API_KEY;
const VENICE_MODEL = process.env.VENICE_MODEL || 'llama-3.3-70b';

let rendererConstraints = '';

export function setRendererConstraints(constraints) {
  rendererConstraints = constraints;
}

export async function renderText(outwardText) {
  if (!outwardText || outwardText.trim() === '') {
    return '';
  }

  const systemContent = rendererConstraints 
    ? `${rendererConstraints}\n\nRender the following as natural speech. Output ONLY the rendered text.`
    : 'Render the following as natural speech. Output ONLY the rendered text.';

  const response = await fetch('https://api.venice.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${VENICE_API_KEY}`
    },
    body: JSON.stringify({
      model: VENICE_MODEL,
      messages: [
        {
          role: 'system',
          content: systemContent
        },
        {
          role: 'user',
          content: outwardText
        }
      ],
      temperature: 0.5
    })
  });

  if (!response.ok) {
    throw new Error(`Venice API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
