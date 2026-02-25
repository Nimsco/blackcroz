const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/black-croz";

app.use(cors());
app.use(express.json());

// ----- Mongo / Mongoose setup -----
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    seedIfEmpty();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

const collectionItemSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    description: String,
    priceLabel: String,
    imageUrl: String,
    tag: String,
  },
  { timestamps: true }
);

const lookbookImageSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    mood: String,
  },
  { timestamps: true }
);

const CollectionItem = mongoose.model("CollectionItem", collectionItemSchema);
const LookbookImage = mongoose.model("LookbookImage", lookbookImageSchema);

async function seedIfEmpty() {
  try {
    const itemCount = await CollectionItem.countDocuments();
    const lookCount = await LookbookImage.countDocuments();

    if (itemCount === 0) {
      await CollectionItem.insertMany([
        {
          name: "The Grey Hoodie",
          category: "Outerwear",
          description:
            "Soft fleece hoodie in Kathmandu grey — clean, minimal and made for everyday layers.",
          priceLabel: "NPR 7,500",
          imageUrl: "/assets/grey_hoodie.png",
          tag: "New",
        },
        {
          name: "The Trench Coat",
          category: "Outerwear",
          description:
            "Tailored trench in muted sand, the perfect top layer for cool evenings in the valley.",
          priceLabel: "NPR 14,500",
          imageUrl: "/assets/trench_coat.png",
          tag: "Signature",
        },
        {
          name: "The Puffer Jacket",
          category: "Outerwear",
          description:
            "Lightweight navy puffer with a streamlined profile, warm enough for Himalayan winds.",
          priceLabel: "NPR 11,200",
          imageUrl: "/assets/puffer_jacket.png",
          tag: "Essential",
        },
        {
          name: "The Denim Jacket",
          category: "Outerwear",
          description:
            "Classic indigo denim jacket with subtle distressing — built for Kathmandu streets.",
          priceLabel: "NPR 8,900",
          imageUrl: "/assets/denim_jacket.png",
          tag: "Core",
        },
      ]);
      console.log("Seeded CollectionItem data");
    }

    if (lookCount === 0) {
      await LookbookImage.insertMany([
        {
          title: "Night Shift",
          description: "Elevated streetwear under city lights.",
          imageUrl: "/assets/lookbook/night-shift-1.jpg",
          mood: "City / Night",
        },
        {
          title: "Soft Concrete",
          description: "Muted layers against brutalist lines.",
          imageUrl: "/assets/lookbook/soft-concrete-1.jpg",
          mood: "Minimal / Day",
        },
        {
          title: "Edge of Light",
          description: "Monochrome silhouettes in motion.",
          imageUrl: "/assets/lookbook/edge-of-light-1.jpg",
          mood: "Motion / Contrast",
        },
        {
          title: "Static Calm",
          description: "Quiet luxury in oversized forms.",
          imageUrl: "/assets/lookbook/static-calm-1.jpg",
          mood: "Calm / Texture",
        },
      ]);
      console.log("Seeded LookbookImage data");
    }
  } catch (err) {
    console.error("Seeding error:", err.message);
  }
}

// ----- API routes -----
app.get("/api/collections", async (req, res) => {
  try {
    const items = await CollectionItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load collections" });
  }
});

app.get("/api/lookbook", async (req, res) => {
  try {
    const images = await LookbookImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load lookbook" });
  }
});

// ----- Static front-end -----
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// SPA fallback for direct deep links (all to index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Black Croz server running on http://localhost:${PORT}`);
});

