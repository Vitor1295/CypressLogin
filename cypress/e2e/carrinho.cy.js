describe('Carrinho', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test=password]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('Adicionar produto ao carrinho com sucesso', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '1')
    cy.get('#shopping_cart_container').click()
    cy.contains('Sauce Labs Backpack').should('be.visible')
    cy.screenshot('produto adicionado')
  })

  it('Remover produto do carrinho com sucesso', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge')
      .should('be.visible')
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('not.exist')
    cy.screenshot('produto removido')
  })
})

describe('Carrinho', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test=password]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    // Espera a lista de produtos carregar
    cy.get('.inventory_list', { timeout: 10000 }).should('be.visible')
  })

  it('Adicionar múltiplos produtos ao carrinho', () => {

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible').click()
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').should('be.visible').click()
    cy.get('.shopping_cart_badge').should('have.text', '3')
    cy.get('#shopping_cart_container').click()
    cy.contains('Sauce Labs Backpack').should('be.visible')
    cy.contains('Sauce Labs Bike Light').should('be.visible')
    cy.contains('Sauce Labs Fleece Jacket').should('be.visible')
  })

  it('Verificar que botão muda de "Add to cart" para "Remove" após adicionar', () => {

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')
    .and('contain.text', 'Remove')
  })

  it('Esvaziar carrinho removendo todos os produtos', () => {

  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible').click()
  cy.get('.shopping_cart_badge').should('have.text', '2')
  cy.get('#shopping_cart_container').click()
  cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible').click()
  cy.get('[data-test="remove-sauce-labs-bike-light"]').should('be.visible').click()
  cy.get('.shopping_cart_badge').should('not.exist')
  // Valida que não há produtos no carrinho
  cy.get('.cart_item').should('not.exist')
})

  it('Continuar comprando após acessar o carrinho', () => {

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click()
    cy.get('#shopping_cart_container').click()
    cy.get('[data-test="continue-shopping"]').should('be.visible').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('Verificar valor total dos itens adicionados no carrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible').click()
    cy.get('#shopping_cart_container').click()
    cy.contains('.inventory_item_price', '$29.99').should('be.visible')
    cy.contains('.inventory_item_price', '$9.99').should('be.visible')
    let total = 0
    cy.get('.inventory_item_price').each(($el) => {
      const price = parseFloat($el.text().replace('$', ''))
      total += price
    }).then(() => {
      expect(total).to.equal(39.98)
    })
  })

})
