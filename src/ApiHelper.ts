import fetch from 'node-fetch';
const BASE_URL = 'https://qa.backend.usehero.com/products/v3';
import { events } from './store/events';

export class HeroApiHelper {
  public static getEvents(): any {
    // Create an event type
    const processedEvents: any = events;
    processedEvents.processed = 'Yes';
    return processedEvents;
  }

  public static async getAugmentedEvents(): Promise<any> {
    const listOfEvents = this.getEvents();

    return await Promise.all(
      listOfEvents.map(async event => {
        if (event.type === 'product-view') {
          // Item is just a product view
          const productInfo = await this.makeApiRequest(event.data.product.sku_code);
          event.data.product = productInfo;
          return event;
        } else if (event.type === 'transaction') {
          // This is a transaction event and can possibly have more than 1 line item
          const itemsInTransaction = event.data.transaction.line_items;
          await itemsInTransaction.forEach(async item => {
            const itemData = await this.makeApiRequest(item.product.sku_code);
            item.product = itemData;
            return item;
          });
          return event;
        }
      }),
    );
  }

  public static async getEventsSummary(): Promise<any> {
    const allEvents = this.getEvents();

    // Total Events
    const totalEvents = allEvents.length;

    // Number of customers
    const numberOfCustomers = allEvents.map(event => event.user);
    const nonDuplicateNumberOfCustomers = [...new Set(numberOfCustomers)];

    // Number of Product/Transaction events

    const productViewEvents = allEvents.filter(event => event.type === 'product-view');
    const transactionEvents = allEvents.filter(event => event.type === 'transaction');

    /* this should be moved to a function and re-used but time is off the essence */
    const numberOfProductViewCustomers = productViewEvents.map(event => event.user);
    const numberOfTransactionCustomers = transactionEvents.map(event => event.user);

    const nonDuplicateNumberOfProductViewCustomers = [...new Set(numberOfProductViewCustomers)];
    const nonDuplicateNumberOfTransactionCustomers = [...new Set(numberOfTransactionCustomers)];

    const totalOfTransactions = transactionEvents.map(event => event.data.transaction.total).reduce((a, b) => a + b);
    return {
      total_events: totalEvents,
      number_of_customers: nonDuplicateNumberOfCustomers.length,
      events_summary: [
        {
          type: 'product-view',
          total_events: productViewEvents.length,
          number_of_customers: nonDuplicateNumberOfProductViewCustomers.length,
        },
        {
          type: 'transaction',
          total_events: transactionEvents.length,
          number_of_customers: nonDuplicateNumberOfTransactionCustomers.length,
          total_value: totalOfTransactions,
        },
      ],
    };
  }

  public static async getProcessedEvents(): Promise<any> {
    const allEvents = this.getEvents();

    return allEvents.filter(event => event.processed === 'Yes');
  }

  private static async makeApiRequest(path: string): Promise<any> {
    const settings = {
      method: 'GET',
      headers: {
        'x-hero-merchant-id': 'qLsH9ZjmBY',
      },
    };
    const res = await fetch(`${BASE_URL}/${path}`, settings);
    if (res.status !== 200) {
      const text = await res.text();
      throw new Error(`Api Request failed: ${res.status}: ${res.statusText}. ${text}`);
    }
    return await res.json();
  }
}
