export interface SystemFormData {
    systemId: string;
    displayName: string;
    description?: string;
    namespace?: string;

    kafkaEnabled: boolean;
    kafkaExternal: boolean;
    kafkaBootstrapServers?: string;

    mysqlEnabled: boolean;
    mysqlExternal: boolean;
    mysqlJdbcUrl?: string;
    mysqlUsername?: string;
    mysqlPassword?: string;

    redisEnabled: boolean;
    redisExternal: boolean;
    redisHost?: string;

    ingressEnabled: boolean;
    ingressHostname?: string;

    tracingEnabled: boolean;

    // ✅ Add this field:
    services?: {
        name: string;
        status: "running" | "stopped";
    }[];
}