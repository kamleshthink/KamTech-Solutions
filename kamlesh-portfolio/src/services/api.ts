// API Configuration
console.log('🔧 Environment REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
console.log('🔧 Using API_BASE_URL:', API_BASE_URL);

// API Response type
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
}

// Generic API request function
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('📤 API Request:', url);
  console.log('📋 Request options:', options);

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response OK:', response.ok);

    const data = await response.json();
    console.log('📥 Response data:', data);

    if (!response.ok) {
      console.log('❌ Validation errors:', data.errors);
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
}

// ====================
// CONTACT API
// ====================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  projectBudget?: string;
  projectType?: string;
  urgency?: string;
}

export const contactAPI = {
  // Submit contact form
  submit: (data: ContactFormData): Promise<ApiResponse> => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ====================
// PROJECTS API
// ====================

export interface Project {
  _id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'ml' | 'other';
  featured: boolean;
  stats?: Record<string, string>;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export const projectsAPI = {
  // Get all projects
  getAll: (params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<ApiResponse<Project[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', String(params.featured));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    return apiRequest(`/projects?${queryParams.toString()}`);
  },

  // Get single project
  getById: (id: string): Promise<ApiResponse<Project>> => {
    return apiRequest(`/projects/${id}`);
  },

  // Get project stats
  getStats: (): Promise<ApiResponse> => {
    return apiRequest('/projects/stats');
  },
};

// ====================
// TESTIMONIALS API
// ====================

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  rating: number;
  feedback: string;
  platform: 'fiverr' | 'upwork' | 'freelancer' | 'linkedin' | 'direct' | 'other';
  projectType?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const testimonialsAPI = {
  // Get all testimonials
  getAll: (params?: {
    featured?: boolean;
    platform?: string;
    limit?: number;
  }): Promise<ApiResponse<Testimonial[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.featured !== undefined) queryParams.append('featured', String(params.featured));
    if (params?.platform) queryParams.append('platform', params.platform);
    if (params?.limit) queryParams.append('limit', String(params.limit));

    return apiRequest(`/testimonials?${queryParams.toString()}`);
  },

  // Get single testimonial
  getById: (id: string): Promise<ApiResponse<Testimonial>> => {
    return apiRequest(`/testimonials/${id}`);
  },

  // Get testimonial stats
  getStats: (): Promise<ApiResponse> => {
    return apiRequest('/testimonials/stats');
  },
};

// ====================
// CONSULTATIONS API
// ====================

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  mode: 'google-meet' | 'phone';
  projectType?: string;
  message?: string;
}

export const consultationsAPI = {
  // Submit consultation booking
  submit: (data: ConsultationFormData): Promise<ApiResponse> => {
    return apiRequest('/consultations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ====================
// HEALTH CHECK API
// ====================

export const healthAPI = {
  check: (): Promise<ApiResponse> => {
    return apiRequest('/health');
  },
};

export default {
  contact: contactAPI,
  projects: projectsAPI,
  testimonials: testimonialsAPI,
  consultations: consultationsAPI,
  health: healthAPI,
};
