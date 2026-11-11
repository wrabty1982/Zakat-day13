import { Body, Controller, Get, Param, Patch, Post, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';


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

  //find where item is hreater than 100
  //الرابط: /products/greater-than/100
  @Get('greater-than/:value')
  findHreaterThan(@Param('value') value: string) {
    return this.productsService.findHreaterThan(Number(value));
  }

  // ارخص 5 منتجات
  //الرابط: /products/cheapest
  @Get('cheapest')
  findCheapest() {
    return this.productsService.findCheapest();
  }

  //get by id
  //الرابط: /products/1
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productsService.findOne((id));
    } catch (error) {
      throw new NotFoundException(`Product ${id} not found`);
    }
  }

  //add new product
  //الرابط: /products/add

  @Post()
  addProduct(@Body() productData: CreateProductDto) {
    return this.productsService.addProduct(productData);
  }

  //patch price of product
  //الرابط: /products/1
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateData: any) {
    return this.productsService.updateProduct(BigInt(id), updateData);
  }


}
