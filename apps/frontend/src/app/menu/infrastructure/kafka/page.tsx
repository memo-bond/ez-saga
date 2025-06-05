"use client";

import {useEffect, useState} from "react";
import {useSidebarStore} from "@/stores/global_store";
import {AppLayout} from "@/app/layout/app_layout";
import {PrimaryButton} from "@/ui/components";
import KafkaTopicTable from "@/app/menu/infrastructure/kafka/kafka_topic_table";
import {KafkaTopic} from "@/types/kafka_topic";
import CreateKafkaTopicModal from "@/app/menu/infrastructure/kafka/create_topic_modal";

export const dynamic = "force-static";

export default function KafkaTopicPage() {
    const [topics, setTopics] = useState<KafkaTopic[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<KafkaTopic | null>(null);
    const setActiveTab = useSidebarStore((s) => s.setActiveTab);
    const setSubActiveTab = useSidebarStore((s) => s.setActiveSubTab);

    useEffect(() => {
        setActiveTab('infrastructure');
        setSubActiveTab('kafka')
    }, [setActiveTab, setSubActiveTab]);

    // Open modal for new topic
    const handleNew = () => {
        setSelectedTopic(null);
        setOpenModal(true);
    };

    // Open modal for edit
    const handleEdit = (topic: KafkaTopic) => {
        setSelectedTopic(topic);
        setOpenModal(true);
    };

    // Toggle status
    const handleToggleStatus = (id: string, currentlyActive: boolean) => {
        setTopics((prev) =>
            prev.map((topic) =>
                topic.id === id
                    ? {...topic, status: currentlyActive ? "INACTIVE" : "ACTIVE"}
                    : topic
            )
        );
    };

    // Save or update kafka topic
    const handleSave = (form: KafkaTopic) => {
        setTopics((prev) => {
            const exists = prev.find((s) => s.id === form.id);
            if (exists) {
                return prev.map((s) => (s.id === form.id ? form : s));
            } else {
                return [...prev, {...form, status: "ACTIVE"}];
            }
        });
        setOpenModal(false);
    };

    return (
        <AppLayout>
            <div>
                <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
                    <div className="flex gap-4">
                        <PrimaryButton onClick={handleNew}>
                            + New Kafka Topic
                        </PrimaryButton>
                    </div>
                </div>

                <KafkaTopicTable
                    topics={topics}
                    onEdit={handleEdit}
                    onToggleStatus={handleToggleStatus}
                />

                {openModal && (
                    <CreateKafkaTopicModal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        initialData={selectedTopic}
                        onSave={handleSave}
                    />
                )}
            </div>
        </AppLayout>
    );
}
