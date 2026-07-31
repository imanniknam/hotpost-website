import config from "@payload-config";
import { getPayload as getPayloadClient } from "payload";

/**
 * Payload caches the initialised instance internally, so this is safe to call
 * from every server component without spinning up a new connection each time.
 */
export const getPayload = () => getPayloadClient({ config });
