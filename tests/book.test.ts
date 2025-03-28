import { test, expect } from '@playwright/test';

// testing health
export default function bookTestCollection() {
    // test valid data for books
    test("Valid book info", async ({ request }) => {
        test.setTimeout(10_000);

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
            _createdBy: "userId"
        }

        // act
        const response = await request.post("/api/books", { data: book});
        const json = await response.json();

        // assert
        expect(response.status()).toBe(201);
        expect(json.error).toEqual(null);
    });


    // // test invalid data for user
    // test("Invalid book description info", async ({ request }) => {
    //     test.setTimeout(10_000);

    //     // arrange
    //     const book = {
    //         title: "Fourth Wing",
    //         author: "Rebecca Yarros",
    //         description: "Dra",
    //         genre: "Fantasy",
    //         imageURL: "https://www.google.com",
    //         releaseYear: 2021,
    //         price: 100,
    //         stock: 10,
    //         discount: false,
    //         discountPct: 0,
    //         ishidden: false,
    //         _createdBy: "userId"
    //     }

    //     // act
    //     const response = await request.post("/api/books", { data: book});
    //     const json = await response.json();

    //     // assert
    //     expect(response.status()).toBe(400);
    //     // console.log(json.error);
    //     expect(json.error).toEqual("\"description\" length must be at least 6 characters long");
    // });
}