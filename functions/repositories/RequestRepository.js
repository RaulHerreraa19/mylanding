export class RequestRepository {
    container;
    constructor(client, databaseId, containerId) {
        this.container = client.database(databaseId).container(containerId);
    }
    async list(tenantId) {
        const query = tenantId
            ? {
                query: 'SELECT * FROM c WHERE c.tenantId = @tenantId ORDER BY c._ts DESC',
                parameters: [{ name: '@tenantId', value: tenantId }]
            }
            : { query: 'SELECT * FROM c ORDER BY c._ts DESC' };
        const { resources } = await this.container.items.query(query).fetchAll();
        return resources;
    }
    async create(data) {
        const { resource } = await this.container.items.create(data);
        if (!resource) {
            throw new Error('No se pudo crear la solicitud en Cosmos DB.');
        }
        return resource;
    }
    async update(id, tenantId, updates) {
        const item = this.container.item(id, tenantId);
        const { resource } = await item.read();
        if (!resource) {
            throw new Error('No se encontró la solicitud solicitada.');
        }
        const merged = {
            ...resource,
            ...updates,
            updatedAt: new Date().toISOString()
        };
        const { resource: saved } = await item.replace(merged);
        if (!saved) {
            throw new Error('No se pudo guardar la actualización.');
        }
        return saved;
    }
}
//# sourceMappingURL=RequestRepository.js.map