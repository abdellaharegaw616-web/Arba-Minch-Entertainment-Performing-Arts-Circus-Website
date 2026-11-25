"use client";

import React, { useState } from "react";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { AdminModal } from "./AdminModal";

interface AdminDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  itemType: string;
  warningNotice?: string;
}

export function AdminDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemType,
  warningNotice = "This action will permanently delete this record from the system. This cannot be undone.",
}: AdminDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Confirm Deletion`}
      subtitle={`Permanently remove ${itemType}`}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-900">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold text-sm text-red-800">
              Are you sure you want to delete &ldquo;{title}&rdquo;?
            </p>
            <p className="mt-1 text-red-700">{warningNotice}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D6A84F]/30">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg bg-[#EBE5D6] text-[#17251F] text-xs font-semibold hover:bg-[#DDD6C5] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" /> Confirm Delete
              </>
            )}
          </button>
        </div>
      </div>
    </AdminModal>
  );
}
