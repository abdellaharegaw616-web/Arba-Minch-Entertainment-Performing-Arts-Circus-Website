import { getAllGalleryAssetsForAdmin } from "@/lib/data-store";
import { GalleryManager } from "./GalleryManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery & Video Archive — AMEPAC Admin",
  description: "Curate high-resolution performance photos and video productions.",
};

export default async function AdminGalleryPage() {
  const assets = await getAllGalleryAssetsForAdmin();

  return <GalleryManager initialAssets={assets} />;
}
