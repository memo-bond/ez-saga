"use client";

import { Service } from '@/types/service';
import { Button } from '@/components/ui/button';

interface Props {
    services: Service[];
    onView: (service: Service) => void;
}

export default function ServiceTable({ services, onView }: Props) {
    return (
        <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10">
            {/* Table Header */}
            <div className="bg-white/5 backdrop-blur-sm px-6 py-4 border-b border-white/10">
                <div className="grid grid-cols-11 gap-4 text-xs font-semibold text-white/70 uppercase tracking-wider">
                    <div>Name</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>System</div>
                    <div>Updated</div>
                    <div>Actions</div>
                </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
                {services.length === 0 ? (
                    <div className="text-center py-16 text-white/50">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-lg font-medium">No services found</p>
                        <p className="text-sm mt-2">Create your first service to get started</p>
                    </div>
                ) : (
                    services.map((svc) => (
                        <div
                            key={svc.id}
                            className="grid grid-cols-6 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/5 hover:translate-x-1"
                        >
                            <div className="text-white font-semibold">{svc.name}</div>
                            <div className="text-white/60 text-sm italic">{svc.type}</div>
                            <div>
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        svc.status === 'INACTIVE'
                            ? 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                            : svc.status === 'ERROR'
                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}
                >
                  <div
                      className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          svc.status === 'INACTIVE'
                              ? 'bg-gray-400'
                              : svc.status === 'ERROR'
                                  ? 'bg-red-400'
                                  : 'bg-emerald-400 animate-pulse'
                      }`}
                  ></div>
                    {svc.status}
                </span>
                            </div>
                            <div className="text-white/70 text-sm">{svc.systemId || '-'}</div>
                            <div className="text-white/50 text-xs">{svc.updatedAt?.toString() || '-'}</div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="border border-cyan-400/30 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200 hover:scale-105"
                                    onClick={() => onView(svc)}
                                >
                                    View
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
