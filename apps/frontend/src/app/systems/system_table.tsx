"use client";

import {SystemFormData} from "../types/system";

interface SystemTableProps {
    systems: SystemFormData[];
    onEdit: (system: SystemFormData) => void;
    onToggleStatus: (systemId: string, currentlyActive: boolean) => void;
}

export default function SystemTable({
                                        systems,
                                        onEdit,
                                        onToggleStatus,
                                    }: SystemTableProps) {
    return (
        <div
            className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10">
            {/* Table Header */}
            <div className="bg-white/5 backdrop-blur-sm px-6 py-4 border-b border-white/10">
                <div
                    className="grid grid-cols-11 gap-4 text-xs font-semibold text-white/70 uppercase tracking-wider">
                    <div>System ID</div>
                    <div>Display Name</div>
                    <div>Namespace</div>
                    <div className="text-center">Services</div>
                    <div className="text-center">Kafka</div>
                    <div className="text-center">MySQL</div>
                    <div className="text-center">Redis</div>
                    <div className="text-center">Ingress</div>
                    <div className="text-center">Tracing</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
                {systems.length === 0 ? (
                    <div className="text-center py-16 text-white/50">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-lg font-medium">No systems found</p>
                        <p className="text-sm mt-2">Create your first system to get started</p>
                    </div>
                ) : (
                    systems.map((sys) => (
                        <div
                            key={sys.systemId}
                            className="grid grid-cols-11 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/5 hover:translate-x-1"
                        >
                            {/* System ID */}
                            <div className="font-mono text-sm text-cyan-400 font-medium">
                                {sys.systemId}
                            </div>

                            {/* Display Name */}
                            <div className="text-white font-semibold">
                                {sys.displayName}
                            </div>

                            {/* Namespace */}
                            <div className="text-white/60 text-sm italic">
                                {sys.namespace || "-"}
                            </div>

                            {/* Services */}
                            <div className="text-center">
                                {(() => {
                                    const running = sys.services?.filter(s => s.status === "running").length || 0;
                                    const stopped = sys.services?.filter(s => s.status === "stopped").length || 0;
                                    return (
                                        <div className="flex items-center justify-center gap-1 text-sm">
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                                <span className="text-emerald-400 font-semibold">{running}</span>
                                            </div>
                                            <span className="text-white/30">/</span>
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                                <span className="text-red-400 font-semibold">{stopped}</span>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* Status Icons */}
                            <div className="text-center">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mx-auto ${
                                    sys.kafkaEnabled
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/20 text-red-400'
                                }`}>
                                    {sys.kafkaEnabled ? '✓' : '✕'}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mx-auto ${
                                    sys.mysqlEnabled
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/20 text-red-400'
                                }`}>
                                    {sys.mysqlEnabled ? '✓' : '✕'}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mx-auto ${
                                    sys.redisEnabled
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/20 text-red-400'
                                }`}>
                                    {sys.redisEnabled ? '✓' : '✕'}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mx-auto ${
                                    sys.ingressEnabled
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/20 text-red-400'
                                }`}>
                                    {sys.ingressEnabled ? '✓' : '✕'}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mx-auto ${
                                    sys.tracingEnabled
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/20 text-red-400'
                                }`}>
                                    {sys.tracingEnabled ? '✓' : '✕'}
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                                        sys.status === "inactive"
                                            ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                            : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                    }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                        sys.status === "inactive" ? "bg-gray-400" : "bg-emerald-400 animate-pulse"
                                    }`}></div>
                                    {sys.status === "inactive" ? "Inactive" : "Active"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(sys)}
                                    className="px-3 py-1.5 text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-200 hover:scale-105"
                                >
                                    Edit
                                </button>

                                {sys.status === "inactive" ? (
                                    <button
                                        onClick={() => onToggleStatus(sys.systemId, false)}
                                        className="px-3 py-1.5 text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 hover:border-emerald-400/50 transition-all duration-200 hover:scale-105"
                                    >
                                        Start
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onToggleStatus(sys.systemId, true)}
                                        className="px-3 py-1.5 text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 hover:border-red-400/50 transition-all duration-200 hover:scale-105"
                                    >
                                        Stop
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}