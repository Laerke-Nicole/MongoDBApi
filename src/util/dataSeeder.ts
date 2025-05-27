import bcrypt from "bcrypt";
import dotenvFlow from "dotenv-flow";
import { faker } from '@faker-js/faker';

// imports
import { bookModel } from "../models/bookModel";
import { userModel } from "../models/userModel";
import { reviewModel } from "../models/reviewModel";
import { connectToDB, disconnectToDB } from "../repository/database";

dotenvFlow.config();

// seed db with data so theres always data in the collection
export async function seed() {
  try {
    await connectToDB();

    await deleteAllData();
    await seedData();
    console.log("Seeded data successfully.");
    process.exit();
  } catch (err) {
    console.log("Error Seeding the data." + err);
  }
  finally {
    await disconnectToDB();
  }
};


// delete all data from the db
export async function deleteAllData() {
  await bookModel.deleteMany();
  await userModel.deleteMany();
  await reviewModel.deleteMany();

  console.log("Cleared data successfully.");
};

// data seeding in the db
export async function seedData() {
    // hash users password 
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("12345678", salt);

    // seed for users
    const user1 = new userModel();
    user1.name = faker.person.fullName();
    user1.email = faker.internet.email();
    user1.password = passwordHash;
    await user1.save();

    const user2 = new userModel();
    user2.name = faker.person.fullName();
    user2.email = faker.internet.email();
    user2.password = passwordHash;
    await user2.save();

    // seed for books 
    const books = [];
    for (let i = 0; i < 10; i++) {
        books.push({
        title: faker.lorem.words(),
        author: faker.person.fullName(),
        description: faker.lorem.words(),
        genre: faker.lorem.word(),
        imageURL: faker.image.url(),
        releaseYear: faker.date.past({ years: 50 }).getFullYear(),
        isHidden: false,
        });
    }

    // save book _id from MongoDB
    const savedBooks = await bookModel.insertMany(books) 

    // seed for reviews  
    const reviews = [];
    for (let i = 0; i < 10; i++) {
        reviews.push({
        _book: savedBooks[0]._id,
        _createdBy: user1.id, 
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.words(),
        });
    }

    await reviewModel.insertMany(reviews);

    console.log("Seeded data successfully.");
};

// start seeding
seed();