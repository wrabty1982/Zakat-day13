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
   

    const product = await this.prisma.products.findFirstOrThrow({
      where: {
        product_id: BigInt(id),
      },
    });

/*     if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
 */
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

  //find where item is hreater than value
  async findHreaterThan(value: number) {
    return this.prisma.products.findMany({
      where: {
        base_price: {
          gt: value,
        },
      },
      orderBy: {
        base_price: 'asc',
      },
      take: 5,
    });
  }

  // ارخص 5 منتجات
  async findCheapest() {
    return this.prisma.products.findMany({
      orderBy: {
        base_price: 'asc',
      },
      take: 5,
    });
  }

  //add new product
  async addProduct(productData: any) {
    return this.prisma.products.create({
      data: productData,
    });
  }

  //patch price of product
  async updateProduct(id: bigint, updateData:any) {
    // BigInt("abc") يرمي خطأ 500، لذلك نتحقق أن الـ id رقم أولاً
    if (!/^\d+$/.test(id.toString())) {
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

    return this.prisma.products.update({
      where: {
        product_id: BigInt(id),
      },
      data: updateData,
    });
  }
}
