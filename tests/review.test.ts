import { test, expect } from '@playwright/test';

// testing reviews
export default function reviewTestCollection() {
    // test valid data for reviews
    test("Valid review info", async ({ request }) => {
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

        // create a book first
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
        };

        response = await request.post("/api/books/", {
            data: book,
            headers: {
                "auth-token": token
            }
        });
        expect(response.status()).toBe(201);
        json = await response.json();
        const bookId = json._id;
        

        // arrange
        const review = {
            _book: bookId,
            _createdBy: userId,
            rating: 2,
            comment: "Great book"
        }

        response = await request.post("/api/reviews/", {
            data: review,
            headers: {
                "auth-token": token, // add token in the request
            }
        });
        expect(response.status()).toBe(201);


        // verify there is a review in the db
        response = await request.get("/api/reviews/");
        json = await response.json();
        const receivedReview = json[0];

        // what to expect in the test
        expect(receivedReview._book).toEqual(bookId); 
        expect(receivedReview.rating).toEqual(review.rating);
        expect(receivedReview.comment).toEqual(review.comment);

        expect(json).toHaveLength(1);
    });
}