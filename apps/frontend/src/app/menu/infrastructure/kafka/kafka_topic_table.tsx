"use client";

import {KafkaTopic} from "@/types/kafka_topic";

interface KafkaTableProps {
    topics: KafkaTopic[];
    onEdit: (topic: KafkaTopic) => void;
    onToggleStatus: (id: string, currentlyActive: boolean) => void;
}

export default function KafkaTopicTable({
                                        topics,
                                        onEdit,
                                        onToggleStatus,
                                    }: KafkaTableProps) {
    return (
        <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl shadow-purple-500/10">
            {/* Table Header */}
            <div className="bg-white/5 backdrop-blur-sm px-6 py-4 border-b border-white/10">
                <div
                    className="grid grid-cols-7 gap-4 text-xs font-semibold text-white/70 uppercase tracking-wider">
                    <div>ID</div>
                    <div>Topic Name</div>
                    <div>Partitions</div>
                    <div className="text-center">Replication Factor</div>
                    <div className="text-center">Description</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
                {topics.length === 0 ? (
                    <div className="text-center py-16 text-white/50">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-lg font-medium">No Kafka Topic found</p>
                        <p className="text-sm mt-2">Create your first Kafka Topic to get started</p>
                    </div>
                ) : (
                    topics.map((topic) => (
                        <div
                            key={topic.id}
                            className="grid grid-cols-11 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/5 hover:translate-x-1"
                        >
                            {/* Topic ID */}
                            <div className="font-mono text-sm text-cyan-400 font-medium">
                                {topic.id}
                            </div>

                            {/* Display Name */}
                            <div className="text-white font-semibold">
                                {topic.name}
                            </div>


                            <div className="text-white font-semibold">
                                {topic.partitions}
                            </div>

                            <div className="text-white font-semibold">
                                {topic.replicationFactor}
                            </div>

                            <div className="text-white font-semibold">
                                {topic.description}
                            </div>

                            {/* Status Icons */}
                            <div className="text-center">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mx-auto ${
                                    topic.status === 'ACTIVE'
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/20 text-red-400'
                                }`}>
                                    {topic.status === 'ACTIVE' ? '✓' : '✕'}
                                </div>
                            </div>


                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(topic)}
                                    className="px-3 py-1.5 text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-200 hover:scale-105"
                                >
                                    Edit
                                </button>

                                {topic.status === "INACTIVE" ? (
                                    <button
                                        onClick={() => onToggleStatus(topic.id, false)}
                                        className="px-3 py-1.5 text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 hover:border-emerald-400/50 transition-all duration-200 hover:scale-105"
                                    >
                                        Start
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onToggleStatus(topic.id, true)}
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