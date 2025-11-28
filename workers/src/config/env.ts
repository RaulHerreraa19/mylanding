export interface WorkerEnv {
  COSMOS_DB_ENDPOINT: string;
  COSMOS_DB_KEY: string;
  COSMOS_DB_DATABASE: string;
  COSMOS_DB_CONTAINER: string;
  DEFAULT_TENANT?: string;
}

export interface RuntimeConfig {
  cosmosEndpoint: string;
  cosmosKey: string;
  databaseId: string;
  containerId: string;
  defaultTenant: string;
}

export const loadConfig = (env: WorkerEnv): RuntimeConfig => {
  const {
    COSMOS_DB_ENDPOINT,
    COSMOS_DB_KEY,
    COSMOS_DB_DATABASE,
    COSMOS_DB_CONTAINER,
    DEFAULT_TENANT
  } = env;

  if (!COSMOS_DB_ENDPOINT || !COSMOS_DB_KEY || !COSMOS_DB_DATABASE || !COSMOS_DB_CONTAINER) {
    throw new Error('Variables de entorno de Cosmos DB incompletas.');
  }

  return {
    cosmosEndpoint: COSMOS_DB_ENDPOINT,
    cosmosKey: COSMOS_DB_KEY,
    databaseId: COSMOS_DB_DATABASE,
    containerId: COSMOS_DB_CONTAINER,
    defaultTenant: DEFAULT_TENANT ?? 'default'
  };
};
