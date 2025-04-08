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
        const bookId = json.data.bookId;
        expect(response.status()).toBe(200);


        // arrange
        const review = {
            book: bookId,
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
        expect(receivedReview.bookId).toEqual(receivedReview.bookId);
        expect(receivedReview.rating).toEqual(receivedReview.rating);

        expect(json).toHaveLength(1);
    });
}