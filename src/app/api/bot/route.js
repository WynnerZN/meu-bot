import { OpenAI } from 'openai';
import nlp from 'compromise';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Sua chave da OpenAI
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // Usando 'compromise' para extrair os produtos e quantidades do texto
      const doc = nlp(message);
      const quantities = doc.numbers().out('array'); // Exemplo: [2, 3]
      const products = doc.topics().out('array'); // Exemplo: ['camisetas', 'calças']

      // Aqui você pode melhorar ainda mais a lógica, talvez fazendo uma correspondência com um banco de dados de produtos, etc.

      // Resposta final
      res.status(200).json({
        message: "Pedido processado!",
        products: products,
        quantities: quantities,
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar o pedido' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}