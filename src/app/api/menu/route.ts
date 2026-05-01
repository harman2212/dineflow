import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const SEED_DATA = [
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

// Generate static items with stable IDs for fallback mode
const STATIC_ITEMS = SEED_DATA.map((item, i) => ({
  ...item,
  id: `static-${i}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// Auto-seed helper — runs once when database is empty
let seeded = false;
async function ensureSeeded() {
  if (seeded) return;
  try {
    const count = await db.menuItem.count();
    if (count === 0) {
      console.log('[DineFlow] Database empty — seeding 17 menu items...');
      await db.menuItem.createMany({ data: SEED_DATA });
      console.log('[DineFlow] Seed complete!');
    }
    seeded = true;
  } catch (error) {
    console.error('[DineFlow] Auto-seed failed:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Try database first
    await ensureSeeded();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const items = await db.menuItem.findMany({
      where: category && category !== 'All' ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(items);
  } catch (error) {
    // DATABASE NOT AVAILABLE — fallback to static data so the site still works
    console.warn('[DineFlow] Database unavailable, serving static menu data');

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let items = STATIC_ITEMS;
    if (category && category !== 'All') {
      items = items.filter((item) => item.category === category);
    }

    return NextResponse.json(items);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, category, image, available, isPopular } = body;

    if (!name || !description || !price || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const item = await db.menuItem.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        image: image || '/food/placeholder.png',
        available: available !== false,
        isPopular: isPopular || false,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item. Database may not be configured.' }, { status: 500 });
  }
}
