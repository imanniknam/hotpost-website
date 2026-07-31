const faNumber = new Intl.NumberFormat("fa-IR");

/** Formats a Toman amount with Persian digits and thousands separators. */
export const formatPrice = (toman: number) => faNumber.format(toman);

/** Converts Latin digits inside a string to Persian ones, leaving the rest alone. */
export const toPersianDigits = (input: string) =>
  input.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

/** Discount percentage, or null when there is no genuine markdown. */
export const discountPercent = (price: number, compareAt?: number | null) => {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
};
