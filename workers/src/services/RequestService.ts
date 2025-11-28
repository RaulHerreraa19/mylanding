import { RequestRepository } from '../repositories/RequestRepository';
import { RequestBase, RequestEntity, RequestStatus, UpdateRequestPayload } from '../types/request';

const safeId = () => (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `req-${Date.now()}`);

export class RequestService {
  constructor(private readonly repository: RequestRepository, private readonly defaultTenant: string) {}

  public async list(tenantId?: string) {
    return this.repository.list(tenantId);
  }

  public async create(payload: RequestBase): Promise<RequestEntity> {
    const tenantId = payload.tenantId || this.defaultTenant;
    this.ensureRequired(payload, ['customerName', 'business', 'email', 'phone', 'channel', 'service', 'budgetRange']);

    const request: RequestEntity = {
      id: safeId(),
      tenantId,
      customerName: payload.customerName,
      business: payload.business,
      email: payload.email,
      phone: payload.phone,
      channel: payload.channel,
      service: payload.service,
      budgetRange: payload.budgetRange,
      notes: payload.notes ?? '',
      priority: payload.priority ?? 'media',
      status: payload.status ?? 'nuevo',
      responseMinutes: payload.responseMinutes ?? 0,
      createdAt: payload.createdAt ?? new Date().toISOString()
    };

    return this.repository.create(request);
  }

  public async update(payload: UpdateRequestPayload) {
    if (!payload.id) {
      throw new Error('El campo id es obligatorio.');
    }

    if (!payload.status && !payload.notes && !payload.priority) {
      throw new Error('Debes enviar al menos un campo para actualizar.');
    }

    const updates: Partial<RequestEntity> = {};

    if (payload.status) {
      this.validateStatus(payload.status);
      updates.status = payload.status;
    }

    if (payload.notes) {
      updates.notes = payload.notes;
    }

    if (payload.priority) {
      updates.priority = payload.priority;
    }

    return this.repository.update(payload.id, payload.tenantId ?? this.defaultTenant, updates);
  }

  private ensureRequired(payload: RequestBase, keys: Array<keyof RequestBase>) {
    const missing = keys.filter((key) => !payload[key]);
    if (missing.length) {
      throw new Error(`Campos requeridos faltantes: ${missing.join(', ')}`);
    }
  }

  private validateStatus(status: RequestStatus) {
    const allowed: RequestStatus[] = ['nuevo', 'en_proceso', 'completado'];
    if (!allowed.includes(status)) {
      throw new Error('Estado no válido.');
    }
  }
}
