import { Timestamp } from 'firebase/firestore';

// ========================
// Firestore Document Types
// ========================

export interface Project {
    id?: string;
    title: string;
    description: string;
    image: string;
    github: string;
    demo: string;
    tech: string[];
    createdAt: Timestamp;
}

export interface Message {
    id?: string;
    name: string;
    email: string;
    message: string;
    createdAt: Timestamp;
}

export interface Skill {
    id?: string;
    name: string;
    createdAt: Timestamp;
}

export interface Experience {
    id?: string;
    role: string;
    company: string;
    period: string;
    description: string;
    createdAt: Timestamp;
}

export interface Education {
    id?: string;
    degree: string;
    school: string;
    period: string;
    description: string;
    createdAt: Timestamp;
}

export interface Service {
    id?: string;
    title: string;
    description: string;
    tools: string[];
    createdAt: Timestamp;
}

// ========================
// Serialized Types (for client components)
// ========================

/** Project with Timestamp serialized to a plain number (milliseconds) */
export interface SerializedProject {
    id?: string;
    title: string;
    description: string;
    image: string;
    github: string;
    demo: string;
    tech: string[];
    createdAt: number;
}

/** Skill with Timestamp serialized to a plain number */
export interface SerializedSkill {
    id?: string;
    name: string;
    createdAt: number;
}

/** Experience with Timestamp serialized to a plain number */
export interface SerializedExperience {
    id?: string;
    role: string;
    company: string;
    period: string;
    description: string;
    createdAt: number;
}

/** Education with Timestamp serialized to a plain number */
export interface SerializedEducation {
    id?: string;
    degree: string;
    school: string;
    period: string;
    description: string;
    createdAt: number;
}

/** Service with Timestamp serialized to a plain number */
export interface SerializedService {
    id?: string;
    title: string;
    description: string;
    tools: string[];
    createdAt: number;
}
