import { getProduct } from "@/actions/product.action";
import EditProductForm from "@/components/forms/product/edit-product-form";

export default async function EditProductPage({ params } : { params: { id: string }}) {
  const { id } = await params;
  const product = await getProduct(id);

  console.log(product);

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold my-12'>Edit Product</h1>
      <EditProductForm />
    </main>
  )
}
