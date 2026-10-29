import Link from "next/link";
import { ProductCard } from "@/components/atelier";
import { lengthLabel, listActiveProducts } from "@/lib/catalog";
import { formatGHS } from "@/lib/format";
import { whatsappHref } from "@/lib/settings";

export default async function HomePage() {
  const products = await listActiveProducts();
  const sika = products.find((product) => product.slug === "sika-tie-dye-playsuit") ?? products[0];
  const featured = products.filter((product) => product.slug !== sika?.slug).slice(0, 3);
  const counts = {
    ankara: products.filter((product) => product.category.slug === "ankara").length,
    kente: products.filter((product) => product.category.slug === "kente").length,
    evening: products.filter((product) => product.category.slug === "evening").length,
    casual: products.filter((product) => product.category.slug === "casual").length,
  };

  return (
    <main id="content">
      <section className="hero" style={{ position: "relative", overflow: "hidden" }}>
        <div className="w heroin">
          <div>
            <p className="eb">New season · Cut & stitched in Accra</p>
            <h1 className="hh">
              Dresses with a story,
              <br />
              <span className="sc">stitched</span> for you.
            </h1>
            <hr className="stitch" />
            <p className="lead">
              Ankara, kente-inspired and evening dresses — designed in our Accra studio and finished by hand, one seam at a time. Delivered to all 16 regions.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn p" href="/shop">
                Shop the collection
              </Link>
              <Link className="btn g" href="/contact">
                Made to measure
              </Link>
            </div>
            <div className="trust">
              <span>
                <b>4.9★</b> from 300+ clients
              </span>
              <span className="momo mtn">MoMo</span>
              <span className="momo tel">Telecel</span>
              <span className="momo at">AT</span>
              <span className="momo visa">VISA</span>
            </div>
          </div>
          <div className="hart">
            <div className="drape" style={{ width: 330, height: 420, right: -40, top: 30 }} />
            <div className="foil hi1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sample/d1.webp" alt="" />
            </div>
            <div className="foil hi2 stitched">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sika?.images[0]?.url ?? "/sample/playsuit-2.webp"} alt={sika?.name ?? ""} />
            </div>
            <span className="tag big mag hprice">New · {sika ? formatGHS(sika.pricePesewas) : "GH₵420"}</span>
            <div className="hcap">
              <span className="sc" style={{ fontSize: 30 }}>
                Sika
              </span>
              <br />
              <span className="xs muted">TIE-DYE PLAYSUIT · LOOK 01</span>
            </div>
            <span className="num hnum">01</span>
          </div>
        </div>
      </section>
      <div className="kente" />
      <section className="sec">
        <div className="w">
          <div className="shead">
            <div>
              <p className="eb">Fresh off the cutting table</p>
              <h2>
                New in the <span className="sc">atelier</span>
              </h2>
            </div>
            <Link className="lnk" href="/shop">
              View all {products.length} pieces →
            </Link>
          </div>
          <div className="ed">
            <div className="edbig stitched">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sample/d7.webp" alt="Evening dresses" />
              <div className="edl">
                <span className="eb" style={{ color: "#F3D98E" }}>
                  The evening edit
                </span>
                <h3 style={{ color: "#fff", fontSize: 40 }}>
                  Velvet, satin
                  <br />& gold.
                </h3>
                <Link className="btn gold s" href="/shop/evening">
                  Shop evening
                </Link>
              </div>
            </div>
            {sika ? (
              <ProductCard
                name={sika.name}
                meta={`${sika.category.name} · ${lengthLabel(sika.length)}`}
                price={sika.pricePesewas}
                image={sika.images[0]?.url ?? "/sample/playsuit-2.webp"}
                alt={sika.name}
                href={`/product/${sika.slug}`}
                badge="new"
              />
            ) : null}
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                meta={`${product.category.name} · ${lengthLabel(product.length)}`}
                price={product.pricePesewas}
                compareAt={product.compareAtPesewas ?? undefined}
                image={product.images[0]?.url ?? "/sample/d1.webp"}
                alt={product.name}
                href={`/product/${product.slug}`}
                badge={product.compareAtPesewas ? "sale" : undefined}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="sec linen">
        <div className="w">
          <div className="shead">
            <div>
              <p className="eb">Find your fabric</p>
              <h2>
                Shop by <span className="sc">story</span>
              </h2>
            </div>
          </div>
          <div className="cats">
            {[
              ["Ankara", "ankara", counts.ankara, "/sample/d5.webp", "Bold wax prints"],
              ["Kente", "kente", counts.kente, "/sample/d2.webp", "Woven heritage"],
              ["Evening", "evening", counts.evening, "/sample/d3.webp", "Satin & velvet"],
              ["Casual", "casual", counts.casual, "/sample/d4.webp", "Linen & playsuits"],
            ].map(([name, slug, count, image, blurb]) => (
              <Link className="cat" href={`/shop/${slug}`} key={slug}>
                <div className="cph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={String(image)} alt="" />
                </div>
                <div className="ctag">
                  <span className="hole" />
                  <b>{name}</b>
                  <small>
                    {blurb} · {count} styles
                  </small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <div className="shead" style={{ justifyContent: "center", textAlign: "center" }}>
            <div>
              <p className="eb">How every SN piece is made</p>
              <h2>
                From sketch to <span className="sc">stitch</span>
              </h2>
            </div>
          </div>
          <div className="proc">
            {[
              ["01", "Sketch", "Every design starts in the notebook of our Accra studio."],
              ["02", "Select", "We hand-pick wax prints, kente-weave and satins from Makola and beyond."],
              ["03", "Cut & stitch", "Cut to your size, sewn and finished by hand by our seamstresses."],
              ["04", "Deliver", "Pressed, wrapped in tissue and sent to you anywhere in Ghana."],
            ].map(([num, title, copy]) => (
              <div className="pstep" key={num}>
                <span className="num">{num}</span>
                <h3>{title}</h3>
                <p className="muted sm">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mtm">
        <div className="w mtmin">
          <div className="mtmimg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sample/d10.webp" alt="Ivory kente panel dress" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mtm2 foil" src="/sample/d2-c.webp" alt="" />
          </div>
          <div>
            <p className="eb" style={{ color: "#F3D98E" }}>
              Made to measure
            </p>
            <h2 style={{ fontSize: 52, color: "#fff" }}>
              Your measurements,
              <br />
              our <span className="sc" style={{ color: "#F08AB8" }}>needle.</span>
            </h2>
            <p style={{ color: "#D9CDB8" }}>
              Choose any dress, send us your bust, waist, hip and length on WhatsApp, and we&apos;ll cut it just for you. Ready in 7–10 days, free alterations for 14 days.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
              <Link className="btn gold" href="/contact">
                Start a custom order
              </Link>
              <a className="btn wa" href={whatsappHref()}>
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="w">
          <div className="shead">
            <div>
              <p className="eb">Worn by you</p>
              <h2>
                @sn_stitches_ <span className="sc">on the gram</span>
              </h2>
            </div>
          </div>
          <div className="igs">
            {["d9.webp", "playsuit-1.webp", "d1-c.webp", "d8.webp", "d5-b.webp", "d10-c.webp"].map((file) => (
              <div className="ig" key={file}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/sample/${file}`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
