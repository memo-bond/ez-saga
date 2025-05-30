"use client";

import { useState } from 'react';
import { Service } from '@/types/service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  initialData: Service;
  onClose: () => void;
  onSave: (form: Service) => void;
}

export default function CreateServicePanel({ initialData, onClose, onSave }: Props) {
  const [form, setForm] = useState<Service>(initialData);

  const handleChange = (field: keyof Service, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
      <div className="flex flex-col h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 text-white rounded-l-2xl overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-800 to-indigo-700 border-b border-white/10">
          <h2 className="text-lg font-bold tracking-wide">
            {form.id ? 'Edit Service' : 'Create New Service'}
          </h2>
          <Button variant="ghost" onClick={onClose} className="text-white hover:text-red-400">✕</Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          <section>
            <h3 className="text-cyan-400 font-semibold mb-2 text-sm border-b border-cyan-700 pb-1">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Service Name</label>
                <Input value={form.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs mb-1">System ID</label>
                <Input value={form.systemId || ''} onChange={(e) => handleChange('systemId', e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs mb-1">Description</label>
              <textarea
                  className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm"
                  rows={3}
                  value={form.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="text-yellow-400 font-semibold mb-2 text-sm border-b border-yellow-700 pb-1">Resilience Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Retry Count</label>
                <Input
                    type="number"
                    value={form.retryCount || 0}
                    onChange={(e) => handleChange('retryCount', parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Retry Strategy</label>
                <Input value={form.retryStrategy || ''} onChange={(e) => handleChange('retryStrategy', e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs mb-1">Fallback URL</label>
              <Input value={form.fallbackUrl || ''} onChange={(e) => handleChange('fallbackUrl', e.target.value)} />
            </div>
          </section>

          <section>
            <h3 className="text-indigo-400 font-semibold mb-2 text-sm border-b border-indigo-700 pb-1">Kafka Topics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Consume Topic</label>
                <Input value={form.consumeTopic || ''} onChange={(e) => handleChange('consumeTopic', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs mb-1">Produce Topic</label>
                <Input value={form.produceTopic || ''} onChange={(e) => handleChange('produceTopic', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs mb-1">Compensate Topic</label>
                <Input value={form.compensateTopic || ''} onChange={(e) => handleChange('compensateTopic', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs mb-1">DLQ Topic</label>
                <Input value={form.dlqTopic || ''} onChange={(e) => handleChange('dlqTopic', e.target.value)} />
              </div>
            </div>
          </section>
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-2 bg-slate-800/90">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
              className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white"
              onClick={() => onSave(form)}
          >
            {form.id ? 'Update Service' : 'Create Service'}
          </Button>
        </div>
      </div>
  );
}
