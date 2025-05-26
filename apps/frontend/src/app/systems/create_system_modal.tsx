"use client";

import { useState, useEffect } from "react";
import { SystemFormData } from "../types/system";

interface CreateSystemModalProps {
  open: boolean;
  onClose: () => void;
  initialData: SystemFormData | null;
  onSave: (form: SystemFormData) => void;
}

export default function CreateSystemModal({
  open,
  onClose,
  initialData,
  onSave,
}: CreateSystemModalProps) {
  const [form, setForm] = useState<SystemFormData>({
    systemId: "",
    displayName: "",
    description: "",
    namespace: "",
    kafkaEnabled: true,
    kafkaExternal: false,
    kafkaBootstrapServers: "",
    mysqlEnabled: true,
    mysqlExternal: false,
    mysqlJdbcUrl: "",
    mysqlUsername: "",
    mysqlPassword: "",
    redisEnabled: false,
    redisExternal: false,
    redisHost: "",
    ingressEnabled: true,
    ingressHostname: "",
    tracingEnabled: true,
    status: "active",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (field: keyof SystemFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10 p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {initialData ? "✏️ Edit System" : "🛠️ Create New System"}
          </h2>
        </div>

        {/* Form Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Info Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400 border-b border-cyan-400/30 pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    System ID
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-mono"
                    type="text"
                    value={form.systemId}
                    onChange={(e) => handleChange("systemId", e.target.value)}
                    required
                    disabled={!!initialData}
                    placeholder="system-id-123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    value={form.displayName}
                    onChange={(e) => handleChange("displayName", e.target.value)}
                    required
                    placeholder="My Payment System"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 h-24 resize-none"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your system's purpose and functionality..."
                />
              </div>
            </section>

            {/* Kafka Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400 border-b border-orange-400/30 pb-2">
                Kafka Configuration
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.kafkaEnabled}
                      onChange={(e) => handleChange("kafkaEnabled", e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-md border-2 transition-all duration-200 ${
                      form.kafkaEnabled 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-400 bg-transparent'
                    }`}>
                      {form.kafkaEnabled && (
                        <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white font-medium group-hover:text-green-400 transition-colors">
                    Enable Kafka
                  </span>
                </label>

                {form.kafkaEnabled && (
                  <>
                    <label className="flex items-center gap-3 cursor-pointer group ml-8">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={form.kafkaExternal}
                          onChange={(e) => handleChange("kafkaExternal", e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                          form.kafkaExternal 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-400 bg-transparent'
                        }`}>
                          {form.kafkaExternal && (
                            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                        Use external Kafka
                      </span>
                    </label>

                    {form.kafkaExternal && (
                      <input
                        className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ml-8 font-mono"
                        placeholder="localhost:9092,broker2:9092"
                        value={form.kafkaBootstrapServers}
                        onChange={(e) => handleChange("kafkaBootstrapServers", e.target.value)}
                      />
                    )}
                  </>
                )}
              </div>
            </section>

            {/* MySQL Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400 border-b border-blue-400/30 pb-2">
                MySQL Configuration
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.mysqlEnabled}
                      onChange={(e) => handleChange("mysqlEnabled", e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-md border-2 transition-all duration-200 ${
                      form.mysqlEnabled 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-400 bg-transparent'
                    }`}>
                      {form.mysqlEnabled && (
                        <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white font-medium group-hover:text-green-400 transition-colors">
                    Enable MySQL
                  </span>
                </label>

                {form.mysqlEnabled && (
                  <>
                    <label className="flex items-center gap-3 cursor-pointer group ml-8">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={form.mysqlExternal}
                          onChange={(e) => handleChange("mysqlExternal", e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                          form.mysqlExternal 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-400 bg-transparent'
                        }`}>
                          {form.mysqlExternal && (
                            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                        Use external database
                      </span>
                    </label>

                    {form.mysqlExternal && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ml-8">
                        <input
                          className="px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                          placeholder="jdbc:mysql://host:3306/db"
                          value={form.mysqlJdbcUrl}
                          onChange={(e) => handleChange("mysqlJdbcUrl", e.target.value)}
                        />
                        <input
                          className="px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="username"
                          value={form.mysqlUsername}
                          onChange={(e) => handleChange("mysqlUsername", e.target.value)}
                        />
                        <input
                          className="px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          type="password"
                          placeholder="password"
                          value={form.mysqlPassword}
                          onChange={(e) => handleChange("mysqlPassword", e.target.value)}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            {/* Redis Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-red-400 border-b border-red-400/30 pb-2">
                Redis Configuration
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.redisEnabled}
                      onChange={(e) => handleChange("redisEnabled", e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-md border-2 transition-all duration-200 ${
                      form.redisEnabled 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-400 bg-transparent'
                    }`}>
                      {form.redisEnabled && (
                        <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white font-medium group-hover:text-green-400 transition-colors">
                    Enable Redis
                  </span>
                </label>

                {form.redisEnabled && (
                  <>
                    <label className="flex items-center gap-3 cursor-pointer group ml-8">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={form.redisExternal}
                          onChange={(e) => handleChange("redisExternal", e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                          form.redisExternal 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-400 bg-transparent'
                        }`}>
                          {form.redisExternal && (
                            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                        Use external Redis
                      </span>
                    </label>

                    {form.redisExternal && (
                      <input
                        className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ml-8 font-mono"
                        placeholder="localhost:6379"
                        value={form.redisHost}
                        onChange={(e) => handleChange("redisHost", e.target.value)}
                      />
                    )}
                  </>
                )}
              </div>
            </section>

            {/* Ingress & Tracing Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400 border-b border-green-400/30 pb-2">
                Ingress & Tracing
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.ingressEnabled}
                      onChange={(e) => handleChange("ingressEnabled", e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-md border-2 transition-all duration-200 ${
                      form.ingressEnabled 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-400 bg-transparent'
                    }`}>
                      {form.ingressEnabled && (
                        <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white font-medium group-hover:text-green-400 transition-colors">
                    Enable Ingress
                  </span>
                </label>

                {form.ingressEnabled && (
                  <input
                    type="text"
                    placeholder="api.mysystem.com"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ml-8"
                    value={form.ingressHostname}
                    onChange={(e) => handleChange("ingressHostname", e.target.value)}
                  />
                )}

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.tracingEnabled}
                      onChange={(e) => handleChange("tracingEnabled", e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-md border-2 transition-all duration-200 ${
                      form.tracingEnabled 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-400 bg-transparent'
                    }`}>
                      {form.tracingEnabled && (
                        <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white font-medium group-hover:text-green-400 transition-colors">
                    Enable Tracing (Jaeger)
                  </span>
                </label>
              </div>
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-slate-800/50 border-t border-white/10 px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            {initialData ? "Update System" : "Create System"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(167, 139, 250, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(167, 139, 250, 0.7);
        }
      `}</style>
    </div>
  );
}