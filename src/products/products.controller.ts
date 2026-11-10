import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  //find where active = true
  //الرابط: /products/active
  // يجب أن يكون قبل :id وإلا تُعامل كلمة "active" على أنها id
  @Get('active')
  findActive() {
    return this.productsService.findActive();
  }

  //get by id
  //الرابط: /products/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
