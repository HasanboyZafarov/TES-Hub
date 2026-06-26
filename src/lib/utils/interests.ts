import { faker } from "@faker-js/faker";

const interestPool = [
  "Technology",
  "Photography",
  "Travel",
  "Cooking",
  "Fitness",
  "Reading",
  "Gaming",
  "Music",
  "Gardening",
  "Art",
  "Sports",
];

const userInterests = faker.helpers.arrayElements(interestPool, {
  min: 1,
  max: 4,
});

export default userInterests;
