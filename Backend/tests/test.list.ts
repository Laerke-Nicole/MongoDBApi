// order to run tests

process.env.NODE_ENV = 'test';

import { test } from '@playwright/test';
import health from './health.test';
import userTestCollection from './user.test';
import bookTestCollection from './book.test';
import reviewTestCollection from './review.test';

import { userModel } from '../src/models/userModel';
import { bookModel } from '../src/models/bookModel';
import { reviewModel } from '../src/models/reviewModel';

import dotenvFlow from 'dotenv-flow' // read dotenv
import { connectToDB, disconnectToDB } from '../src/repository/database';
dotenvFlow.config();

function setup() {
    // bewforeEach clear test db
    test.beforeEach(async () => {
        try {
            await connectToDB();
            await userModel.deleteMany({});
            await bookModel.deleteMany({});
            await reviewModel.deleteMany({});
        }
        finally {
            await disconnectToDB();
        }
    })

    // afterAll test has been run clear db
    test.afterAll(async () => {
        try {
            await connectToDB();
            await userModel.deleteMany({});
            await bookModel.deleteMany({});
            await reviewModel.deleteMany({});
        }
        finally {
            await disconnectToDB();
        }
    })
}

setup();

// run tests
test.describe(health);
test.describe(userTestCollection);
test.describe(bookTestCollection);
test.describe(reviewTestCollection);