import { saveProduct, uploadProductImage } from "../actions";

type Category = { id: string; name: string };
type Variant = { size: string; stockQty: number; colourName: string; colourHex: string | null };
type ImageRow = { id: string; url: string; alt: string };

export function ProductEditor({
  product,
  categories,
}: {
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    details: string[];
    length: string;
    pricePesewas: number;
    compareAtPesewas: number | null;
    status: string;
    isFeatured: boolean;
    madeToMeasure: boolean;
    mtmFeePesewas: number | null;
    leadTimeDays: number | null;
    categoryId: string;
    variants: Variant[];
    images: ImageRow[];
  };
  categories: Category[];
}) {
  const colour = product?.variants[0];
  return (
    <div className="card2">
      <form action={saveProduct}>
        {product ? <input type="hidden" name="id" value={product.id} /> : null}
        <div className="fld">
          <label className="lab" htmlFor="name">Name</label>
          <input className="in" id="name" name="name" required defaultValue={product?.name} />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="slug">Slug</label>
          <input className="in" id="slug" name="slug" defaultValue={product?.slug} />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="description">Description</label>
          <textarea className="in ta" id="description" name="description" defaultValue={product?.description} />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="details">Details, one per line</label>
          <textarea className="in ta" id="details" name="details" defaultValue={product?.details.join("\n")} />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="categoryId">Category</label>
          <select className="in sel" id="categoryId" name="categoryId" defaultValue={product?.categoryId ?? categories[0]?.id}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label className="lab" htmlFor="length">Length</label>
          <select className="in sel" id="length" name="length" defaultValue={product?.length ?? "MIDI"}>
            {["MINI", "MIDI", "MAXI", "PLAYSUIT"].map((length) => (
              <option key={length}>{length}</option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label className="lab" htmlFor="price">Price (GH₵)</label>
          <input className="in" id="price" name="price" defaultValue={product ? product.pricePesewas / 100 : ""} />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="compareAt">Compare-at (GH₵)</label>
          <input className="in" id="compareAt" name="compareAt" defaultValue={product?.compareAtPesewas ? product.compareAtPesewas / 100 : ""} />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="status">Status</label>
          <select className="in sel" id="status" name="status" defaultValue={product?.status ?? "DRAFT"}>
            <option>DRAFT</option>
            <option>ACTIVE</option>
            <option>ARCHIVED</option>
          </select>
        </div>
        <label className="sm">
          <input type="checkbox" name="featured" defaultChecked={product?.isFeatured} /> Featured
        </label>
        <label className="sm" style={{ marginLeft: 12 }}>
          <input type="checkbox" name="madeToMeasure" defaultChecked={product?.madeToMeasure} /> Made to measure
        </label>
        <div className="fld" style={{ marginTop: 12 }}>
          <label className="lab">Colour</label>
          <input className="in" name="colourName" defaultValue={colour?.colourName ?? "Harmattan Sunset"} />
          <input className="in" name="colourHex" defaultValue={colour?.colourHex ?? "#E07A1F"} />
        </div>
        <h3>Stock</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <label key={size} className="sm">
              {size}
              <input
                className="in"
                name={`stock_${size}`}
                type="number"
                min={0}
                defaultValue={product?.variants.find((variant) => variant.size === size)?.stockQty ?? 0}
              />
            </label>
          ))}
        </div>
        <div className="fld">
          <label className="lab" htmlFor="mtmFee">Made-to-measure fee (GH₵)</label>
          <input className="in" id="mtmFee" name="mtmFee" defaultValue={product?.mtmFeePesewas ? product.mtmFeePesewas / 100 : ""} />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="leadTime">Lead time (days)</label>
          <input className="in" id="leadTime" name="leadTime" defaultValue={product?.leadTimeDays ?? ""} />
        </div>
        <button className="btn p" type="submit">
          Save dress
        </button>
      </form>
      {product ? (
        <form action={uploadProductImage} style={{ marginTop: 24 }}>
          <input type="hidden" name="productId" value={product.id} />
          <h3>Photos</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {product.images.map((image) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={image.id} src={image.url} alt={image.alt} style={{ width: 80, height: 100, objectFit: "cover" }} />
            ))}
          </div>
          <input className="in" name="alt" placeholder="Alt text" />
          <input name="file" type="file" accept="image/jpeg,image/png,image/webp" />
          <button className="btn g s" type="submit">
            Upload photo
          </button>
        </form>
      ) : null}
    </div>
  );
}
