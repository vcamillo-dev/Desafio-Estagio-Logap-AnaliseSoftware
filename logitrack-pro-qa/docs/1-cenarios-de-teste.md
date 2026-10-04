# Cenários de teste

## Escopo e leitura dos resultados

Os cenários abaixo registram o que foi relatado durante a exploração manual. As evidências disponíveis estão vinculadas aos respectivos cenários; os casos sem captura estão identificados como ainda sem evidência visual. “Aprovado” indica que o comportamento observado correspondeu ao objetivo de validação descrito. “Reprovado” indica defeito confirmado. Quando não há requisito suficiente ou a execução final precisa ser repetida com evidência, o caso fica “A validar” ou “Pendente de execução”; isso não equivale a aprovação.

## Autenticação

### CT-001 — Tentativa de login com senha inválida

- **Objetivo:** verificar se credenciais inválidas impedem o acesso.
- **Pré-condições:** usuário de teste existente; sessão encerrada.
- **Dados:** e-mail de teste e uma senha diferente da senha válida.
- **Passos:** abrir login; informar o e-mail; informar a senha inválida; enviar o formulário.
- **Esperado:** autenticação rejeitada, sem acesso às áreas internas.
- **Dados utilizados:** e-mail `logap@teste.com` e senha `qualquersenha123`.
- **Obtido:** o sistema permitiu o login com a senha informada, embora ela fosse diferente da senha válida conhecida.
- **Status:** **Reprovado — defeito confirmado**, reproduzido e documentado nas evidências vinculadas.
- **Evidências:** [formulário de login](../evidencias/bugs/BUG-001-login-formulario.png) e [Dashboard após a tentativa de autenticação](../evidencias/bugs/BUG-001-login-dashboard-apos-autenticacao.png). Na captura do Dashboard, os dados pessoais do aviso do navegador foram ocultados sem recortar a imagem.

## Veículos

### CT-002 — Cadastro de veículo com campos obrigatórios preenchidos

- **Objetivo:** verificar a disponibilidade da ação de cadastro quando os dados requeridos estão preenchidos.
- **Pré-condições:** usuário autenticado.
- **Dados:** valores válidos para os campos exibidos no formulário.
- **Passos:** abrir cadastro de veículos; preencher os campos; observar e acionar o botão azul.
- **Esperado:** formulário pronto para envio após preenchimento dos campos obrigatórios.
- **Obtido:** o botão azul só fica clicável quando todos os campos são preenchidos.
- **Status:** **Aprovado**, limitado ao comportamento de habilitação relatado; persistência do cadastro não foi detalhada.
- **Evidência:** ainda não fornecida.

### CT-003 — Validação de tipo no campo ano

- **Objetivo:** verificar se o campo ano rejeita caracteres não numéricos.
- **Pré-condições:** formulário de veículo aberto.
- **Dados:** letras (por exemplo, `abc`).
- **Passos:** tentar inserir letras no campo de ano e observar o valor aceito.
- **Esperado:** rejeitar letras ou informar validação clara.
- **Obtido:** o campo não permite inserir letras.
- **Status:** **Aprovado**.
- **Evidência:** ainda não fornecida.

### CT-004 — Cadastro com ano negativo

- **Objetivo:** avaliar a validação de faixa do ano de fabricação.
- **Pré-condições:** usuário autenticado; dados restantes válidos.
- **Dados:** ano negativo `-3000`, conforme informado na exploração.
- **Passos:** preencher o formulário; informar o ano negativo; salvar; conferir se o valor permanece no sistema.
- **Esperado:** bloquear ano negativo ou indicar faixa válida.
- **Obtido:** o valor `-3000` foi aceito, salvo e aparece na listagem de veículos. A evidência também mostra outros registros com anos negativos. O Dashboard não exibe o ano dos veículos.
- **Status:** **Reprovado — defeito confirmado** por aceitar e persistir ano negativo.
- **Evidência:** [listagem de veículos com anos negativos](../evidencias/bugs/BUG-002-anos-negativos-listagem-veiculos.png).

### CT-005 — Cadastro com ano zero

- **Objetivo:** verificar se o campo rejeita um ano que não corresponde a um ano plausível de fabricação.
- **Pré-condições:** formulário de veículo aberto.
- **Dados:** `0`.
- **Passos:** preencher os demais campos; informar `0`; tentar salvar e verificar persistência.
- **Esperado:** rejeitar `0` como ano de fabricação de veículo.
- **Obtido:** ano `0` pode ser salvo.
- **Status:** **Reprovado — falha de validação**, considerando a expectativa de que o ano corresponda a um ano plausível do mundo real. O limite inferior exato deve ser definido pelo produto.
- **Evidência:** confirmação manual do usuário; screenshot não fornecida.

