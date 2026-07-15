import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { DefaultSuccessResponseDto } from "src/shared/dto/default-success-response.dto";

export class DeleteBrandAddressesDto {
  @ApiProperty({ type: "string", isArray: true })
  @IsArray()
  @IsString({ each: true })
  ids!: string[];
}

export class DeleteBrandAddressesResponseDto extends DefaultSuccessResponseDto {}
