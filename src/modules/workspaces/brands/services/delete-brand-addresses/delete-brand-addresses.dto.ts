import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { DefaultSuccessResponseDto } from "src/shared/dto/default-success-response.dto";

export class DeleteBrandAddressesDto {
  @IsArray({ each: true })
  @IsString()
  @ApiProperty({ isArray: true })
  ids!: string[];
}

export class DeleteBrandAddressesResponseDto extends DefaultSuccessResponseDto {}
