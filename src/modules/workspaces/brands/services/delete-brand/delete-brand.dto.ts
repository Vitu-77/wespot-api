import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { DefaultSuccessResponseDto } from "src/shared/dto/default-success-response.dto";

export class DeleteBrandDto {
  @ApiProperty()
  @IsString({ each: true })
  brandId!: string;
}

export class DeleteBrandResponseDto extends DefaultSuccessResponseDto {}
