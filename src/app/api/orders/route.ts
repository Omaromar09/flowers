import { NextResponse } from 'next/server';

// Server-side in-memory or persisted order store
export interface StoredOrder {
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  delivery: {
    country: string;
    city: string;
    area: string;
    address: string;
    buildingDetails?: string;
    deliveryDate: string;
    deliverySlot: string;
    instructions?: string;
    isGift: boolean;
    recipientName?: string;
    recipientPhone?: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    size: string;
    includeVase: boolean;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending_capture' | 'cod_authorized' | 'simulated_dev';
}

const ordersDatabase: StoredOrder[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.customer?.fullName || !body.customer?.email || !body.customer?.phone) {
      return NextResponse.json(
        { error: 'Missing required customer contact details' },
        { status: 400 }
      );
    }

    if (!body.delivery?.address || !body.delivery?.city || !body.delivery?.deliveryDate) {
      return NextResponse.json(
        { error: 'Missing complete courier destination information' },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Cannot process an empty floral order' },
        { status: 400 }
      );
    }

    // Generate unique aristocratic order token
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `JV-2026-${randomSuffix}`;

    const newOrder: StoredOrder = {
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: body.customer,
      delivery: body.delivery,
      items: body.items,
      subtotal: body.subtotal,
      shipping: body.shipping,
      discount: body.discount,
      total: body.total,
      paymentMethod: body.paymentMethod,
      paymentStatus:
        body.paymentMethod === 'cod' ? 'cod_authorized' : 'simulated_dev'
    };

    ordersDatabase.push(newOrder);

    return NextResponse.json({
      success: true,
      order: newOrder
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal order verification failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalOrders: ordersDatabase.length,
    orders: ordersDatabase
  });
}
