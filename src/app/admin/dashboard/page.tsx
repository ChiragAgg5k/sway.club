import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className={`flex min-h-[90vh] flex-col items-center justify-center`}>
      <Link href={`/admin/add-product`}>
        <Button>Add Product</Button>
      </Link>
      <p className={`mt-4 text-sm text-gray-400`}>Only visible to admins.</p>
    </main>
  );
}
