import { applyDecorators } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";

export function ApiWorkspaceHeader() {
  return applyDecorators(
    ApiHeader({
      name: "X-Workspace-Id",
      required: true,
      description: "Id do worksapace selecionado",
    }),
  );
}
