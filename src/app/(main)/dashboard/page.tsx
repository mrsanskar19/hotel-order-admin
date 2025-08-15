'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, DollarSign, Utensils } from 'lucide-react';

import { orders } from '@/lib/data';
import type { Order } from '@/types';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const kpiData = [
  {
    title: 'Revenue Today',
    value: '$3,450',
    change: '+12.5%',
    icon: DollarSign,
  },
  { title: 'Orders Today', value: '128', change: '+8.2%', icon: Utensils },
];

function getStatusBadgeVariant(
  status: Order['status']
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Completed':
      return 'default';
    case 'Preparing':
      return 'secondary';
    case 'Pending':
      return 'outline';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
}

function getTableStatus(tableNumber: number) {
  const tableOrders = orders.filter(
    (o) =>
      o.table === tableNumber &&
      (o.status === 'Pending' || o.status === 'Preparing')
  );

  if (tableOrders.some((o) => o.status === 'Pending')) {
    return 'Needs Attention';
  }
  if (tableOrders.some((o) => o.status === 'Preparing')) {
    return 'Occupied';
  }
  return 'Available';
}

const tableStatuses = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  status: getTableStatus(i + 1),
}));

function getTableStatusColor(status: string) {
  switch (status) {
    case 'Available':
      return 'bg-white border hover:bg-muted';
    case 'Occupied':
      return 'bg-yellow-200';
    case 'Needs Attention':
      return 'bg-red-300';
    default:
      return 'bg-gray-200';
  }
}

const TableDetailsDialog = ({ tableNumber }: { tableNumber: number }) => {
  const [orderData, setOrderData] = React.useState<Order[]>(
    orders.filter((o) => o.table === tableNumber)
  );

  const handleStatusUpdate = (orderId: string, value: number) => {
    // Optimistically update the UI
    const updatedOrders = orderData.map((order) =>
      order.id === orderId
        ? { ...order, status: value === 100 ? 'Completed' : order.status }
        : order
    );
    setOrderData(updatedOrders);
  };

  const activeOrders = orderData.filter(
    (o) => o.status === 'Pending' || o.status === 'Preparing'
  );
  const completedOrders = orderData.filter((o) => o.status === 'Completed');
  const totalBill = activeOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="font-headline">Table {tableNumber} Details</DialogTitle>
        <DialogDescription>
          Review active and completed orders for this table.
        </DialogDescription>
      </DialogHeader>
      <div className="max-h-[60vh] overflow-y-auto pr-4">
        {orderData.length > 0 ? (
          <div className="space-y-4">
            {activeOrders.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Active Orders</h3>
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span>Order #{order.id.slice(-4)}</span>
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      {order.status === 'Preparing' && (
                        <CardFooter className="px-4 pb-4">
                          <Slider
                            defaultValue={[0]}
                            max={100}
                            step={1}
                            onValueChange={(value) => handleStatusUpdate(order.id, value[0])}
                            className="interactive-slider"
                          />
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
             {completedOrders.length > 0 && (
              <div>
                <h3 className="mb-2 mt-4 text-sm font-semibold text-muted-foreground">Completed Orders</h3>
                 <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <Card key={order.id} className="opacity-60">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-base">
                           <span>Order #{order.id.slice(-4)}</span>
                          <Badge variant="default">
                            {order.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="py-8 text-center text-muted-foreground">
            No orders for this table.
          </p>
        )}
      </div>
      <DialogFooter className="border-t pt-4">
        <div className="flex w-full justify-between font-bold text-lg">
          <span>Active Bill:</span>
          <span>${totalBill.toFixed(2)}</span>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                {kpi.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Table Overview</CardTitle>
            <CardDescription>
              Live status of restaurant tables. Click a table to see details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {tableStatuses.map((table) => (
                <Dialog key={table.id}>
                  <DialogTrigger asChild>
                    <div
                      className={cn(
                        'flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg transition-colors',
                        getTableStatusColor(table.status)
                      )}
                    >
                      <div className="text-lg font-bold">T{table.id}</div>
                      <div className="text-xs">{table.status}</div>
                    </div>
                  </DialogTrigger>
                  <TableDetailsDialog tableNumber={table.id} />
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Recent Orders</CardTitle>
          <CardDescription>An overview of the latest orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 5).map((order: Order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.table}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
