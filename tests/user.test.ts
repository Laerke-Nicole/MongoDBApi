import { test, expect } from '@playwright/test';

// testing health
export default function userTestCollection() {
    test("Valid user registration info", async ({ request }) => {
        test.setTimeout(10_000);

        // arrange
        const user = {
            name: "John Doe",
            email: "mail@getMaxListeners.com",
            password: "12345678"
        }

        // act
        const response = await request.post("/api/user/register", { data: user});
        const json = await response.json();

        // assert
        expect(response.status()).toBe(201);
        expect(json.error).toEqual(null);
    })
}