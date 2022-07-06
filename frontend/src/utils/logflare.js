import pino from "pino";
import { createPinoBrowserSend, createWriteStream } from "pino-logflare";

// create pino-logflare stream
const stream = createWriteStream({
  apiKey: "Xb2epud0H8Qh",
  sourceToken: "0728527c-2ae8-42ab-b75e-934c0e064e43",
});

// create pino-logflare browser stream
const send = createPinoBrowserSend({
  apiKey: "Xb2epud0H8Qh",
  sourceToken: "0728527c-2ae8-42ab-b75e-934c0e064e43",
});

// create pino loggger
const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
  },
  stream
);

export default logger;

/*
// log some events
logger.info(data, "Informational message");
logger.error("User not found.", err.response);

const child = logger.child({ property: "value" });
child.info("hello child!");
*/
