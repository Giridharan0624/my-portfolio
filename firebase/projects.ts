import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from './config';

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

// Projects CRUD
export const getProjects = async (): Promise<Project[]> => {
    try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Project));
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const addProject = async (project: Omit<Project, 'id' | 'createdAt'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, 'projects'), {
            ...project,
            createdAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding project:', error);
        throw error;
    }
};

export const deleteProject = async (projectId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};

// Messages
export const getMessages = async (): Promise<Message[]> => {
    try {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Message));
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const addMessage = async (message: Omit<Message, 'id' | 'createdAt'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, 'messages'), {
            ...message,
            createdAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
};

export const deleteMessage = async (messageId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'messages', messageId));
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
};

// Skills
export const getSkills = async (): Promise<Skill[]> => {
    try {
        const q = query(collection(db, 'skills'), orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Skill));
    } catch (error) {
        console.error('Error fetching skills:', error);
        throw error;
    }
};

export const addSkill = async (name: string): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, 'skills'), {
            name,
            createdAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding skill:', error);
        throw error;
    }
};

export const deleteSkill = async (skillId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'skills', skillId));
    } catch (error) {
        console.error('Error deleting skill:', error);
        throw error;
    }
};
