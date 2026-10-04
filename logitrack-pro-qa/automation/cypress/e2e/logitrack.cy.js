const login = () => {
  cy.env(['username', 'password']).then(({ username, password }) => {
    expect(username, 'e-mail de teste configurado').to.be.a('string').and.not.be.empty
    expect(password, 'senha de teste configurada').to.be.a('string').and.not.be.empty

    cy.visit('/login')
    cy.get('input').eq(0).type(username, { log: false })
    cy.get('input').eq(1).type(password, { log: false })
    cy.contains('button', 'Entrar').click()
    cy.location('pathname').should('eq', '/dashboard')
  })
}

describe('LogiTrack Pro', () => {
  it('permite acesso com credenciais válidas e abre o Dashboard', () => {
    login()
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Total de KM Percorrido').should('be.visible')
  })

  it('mantém o cadastro de veículo bloqueado até preencher os campos obrigatórios', () => {
    login()
    cy.visit('/veiculos')
    cy.contains('button', 'Adicionar Veículo').click()
    cy.contains('button', 'Criar').should('be.disabled')

    cy.get('#placa').type('CYP1A23')
    cy.get('#modelo').type('Veículo Cypress QA')
    cy.get('#ano').clear().type('2025')

    cy.contains('button', 'Criar').should('be.enabled')
  })

  it('bloqueia o cadastro de uma placa já existente', () => {
    login()
    cy.visit('/veiculos')
    cy.contains('VLC-1234').should('be.visible')
    cy.contains('button', 'Adicionar Veículo').click()
    cy.get('#placa').type('VLC-1234')
    cy.get('#modelo').type('Tentativa de duplicidade Cypress')
    cy.get('#ano').clear().type('2025')
    cy.intercept('POST', '**/v1/veiculos').as('createVehicle')
    cy.contains('button', 'Criar').click()

    cy.wait('@createVehicle').its('response.statusCode').should('eq', 409)
  })

  it.skip('rejeita senha incorreta e mantém o usuário fora do sistema', () => {
    cy.env(['username']).then(({ username }) => {
      expect(username, 'e-mail de teste configurado').to.be.a('string').and.not.be.empty
      cy.visit('/login')
      cy.get('input').eq(0).type(username, { log: false })
      cy.get('input').eq(1).type('senha-incorreta-de-regressao', { log: false })
      cy.contains('button', 'Entrar').click()
      cy.location('pathname').should('eq', '/login')
    })
  })
})
