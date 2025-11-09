const API_BASE_URL = 'http://localhost:3333/api';

export interface Student {
  id: number;
  name: string;
  email: string;
  cpf: string;
  created_at: string;
  updated_at: string;
}

export type StudentPayload = Omit<Student, 'id' | 'created_at' | 'updated_at'>;

export const studentsApi = {
  
  getAll: async (): Promise<Student[]> => {
    const response = await fetch(`${API_BASE_URL}/students`);
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to delete student with id ${id}`);
    }
  },

  create: async (student: StudentPayload): Promise<{ id: number }> => {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create student');
    }
    
    return response.json();
  },

  update: async (id: number, student: StudentPayload): Promise<Student> => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to update student with id ${id}`);
    }
    
    return response.json();
  },
};
