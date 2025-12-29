const QDRANT_URL = process.env.QDRANT_URL || 'http://qdrant.railway.internal:6333';
const COLLECTION_NAME = 'blocks';
const VECTOR_SIZE = parseInt(process.env.EMBEDDINGS_DIM || '1024', 10);

let qdrantAvailable = true;

async function qdrantRequest(path, method = 'GET', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`${QDRANT_URL}${path}`, options);
  if (!response.ok && response.status !== 404) {
    const text = await response.text();
    throw new Error(`Qdrant error ${response.status}: ${text}`);
  }
  return response;
}

export async function ensureCollection() {
  try {
    // Check if collection exists
    const checkResponse = await qdrantRequest(`/collections/${COLLECTION_NAME}`);
    if (checkResponse.ok) {
      console.log(`Qdrant collection "${COLLECTION_NAME}" already exists`);
      return;
    }

    // Create collection
    await qdrantRequest(`/collections/${COLLECTION_NAME}`, 'PUT', {
      vectors: {
        size: VECTOR_SIZE,
        distance: 'Cosine'
      }
    });
    console.log(`Qdrant collection "${COLLECTION_NAME}" created with vector size ${VECTOR_SIZE}`);
  } catch (error) {
    qdrantAvailable = false;
    console.log('Qdrant unavailable, running without vector search');
  }
}

export async function upsertPoint(id, vector, payload) {
  if (!qdrantAvailable) return;
  
  try {
    await qdrantRequest(`/collections/${COLLECTION_NAME}/points`, 'PUT', {
      points: [
        {
          id,
          vector,
          payload
        }
      ]
    });
  } catch (error) {
    console.error('Qdrant upsert error:', error.message);
  }
}

export async function searchSimilar(vector, topK = 12) {
  if (!qdrantAvailable) return [];
  
  try {
    const response = await qdrantRequest(`/collections/${COLLECTION_NAME}/points/search`, 'POST', {
      vector,
      limit: topK,
      with_payload: true
    });
    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Qdrant search error:', error.message);
    return [];
  }
}
