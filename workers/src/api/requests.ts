import { CosmosClient } from '@azure/cosmos';
import { loadConfig, WorkerEnv } from '../config/env';
import { RequestRepository } from '../repositories/RequestRepository';
import { RequestService } from '../services/RequestService';
import { RequestController } from '../controllers/RequestController';
import { errorResponse } from '../utils/response';

const buildController = (env: WorkerEnv) => {
  const config = loadConfig(env);
  const client = new CosmosClient({ endpoint: config.cosmosEndpoint, key: config.cosmosKey });
  const repository = new RequestRepository(client, config.databaseId, config.containerId);
  const service = new RequestService(repository, config.defaultTenant);
  return new RequestController(service);
};

export const onRequest: PagesFunction<WorkerEnv> = async (context) => {
  try {
    const controller = buildController(context.env as WorkerEnv);
    return await controller.handle(context.request);
  } catch (error) {
    const details = error instanceof Error ? error.message : error;
    return errorResponse('Error al inicializar el Worker', 500, details);
  }
};
