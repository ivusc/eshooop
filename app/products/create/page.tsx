import CreateProductForm from "@/components/forms/product/create-product-form";

export default function CreateProductPage() {
  
  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold my-12'>Create Product</h1>
      <CreateProductForm />
    </main>
  )
}
