describe('Логин и переход на страницу профиля и выход', () => {
    before(() => {
        cy.visit('http://localhost:3000');
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
        cy.get('#input-email > div > div > input').type('inikishin@gmail.com');
        cy.get('#input-password > div > div > input').type('123456');
        cy.get('button').contains('Войти').click();
        cy.contains('Личный кабинет', {timeout: 120000});
    });

    it('Переходим в личный кабинет', function () {
        cy.get('a').contains('Личный кабинет').click();
        cy.contains('Выход');
    });

    it('Выходим', function () {
        cy.get('a').contains('Выход').click();
        cy.contains('Соберите бургер');
    });

});