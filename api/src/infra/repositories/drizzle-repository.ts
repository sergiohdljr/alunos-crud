import { StudentRepository } from "@/application/repositories/student-repository-interface.ts";
import { Student } from "@/domain/entities/student.ts";
import { studentTable } from "@/infra/db/schema/students.ts";
import { desc, eq, or } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export class DrizzleRepository implements StudentRepository {
    constructor(private readonly db: NodePgDatabase<Record<string, never>>) {}

    async create(student: Student): Promise<Record<string, number>> {
        const [newStudent] = await this.db
                .insert(studentTable)
                .values(student)
                .returning({id: studentTable.id})

        return newStudent;
    }
    async list(student: Partial<Student>): Promise<Student[]> {
        const conditions = [];
        if (student.id) conditions.push(eq(studentTable.id, student.id));
        if (student.name) conditions.push(eq(studentTable.name, student.name));
        if (student.email) conditions.push(eq(studentTable.email, student.email));
        if (student.cpf) conditions.push(eq(studentTable.cpf, student.cpf));
        
        return await this.db
            .select()
            .from(studentTable)
            .where(conditions.length > 0 ? or(...conditions) : undefined)
            .orderBy(desc(studentTable.id));
    }

    async edit(id: number, student: Student): Promise<Student> {
        const [updatedStudent] = await this.db
            .update(studentTable)
            .set(student)
            .where(eq(studentTable.id, id))
            .returning();

        return updatedStudent;
    }

    async delete(id: number): Promise<void> {
        await this.db.delete(studentTable).where(eq(studentTable.id, id));
    }
    
}   
    