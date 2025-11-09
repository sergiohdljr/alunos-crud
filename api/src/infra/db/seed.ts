import { db } from '@/infra/db/client.ts';
import { studentTable } from '@/infra/db/schema/students.ts';
import { reset } from 'drizzle-seed';

function fakeCPF(): string {
  return Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('');
}

function generateUniqueStudents(count: number) {
  const firstNames = [
    "Ana", "Bruno", "Carla", "Daniel", "Eduarda", "Felipe", "Gabriela", "Henrique", "Isabela", "João",
    "Karina", "Lucas", "Mariana", "Nicolas", "Olivia", "Paulo", "Rafaela", "Sergio", "Tatiana", "Vinicius",
    "Amanda", "Bernardo", "Camila", "Diego", "Elisa", "Fabio", "Giovana", "Hugo", "Ingrid", "Julio",
    "Kelly", "Leonardo", "Melissa", "Nathan", "Otavia", "Pedro", "Queila", "Ricardo", "Sabrina", "Thiago",
    "Ursula", "Victor", "Wanda", "Xavier", "Yasmin", "Zeca", "Adriana", "Breno", "Cecilia", "Davi"
  ];
  
  const lastNames = [
    "Silva", "Santos", "Costa", "Lima", "Oliveira", "Souza", "Ferreira", "Alves", "Rodrigues", "Dias",
    "Martins", "Pereira", "Gomes", "Barbosa", "Ribeiro", "Carvalho", "Mendes", "Araújo", "Nunes", "Castro",
    "Moreira", "Freitas", "Lopes", "Rocha", "Cardoso", "Ramos", "Teixeira", "Correia", "Pinto", "Monteiro"
  ];

  const usedCPFs = new Set<string>();
  const usedEmails = new Set<string>();
  const students = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName1 = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const lastName2 = lastNames[(i + 7) % lastNames.length];
    
    const name = `${firstName} ${lastName1} ${lastName2}`;
    
    let email: string;
    let emailCounter = 0;
    do {
      email = `${firstName.toLowerCase()}.${lastName1.toLowerCase()}${emailCounter > 0 ? emailCounter : ''}@email.com`;
      emailCounter++;
    } while (usedEmails.has(email));
    usedEmails.add(email);
    
    let cpf: string;
    do {
      cpf = fakeCPF();
    } while (usedCPFs.has(cpf));
    usedCPFs.add(cpf);
    
    students.push({ name, email, cpf });
  }
  
  return students;
}

async function run() {
  try {

    await reset(db, [studentTable]);
    console.log('🧹 Database reset completed')

    console.log('🌱 Starting manual seed with 100 unique records...');
    
    const studentsData = generateUniqueStudents(120);
    await db.insert(studentTable).values(studentsData);
    console.log('✅ Successfully inserted 100 student records');
        
  } catch (error) {
    console.error('❌ Seed error:', error);
  }
}

run();
