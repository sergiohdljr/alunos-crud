import { DeleteStudentUseCase } from '@/application/use-cases/delete-student-use-case.ts';
import { InMemoryRepository } from '@/infra/repositories/in-memory-repository.ts';
import { Student } from '@/domain/entities/student.ts';

describe('DeleteStudentUseCase', () => {
    let studentRepository: InMemoryRepository;
    let deleteStudent: DeleteStudentUseCase;
    let mockStudent: Student;
    const mockFalseId = 999;

    beforeEach(async() => {
        studentRepository = new InMemoryRepository();
        deleteStudent = new DeleteStudentUseCase(studentRepository);
        mockStudent = new Student(
            'John Doe',
            'john.doe@example.com',
            '12345678901',
        );
        const {id } = await studentRepository.create(mockStudent);
        mockStudent.id = id;
    });

    test('should delete a student', async () => {
        await deleteStudent.execute(mockStudent.id!);
        const student = await studentRepository.list({id: mockStudent.id!});
        expect(student).toHaveLength(0);
    });

    test('should throw an error if student is not found', async () => {
        await expect(deleteStudent.execute(mockFalseId)).rejects.toThrow(`Student with id ${mockFalseId} not found`);
    });
});
