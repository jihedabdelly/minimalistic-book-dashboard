import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';

export function RequireAuth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
