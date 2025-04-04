import { test, expect } from '@playwright/test';

// testing health
export default function bookTestCollection() {
    // test valid data for books
    test("Valid book info", async ({ request }) => {
        test.setTimeout(30_000);

        // arrange create user and login
        const userRegister = {
            name: "John Doe",
            email: "john@gmail.com",
            password: "123456"
        }

        const userLogin = {
            email: "john@gmail.com",
            password: "123456"
        }

        // register user
        let response = await request.post("/api/user/register", { data: userRegister });
        let json = await response.json();

        expect(response.status()).toBe(201);


        // login user
        response = await request.post("/api/user/login", { data: userLogin });
        json = await response.json();

        const token = json.data.token;
        const userId = json.data.userId;
        expect(response.status()).toBe(200);


        // arrange
        const book = {
            title: "Fourth Wing",
            author: "Rebecca Yarros",
            description: "Dragon academy",
            genre: "Fantasy",
            imageURL: "https://www.google.com",
            releaseYear: 2021,
            price: 100,
            stock: 10,
            discount: false,
            discountPct: 0,
            ishidden: false,
            _createdBy: userId
        }

        response = await request.post("/api/books/", {
            data: book,
            headers: {
                "auth-token": token, // add token in the request
            }
        });
        expect(response.status()).toBe(201);


        // verify there is a book in the db
        response = await request.get("/api/books/");
        json = await response.json();
        const receivedBook = json[0];

        // what to expect in the test
        expect(receivedBook.title).toEqual(receivedBook.title);
        expect(receivedBook.description).toEqual(receivedBook.description);

        expect(json).toHaveLength(1);
    });
}