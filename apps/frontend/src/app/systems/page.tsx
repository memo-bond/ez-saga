"use client";

import { useState } from "react";
import CreateSystemModal from "./create_system_modal";
import SystemTable from "./system_table";
import { SystemFormData } from "../types/system";

export default function SystemManagerPage() {
  const [systems, setSystems] = useState<SystemFormData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<SystemFormData | null>(null);

  // Open modal for new system
  const handleNew = () => {
    setEditData(null);
    setOpenModal(true);
  };

  // Open modal for edit
  const handleEdit = (system: SystemFormData) => {
    setEditData(system);
    setOpenModal(true);
  };

  // Update status
  const handleToggleStatus = (systemId: string, currentlyActive: boolean) => {
    setSystems((prev) =>
      prev.map((sys) =>
        sys.systemId === systemId
          ? { ...sys, status: currentlyActive ? "inactive" : "active" }
          : sys
      )
    );
  };

  // Save (create or update)
  const handleSave = (form: SystemFormData) => {
    setSystems((prev) => {
      const exists = prev.find((s) => s.systemId === form.systemId);
      if (exists) {
        return prev.map((s) => (s.systemId === form.systemId ? form : s));
      } else {
        return [...prev, { ...form, status: "active" }];
      }
    });
    setOpenModal(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">🛠 System Manager</h1>
          <button
            className="btn-primary w-auto px-4 py-2"
            onClick={handleNew}
          >
            + New System
          </button>
        </div>

        <SystemTable
          systems={systems}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      {openModal && (
        <CreateSystemModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          initialData={editData}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
