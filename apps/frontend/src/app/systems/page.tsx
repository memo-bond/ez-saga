"use client";

import { useState } from "react";
import CreateSystemModal from "./create_system_modal";
import SystemTable from "./system_table";
import { SystemFormData } from "../types/system";
import { useUIStore } from "@/stores/ui_store";
import {AppLayout} from "@/app/layout/app_layout";

export default function SystemManagerPage() {
  const [systems, setSystems] = useState<SystemFormData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<SystemFormData | null>(null);

  const activeTab = useUIStore((s) => s.activeTab);

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

  // Toggle status
  const handleToggleStatus = (systemId: string, currentlyActive: boolean) => {
    setSystems((prev) =>
        prev.map((sys) =>
            sys.systemId === systemId
                ? { ...sys, status: currentlyActive ? "inactive" : "active" }
                : sys
        )
    );
  };

  // Save or update system
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
      <AppLayout>
        {activeTab === "systems" || activeTab === "dashboard" ? (
            <>
              <div className="flex justify-end mb-4">
                <button
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-md"
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

              {openModal && (
                  <CreateSystemModal
                      open={openModal}
                      onClose={() => setOpenModal(false)}
                      initialData={editData}
                      onSave={handleSave}
                  />
              )}
            </>
        ) : (
            <div className="text-white">Coming soon: {activeTab}</div>
        )}
      </AppLayout>
  );
}
