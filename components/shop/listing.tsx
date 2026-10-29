import Link from "next/link";
import { ProductCard } from "@/components/atelier";
import { filterCatalog, lengthLabel, listActiveProducts, productInStock, type ShopQuery } from "@/lib/catalog";

const categories = [
  { slug: "", label: "All" },
  { slug: "ankara", label: "Ankara" },
  { slug: "kente", label: "Kente" },
  { slug: "evening", label: "Evening" },
  { slug: "casual", label: "Casual" },
];

export async function ShopListing({ category, query }: { category: string; query: ShopQuery }) {
  const products = await listActiveProducts();
  const active = { ...query, category: category || query.category };
  const shown = filterCatalog(products, active);
  const title = categories.find((item) => item.slug === (category || ""))?.label ?? "All";

  return (
    <main id="content">
      <section className="w shh">
        <div>
          <p className="eb">The collection · {products.length} pieces</p>
          <h1>
            {category ? title : "All"} <span className="sc">dresses</span>
          </h1>
        </div>
        <p className="muted" style={{ maxWidth: 420 }}>
          Wax prints, kente weaves, silk-soft satins. Every piece cut and finished by hand in Accra — XS to XXL, or made to your measure.
        </p>
      </section>
      <div className="w">
        <div className="catrow">
          {categories.map((item) => {
            const count = item.slug
              ? products.filter((product) => product.category.slug === item.slug).length
              : products.length;
            const href = item.slug ? `/shop/${item.slug}` : "/shop";
            const on = (category || "") === item.slug;
            return (
              <Link key={item.label} className={on ? "lbl on" : "lbl"} href={href}>
                {item.label} · {count}
              </Link>
            );
          })}
        </div>
      </div>
      <hr className="seam" style={{ maxWidth: 1160, margin: "0 auto" }} />
      <div className="w shopgrid">
        <aside className="filt">
          <h4>Size</h4>
          <div>
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <Link
                key={size}
                className={query.size === size ? "lbl on" : "lbl"}
                href={withQuery(category, query, { size: query.size === size ? undefined : size })}
              >
                {size}
              </Link>
            ))}
          </div>
          <h4>Length</h4>
          <div>
            {["MINI", "MIDI", "MAXI", "PLAYSUIT"].map((length) => (
              <Link
                key={length}
                className={query.length === length ? "lbl on" : "lbl"}
                href={withQuery(category, query, { length: query.length === length ? undefined : length })}
              >
                {lengthLabel(length)}
              </Link>
            ))}
          </div>
          <h4>Sort</h4>
          <div>
            <Link
              className={!query.sort || query.sort === "featured" ? "lbl on" : "lbl"}
              href={withQuery(category, query, { sort: "featured" })}
            >
              Featured
            </Link>
            <Link className={query.sort === "price-asc" ? "lbl on" : "lbl"} href={withQuery(category, query, { sort: "price-asc" })}>
              Price ↑
            </Link>
            <Link
              className={query.sort === "price-desc" ? "lbl on" : "lbl"}
              href={withQuery(category, query, { sort: "price-desc" })}
            >
              Price ↓
            </Link>
          </div>
          <Link
            className={query.stock === "1" ? "lbl on" : "lbl"}
            href={withQuery(category, query, { stock: query.stock === "1" ? undefined : "1" })}
          >
            In stock only
          </Link>
        </aside>
        <div>
          <div className="tb">
            <span className="sm muted">
              Showing <b style={{ color: "var(--ink)" }}>{shown.length}</b> of {products.length}
            </span>
          </div>
          <div className="mas">
            {shown.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                meta={`${product.category.name} · ${lengthLabel(product.length)}`}
                price={product.pricePesewas}
                compareAt={product.compareAtPesewas ?? undefined}
                image={product.images[0]?.url ?? "/sample/d1.webp"}
                alt={product.name}
                href={`/product/${product.slug}`}
                badge={!productInStock(product) ? "sold" : product.compareAtPesewas ? "sale" : undefined}
              />
            ))}
          </div>
          {shown.length === 0 ? <p className="muted">No dresses match those filters.</p> : null}
        </div>
      </div>
    </main>
  );
}

function withQuery(category: string, query: ShopQuery, patch: ShopQuery) {
  const next = { ...query, ...patch };
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(next)) {
    if (!value || key === "category") continue;
    params.set(key, value);
  }
  const base = category ? `/shop/${category}` : "/shop";
  const text = params.toString();
  return text ? `${base}?${text}` : base;
}
