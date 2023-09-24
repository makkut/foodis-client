import Categories from "@/components/Categories/Categories";
import Layout from "@/components/Layout/Layout";
import { ToastContainer } from "react-toastify";

export default function CategoriesPage() {
  return (
    <Layout title="Categories" description="Russian Foodies, Panama">
      <Categories />
      <ToastContainer position="bottom-right" />
    </Layout>
  );
}
