import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsUUID, ValidateIf } from "class-validator";
import { WorkspaceType } from "prisma-types/enums";
import { UserEntityDto } from "src/domain/entities/user.entity";

export class CompleteOnboardingDto {
  @ApiProperty()
  @IsUUID()
  userId!: string;

  @ApiProperty({ enum: WorkspaceType })
  @IsEnum(WorkspaceType)
  workspaceType!: WorkspaceType;

  @ApiProperty()
  @ValidateIf((o: CompleteOnboardingDto) => o.workspaceType !== "INDIVIDUAL")
  @IsString()
  workspaceName!: string;
}

export class CompleteOnboardingResponseDto extends UserEntityDto {}
