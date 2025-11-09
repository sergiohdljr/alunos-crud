import { db } from '@/infra/db/client.ts';
import { studentTable } from '@/infra/db/schema/students.ts';
import { reset, seed } from 'drizzle-seed';

function fakeCPF(): string {
  return Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('');
}

async function run() {
  try {
    await reset(db, [studentTable]);
    console.log(' Database reset successfully');

    await seed(db,[studentTable] )

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seed error:', error);
  }
}

run();
