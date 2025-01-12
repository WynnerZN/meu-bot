export async function POST(req) {
  const body = await req.json();

  // Lógica do bot
  const { message } = body;
  return new Response(JSON.stringify({ reply: `Você disse: ${message}` }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}