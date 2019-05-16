export const events = [
  // Lets keep it simple and just have 2 product views and 2 transactions
  // Product views
  {
    type: 'product-view',
    merchant: 'qLsH9ZjmBY',
    user: '017f84ad-337f-4969-a85b-3d8b2de68138',
    time: '2018-03-23T18:25:43.511Z',
    data: {
      product: {
        sku_code: '192000000246',
      },
      location: 'https://website.com/product/220309',
    },
  },
  {
    type: 'product-view',
    merchant: 'qLsH9ZjmBY',
    user: '017f84ad-337f-4969-a85b-3d8b2de68138',
    time: '2018-03-23T18:27:43.511Z',
    data: {
      product: {
        sku_code: '192000000246',
      },
      location: 'https://website.com/product/192000000246',
    },
  },
  // Two transactions from the same user
  {
    type: 'transaction',
    merchant: 'mHa2jcagCk',
    user: '44017eb2-fc82-4c8e-87ab-41a4c8a2aa6f',
    time: '2018-03-23T18:30:43.511Z',
    data: {
      transaction: {
        order_id: 'xxxxx1',
        subtotal: 1610,
        total: 1615,
        line_items: [
          {
            product: {
              sku_code: '192000000301',
              price: 125,
            },
            quantity: 1,
            subtotal: 125,
          },
          {
            product: {
              sku_code: '192000000246',
              price: 495,
            },
            quantity: 3,
            subtotal: 1485,
          },
        ],
      },
    },
  },
  {
    type: 'transaction',
    merchant: 'mHa2jcagCk',
    user: '44017eb2-fc82-4c8e-87ab-41a4c8a2aa6f',
    time: '2018-03-23T18:35:43.511Z',
    data: {
      transaction: {
        order_id: 'xxxxx2',
        subtotal: 750,
        total: 755,
        line_items: [
          {
            product: {
              sku_code: '192000000249',
              price: 375,
            },
            quantity: 2,
            subtotal: 750,
          },
        ],
      },
    },
  },
];
