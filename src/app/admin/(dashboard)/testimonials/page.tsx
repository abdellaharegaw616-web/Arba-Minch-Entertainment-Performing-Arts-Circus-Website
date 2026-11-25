import { getAllTestimonialsForAdmin } from "@/lib/data-store";
import { TestimonialsManager } from "./TestimonialsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Testimonials — AMEPAC Admin",
  description: "Curate verified endorsements and partner reflections.",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsForAdmin();

  return <TestimonialsManager initialTestimonials={testimonials} />;
}
