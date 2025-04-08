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


    // test update book
    test("Updating book info", async ({ request }) => {
        test.setTimeout(30_000);
    
        const userRegister = {
            name: "John Doe",
            email: "john@gmail.com",
            password: "123456"
        };
    
        const userLogin = {
            email: "john@gmail.com",
            password: "123456"
        };
    
        // register user
        let response = await request.post("/api/user/register", { data: userRegister });
        expect(response.status()).toBe(201);
    
        // login user
        response = await request.post("/api/user/login", { data: userLogin });
        let json = await response.json();
        const token = json.data.token;
        const userId = json.data.userId;
        expect(response.status()).toBe(200);
    
        // create a book first
        const book = {
            title: "Fourth wing",
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
        };
    
        response = await request.post("/api/books/", {
            data: book,
            headers: {
                "auth-token": token
            }
        });
        expect(response.status()).toBe(201);
        json = await response.json();
        const id = json._id;
    
        // store new data for the book
        const updatedBook = {
            ...book,
            title: "Updated Iron Flame",
            price: 120,
            stock: 15
        };
    
        // update the books data
        response = await request.put(`/api/books/${id}`, {
            data: updatedBook,
            headers: {
                "auth-token": token
            }
        });
        expect(response.status()).toBe(200);
    
        // Fetch the updated book
        response = await request.get(`/api/books/${id}`);
        json = await response.json();
    
        // Assert updated values
        expect(json.title).toBe("Updated Iron Flame");
        expect(json.price).toBe(120);
        expect(json.stock).toBe(15);
    });    
}