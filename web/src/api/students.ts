import type { Student, StudentPayload } from "./student-types";

const API_BASE_URL = 'http://localhost:3333/api';

export interface StudentFilters {
  name?: string;
  email?: string;
  cpf?: string;
}

export const studentsApi = {
  
  getAll: async (filters?: StudentFilters): Promise<Student[]> => {
    const url = new URL(`${API_BASE_URL}/students`);
    
    if (filters) {
      if (filters.name) {
        url.searchParams.append('name', filters.name);
      }
      if (filters.email) {
        url.searchParams.append('email', filters.email);
      }
      if (filters.cpf) {
        const cleanCpf = filters.cpf.replace(/[^0-9]/g, '');
        url.searchParams.append('cpf', cleanCpf);
      }
    }

    const response = await fetch(url.toString());
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
    const cleanStudent = {
      ...student,
      cpf: student.cpf.replace(/[^0-9]/g, '')
    };
    
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanStudent),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create student');
    }
    
    return response.json();
  },

  update: async (id: number, student: StudentPayload): Promise<Student> => {
    const cleanStudent = {
      ...student,
      cpf: student.cpf.replace(/[^0-9]/g, '')
    };
    
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanStudent),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to update student with id ${id}`);
    }
    
    return response.json();
  },
};
