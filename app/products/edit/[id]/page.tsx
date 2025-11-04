import { getProduct } from "@/actions/product.action";
import EditProductForm from "@/app/products/edit/edit-product-form";
import { convertToPictureObjectArr } from "@/lib/utils";
import { IProduct } from "@/models/Product";

export default async function EditProductPage({ params } : { params: { id: string }}) {
  const { id } = await params;
  const product : IProduct = await getProduct(id);

  //console.log(product);

  const pictures = convertToPictureObjectArr(product.pictures)

  const productRevised : Omit<IProduct, "pictures"> & { pictures: { url: string }[] } = { ...product, pictures: pictures }

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold my-12'>Edit Product</h1>
      <EditProductForm product={productRevised} />
    </main>
  )
}
