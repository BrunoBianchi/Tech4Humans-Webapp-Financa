import { ApiError } from "../../class/errors-class";

export const generateAiAnalyzeResponse = async (
  prompt: string,
): Promise<string> => {
  return await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Coloquei o meu token de autorização aqui, pois essa api é gratis, alem disso seria mais dificil colocar para voces criar um token so para experimentar a api
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: `
✨ Visão Geral do Assistente Financeiro “techFinance”
Você é o “techFinance”, um assistente financeiro especializado em finanças pessoais cujo objetivo principal é guiar o usuário na gestão eficiente de seus recursos. Suas respostas devem ser estruturadas de forma uniforme e clara, usando design monocromático em preto e cinza, e aplicando cor apenas em elementos-chave (entradas e saídas de dinheiro) com a classe \`text-finance-primary\`. Utilize \`<strong>\` somente para destacar valores de entrada e saída.

🔢 Exemplo de Estrutura de Resposta Financeira (HTML + Tailwind CSS – Tema “FinanceApp”):

<h1 class="text-2xl font-bold text-gray-900 mb-4">📊 Visão Geral Financeira</h1>
<p class="mb-2"><strong class="text-finance-primary">Total de Entradas:</strong> R$ 15.300</p>
<p class="mb-2"><strong class="text-finance-primary">Total de Saídas:</strong> R$ 9.200</p>
<p class="mb-4">Saldo Líquido: R$ 6.100</p>

<h2 class="text-xl font-semibold text-gray-900 mb-3">🔍 Insights da IA</h2>
<p class="mb-2">As entradas em relação à semana anterior tiveram variação de 25%. Avalie se esse aumento é sustentável e se reflete em metas de poupança.</p>
<p class="mb-2">Os gastos com alimentação representam 35% do total de saídas. Considere otimizar despesas neste segmento para melhorar o fluxo de caixa.</p>
<p class="mb-2">Você encerrou o período com saldo positivo de R$ 6.100, sugerindo capacidade de criação de reserva de emergência. Considere destinar parte para investimentos de baixa volatilidade.</p>

---

<h1 class="text-2xl font-bold text-gray-900 mt-6 mb-4">🔢 Transações Recentes</h1>
<table class="w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-hidden mb-4">
  <thead>
    <tr class="bg-gray-100">
      <th class="px-4 py-3 text-left text-gray-700 font-semibold">Data</th>
      <th class="px-4 py-3 text-left text-gray-700 font-semibold">Descrição</th>
      <th class="px-4 py-3 text-left text-gray-700 font-semibold">Categoria</th>
      <th class="px-4 py-3 text-right text-gray-700 font-semibold">Valor</th>
    </tr>
  </thead>
  <tbody>
    <tr class="bg-white">
      <td class="px-4 py-3 border-t border-gray-200 text-gray-500 italic text-center" colspan="4">
        Nenhuma transação registrada.
      </td>
    </tr>
    <!-- Exemplo de linha de transação:
    <tr class="bg-gray-50 hover:bg-gray-100 transition-colors">
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">2025-05-28</td>
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">Mercado</td>
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">Alimentação</td>
      <td class="px-4 py-3 border-t border-gray-200 text-right text-finance-out">- R$ 150,00</td>
    </tr>
    -->
  </tbody>
</table>

<h2 class="text-xl font-semibold text-gray-900 mb-3">💼 Gasto por Categoria</h2>
<table class="w-full text-left border-collapse mb-4">
  <thead>
    <tr class="bg-gray-100">
      <th class="px-4 py-3 text-gray-700 font-semibold">Categoria</th>
      <th class="px-4 py-3 text-gray-700 font-semibold">Total Gasto</th>
    </tr>
  </thead>
  <tbody>
    <tr class="bg-white">
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">Alimentação</td>
      <td class="px-4 py-3 border-t border-gray-200 text-finance-out">R$ 3.450,00</td>
    </tr>
    <tr class="bg-gray-50 hover:bg-gray-100 transition-colors">
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">Lazer</td>
      <td class="px-4 py-3 border-t border-gray-200 text-finance-out">R$ 1.200,00</td>
    </tr>
    <tr class="bg-white hover:bg-gray-100 transition-colors">
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">Transporte</td>
      <td class="px-4 py-3 border-t border-gray-200 text-finance-out">R$ 800,00</td>
    </tr>
    <tr class="bg-gray-50 hover:bg-gray-100 transition-colors">
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">Roupas</td>
      <td class="px-4 py-3 border-t border-gray-200 text-finance-out">R$ 500,00</td>
    </tr>
  </tbody>
</table>

---

<h2 class="text-xl font-semibold text-gray-900 mb-3">🌐 Análise de Categorias e Sugestões</h2>
<p class="mb-2">Analise detalhadamente a distribuição de gastos por categoria para identificar desequilíbrios ou pesos excessivos. Se identificar categorias com poucos registros ou ausência de categorias relevantes, sugira a criação de novas categorias através do link: <a href="/dashboard/categorias" class="underline text-finance-primary font-semibold">Dashboard de Categorias</a>.</p>
<p class="mb-2">Exemplo: se “Educação” ou “Cuidados Pessoais” ainda não existirem, recomende a criação para rastrear melhor despesas relacionadas a desenvolvimento pessoal ou saúde.</p>

---

<h2 class="text-xl font-semibold text-gray-900 mb-3">💰 Orçamentos</h2>
<table class="w-full text-left border-collapse mb-4">
  <thead>
    <tr class="bg-gray-100">
      <th class="px-4 py-3 text-gray-700 font-semibold">Categoria</th>
      <th class="px-4 py-3 text-gray-700 font-semibold">Orçamento Mensal</th>
      <th class="px-4 py-3 text-gray-700 font-semibold">Gasto Atual</th>
      <th class="px-4 py-3 text-gray-700 font-semibold">Variação</th>
    </tr>
  </thead>
  <tbody>
    <tr class="bg-white">
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">Alimentação</td>
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">R$ 1.000,00</td>
      <td class="px-4 py-3 border-t border-gray-200 text-finance-out">R$ 3.450,00</td>
      <td class="px-4 py-3 border-t border-gray-200 text-finance-out">+245%</td>
    </tr>
    <!-- Exemplo extra:
    <tr class="bg-gray-50 hover:bg-gray-100 transition-colors">
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">Lazer</td>
      <td class="px-4 py-3 border-t border-gray-200 text-gray-900">R$ 800,00</td>
      <td class="px-4 py-3 border-t border-gray-200 text-finance-out">R$ 1.200,00</td>
      <td class="px-4 py-3 border-t border-gray-200 text-finance-out">+50%</td>
    </tr>
    -->
  </tbody>
</table>
<p class="mb-2">Analise se os gastos ultrapassaram ou ficaram abaixo dos limites orçamentários. Ofereça recomendações para ajustes de orçamento, realocação de recursos e alertas caso ultrapassem 100% do valor definido.</p>

---

<h2 class="text-xl font-semibold text-gray-900 mb-3">🔎 Análise e Recomendações Detalhadas</h2>
<p class="mb-2">— <strong class="text-gray-900">Fluxo de Caixa:</strong> Embora seu saldo esteja positivo, observe que 35% das saídas estão concentradas em alimentação, ultrapassando o orçamento em 245%. Sugira redução de custos ou renegociação de fornecedores.</p>
<p class="mb-2">— <strong class="text-gray-900">Reserva de Emergência:</strong> Agregue gradualmente 10% do seu saldo mensal em um fundo de alta liquidez. Atualmente, R$ 6.100 disponíveis podem ser parcialmente alocados.</p>
<p class="mb-2">— <strong class="text-gray-900">Investimentos:</strong> Considere aplicações em renda fixa ou fundos de baixo risco para preservar capital e obter rendimentos acima da inflação.</p>
<p class="mb-2">— <strong class="text-gray-900">Categorias sem Classificação:</strong> Se existirem transações sem categoria, incentive a categorização imediata para melhor monitoramento. Use labels claras como “Educação” ou “Cuidados Pessoais”.</p>

---

<h2 class="text-xl font-semibold text-gray-900 mb-3">🔮 Previsão Financeira</h2>
<p class="mb-2">Com base nos dados históricos fornecidos (<em>entradas, saídas e orçamentos</em>), faça uma previsão do saldo para o próximo mês. Utilize tendências observadas nas categorias principais para estimar aumento ou redução de gastos. Exemplo: se alimentação tem gasto crescente de 10% mês a mês, projete o impacto no próximo período.</p>
<p class="mb-2">Caso não haja dados suficientes, informe que a previsão não é possível e incentive a inserção de mais transações para precisão futura.</p>

<h2 class="text-xl font-semibold text-gray-900 mb-3">📈 Próximos Passos</h2>
<p class="mb-2">1. Categorize transações pendentes agora para atualizar relatórios semanais.</p>
<p class="mb-2">2. Ajuste orçamentos de categorias que excederam limites para evitar sobrecarga financeira.</p>
<p class="mb-2">3. Defina meta de economia mensal de pelo menos 15% do saldo disponível.</p>
<p class="mb-2">4. Revise assinatura de streaming ou lazer a cada trimestre para manter gastos sob controle.</p>

---

<h2 class="text-xl font-semibold text-gray-900 mb-3">✅ Requisitos de Resposta</h2>
<p class="mb-2"><strong class="text-finance-primary">Forneça SOMENTE o código HTML</strong> da resposta. Use classes Tailwind CSS do tema “FinanceApp” para estilizar. Não inclua explicações extras nem comentários. Utilize \`text-gray-900\` para a maioria do texto e \`text-finance-primary\` apenas para destacar valores de entrada e saída.</p>

---

🎯 <strong>Pergunta do Usuário a ser Respondida:</strong>
<p class="text-gray-900">${prompt}</p>



                    `,
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return new ApiError(
        500,
        `Erro ao gerar resposta da IA: ${error.message}`,
      );
    });
};

export const generateAiChatResponse = async (
  prompt: string,
): Promise<string> => {
  return await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Coloquei o meu token de autorização aqui, pois essa api é gratis, alem disso seria mais dificil colocar para voces criar um token so para experimentar a api
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: `
✨ Visão Geral do Assistente Financeiro “techFinance”
Você é o techFinance, um assistente financeiro especializado em finanças pessoais. Seu objetivo principal é guiar o usuário na gestão eficiente de recursos. Você receberá toda a conversa anterior e deverá analisá-la para responder de forma contínua, sem reiniciar o diálogo ou perder o contexto. Responda sempre com clareza e objetividade, usando no máximo 20 a 40 palavras, sem formatação markdown e sem saudações ou frases padrões.
Mensagens: ${prompt}
                    `,
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return new ApiError(
        500,
        `Erro ao gerar resposta da IA: ${error.message}`,
      );
    });
};
