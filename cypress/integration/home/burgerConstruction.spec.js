describe('Сборка бургера', () => {
    Cypress.Cookies.debug(true);

    before(() => {
        cy.visit('http://localhost:3000');
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('token');
    });

    it('Должна открыться главная страница', () => {
        cy.contains('Войти');
        cy.contains('Соберите бургер');
    });

    it('Должны перейти на страницу входа', function () {
        cy.get('a').contains('Войти').click();
        cy.contains('Вход');
    });

    it('Логинимся', function () {
        Cypress.Cookies.debug(true);
        cy.get('#input-email > div > div > input').type('inikishin@gmail.com');
        cy.get('#input-password > div > div > input').type('123456');
        cy.get('button').contains('Войти').click();
        cy.contains('Личный кабинет');
        cy.contains('Соберите бургер');
    });

    it('Переносим элементы в конструктор', function () {
        cy.get('p').contains('Краторная булка').trigger('dragstart'); // price: 1255
        cy.get('p').contains('Выберите булку для космического бургера').trigger('drop');

        cy.get('p').contains('Соус Spicy-X').trigger('dragstart'); // price: 90
        cy.get('p').contains('Добавьте ингридиенты').trigger('drop');

        cy.get('p').contains('Говяжий метеорит (отбивная)').trigger('dragstart'); // price: 3000
        cy.get('#section-burger-constructor').contains('Соус Spicy-X').trigger('drop');
        cy.contains('5600'); // Проверяем итоговую сумму
    });

    it('Отправляем заказ', function () {
        cy.get('button').contains('Оформить заказ').click();
        cy.contains('идентификатор заказа', {timeout: 120000});
    });

});