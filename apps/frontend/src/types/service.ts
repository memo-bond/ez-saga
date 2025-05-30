export type ServiceType = 'REST' | 'KAFKA';
export type ServiceStatus = 'ACTIVE' | 'INACTIVE' | 'ERROR';

export interface Service {
    id: string;
    name: string;                      // Unique services name
    description?: string;              // Optional details

    type: ServiceType;                // REST or KAFKA
    status: ServiceStatus;            // Current status

    // REST-specific config
    timeoutMs?: number;               // Optional
    retryCount?: number;
    retryStrategy?: 'exponential' | 'fixed' | 'linear';
    circuitBreakerEnabled?: boolean;
    fallbackUrl?: string;

    // Kafka-specific config
    consumeTopic?: string;
    produceTopic?: string;
    compensateTopic?: string;
    consumerGroup?: string;
    enableDLQ?: boolean;
    dlqTopic?: string;

    updatedAt?: Date;

    // Optional relationships
    systemId?: string;                // Foreign key to System
}
