import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedRoles() {
  const roles = [
    { name: 'ADMIN', description: 'Quản trị hệ thống' },
    { name: 'AUTHOR', description: 'Người viết nội dung' },
    { name: 'MANAGER', description: 'Quản lí chi nhánh' },
  ];

  for (const role of roles) {
    await prisma.roles.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  console.log('✅ Roles seeded');
}

async function seedAdminUser() {
  const adminEmail = 'admin@gmail.com';
  const adminName = 'System Admin';
  const password = await bcrypt.hash('123123', 10);

  // Tìm role ADMIN
  const adminRole = await prisma.roles.findUnique({
    where: { name: 'ADMIN' },
  });

  if (!adminRole) throw new Error('Role ADMIN chưa được tạo');

  // Tìm hoặc tạo admin user
  const admin = await prisma.users.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      password: password,
      phone: '',
      address: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      userRoles: {
        create: {
          roleId: adminRole.id,
        },
      },
    },
  });

  console.log('✅ Admin user seeded', admin);
}

async function main() {
  await seedRoles();
  await seedAdminUser();
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
