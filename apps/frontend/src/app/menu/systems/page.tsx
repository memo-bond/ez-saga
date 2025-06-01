"use client";

import { useState } from "react";
import CreateSystemModal from "./create_system_modal";
import SystemTable from "./system_table";
import { SystemFormData } from "@/types/system";
import { useSidebarStore } from "@/stores/global_store";
import {AppLayout} from "@/app/layout/app_layout";

export const dynamic = "force-static";

export default function SystemManagerPage() {
  const [systems, setSystems] = useState<SystemFormData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<SystemFormData | null>(null);

  const activeTab = useSidebarStore((s) => s.activeTab);

  // Open modal for new systems
  const handleNew = () => {
    setSelectedSystem(null);
    setOpenModal(true);
  };

  // Open modal for edit
  const handleEdit = (system: SystemFormData) => {
    setSelectedSystem(system);
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

  // Save or update systems
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
                      initialData={selectedSystem}
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
