import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

/**
 * Frontend pages are prerendered, so an edit in the admin panel would otherwise
 * not appear until the next build. Every collection and global carries these
 * hooks to flush the cache on save.
 *
 * The whole tree is revalidated rather than individual routes: content here is
 * cross-cutting (a product shows on the home page, its category page and the
 * shop index), the site is small, and getting the path list subtly wrong is a
 * worse failure than an over-broad purge.
 */
const purge = () => {
  try {
    revalidatePath("/", "layout");
  } catch {
    // `revalidatePath` needs Next's request store, which does not exist when
    // Payload runs outside the server — CLI scripts such as `npm run seed` and
    // `npm run import:woo`. There is no page cache to flush in that case, so
    // swallowing this is correct rather than merely convenient.
  }
};

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  purge();
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  purge();
  return doc;
};

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc }) => {
  purge();
  return doc;
};

export const collectionRevalidationHooks = {
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
};

export const globalRevalidationHooks = {
  afterChange: [revalidateGlobalAfterChange],
};
