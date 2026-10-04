# Análise de experiência do usuário

As situações abaixo foram observadas durante a exploração manual. As recomendações são oportunidades de melhoria; não devem ser confundidas com defeitos funcionais, exceto quando há divergência clara de regra (registrada em `reports/bugs.md`).

## UX-001 — Tornar os ícones dos painéis do Dashboard acionáveis

- **Tela:** Dashboard — Projeção Financeira, Ranking de Utilização e Cronograma de Manutenção.
- **Situação:** cada um desses painéis apresenta um ícone específico que parece interativo, mas os ícones são apenas decorativos e não podem ser clicados para filtrar ou consultar os dados.
- **Alteração recomendada:** permitir que os ícones ou seus painéis abram filtros e consultas contextuais no próprio Dashboard, como período para a projeção financeira, veículo para o ranking e período/veículo/status para o cronograma de manutenção.
- **Justificativa:** a aparência atual sugere uma ação que não está disponível; filtros integrados ao Dashboard tornam os indicadores mais exploráveis.
- **Benefício esperado:** consultar e filtrar informações da frota sem precisar navegar para outras abas.
- **Evidência:** [Dashboard com o ícone de calendário no cronograma](../evidencias/screenshots/UX-001-UX-002-dashboard.png). Os ícones dos outros dois painéis foram observados durante a exploração.

## UX-002 — Equilibrar o espaço do gráfico por categoria

- **Tela:** Dashboard, volume por categoria.
- **Situação:** o contêiner ocupa uma área grande, mas o conteúdo visual utiliza aproximadamente um terço dela, deixando espaço vazio que dá impressão de conteúdo faltando.
- **Alteração recomendada:** redimensionar o contêiner ou ampliar e reposicionar a visualização para ocupar melhor a área.
- **Justificativa:** melhor proporção entre conteúdo e espaço disponível deixa a leitura mais intencional.
- **Benefício esperado:** Dashboard mais claro e visualmente equilibrado.
- **Evidência:** [Dashboard mostrando o espaço livre no painel do gráfico](../evidencias/screenshots/UX-001-UX-002-dashboard.png).

## UX-003 — Oferecer mais opções de paginação e filtros de veículos

- **Tela:** aba Veículos.
- **Situação:** a captura mostra 259 veículos no total, 10 linhas na página atual e seletor com opções 2, 5 e 10. A pesquisa permite placa ou modelo; não foram observados filtros por tipo ou ano.
- **Alteração recomendada:** incluir opções maiores de paginação (por exemplo, 25 e 50) e filtros por tipo (leve/pesado) e ano, mantendo placa/modelo na busca.
- **Justificativa:** reduzir navegação repetitiva e permitir consultas mais direcionadas numa frota extensa.
- **Benefício esperado:** localizar veículos com menos esforço.
- **Evidência:** [listagem com seletor 2, 5 e 10 e total de 259 veículos](../evidencias/screenshots/UX-003-listagem-veiculos-paginacao.png).

## UX-004 — Filtrar e ordenar veículos nos autocompletes

- **Tela:** seletores de veículo nos formulários de Manutenções e Viagens.
- **Situação:** os formulários de Manutenções e Viagens possuem autocomplete, mas os seletores não oferecem filtros. Com muitos veículos, se a pessoa não souber a placa ou o modelo que procura, encontrar o item pode exigir percorrer uma lista extensa.
- **Alteração recomendada:** incluir filtros por placa, modelo, tipo e ano, além de opções de ordenação alfabética e por ano em ordem crescente ou decrescente.
- **Justificativa:** o autocomplete ajuda quando a pessoa conhece parte da identificação; filtros e ordenação também apoiam a busca por características conhecidas, como tipo ou ano.
- **Benefício esperado:** localizar o veículo com menos esforço e reduzir o risco de selecionar o veículo errado.
- **Evidência de atributos úteis para os filtros:** [listagem de veículos com placa, modelo, tipo e ano](../evidencias/screenshots/UX-004-listagem-veiculos-atributos.png).

## UX-005 — Explicar e proteger a mudança de status da manutenção

- **Tela:** Manutenções, alteração de status.
- **Situação:** a conclusão é irreversível pela regra confirmada. Na edição, o campo apresenta apenas `Concluída (atual)`; foi relatado que uma conclusão feita por engano exigiria excluir e recriar o registro.
- **Alteração recomendada:** pedir confirmação antes de concluir, informando que a mudança não poderá ser desfeita; manter um fluxo auditável para correção administrativa, se aplicável.
- **Justificativa:** como a ação é irreversível, o usuário deve entender o efeito antes de confirmá-la.
- **Benefício esperado:** reduzir perda de histórico e retrabalho.
- **Evidência observada:** [campo de status na edição](../evidencias/screenshots/CT-018-status-concluida-sem-opcoes.png).

## UX-006 — Dar indicação visual ao menu do usuário

- **Tela:** cabeçalho, área do usuário no canto superior direito.
- **Situação:** a área não parecia clicável; ao clicar, foi possível encerrar a sessão.
- **Alteração recomendada:** adicionar estado hover/foco e um indicador de menu, como uma seta, além de rótulo acessível.
- **Justificativa:** affordance visual ajuda a entender que a área é interativa e contém opções.
- **Benefício esperado:** descoberta mais fácil do menu e navegação mais previsível.

## UX-007 — Priorizar o formato de data brasileiro nas viagens

- **Tela:** formulário de Viagens.
- **Situação:** o formulário mostra o formato `MM/DD/YYYY` (mês/dia/ano), que funciona, mas é diferente do padrão mais familiar ao público brasileiro: `DD/MM/YYYY` (dia/mês/ano). Não foi observado bloqueio funcional por incompatibilidade de formato.
- **Alteração recomendada:** priorizar `DD/MM/YYYY` no formulário e manter o mesmo padrão na listagem, no calendário e nas mensagens de validação.
- **Justificativa:** usar a ordem dia/mês/ano, mais familiar no Brasil, reduz estranhamento e a possibilidade de confundir dia com mês.
- **Benefício esperado:** menos erros de preenchimento e maior clareza no cadastro.
- **Evidência:** [formulário de viagem mostrando `mm/dd/yyyy`](../evidencias/screenshots/CT-013-formato-data-mm-dd-yyyy.png).

## UX-008 — Validar a faixa do ano de fabricação do veículo

- **Tela:** formulário e listagem de Veículos.
- **Situação:** o sistema aceita e salva `-3000`, `0`, `99999` e `999999999`. É possível digitar quantos algarismos quiser, mas o salvamento aceita no máximo nove. Para ano de fabricação, espera-se uma faixa compatível com anos plausíveis do mundo real, embora os limites exatos ainda não tenham sido definidos pelo produto.
- **Alteração recomendada:** definir com o produto os limites inferior e superior plausíveis, validar o campo dentro dessa faixa e informar o critério junto ao campo.
- **Justificativa:** a validação de faixa evita persistir anos impossíveis ou incompatíveis com o uso esperado do cadastro. Limitar apenas o que pode ser salvo a nove algarismos não impede a gravação de um ano irrealista.
- **Benefício esperado:** dados de veículos mais consistentes em consultas e relatórios.
- **Evidências:** [listagem mostrando anos negativos salvos](../evidencias/bugs/BUG-002-anos-negativos-listagem-veiculos.png) e [veículo salvo com ano de nove dígitos](../evidencias/bugs/BUG-002-ano-maximo-nove-digitos.png).
