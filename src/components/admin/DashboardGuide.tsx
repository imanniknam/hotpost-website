import "./dashboard-guide.css";

const SECTIONS = [
  {
    title: "متن و عکس صفحه‌ها",
    hint: "تیتر، متن، عکس و عنوان بخش‌ها",
    links: [
      { href: "/admin/globals/home-page", label: "صفحه اصلی" },
      { href: "/admin/globals/about-page", label: "درباره ما" },
      { href: "/admin/globals/services-page", label: "صفحه خدمات" },
      { href: "/admin/globals/shop-page", label: "صفحه فروشگاه" },
      { href: "/admin/globals/contact-page", label: "تماس با ما" },
    ],
  },
  {
    title: "اطلاعات تماس، منو و لوگو",
    hint: "تلفن، آدرس، منوی بالا، لوگو و فوتر",
    links: [{ href: "/admin/globals/site-settings", label: "تنظیمات سایت" }],
  },
  {
    title: "خدمات و پرسش‌ها",
    hint: "افزودن یا ویرایش خدمت‌ها و پرسش‌های متداول",
    links: [
      { href: "/admin/collections/services", label: "خدمات" },
      { href: "/admin/collections/faqs", label: "پرسش‌های متداول" },
    ],
  },
  {
    title: "فروشگاه",
    hint: "محصولات، قیمت، موجودی و دسته‌بندی‌ها",
    links: [
      { href: "/admin/collections/products", label: "محصولات" },
      { href: "/admin/collections/product-categories", label: "دسته‌بندی‌ها" },
    ],
  },
  {
    title: "عکس‌ها",
    hint: "همه‌ی تصویرهای آپلودشده",
    links: [{ href: "/admin/collections/media", label: "کتابخانه رسانه" }],
  },
];

export function DashboardGuide() {
  return (
    <section className="hp-guide" dir="rtl">
      <h2>به پنل مدیریت هات پست خوش آمدید</h2>
      <p className="hp-guide__lead">
        هر بخش سایت را از یکی از لینک‌های زیر ویرایش کنید. بعد از زدن «ذخیره»، تغییر بلافاصله روی
        سایت دیده می‌شود.
      </p>

      <div className="hp-guide__grid">
        {SECTIONS.map((section) => (
          <div key={section.title} className="hp-guide__card">
            <h3>{section.title}</h3>
            <p>{section.hint}</p>
            <div className="hp-guide__links">
              {section.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ul className="hp-guide__tips">
        <li>برای عوض کردن عکس، روی فیلد عکس بزنید و «آپلود» یا انتخاب از کتابخانه را بزنید.</li>
        <li>هنگام آپلود عکس، «متن جایگزین» را بنویسید؛ برای سئو و کاربران نابینا لازم است.</li>
        <li>قیمت محصولات به تومان و به‌صورت عدد است (مثلاً ۱۳۴۹۰). قیمت صفر یعنی «به‌زودی اعلام می‌شود».</li>
        <li>فیلدهای «سئو» را خالی بگذارید تا متن پیش‌فرض استفاده شود.</li>
      </ul>
    </section>
  );
}