### CT-006 — Cadastro com ano extremamente alto

- **Objetivo:** verificar a diferença entre os algarismos que podem ser digitados e o limite aceito ao salvar, além de validar a faixa plausível do ano.
- **Pré-condições:** formulário de veículo aberto.
- **Dados:** `999999999` (nove dígitos) e um valor com mais de nove algarismos.
- **Passos:** preencher os demais campos; digitar um valor com mais de nove algarismos e tentar salvar; depois informar `999999999`, salvar e conferir o registro na listagem.
- **Esperado:** rejeitar anos fora de uma faixa plausível para fabricação de veículos; os limites exatos devem ser definidos pelo produto.
- **Obtido:** é possível digitar valores com mais de nove algarismos, mas não salvá-los. `999999999`, com nove algarismos, foi salvo e aparece na listagem; a captura mostra o mesmo valor na edição do veículo.
- **Status:** **Reprovado — falha de validação**, pois `999999999` foi salvo apesar de não ser um ano plausível de fabricação. O limite de nove algarismos no salvamento não substitui a validação da faixa do ano.
- **Evidência:** [veículo salvo com ano de nove dígitos](../evidencias/bugs/BUG-002-ano-maximo-nove-digitos.png).

### CT-007 — Tentativa de cadastro com placa duplicada

- **Objetivo:** verificar unicidade de placa.
- **Pré-condições:** já existe veículo cadastrado com a placa `VLC-1234`.
- **Dados:** placa `VLC-1234`.
- **Passos:** abrir novo cadastro; informar a placa existente e os demais dados; tentar salvar.
- **Esperado:** impedir duplicidade e informar o motivo.
- **Obtido:** o sistema bloqueou o cadastro e exibiu a mensagem `Vehicle with placa 'VLC-1234' already exists`.
- **Status:** **Aprovado**.
- **Evidência:** [mensagem de placa duplicada](../evidencias/screenshots/CT-007-placa-duplicada-bloqueada.png).

### CT-008 — Validação do formato da placa

- **Objetivo:** verificar a rejeição de uma placa fora dos formatos aceitos e a orientação apresentada ao usuário.
- **Pré-condições:** formulário de cadastro de veículo aberto.
- **Dados:** valor inválido `21`; a mensagem informa exemplos dos formatos antigo (`ABC-1234`) e Mercosul (`ABC1D23`).
- **Passos:** abrir o cadastro; informar `21` no campo Placa; observar a validação.
- **Esperado:** rejeitar valor fora dos formatos aceitos e informar formatos válidos.
- **Obtido:** o sistema exibiu `Formato inválido. Use padrão antigo (ABC-1234) ou Mercosul (ABC1D23).`
- **Status:** **Aprovado** para a rejeição do valor inválido e a orientação exibida. A aceitação prática dos dois exemplos não foi verificada separadamente.
- **Evidência:** [mensagem de formato inválido com os formatos aceitos](../evidencias/screenshots/CT-008-formato-placa-invalido-mensagem.png).

## Manutenções

### CT-009 — Tentativa de criar manutenção com campos vazios

- **Objetivo:** verificar obrigatoriedade dos campos.
- **Pré-condições:** usuário autenticado e formulário de manutenção aberto.
- **Dados:** um ou mais campos obrigatórios vazios.
- **Passos:** deixar campos sem preenchimento; observar o formulário e tentar salvar.
- **Esperado:** impedir envio e indicar os dados necessários.
- **Obtido:** com os campos vazios, o botão `Agendar` permanece desabilitado e não é possível criar a manutenção.
- **Status:** **Aprovado** — o formulário bloqueia o envio enquanto os campos obrigatórios estão vazios.
- **Evidência:** [formulário de manutenção vazio com o botão desabilitado](../evidencias/screenshots/CT-009-manutencao-campos-obrigatorios.png).

### CT-010 — Tentativa de agendar manutenção sem selecionar veículo

- **Objetivo:** verificar vínculo obrigatório entre manutenção e veículo.
- **Pré-condições:** formulário de manutenção aberto.
- **Dados:** tipo de serviço, datas e custo preenchidos; nenhum veículo selecionado.
- **Passos:** preencher os campos disponíveis; manter o veículo sem seleção; verificar o botão `Agendar`.
- **Esperado:** impedir cadastro sem veículo associado.
- **Obtido:** mesmo com os demais campos preenchidos, o botão `Agendar` permanece desabilitado enquanto nenhum veículo está selecionado.
- **Status:** **Aprovado** — a seleção do veículo é obrigatória para habilitar o agendamento.
- **Evidência:** [formulário preenchido sem veículo e com o botão desabilitado](../evidencias/screenshots/CT-010-manutencao-sem-veiculo.png).

