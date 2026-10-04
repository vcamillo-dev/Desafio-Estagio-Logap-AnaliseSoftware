# Estratégia de testes adicionais

O desafio pede uma proposta de testes adicionais, mas não exige que esses testes sejam implementados. Esta estratégia apresenta os cinco tipos escolhidos para o projeto. A PoC E2E com Cypress foi implementada como diferencial opcional; as demais propostas permanecem documentadas, não executadas.

| Tipo | Objetivo | Escopo sugerido | Risco reduzido | Prioridade |
|---|---|---|---|---|
| Segurança | Validar autenticação, autorização, gerenciamento de sessão e controle de acesso no servidor. | Login com credenciais válidas e inválidas; rotas protegidas; operações de veículos, viagens e manutenções; tentativa de acessar dados sem permissão. | Acesso não autorizado, alteração indevida de registros e exposição de dados. | Alta — investigar primeiro o comportamento observado no login com senha incorreta. |
| Acessibilidade | Verificar se diferentes pessoas conseguem navegar e concluir tarefas usando teclado e tecnologias assistivas. | Login, navegação principal, formulários e mensagens de validação; foco visível, rótulos, contraste, ordem de leitura e uso com leitor de tela. | Barreiras de acesso e impossibilidade de concluir tarefas sem mouse ou visão plena. | Média — planejar uma avaliação inicial dos fluxos principais e ampliar a cobertura conforme os achados. |
| Compatibilidade | Confirmar que interface e funcionalidades se comportam corretamente em navegadores e dispositivos suportados. | Jornadas de login, veículos, viagens, manutenções e Dashboard em navegadores com motores distintos, tamanhos de tela móveis e navegadores alternativos usados pelo público. | Falhas de layout, interação ou validação restritas a certas combinações de navegador/dispositivo. | Média — definir a matriz com base no público e validar primeiro as combinações de maior uso. |
| API | Validar contratos, códigos de resposta, autenticação/autorização e tratamento de dados inválidos nos serviços. | Endpoints de login; operações de veículos, viagens e manutenções; atualização dos dados agregados do Dashboard. | Regras de validação contornáveis pela interface, respostas incorretas e falhas de persistência. | Alta — priorizar autenticação e operações críticas, caso os endpoints estejam acessíveis. |
| E2E | Validar jornadas completas pela interface, do início ao resultado visível para o usuário. | Login; validação de campos obrigatórios; bloqueio de placa duplicada; cadastro de viagem e conferência dos quilômetros no Dashboard. | Quebras em fluxos completos causadas por falhas de integração entre telas e serviços. | Alta — automatizar fluxos estáveis com Cypress e executar a suíte após mudanças relevantes. |

## Ordem sugerida

1. Investigar a autenticação e autorização, considerando o login relatado com senha incorreta.
2. Verificar validações e permissões na API, se os endpoints estiverem acessíveis.
3. Definir critérios de acessibilidade e a matriz de navegadores/dispositivos suportados.
4. Automatizar e manter os fluxos E2E escolhidos com Cypress.
