import { ProductEditor } from "../editor";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return <ProductEditor categories={categories} />;
}