### CT-011 — Nova manutenção para veículo com manutenção ativa

- **Objetivo:** verificar o bloqueio de uma nova manutenção enquanto o veículo já possui uma manutenção ativa.
- **Pré-condições:** veículo associado a uma manutenção com status pendente ou em realização.
- **Dados:** nova manutenção para o mesmo veículo, mesmo que tenha outra data.
- **Passos:** selecionar o veículo com manutenção ativa; preencher os dados de uma nova manutenção; tentar agendar.
- **Esperado:** bloquear outra manutenção e orientar o usuário a finalizar a manutenção ativa.
- **Obtido:** o sistema bloqueou o agendamento e exibiu: `Veículo já possui uma manutenção ativa (PENDENTE ou EM_REALIZACAO). Finalize-a antes de criar outra.`
- **Status:** **Aprovado** — o bloqueio e a regra estão explicitados pela própria mensagem da aplicação.
- **Evidência:** [mensagem de manutenção ativa](../evidencias/screenshots/CT-011-manutencao-ativa-bloqueia-nova.png).

## Viagens

### CT-012 — Tentativa de cadastro com campos obrigatórios vazios

- **Objetivo:** verificar obrigatoriedade dos dados de viagem.
- **Pré-condições:** formulário de viagem aberto.
- **Dados:** um ou mais campos obrigatórios vazios.
- **Passos:** abrir o formulário e deixar todos os campos vazios; verificar o botão `Adicionar`.
- **Esperado:** impedir envio e apontar campos pendentes.
- **Obtido:** com todos os campos vazios, o botão `Adicionar` permanece desabilitado e não é possível criar a viagem.
- **Status:** **Aprovado** — o formulário bloqueia o envio enquanto os campos obrigatórios estão vazios.
- **Evidência:** [formulário de viagem vazio com o botão desabilitado](../evidencias/screenshots/CT-012-viagem-campos-vazios.png).

### CT-013 — Formato de data exibido no cadastro de viagem

- **Objetivo:** registrar o formato de data apresentado no formulário e confirmar que ele é aceito.
- **Pré-condições:** formulário de viagem aberto.
- **Dados:** formato mostrado no formulário: `MM/DD/YYYY` (mês/dia/ano).
- **Passos:** abrir o formulário de viagem e observar o placeholder dos campos de data; preencher com uma data nesse formato.
- **Esperado:** aceitar a data informada e usar um formato familiar ao público brasileiro, preferencialmente `DD/MM/YYYY`.
- **Obtido:** o formulário mostra `mm/dd/yyyy`; o usuário confirmou que esse formato funciona. Ele não é incompatível, mas é menos usual para quem está acostumado ao padrão brasileiro `DD/MM/YYYY`.
- **Status:** **Aprovado** quanto à aceitação da data; oportunidade de localização/usabilidade registrada na UX-007.
- **Evidência:** [formulário mostrando o formato `mm/dd/yyyy`](../evidencias/screenshots/CT-013-formato-data-mm-dd-yyyy.png).

### CT-014 — Consistência entre datas de saída e chegada

- **Objetivo:** verificar relação cronológica entre saída e chegada.
- **Pré-condições:** formulário de viagem aberto.
- **Dados:** veículo `VLC-1235`, saída `10/10/2026`, chegada `05/10/2026`, trajeto João Pessoa–Natal e `400 km`.
- **Passos:** cadastrar a viagem com chegada anterior à saída; consultar o registro na listagem.
- **Esperado:** a data de chegada deve ser igual ou posterior à data de saída.
- **Obtido:** a viagem com saída em `10/10/2026` e chegada em `05/10/2026` foi salva e aparece na listagem.
- **Status:** **Reprovado — defeito confirmado**, pois a aplicação permite salvar uma viagem cuja chegada ocorre antes da saída.
- **Evidência:** [viagem salva com chegada anterior à saída](../evidencias/screenshots/CT-014-viagem-chegada-anterior-saida.png).

### CT-015 — Viagens duplicadas

- **Objetivo:** verificar se o produto identifica viagens repetidas.
- **Pré-condições:** viagem existente com os mesmos dados relevantes.
- **Dados:** veículo `VLC-1234`; trajeto Recife–Natal; saída e chegada exibidas como `03/10/2026`; `287 km` percorridos.
- **Passos:** cadastrar uma viagem; tentar cadastrar outra com os mesmos dados; consultar listagem e Dashboard.
- **Esperado:** permitir viagens duplicadas, conforme regra confirmada pelo usuário.
- **Obtido:** duas linhas idênticas aparecem na listagem para `VLC-1234`, trajeto Recife–Natal, mesmas datas e `287 km` cada. Ambas são exibidas como viagens distintas.
- **Status:** **Aprovado** — duplicidade é permitida pela regra confirmada.
- **Evidência:** [duas viagens idênticas na listagem](../evidencias/screenshots/CT-015-viagens-duplicadas-iguais.png).

