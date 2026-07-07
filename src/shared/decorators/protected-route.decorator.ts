import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { WorkspaceRole } from 'prisma-types/enums'
import { AuthGuard } from 'src/modules/accounts/signin/guards/auth.guard'

export const AUTH_OPTIONS = 'auth-options'

export interface AuthOptions {
  roles?: WorkspaceRole[]
}

export function ProtectedRoute(options?: AuthOptions) {
  return applyDecorators(
    SetMetadata(AUTH_OPTIONS, options),
    UseGuards(AuthGuard),
  )
}
