import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding DineFlow database...');

  // Check if data already exists
  const existing = await prisma.menuItem.count();
  if (existing > 0) {
    console.log(`Database already has ${existing} menu items. Skipping seed.`);
    return;
  }

  const menuItems = [
    { name: "Margherita Pizza", description: "Classic Italian pizza with fresh mozzarella, San Marzano tomato sauce, and fragrant basil leaves on a thin, crispy crust.", price: 14.99, category: "Pizza", image: "/food/margherita-pizza.png", available: true, isPopular: true, rating: 4.8 },
    { name: "Pepperoni Supreme", description: "Loaded with premium pepperoni, melted mozzarella cheese, and our signature tomato sauce on a hand-tossed crust.", price: 16.99, category: "Pizza", image: "/food/pizza-2.png", available: true, isPopular: false, rating: 4.6 },
    { name: "Truffle Mushroom Pizza", description: "Wild mushroom medley with truffle oil, fontina cheese, and fresh thyme on a wood-fired crust.", price: 19.99, category: "Pizza", image: "/food/pizza-3.png", available: true, isPopular: true, rating: 4.9 },
    { name: "Classic Cheeseburger", description: "Juicy beef patty with aged cheddar, lettuce, tomato, pickles, and our house sauce on a toasted brioche bun.", price: 12.99, category: "Burgers", image: "/food/cheeseburger.png", available: true, isPopular: true, rating: 4.7 },
    { name: "Smoky BBQ Burger", description: "Slow-smoked beef patty glazed with tangy BBQ sauce, crispy onion rings, and smoked gouda.", price: 14.99, category: "Burgers", image: "/food/burger-2.png", available: true, isPopular: false, rating: 4.5 },
    { name: "Caesar Salad", description: "Crisp romaine lettuce with house-made Caesar dressing, shaved Parmesan, garlic croutons, and anchovy fillets.", price: 11.99, category: "Salads", image: "/food/caesar-salad.png", available: true, isPopular: false, rating: 4.4 },
    { name: "Mediterranean Bowl", description: "Mixed greens with roasted chickpeas, feta cheese, sun-dried tomatoes, cucumbers, Kalamata olives, and lemon vinaigrette.", price: 13.99, category: "Salads", image: "/food/salad-2.png", available: true, isPopular: true, rating: 4.6 },
    { name: "Grilled Salmon", description: "Fresh Atlantic salmon fillet grilled to perfection, served with roasted asparagus and lemon butter sauce.", price: 24.99, category: "Seafood", image: "/food/grilled-salmon.png", available: true, isPopular: true, rating: 4.8 },
    { name: "Garlic Butter Shrimp", description: "Jumbo tiger shrimp sautéed in garlic herb butter, served over creamy risotto with a squeeze of fresh lemon.", price: 22.99, category: "Seafood", image: "/food/seafood-2.png", available: true, isPopular: false, rating: 4.7 },
    { name: "Pasta Carbonara", description: "Al dente spaghetti with crispy pancetta, egg yolk, Pecorino Romano, and freshly cracked black pepper.", price: 15.99, category: "Pasta", image: "/food/pasta-carbonara.png", available: true, isPopular: true, rating: 4.8 },
    { name: "Spicy Arrabiata Penne", description: "Penne pasta in a fiery tomato sauce with garlic, red chili flakes, and fresh basil.", price: 13.99, category: "Pasta", image: "/food/pasta-2.png", available: true, isPopular: false, rating: 4.3 },
    { name: "Chicken Wings", description: "Crispy fried chicken wings tossed in your choice of buffalo, honey garlic, or BBQ sauce. Served with ranch dip.", price: 11.99, category: "Appetizers", image: "/food/chicken-wings.png", available: true, isPopular: true, rating: 4.6 },
    { name: "Loaded Nachos", description: "Crispy tortilla chips piled high with melted cheese, jalapeños, pico de gallo, sour cream, and guacamole.", price: 10.99, category: "Appetizers", image: "/food/nachos.png", available: true, isPopular: false, rating: 4.4 },
    { name: "Mango Smoothie", description: "Fresh ripe mangoes blended with yogurt, a hint of vanilla, and a squeeze of lime for a tropical refreshment.", price: 6.99, category: "Drinks", image: "/food/mango-smoothie.png", available: true, isPopular: true, rating: 4.7 },
    { name: "Iced Caramel Latte", description: "Double-shot espresso with smooth caramel syrup, cold milk, and ice, topped with whipped cream.", price: 5.99, category: "Drinks", image: "/food/latte.png", available: true, isPopular: false, rating: 4.5 },
    { name: "Chocolate Lava Cake", description: "Warm, decadent chocolate cake with a molten center, served with vanilla ice cream and fresh berries.", price: 9.99, category: "Desserts", image: "/food/chocolate-cake.png", available: true, isPopular: true, rating: 4.9 },
    { name: "Tiramisu", description: "Classic Italian dessert with layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa dusting.", price: 8.99, category: "Desserts", image: "/food/tiramisu.png", available: true, isPopular: false, rating: 4.7 },
  ];

  const result = await prisma.menuItem.createMany({ data: menuItems });
  console.log(`✅ Seeded ${result.count} menu items successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
