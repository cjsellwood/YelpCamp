const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60286f667c858c285f7c2c5e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est perferendis facilis, architecto veritatis enim dolorem vel similique recusandae doloremque nostrum aliquid error beatae? Inventore numquam quia ratione cum dicta quam!",
      price,
      images: [
        {
          url:
            "https://res.cloudinary.com/due9a2put/image/upload/v1613277633/YelpCamp/kzlrgnrl4puq5uiw1xnm.jpg",
            filename: "YelpCamp/kzlrgnrl4puq5uiw1xnm.jpg"
        },
        {
          url:
          "https://res.cloudinary.com/due9a2put/image/upload/v1613277633/YelpCamp/r83igommeqrwkdscofll.jpg",
          filename: "YelpCamp/r83igommeqrwkdscofll.jpg",
        }
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
