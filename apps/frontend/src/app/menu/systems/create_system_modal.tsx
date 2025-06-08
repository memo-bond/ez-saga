"use client";

import React, {useState, useEffect} from "react";
import {System} from "@/types/system";
import {
    InputField,
    ToggleCheckbox,
    SectionHeader,
    PrimaryButton,
    ModalWrapper,
    TextAreaField,
    Button
} from "@/ui/components";

interface CreateSystemModalProps {
    open: boolean;
    onClose: () => void;
    initialData: System | null;
    onSave: (form: System) => void;
}

export default function CreateSystemModal({open, onClose, initialData, onSave}: CreateSystemModalProps) {
    const [form, setForm] = useState<System>({
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

    const handleChange = (field: keyof System, value: string|boolean) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };

    return (
        <ModalWrapper open={open} onClose={onClose}>
            <div
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-cyan-450 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-md">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                    {initialData ? "✏️ Edit System" : "🛠️ Create New System"}
                </h2>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                <form onSubmit={handleSubmit} className="space-y-8">
                    <section className="space-y-4">
                        <SectionHeader title="Basic Information" colorClass="text-cyan-400 border-cyan-400/30"/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Display Name" value={form.displayName}
                                        onChange={(e) => handleChange("displayName", e.target.value)} required
                                        placeholder="My Payment System"/>
                        </div>
                        <TextAreaField label="Description" className="h-24 resize-none"
                                    value={form.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    placeholder="Describe your system's purpose and functionality..."/>
                    </section>

                    <section className="space-y-4">
                        <SectionHeader title="Kafka Configuration" colorClass="text-orange-400 border-orange-400/30"/>
                        <ToggleCheckbox label="Enable Kafka" checked={form.kafkaEnabled}
                                        onChange={(checked) => handleChange("kafkaEnabled", checked)} color="green"/>
                        {form.kafkaEnabled && (
                            <>
                                <ToggleCheckbox label="Use external Kafka" checked={form.kafkaExternal}
                                                onChange={(checked) => handleChange("kafkaExternal", checked)}
                                                color="blue" className="ml-8"/>
                                {form.kafkaExternal && (
                                    <InputField className="ml-8 font-mono" placeholder="localhost:9092,broker2:9092"
                                                value={form.kafkaBootstrapServers}
                                                onChange={(e) => handleChange("kafkaBootstrapServers", e.target.value)}/>
                                )}
                            </>
                        )}
                    </section>

                    <section className="space-y-4">
                        <SectionHeader title="MySQL Configuration" colorClass="text-blue-400 border-blue-400/30"/>
                        <ToggleCheckbox label="Enable MySQL" checked={form.mysqlEnabled}
                                        onChange={(checked) => handleChange("mysqlEnabled", checked)} color="green"/>
                        {form.mysqlEnabled && (
                            <>
                                <ToggleCheckbox label="Use external database" checked={form.mysqlExternal}
                                                onChange={(checked) => handleChange("mysqlExternal", checked)}
                                                color="blue" className="ml-8"/>
                                {form.mysqlExternal && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ml-8">
                                        <InputField placeholder="jdbc:mysql://host:3306/db" value={form.mysqlJdbcUrl}
                                                    onChange={(e) => handleChange("mysqlJdbcUrl", e.target.value)}
                                                    className="font-mono text-sm"/>
                                        <InputField placeholder="username" value={form.mysqlUsername}
                                                    onChange={(e) => handleChange("mysqlUsername", e.target.value)}/>
                                        <InputField type="password" placeholder="password" value={form.mysqlPassword}
                                                    onChange={(e) => handleChange("mysqlPassword", e.target.value)}/>
                                    </div>
                                )}
                            </>
                        )}
                    </section>

                    <section className="space-y-4">
                        <SectionHeader title="Redis Configuration" colorClass="text-blue-400 border-blue-400/30"/>
                        <ToggleCheckbox label="Enable Redis" checked={form.redisEnabled}
                                        onChange={(checked) => handleChange("redisEnabled", checked)} color="green"/>
                        {form.redisEnabled && (
                            <>
                                <ToggleCheckbox label="Use external Redis" checked={form.redisExternal}
                                                onChange={(checked) => handleChange("redisExternal", checked)}
                                                color="blue" className="ml-8"/>
                                {form.redisExternal && (
                                    <InputField className="ml-8 font-mono" placeholder="localhost:6379"
                                                value={form.redisHost}
                                                onChange={(e) => handleChange("redisHost", e.target.value)}/>
                                )}
                            </>
                        )}
                    </section>

                    <section className="space-y-4">
                        <SectionHeader title="Ingress & Tracing" colorClass="text-blue-400 border-blue-400/30"/>
                        <ToggleCheckbox label="Enable Ingress" checked={form.ingressEnabled}
                                        onChange={(checked) => handleChange("ingressEnabled", checked)} color="green"/>
                        {form.ingressEnabled && (
                            <InputField className="ml-8" placeholder="api.mysystem.com" value={form.ingressHostname}
                                        onChange={(e) => handleChange("ingressHostname", e.target.value)}/>
                        )}
                        <ToggleCheckbox label="Enable Tracing (Jaeger)" checked={form.tracingEnabled}
                                        onChange={(checked) => handleChange("tracingEnabled", checked)} color="green"/>
                    </section>
                </form>

            </div>

            <div className="bg-slate-800/50 border-t border-white/10 px-6 py-4 flex justify-end gap-3">
                <Button type="button" onClick={onClose}>
                    Cancel
                </Button>
                <PrimaryButton type="submit" onClick={handleSubmit}>
                    {initialData ? "Update System" : "Create System"}
                </PrimaryButton>
            </div>
        </ModalWrapper>
    );
}
