/**
 * Creates the first admin user.
 *
 *   npm run create:admin -- <email> <password> "<name>"
 *
 * The admin panel also offers a first-run signup form; this exists so a
 * deployment can be provisioned without opening a browser.
 */
import config from "@payload-config";
import { getPayload } from "payload";

const [email, password, name] = process.argv.slice(2);

{
  if (!email || !password) {
    console.error('استفاده: npm run create:admin -- <email> <password> "<name>"');
    process.exit(1);
  }

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log(`کاربر ${email} از قبل وجود دارد.`);
    process.exit(0);
  }

  await payload.create({
    collection: "users",
    data: { email, password, name: name || "مدیر" },
  });

  console.log(`✅ کاربر ادمین ساخته شد: ${email}`);
  process.exit(0);
}
