# Registro de defeitos e pontos a validar

Os registros refletem os testes manuais descritos pelo candidato. Foram anexadas as capturas do formulário de login e do Dashboard após a autenticação. Na captura do Dashboard, a senha e o endereço pessoal exibidos pelo aviso do navegador foram ocultados, preservando a imagem completa. Para BUG-002, foram anexadas capturas de anos negativos e de um ano com nove dígitos salvo na listagem de veículos.

## Defeitos confirmados

### BUG-001 — Login aceito com senha incorreta

- **Área:** Autenticação
- **Severidade sugerida:** Crítica
- **Dados usados:** e-mail `logap@teste.com`, senha `qualquersenha123`.
- **Passos:** abrir o login; informar o e-mail e a senha acima; enviar o formulário.
- **Esperado:** rejeitar a autenticação e impedir acesso às áreas internas.
- **Obtido:** o login foi realizado mesmo com a senha incorreta.
- **Impacto:** potencial acesso não autorizado a informações e funcionalidades.
- **Evidências:** [formulário de login](../evidencias/bugs/BUG-001-login-formulario.png); [Dashboard após a tentativa de autenticação](../evidencias/bugs/BUG-001-login-dashboard-apos-autenticacao.png).

### BUG-002 — Ano fora de uma faixa plausível aceito no cadastro de veículo

- **Área:** Veículos
- **Severidade sugerida:** Média
- **Dados usados:** `-3000`, `0`, `99999` e `999999999`.
- **Passos:** abrir a aba Veículos; informar os valores no campo Ano; salvar os registros quando aplicável; conferir a listagem.
- **Esperado:** rejeitar anos fora de uma faixa plausível do mundo real e informar limites aceitos. Os limites numéricos exatos devem ser definidos pelo produto.
- **Obtido:** `-3000`, `0`, `99999` e `999999999` aparecem como valores aceitos/salvos. É possível digitar valores com mais de nove algarismos, mas o salvamento aceita no máximo nove. O Dashboard não exibe o ano dos veículos.
- **Impacto:** anos incompatíveis com fabricação real de veículos podem permanecer cadastrados e comprometer consultas ou relatórios que usem esse dado.
- **Evidências:** [listagem com anos negativos](../evidencias/bugs/BUG-002-anos-negativos-listagem-veiculos.png) e [veículo salvo com ano de nove dígitos](../evidencias/bugs/BUG-002-ano-maximo-nove-digitos.png). Os valores `0` e `99999` foram confirmados manualmente; screenshots não fornecidas.

### BUG-003 — Viagem aceita com chegada anterior à saída

- **Área:** Viagens
- **Severidade sugerida:** Média
- **Dados usados:** veículo `VLC-1235`; trajeto João Pessoa–Natal; saída `10/10/2026`; chegada `05/10/2026`; `400 km`.
- **Passos:** cadastrar uma viagem com chegada anterior à saída; consultar o registro na listagem.
- **Esperado:** a data de chegada deve ser igual ou posterior à data de saída.
- **Obtido:** a aplicação salvou e exibiu a viagem com saída em `10/10/2026` e chegada em `05/10/2026`.
- **Impacto:** registros com cronologia impossível podem prejudicar o histórico e os relatórios operacionais.
- **Evidência:** [viagem salva com chegada anterior à saída](../evidencias/screenshots/CT-014-viagem-chegada-anterior-saida.png).

## Pontos de observação ainda pendentes de confirmação

| Referência | Observação | Próxima validação necessária |
|---|---|---|
| CT-006 | O valor de nove dígitos `999999999` foi salvo, embora não seja um ano plausível de fabricação. | O produto deve definir os limites inferior e superior exatos para o ano de fabricação. |

## Recomendações para fechamento

As duas capturas de BUG-001 registram o formulário e o Dashboard após a tentativa de autenticação. As capturas de BUG-002 mostram anos negativos e um ano de nove dígitos persistidos na listagem; `0` e `99999` foram confirmados manualmente. A captura de BUG-003 comprova o registro com chegada anterior à saída. O produto ainda deve definir a faixa plausível para ano de fabricação. Registrar data/ambiente da execução, se possível.
