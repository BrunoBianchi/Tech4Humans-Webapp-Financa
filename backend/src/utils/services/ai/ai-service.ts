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
<p class="mb-2"><strong>Total de Entradas (Completas + Pendentes):</strong> <strong class="text-finance-primary">R$ 15.300</strong> (soma de transações de entrada que já foram completadas "type"=="completed" e transações de entrada pendentes "type"=="pending")</p>
<p class="mb-2"><strong>Total de Saídas (Completas + Pendentes):</strong> <strong class="text-finance-primary">R$ 9.200</strong> (soma de transações de saída que já foram completadas "type"=="completed" e transações de saída pendentes "type"=="pending")</p>
<p class="mb-2"><strong>Saldo Atual (Realizado):</strong> R$ X.XXX,XX (calculado como: Entradas Completas - Saídas Completas. Este é o dinheiro efetivamente em conta antes de considerar pendências)</p>
<p class="mb-2"><strong>Impacto Líquido das Transações Pendentes:</strong> <strong class="text-finance-primary">R$ Y.YYY,YY</strong> (calculado como: Total de Entradas Pendentes - Total de Saídas Pendentes)</p>
<p class="mb-4"><strong>Saldo Final Previsto:</strong> R$ Z.ZZZ,ZZ (calculado como: Saldo Atual (Realizado) + Impacto Líquido das Transações Pendentes)</p>

<h2 class="text-xl font-semibold text-gray-900 mb-3">🔍 Insights da IA</h2>
<p class="mb-2">As entradas (considerando completas e pendentes) em relação à semana anterior tiveram variação de 25%. Avalie se esse aumento é sustentável e se reflete em metas de poupança.</p>
<p class="mb-2">Os gastos com alimentação representam 35% do total de saídas (completas e pendentes). Considere otimizar despesas neste segmento para melhorar o fluxo de caixa.</p>
<p class="mb-2">Seu saldo final previsto é de R$ Z.ZZZ,ZZ. Com base no seu saldo atual realizado de R$ X.XXX,XX, isso sugere capacidade de criação de reserva de emergência. Considere destinar parte para investimentos de baixa volatilidade.</p>

---

<h1 class="text-2xl font-bold text-gray-900 mt-6 mb-4">🔢 Transações Recentes</h1>
<table class="w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-hidden mb-4">
  <thead>
    <tr class="bg-gray-100">
      <th class="px-4 py-3 text-left text-gray-700 font-semibold">Data</th>
      <th class="px-4 py-3 text-left text-gray-700 font-semibold">Descrição</th>
      <th class="px-4 py-3 text-left text-gray-700 font-semibold">Categoria</th>
      <th class="px-4 py-3 text-left text-gray-700 font-semibold">Status</th>
      <th class="px-4 py-3 text-right text-gray-700 font-semibold">Valor</th>
    </tr>
  </thead>
  <tbody>
    </tbody>
</table>

<h2 class="text-xl font-semibold text-gray-900 mb-3">💼 Gasto por Categoria (Saídas Completas)</h2>
<table class="w-full text-left border-collapse mb-4">
  <thead>
    <tr class="bg-gray-100">
      <th class="px-4 py-3 text-gray-700 font-semibold">Categoria</th>
      <th class="px-4 py-3 text-gray-700 font-semibold">Total Gasto (Completo)</th>
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
<p class="mb-2">Analise detalhadamente a distribuição de gastos por categoria (baseado em saídas completas) para identificar desequilíbrios ou pesos excessivos. Se identificar categorias com poucos registros ou ausência de categorias relevantes, sugira a criação de novas categorias através do link: <a href="/dashboard/categorias" class="underline text-finance-primary font-semibold">Dashboard de Categorias</a>.</p>
<p class="mb-2">Exemplo: se “Educação” ou “Cuidados Pessoais” ainda não existirem, recomende a criação para rastrear melhor despesas relacionadas a desenvolvimento pessoal ou saúde.</p>

---

<h2 class="text-xl font-semibold text-gray-900 mb-3">🔎 Análise e Recomendações Detalhadas</h2>
<p class="mb-2">— <strong class="text-gray-900">Fluxo de Caixa:</strong> Seu saldo final previsto é positivo. No entanto, observe que 35% das saídas totais (completas + pendentes) estão concentradas em alimentação, e os gastos completos já ultrapassam o orçamento em 245%. Sugira redução de custos ou renegociação de fornecedores.</p>
<p class="mb-2">— <strong class="text-gray-900">Reserva de Emergência:</strong> Com um saldo atual realizado de R$ X.XXX,XX e um saldo final previsto de R$ Z.ZZZ,ZZ, avalie agregar gradualmente uma porcentagem do seu saldo realizado mensal em um fundo de alta liquidez.</p>
<p class="mb-2">— <strong class="text-gray-900">Investimentos:</strong> Considere aplicações em renda fixa ou fundos de baixo risco para preservar capital e obter rendimentos acima da inflação, utilizando parte do seu saldo realizado ou do previsto, conforme sua estratégia.</p>
<p class="mb-2">— <strong class="text-gray-900">Categorias sem Classificação:</strong> Se existirem transações sem categoria, incentive a categorização imediata para melhor monitoramento. Use labels claras como “Educação” ou “Cuidados Pessoais”.</p>

---

<h2 class="text-xl font-semibold text-gray-900 mb-3">🔮 Previsão Financeira</h2>
<p class="mb-2">Com base nos dados históricos fornecidos (<em>entradas e saídas completas, transações pendentes e orçamentos</em>), faça uma previsão do saldo para o próximo mês. Utilize tendências observadas nas categorias principais para estimar aumento ou redução de gastos. Exemplo: se alimentação tem gasto crescente de 10% mês a mês, projete o impacto no próximo período.</p>
<p class="mb-2">Caso não haja dados suficientes, informe que a previsão não é possível e incentive a inserção de mais transações para precisão futura.</p>

<h2 class="text-xl font-semibold text-gray-900 mb-3">📈 Próximos Passos</h2>
<p class="mb-2">1. Categorize transações pendentes agora para que o \`Impacto Líquido das Transações Pendentes\` e o \`Saldo Final Previsto\` sejam os mais precisos possível.</p>
<p class="mb-2">2. Ajuste orçamentos de categorias que excederam limites (com base nos gastos completos) para evitar sobrecarga financeira, considerando também as saídas pendentes.</p>
<p class="mb-2">3. Defina meta de economia mensal de pelo menos 15% do seu saldo atual realizado ou das entradas completas.</p>
<p class="mb-2">4. Revise assinatura de streaming ou lazer a cada trimestre para manter gastos sob controle.</p>

---

<p class="mb-2"><strong class="text-finance-primary">Forneça SOMENTE o código HTML</strong> da resposta. Use classes Tailwind CSS do tema “FinanceApp” para estilizar. Não inclua explicações extras nem comentários. Utilize \`text-gray-900\` para a maioria do texto e \`text-finance-primary\` apenas para destacar valores de entrada, saída e o impacto líquido de pendências.</p>

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
