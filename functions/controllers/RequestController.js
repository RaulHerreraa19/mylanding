import { corsPreflight, errorResponse, jsonResponse } from '../utils/response';
export class RequestController {
    service;
    constructor(service) {
        this.service = service;
    }
    async handle(request) {
        if (request.method === 'OPTIONS') {
            return corsPreflight();
        }
        try {
            switch (request.method.toUpperCase()) {
                case 'GET':
                    return this.list(request);
                case 'POST':
                    return this.create(request);
                case 'PATCH':
                    return this.update(request);
                default:
                    return errorResponse('Método no permitido', 405);
            }
        }
        catch (error) {
            const details = error instanceof Error ? error.message : error;
            return errorResponse('Error interno en el controlador', 500, details);
        }
    }
    async list(request) {
        const url = new URL(request.url);
        const tenantId = url.searchParams.get('tenantId') ?? undefined;
        const items = await this.service.list(tenantId);
        return jsonResponse(items);
    }
    async create(request) {
        const body = (await request.json());
        const created = await this.service.create(body);
        return jsonResponse(created, 201);
    }
    async update(request) {
        const body = (await request.json());
        const updated = await this.service.update(body);
        return jsonResponse(updated);
    }
}
//# sourceMappingURL=RequestController.js.map