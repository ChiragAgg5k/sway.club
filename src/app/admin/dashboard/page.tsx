import { Button } from "@/app/_components/ui/button";

export default function AdminDashboard() {
  return (
    <main className={`flex min-h-[90vh] flex-col items-center justify-center`}>
      <Button>Add Product</Button>
      <p className={`mt-4 text-sm text-gray-400`}>Only visible to admins.</p>
    </main>
  );
}
