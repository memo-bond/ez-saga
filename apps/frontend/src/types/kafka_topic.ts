export type TopicStatus = 'ACTIVE' | 'INACTIVE';

export interface KafkaTopicConfig {
    [key: string]: string | number | boolean;
}

export interface KafkaTopic {
    id: string;
    name: string;
    partitions: number;          // number of partitions (required, min 1)
    replicationFactor: number;   // replication factor (required, min 1)
    description?: string;
    config?: KafkaTopicConfig;
    status: TopicStatus;
}
