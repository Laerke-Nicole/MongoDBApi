describe('Login', () => {

    // successfully logged in cypress test
    it('Successfully logs in', () => {
        // visit the url
        cypress.visit('http://localhost:4000/api/user/login');

        // input user and password
        cypress.get('input[name=userName').type("user")
        cypress.get('input[name=password').type("123456")
        
        // click submit btn
        cypress.get('button').contains('Submit').click()

        // assert that we are at the correct url
        cypress.url().should('contain', 'http://localhost:4000/api/user/login')
    })


    // failed login cypress test
    it('Failed logged in', () => {
        // visit the url
        cypress.visit('http://localhost:4000/api/user/login');

        // input user and password
        cypress.get('input[name=userName').type("user")
        cypress.get('input[name=password').type("1234")
        
        // click submit btn
        cypress.get('button').contains('Submit').click()

        // assert that we are at the correct url
        cypress.url().should('contain', 'http://localhost:4000/api/user/login')
    })
})