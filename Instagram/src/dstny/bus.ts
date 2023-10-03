import config from '../config';

import { getTactfulBus } from '@tactful/utils';

/** redis bus for publishing and listening to events */
export const bus = getTactfulBus({
  broker: config.bus.broker as any,
  messageExpiration: config.bus.messageExpiration as any,
  namespace: config.bus.namespace as any,
  url: config.bus.url as any,
});

/** method to start consuming from the bus */
export function startBus() {
  bus.startConsuming();
}