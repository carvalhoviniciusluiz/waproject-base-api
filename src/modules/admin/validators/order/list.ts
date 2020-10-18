import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export class ListOrder extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['createdDate', 'updatedDate'])
  @ApiProperty({ required: false, enum: ['createdDate', 'updatedDate'] })
  public orderBy: string;
}
