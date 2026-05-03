import { Response } from 'express';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function sendSuccess(res: Response, data: unknown, statusCode = 200, message = 'success') {
  return res.status(statusCode).json({ success: true, message, data });
}

export function sendError(res: Response, message: string, statusCode = 400, errors?: unknown) {
  return res.status(statusCode).json({ success: false, message, ...(errors && { errors }) });
}

export function sendPaginated(res: Response, data: unknown[], meta: PaginationMeta) {
  return res.status(200).json({
    success: true,
    message: 'success',
    data,
    pagination: meta,
  });
}
