"use client";

import React, {useEffect, useState} from "react";
import {Button, InputField, ModalWrapper, PrimaryButton, SectionHeader, TextAreaField} from "@/ui/components";
import {KafkaTopic, KafkaTopicConfig} from "@/types/kafka_topic";

interface KafkaTopicModalProps {
    open: boolean;
    onClose: () => void;
    initialData: KafkaTopic | null;
    onSave: (form: KafkaTopic) => void;
}

export default function CreateKafkaTopicModal({open, onClose, initialData, onSave}: KafkaTopicModalProps) {
    const [form, setForm] = useState<KafkaTopic>({
        id: "",
        description: "",
        name: "",
        partitions: 1,
        replicationFactor: 1,
        status: 'ACTIVE'
    });
    const [configList, setConfigList] = useState<{ key: string; value: string }[]>([]);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
            setConfigList(configObjectToArray(initialData.config));
        } else {
            // Reset to default values for creation
            setForm({
                id: "",
                description: "",
                name: "",
                partitions: 1,
                replicationFactor: 1,
                status: 'ACTIVE'
            });
            setConfigList([]);
        }
    }, [initialData]);

    const handleChange = (field: keyof KafkaTopic, value: string | boolean | number) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };

    const configObjectToArray = (config?: KafkaTopicConfig): { key: string; value: string }[] => {
        if (!config) return [];
        return Object.entries(config).map(([key, value]) => ({
            key,
            value: String(value),
        }));
    };

    return (
        <ModalWrapper open={open} onClose={onClose}>
            <div
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-cyan-450 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-md">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                    {initialData ? "✏️ Edit Kafka Topic" : "🛠️ Create New Kafka Topic"}
                </h2>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                <form onSubmit={handleSubmit} className="space-y-8">
                    <section className="space-y-4">
                        <SectionHeader title="Basic Information" colorClass="text-cyan-400 border-cyan-400/30"/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Topic ID" value={form.id}
                                        onChange={(e) => handleChange("id", e.target.value)} required
                                        disabled={!!initialData}
                                        placeholder="topic-id 123"/>
                            <InputField label="Topic Name" value={form.name}
                                        onChange={(e) => handleChange("name", e.target.value)} required
                                        placeholder="order.created"/>
                        </div>
                        <TextAreaField label="Description" className="h-24 resize-none"
                                       value={form.description}
                                       onChange={(e) => handleChange("description", e.target.value)}
                                       placeholder="Describe your Kafka Topic's purpose and functionality..."/>
                    </section>

                    <section className="space-y-4">
                        <SectionHeader title="Topic Configuration" colorClass="text-orange-400 border-orange-400/30"/>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Partitions Number"
                                type="number"
                                placeholder="1"
                                value={form.partitions || 1}
                                onChange={(e) => handleChange('partitions', parseInt(e.target.value))}
                            />

                            <InputField
                                label="Replication Factor"
                                type="number"
                                placeholder="1"
                                value={form.replicationFactor || 1}
                                onChange={(e) => handleChange('replicationFactor', parseInt(e.target.value))}
                            />
                        </div>

                    </section>

                    <section className="space-y-4">
                        <SectionHeader title="Advanced Config (Key-Value Pairs)"
                                       colorClass="text-green-400 border-green-400/30"/>

                        {configList.map((item, idx) => (
                            <div className="flex gap-2 items-center mb-2" key={idx}>
                                <InputField
                                    label={idx === 0 ? "Key" : ""}
                                    value={item.key}
                                    onChange={e => {
                                        const updated = [...configList];
                                        updated[idx].key = e.target.value;
                                        setConfigList(updated);
                                    }}
                                    placeholder="retention.ms"
                                />
                                <InputField
                                    label={idx === 0 ? "Value" : ""}
                                    value={item.value}
                                    onChange={e => {
                                        const updated = [...configList];
                                        updated[idx].value = e.target.value;
                                        setConfigList(updated);
                                    }}
                                    placeholder="e.g. 604800000"
                                />
                                <button
                                    type="button"
                                    className="text-red-400 hover:text-red-600"
                                    onClick={() => {
                                        const updated = [...configList];
                                        updated.splice(idx, 1);
                                        setConfigList(updated);
                                    }}
                                    title="Remove"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            className="mt-2 text-green-500"
                            onClick={() => setConfigList([...configList, {key: "", value: ""}])}
                        >
                            + Add Config
                        </Button>
                    </section>

                </form>

            </div>

            <div className="bg-slate-800/50 border-t border-white/10 px-6 py-4 flex justify-end gap-3">
                <Button type="button" onClick={onClose}>
                    Cancel
                </Button>
                <PrimaryButton type="submit" onClick={handleSubmit}>
                    {initialData ? "Update Topic" : "Create Topic"}
                </PrimaryButton>
            </div>
        </ModalWrapper>
    );
}
