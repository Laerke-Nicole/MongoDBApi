import { test, expect } from '@playwright/test';

// testing health
export default function userTestCollection() {

    // test valid data for user
    test("Valid user registration info", async ({ request }) => {
        test.setTimeout(10_000);

        // arrange
        const user = {
            name: "John Doe",
            email: "mail@gmail.com",
            password: "12345678"
        }

        // act
        const response = await request.post("/api/user/register", { data: user});
        const json = await response.json();

        // assert
        expect(response.status()).toBe(201);
        expect(json.error).toEqual(null);
    });

    // test invalid data for user
    test("Invalid user registration info", async ({ request }) => {
        test.setTimeout(10_000);

        // arrange
        const user = {
            name: "John Doe",
            email: "mail@gmail.com",
            password: "1234" //invalid pass
        }

        // act
        const response = await request.post("/api/user/register", { data: user});
        const json = await response.json();

        // assert
        expect(response.status()).toBe(400);
        // console.log(json.error);
        expect(json.error).toEqual("\"password\" length must be at least 6 characters long");
    });
}