import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL!;
    // الـ adapter لا يقرأ ?schema= من الرابط، لذلك نمرره له صراحةً (مثل shop)
    const schema = new URL(connectionString).searchParams.get('schema') ?? 'public';

    // Prisma 7 يتطلب driver adapter للاتصال بقاعدة البيانات
    super({ adapter: new PrismaPg({ connectionString }, { schema }) });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
