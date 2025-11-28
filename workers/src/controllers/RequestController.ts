import { RequestService } from '../services/RequestService';
import { RequestBase, UpdateRequestPayload } from '../types/request';
import { corsPreflight, errorResponse, jsonResponse } from '../utils/response';

export class RequestController {
  constructor(private readonly service: RequestService) {}

  public async handle(request: Request): Promise<Response> {
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
    } catch (error) {
      const details = error instanceof Error ? error.message : error;
      return errorResponse('Error interno en el controlador', 500, details);
    }
  }

  private async list(request: Request) {
    const url = new URL(request.url);
    const tenantId = url.searchParams.get('tenantId') ?? undefined;
    const items = await this.service.list(tenantId);
    return jsonResponse(items);
  }

  private async create(request: Request) {
    const body = (await request.json()) as RequestBase;
    const created = await this.service.create(body);
    return jsonResponse(created, 201);
  }

  private async update(request: Request) {
    const body = (await request.json()) as UpdateRequestPayload;
    const updated = await this.service.update(body);
    return jsonResponse(updated);
  }
}
