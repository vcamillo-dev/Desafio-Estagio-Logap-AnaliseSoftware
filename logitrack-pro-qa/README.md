# LogiTrack Pro — Desafio Técnico de QA

Documentação da análise de qualidade do LogiTrack Pro, sistema web de gestão de frota, veículos, viagens, manutenções e indicadores operacionais. O material reúne cenários executados, comportamentos observados, pontos que ainda dependem de regra de negócio e uma proposta de evolução dos testes.

Aplicação: [LogiTrack Pro](https://logitrack.danieldiegosantana.me/)

## Conteúdo

- `docs/1-cenarios-de-teste.md`: cenários funcionais e de borda, com resultados e status.
- `docs/2-analise-ux.md`: oportunidades de melhoria de experiência identificadas durante a exploração.
- `docs/3-estrategia-de-testes.md`: proposta de cobertura adicional e prioridades.
- `reports/bugs.md`: registro dos defeitos confirmados e pontos que precisam de validação.
- `evidencias/`: espaço para screenshots coletadas durante a execução.
- `automation/`: automação E2E desenvolvida com Cypress e JavaScript.

## Ferramentas e premissas

- Navegador web para exploração manual e Markdown para documentação.
- Cypress 16 com JavaScript para automação E2E; na última execução relatada, os três testes ativos passaram e o teste de senha inválida permaneceu ignorado.
- Os resultados descritos refletem as observações compartilhadas durante a exploração. Há screenshots para os defeitos de autenticação e de ano inválido (incluindo o ano negativo e o valor de nove dígitos), além de evidências de cenários funcionais e observações de UX; os cenários sem captura estão identificados nos documentos. Dados sensíveis visíveis nas imagens originais foram ocultados ou removidos por recorte.
- As observações confirmadas incluem viagens duplicadas permitidas, status de manutenção concluída irreversível e uma viagem salva com chegada anterior à saída. No campo de ano, é possível digitar quantos algarismos quiser, mas o salvamento aceita no máximo nove. O valor de nove dígitos `999999999` foi salvo; ainda assim, não corresponde a um ano plausível de fabricação. Os limites plausíveis devem ser definidos pelo produto.
- Recomendações de UX são propostas para avaliação, não problemas confirmados.
- As credenciais de acesso fornecidas para o desafio não são reproduzidas neste repositório.

## Como consultar

Comece por `docs/1-cenarios-de-teste.md` e, para os defeitos e dúvidas de regra, consulte `reports/bugs.md`. A estratégia propõe próximos testes, mas não indica que eles já foram executados.

## Automação

A automação dos fluxos de interface foi desenvolvida com Cypress 16 e JavaScript. Os testes cobrem:

- Login com credenciais válidas e abertura do Dashboard.
- Validação dos campos obrigatórios no cadastro de veículo, sem enviar o formulário.
- Bloqueio do cadastro de uma placa duplicada, usando `VLC-1234`, que já existe no ambiente.
- Regressão do login com senha inválida. Esse teste permanece ignorado (`it.skip`) enquanto o BUG-001 não for corrigido; depois da correção, remova o `skip` para executá-lo.

A última execução relatada teve três testes aprovados e um ignorado. A suíte utiliza os dados do ambiente de desafio e não cria veículos.

### Requisitos

- Node.js 20, 22 ou 24 e npm.
- Conta de teste autorizada.
- A aplicação disponível em [logitrack.danieldiegosantana.me](https://logitrack.danieldiegosantana.me).

### Instalação e configuração

No terminal, acesse `automation/` e instale as dependências:

```bash
npm install
```

Copie `cypress.env.example.json` para `cypress.env.json` e preencha `username` e `password` com as credenciais autorizadas. O arquivo real está no `.gitignore` e não deve ser enviado ao GitHub. Os testes leem as credenciais com `cy.env()`.

### Execução

Na pasta `automation/`, abra a interface do Cypress:

```bash
npm run cy:open
```

Na interface do Cypress, abra o spec `cypress/e2e/logitrack.cy.js` (`logitrack.cy.js`) para iniciar os testes.

Para executar a suíte em modo headless:

```bash
npm run cy:run
```

Para usar outro ambiente, configure `CYPRESS_BASE_URL` com um endereço autorizado e utilize uma conta de teste apropriada.
