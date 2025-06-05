"use client";

import React, {useEffect, useState} from 'react';
import {Service} from '@/types/service';
import {Button, InputField, PrimaryButton, SectionHeader, TextAreaField} from "@/ui/components";

interface CreateServicePanelProps {
    initialData: Service | null;
    onClose: () => void;
    onSave: (form: Service) => void;
}

export default function CreateServicePanel({initialData, onClose, onSave}: CreateServicePanelProps) {
    const [form, setForm] = useState<Service>({
        circuitBreakerEnabled: false,
        compensateTopic: "",
        consumeTopic: "",
        consumerGroup: "",
        description: "",
        dlqTopic: "",
        enableDLQ: false,
        fallbackUrl: "",
        id: "",
        name: "",
        produceTopic: "",
        retryCount: 0,
        status: 'INACTIVE',
        systemId: "",
        timeoutMs: 0,
        type: 'KAFKA'
    });

    useEffect((): void => {
        if (initialData)
            setForm(initialData);
    }, [initialData])

    const handleChange = (field: keyof Service, value: string | boolean | number): void => {
        setForm((prev: Service) => ({...prev, [field]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };

    return (
        <div
            className="flex flex-col h-full bg-gradient-to-br
            from-slate-900/95 via-slate-800/95 to-slate-900/95 text-white overflow-y-auto
            shadow-2xl">
            <div
                className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-800 to-indigo-700 border-b border-white/10">
                <h2 className="text-lg font-bold tracking-wide">
                    {initialData ? 'Edit Service' : 'Create New Service'}
                </h2>
                <Button onClick={onClose}>✕</Button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                <form onSubmit={handleSubmit}>

                    <SectionHeader title="Basic Information" colorClass="text-cyan-400 border-cyan-400/30"/>

                    <div>
                        <label className="block text-xs mb-1">Service Name</label>
                        <InputField value={form.name || ''}
                                    onChange={(e) => handleChange('name', e.target.value)}/>
                    </div>
                    <div>
                        <label className="block text-xs mb-1">System ID</label>
                        <InputField value={form.systemId || ''}
                                    onChange={(e) => handleChange('systemId', e.target.value)}/>
                    </div>
                    <div className="mt-4">
                        <label className="block text-xs mb-1">Description</label>
                        <TextAreaField
                            rows={3}
                            value={form.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                        />
                    </div>

                    <SectionHeader title="Resilience Settings" colorClass="text-cyan-400 border-cyan-400/30"/>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs mb-1">Retry Count</label>
                            <InputField
                                type="number"
                                value={form.retryCount || 0}
                                onChange={(e) => handleChange('retryCount', parseInt(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs mb-1">Retry Strategy</label>
                            <InputField value={form.retryStrategy || ''}
                                        onChange={(e) => handleChange('retryStrategy', e.target.value)}/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-xs mb-1">Fallback URL</label>
                        <InputField value={form.fallbackUrl || ''}
                                    onChange={(e) => handleChange('fallbackUrl', e.target.value)}/>
                    </div>

                    <SectionHeader title="Kafka Topics" colorClass="text-cyan-400 border-cyan-400/30"/>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs mb-1">Consume Topic</label>
                            <InputField value={form.consumeTopic || ''}
                                        onChange={(e) => handleChange('consumeTopic', e.target.value)}/>
                        </div>
                        <div>
                            <label className="block text-xs mb-1">Produce Topic</label>
                            <InputField value={form.produceTopic || ''}
                                        onChange={(e) => handleChange('produceTopic', e.target.value)}/>
                        </div>
                        <div>
                            <label className="block text-xs mb-1">Compensate Topic</label>
                            <InputField value={form.compensateTopic || ''}
                                        onChange={(e) => handleChange('compensateTopic', e.target.value)}/>
                        </div>
                        <div>
                            <label className="block text-xs mb-1">DLQ Topic</label>
                            <InputField value={form.dlqTopic || ''}
                                        onChange={(e) => handleChange('dlqTopic', e.target.value)}/>
                        </div>
                    </div>

                </form>
            </div>

            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-2 bg-slate-800/90">
                <Button onClick={onClose}>Cancel</Button>
                <PrimaryButton onClick={handleSubmit}>
                    {initialData ? 'Update Service' : 'Create Service'}
                </PrimaryButton>
            </div>
        </div>
    );
}
