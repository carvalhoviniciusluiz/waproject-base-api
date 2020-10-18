import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';
export class SaveOrder implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  @ApiProperty({ required: true, type: 'string', minLength: 20, maxLength: 1000 })
  public description: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ required: false, type: 'integer' })
  public quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, type: 'integer' })
  public price: number;
}
