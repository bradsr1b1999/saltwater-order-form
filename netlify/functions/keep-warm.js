exports.handler = async () => {
  try {
    await fetch('https://sunny-torrone-98545f.netlify.app/.netlify/functions/airtable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/Companies?maxRecords=1', method: 'GET' })
    });
  } catch(e) {}
  return { statusCode: 200, body: 'warm' };
};
