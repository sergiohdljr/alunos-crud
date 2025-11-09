export interface Student {
  id: number;
  name: string;
  email: string;
  cpf: string;
  created_at: string;
  updated_at: string;
}

export type StudentPayload = Omit<Student, 'id' | 'created_at' | 'updated_at'>;