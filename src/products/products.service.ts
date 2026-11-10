import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  //get all products
  async findAll() {
    return this.prisma.products.findMany();
  }
  
  //get product by id
  async findOne(id: string) {
    // BigInt("abc") يرمي خطأ 500، لذلك نتحقق أن الـ id رقم أولاً
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('id must be a positive integer');
    }

    const product = await this.prisma.products.findUnique({
      where: {
        product_id: BigInt(id),
      },
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }
  
  //find where active = true
  async findActive() {
    return this.prisma.products.findMany({
      where: {
        active: true,
      },
    });
  }
}