### CT-016 — Reflexo dos quilômetros da viagem no Dashboard

- **Objetivo:** verificar atualização do indicador de quilometragem após registrar viagem.
- **Pré-condições:** acesso ao Dashboard e ao cadastro de viagem.
- **Dados:** veículo `VLC-1235`; total anterior de `400 km`; nova viagem com `4.011 km`.
- **Passos:** registrar o total no Dashboard antes da viagem; cadastrar a viagem; conferir a listagem; consultar novamente o Dashboard para o mesmo veículo.
- **Esperado:** somar a quilometragem da nova viagem ao total anterior.
- **Obtido:** o total do Dashboard passou de `400 km` para `4.411 km`, refletindo a viagem de `4.011 km` registrada para `VLC-1235`.
- **Status:** **Aprovado** — a atualização e a soma dos quilômetros foram confirmadas.
- **Evidências:** [Dashboard antes da viagem (`400 km`)](../evidencias/screenshots/CT-016-dashboard-antes-viagem.png); [viagem de `4.011 km` na listagem](../evidencias/screenshots/CT-016-viagem-4011km-cadastrada.png); [Dashboard após a viagem (`4.411 km`)](../evidencias/screenshots/CT-016-dashboard-apos-viagem.png).


## Observações adicionais de interface e fluxo

### CT-017 — Pesquisa e paginação de veículos

- **Objetivo:** documentar opções disponíveis para localizar veículos em uma listagem extensa.
- **Pré-condições:** listagem com mais de dez veículos cadastrados.
- **Passos:** abrir Veículos; usar pesquisa por placa e modelo; navegar entre páginas e verificar os controles disponíveis.
- **Esperado:** permitir localizar registros com eficiência; filtros adicionais e tamanho de página dependem das necessidades do produto.
- **Obtido:** a listagem indica `1–10 de 259` e oferece tamanhos de página `2`, `5` e `10`; a pesquisa disponível é por placa ou modelo.
- **Status:** **Observação de UX**, melhoria sugerida; não é defeito confirmado.
- **Evidência:** [listagem e opções de paginação](../evidencias/screenshots/UX-003-listagem-veiculos-paginacao.png).

### CT-018 — Edição de status de manutenção concluída

- **Objetivo:** verificar se o status de uma manutenção concluída pode ser alterado pela edição do registro.
- **Pré-condições:** manutenção existente com status concluída.
- **Passos:** abrir a edição de uma manutenção concluída; abrir o campo Status; verificar as opções disponíveis.
- **Esperado:** uma manutenção concluída permanece concluída, conforme regra confirmada pelo usuário.
- **Obtido:** a edição mostra somente a opção `Concluída (atual)`; não há outro status disponível para selecionar. Para corrigir um registro concluído por engano, foi relatado que seria necessário excluir e criar novamente a manutenção.
- **Status:** **Aprovado** — status concluído é irreversível pela regra confirmada; oportunidade de UX registrada separadamente.
- **Evidência:** [edição de manutenção concluída sem outras opções de status](../evidencias/screenshots/CT-018-status-concluida-sem-opcoes.png).

### CT-019 — Filtros e ordenação nos autocompletes de veículo

- **Objetivo:** avaliar como localizar um veículo nos autocompletes de Manutenções e Viagens quando placa ou modelo não são conhecidos.
- **Pré-condições:** muitos veículos cadastrados.
- **Passos:** abrir os formulários de nova manutenção e nova viagem; abrir o autocomplete de veículo; procurar opções de filtro por placa, modelo, tipo e ano e ordenação dos resultados.
- **Esperado:** permitir filtrar por atributos do veículo e ordenar os resultados para facilitar a localização.
- **Obtido:** os seletores de Manutenções e Viagens possuem autocomplete, mas não oferecem filtros; quando a placa ou o modelo não são conhecidos, a lista extensa dificulta encontrar o veículo; foi sugerido filtrar por placa, modelo, tipo e ano e ordenar alfabeticamente ou por ano.
- **Status:** **Observação de UX**, melhoria sugerida; não é defeito confirmado.
- **Evidência complementar:** [listagem com os atributos placa, modelo, tipo e ano](../evidencias/screenshots/UX-004-listagem-veiculos-atributos.png).
