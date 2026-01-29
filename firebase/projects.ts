import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db, storage } from './config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (file: File): Promise<string> => {
    try {
        const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

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

export const updateProject = async (projectId: string, project: Partial<Project>): Promise<void> => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, {
            ...project
        });
    } catch (error) {
        console.error('Error updating project:', error);
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

export const updateSkill = async (skillId: string, name: string): Promise<void> => {
    try {
        const skillRef = doc(db, 'skills', skillId);
        await updateDoc(skillRef, { name });
    } catch (error) {
        console.error('Error updating skill:', error);
        throw error;
    }
};

// Experience CRUD
export const getExperiences = async (): Promise<Experience[]> => {
    const q = query(collection(db, 'experiences'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Experience));
};

export const addExperience = async (experience: Omit<Experience, 'id' | 'createdAt'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'experiences'), {
        ...experience,
        createdAt: Timestamp.now()
    });
    return docRef.id;
};

export const deleteExperience = async (experienceId: string): Promise<void> => {
    await deleteDoc(doc(db, 'experiences', experienceId));
};

export const updateExperience = async (id: string, experience: Partial<Experience>): Promise<void> => {
    const docRef = doc(db, 'experiences', id);
    await updateDoc(docRef, { ...experience });
};

// Education CRUD
export const getEducations = async (): Promise<Education[]> => {
    const q = query(collection(db, 'educations'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Education));
};

export const addEducation = async (education: Omit<Education, 'id' | 'createdAt'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'educations'), {
        ...education,
        createdAt: Timestamp.now()
    });
    return docRef.id;
};

export const deleteEducation = async (educationId: string): Promise<void> => {
    await deleteDoc(doc(db, 'educations', educationId));
};

export const updateEducation = async (id: string, education: Partial<Education>): Promise<void> => {
    const docRef = doc(db, 'educations', id);
    await updateDoc(docRef, { ...education });
};
