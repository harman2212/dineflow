import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, total, customerName, customerPhone, tableNumber } = body;

    if (!items || !total || !customerName || !customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = await db.order.create({
      data: {
        items: JSON.stringify(items),
        total: parseFloat(total),
        customerName,
        customerPhone,
        tableNumber: tableNumber || null,
        status: 'pending',
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
