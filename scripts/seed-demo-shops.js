// Populates 3 demo shops so the "Our Work" portfolio section links to
// real, nicely-filled-out sample sites instead of empty placeholders.
// Safe to re-run — uses upsert, so it won't create duplicates.
//
// Run with: npm run db:seed

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Placeholder photos via LoremFlickr (keyword-matched, no API key needed,
// free for this kind of use). The `lock` number pins a specific photo so
// re-seeding always shows the same images. Swap these for a shop's real
// photos once you have a paying client.
const demoShops = [
  {
    slug: "meher-boutique",
    name: "Meher Boutique",
    category: "Women's Clothing & Ethnic Wear",
    templateType: "BOUTIQUE",
    tagline: "Where every outfit tells your story.",
    description:
      "Meher Boutique has been dressing the neighbourhood in style for over a decade. From everyday ethnic wear to bridal lehengas, every piece is handpicked or tailored in-house. Walk in for a fitting, walk out feeling like the best-dressed person in the room.",
    phone: "9876500001",
    whatsapp: "9876500001",
    address: "Shop 14, Fashion Street, Kankarbagh, Patna",
    mapEmbedUrl: null,
    published: true,
    photos: [
      "https://loremflickr.com/1200/800/saree,india?lock=101",
      "https://loremflickr.com/800/800/boutique,fashion?lock=102",
      "https://loremflickr.com/800/800/textile,india?lock=103",
      "https://loremflickr.com/800/800/tailor,clothing?lock=104",
    ],
  },
  {
    slug: "green-leaf-cafe",
    name: "Green Leaf Café",
    category: "Café & Multi-Cuisine Restaurant",
    templateType: "RESTAURANT",
    tagline: "Fresh food, brewed slow, served with love.",
    description:
      "A cosy neighbourhood café known for its filter coffee, wood-fired pizzas, and weekend brunch crowd. Green Leaf sources vegetables from local farms every morning, and the menu changes with the seasons. Great for a quiet coffee or a birthday get-together.",
    phone: "9876500002",
    whatsapp: "9876500002",
    address: "12 Boring Road, near City Mall, Patna",
    mapEmbedUrl: null,
    published: true,
    photos: [
      "https://loremflickr.com/1200/800/cafe,coffee?lock=201",
      "https://loremflickr.com/800/800/coffee,cup?lock=202",
      "https://loremflickr.com/800/800/bakery,food?lock=203",
      "https://loremflickr.com/800/800/restaurant,interior?lock=204",
    ],
  },
  {
    slug: "verma-electronics",
    name: "Verma Electronics",
    category: "Electronics, Appliances & Repair",
    templateType: "RETAIL",
    tagline: "Genuine brands, honest prices, real service.",
    description:
      "Verma Electronics has been the go-to shop for TVs, ACs, and home appliances since 1998. We stock all major brands, offer EMI on every purchase, and — unlike most shops — actually pick up the phone when your appliance breaks down after the sale.",
    phone: "9876500003",
    whatsapp: "9876500003",
    address: "45 Station Road, opposite SBI Bank, Patna",
    mapEmbedUrl: null,
    published: true,
    photos: [
      "https://loremflickr.com/1200/800/electronics,store?lock=301",
      "https://loremflickr.com/800/800/television?lock=302",
      "https://loremflickr.com/800/800/appliance,shop?lock=303",
      "https://loremflickr.com/800/800/electronics,repair?lock=304",
    ],
  },
];

async function main() {
  for (const shop of demoShops) {
    const { photos, ...shopData } = shop;

    const existing = await prisma.shop.findUnique({ where: { slug: shop.slug } });

    if (existing) {
      // Shop already exists (e.g. from an earlier seed run) — refresh its
      // details and photos rather than skipping, so re-running this script
      // after updating the demoShops list above actually takes effect.
      await prisma.photo.deleteMany({ where: { shopId: existing.id } });
      await prisma.shop.update({
        where: { id: existing.id },
        data: {
          ...shopData,
          photos: {
            create: photos.map((url, index) => ({
              url,
              publicId: `demo-${shop.slug}-${index}`,
              order: index,
            })),
          },
        },
      });
      console.log(`Updated demo shop: ${shop.name} → /site/${shop.slug}`);
      continue;
    }

    await prisma.shop.create({
      data: {
        ...shopData,
        photos: {
          create: photos.map((url, index) => ({
            url,
            publicId: `demo-${shop.slug}-${index}`, // no real Cloudinary asset behind these
            order: index,
          })),
        },
      },
    });

    console.log(`Created demo shop: ${shop.name} → /site/${shop.slug}`);
  }

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
