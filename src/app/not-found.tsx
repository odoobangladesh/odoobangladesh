import { Button } from "@/components/shared/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl text-odoo-purple">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
    </section>
  );
}
