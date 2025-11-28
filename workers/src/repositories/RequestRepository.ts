import { CosmosClient, Container } from '@azure/cosmos';
import { RequestEntity } from '../types/request';

export class RequestRepository {
  private container: Container;

  constructor(client: CosmosClient, databaseId: string, containerId: string) {
    this.container = client.database(databaseId).container(containerId);
  }

  public async list(tenantId?: string): Promise<RequestEntity[]> {
    const query = tenantId
      ? {
          query: 'SELECT * FROM c WHERE c.tenantId = @tenantId ORDER BY c._ts DESC',
          parameters: [{ name: '@tenantId', value: tenantId }]
        }
      : { query: 'SELECT * FROM c ORDER BY c._ts DESC' };

    const { resources } = await this.container.items.query<RequestEntity>(query).fetchAll();
    return resources;
  }

  public async create(data: RequestEntity): Promise<RequestEntity> {
    const { resource } = await this.container.items.create<RequestEntity>(data);
    if (!resource) {
      throw new Error('No se pudo crear la solicitud en Cosmos DB.');
    }
    return resource;
  }

  public async update(id: string, tenantId: string, updates: Partial<RequestEntity>): Promise<RequestEntity> {
    const item = this.container.item(id, tenantId);
    const { resource } = await item.read<RequestEntity>();

    if (!resource) {
      throw new Error('No se encontró la solicitud solicitada.');
    }

    const merged: RequestEntity = {
      ...resource,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const { resource: saved } = await item.replace<RequestEntity>(merged);
    if (!saved) {
      throw new Error('No se pudo guardar la actualización.');
    }
    return saved;
  }
}
