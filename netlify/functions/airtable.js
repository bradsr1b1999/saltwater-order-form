exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const TOKEN   = process.env.AIRTABLE_TOKEN;
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const API     = `https://api.airtable.com/v0/${BASE_ID}`;

  let parsed;
  try { parsed = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers, body: 'Invalid JSON' }; }

  const { path, method, body } = parsed;
  if (!path) return { statusCode: 400, headers, body: 'Missing path' };

  const options = {
    method:  method || 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type':  'application/json'
    }
  };
  if (body) options.body = JSON.stringify(body);

  try {
    const r = await fetch(API + path, options);
    const d = await r.json();
    return {
      statusCode: r.status,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(d)
    };
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
