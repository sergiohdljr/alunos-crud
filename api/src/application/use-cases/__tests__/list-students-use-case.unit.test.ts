import { ListStudentsUseCase } from '@/application/use-cases/list-students-use-case.ts';
import { InMemoryRepository } from '@/infra/repositories/in-memory-repository.ts';
import { Student } from '@/domain/entities/student.ts';
import { describe, expect, beforeEach } from '@jest/globals';


describe('ListStudentsUseCase', () => {
  let studentRepository: InMemoryRepository;
  let listStudents: ListStudentsUseCase;

  beforeEach(() => {
    const mockStudent = new Student(
        'John Doe',
        'john.doe@example.com',
        '12345678901',
      );
     const mockStudent2 = new Student(
        'Jane Doe',
        'jane.doe@example.com',
        '98765432100',
      );
    studentRepository = new InMemoryRepository();
    studentRepository.create(mockStudent);
    studentRepository.create(mockStudent2);
    listStudents = new ListStudentsUseCase(studentRepository);
  });

  test('should list all students', async () => {
    const students = await listStudents.execute({});

    expect(students).toBeInstanceOf(Array)
    expect(students).toHaveLength(2);
  });
});