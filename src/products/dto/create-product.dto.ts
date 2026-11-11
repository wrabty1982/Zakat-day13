//create-product.dto.ts
import { IsString, IsBoolean, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
// DTO = Data Transfer Object
export class CreateProductDto {
  // Product Name
    @IsString({ message: 'Product name must be a string' })
    @IsNotEmpty({ message: 'Product name is required' })
    @MinLength(3 ,{ message: 'Product name must be at least 3 characters long' })
    @MaxLength(200, { message: 'Product name must be at most 200 characters long' })
    @Matches(/^[a-zA-Z0-9\s]+$/, { message: 'Product name can only contain letters, numbers, and spaces' })
  product_name: string;
  
  // Base Price
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d+\.\d{2}$/, {
  message: 'Price must have exactly 2 decimal places',
})
  base_price: string;  

  // SKU
    @IsString()
    @IsNotEmpty()
  sku: string;
  
  // Description
    @IsString()
  description: string;
  
  // Category ID
    @IsString()
    @IsNotEmpty()
    @Matches(/^[1-9]\d*$/, {
  message: 'category_id must be a positive integer',
})
category_id: string;  

  // Active
    @IsBoolean()
    @IsNotEmpty()
  active: boolean;
}
