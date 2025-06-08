export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'team_member';
  avatar?: string;
  department?: string;
  joinDate: string;
  lastActive: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  progress: number;
  teamMembers: string[];
  tasks: Task[];
  budget?: number;
  client?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  projectId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  estimatedHours?: number;
  actualHours?: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: 'task_update' | 'project_created' | 'user_added' | 'status_change';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'team_member') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}