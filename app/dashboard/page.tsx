'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/firebase/auth';
import { getMessages } from '@/firebase/projects';
import { Message } from '@/types';

// Components
import LoginForm from '@/components/dashboard/LoginForm';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProjectsTab from '@/components/dashboard/ProjectsTab';
import MessagesTab from '@/components/dashboard/MessagesTab';
import SkillsTab from '@/components/dashboard/SkillsTab';
import ExperienceTab from '@/components/dashboard/ExperienceTab';
import EducationTab from '@/components/dashboard/EducationTab';
import ServicesTab from '@/components/dashboard/ServicesTab';

export default function Dashboard() {
    const { currentUser, loading } = useAuth();
    const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'skills' | 'experience' | 'education' | 'services'>('projects');
    const [messages, setMessages] = useState<Message[]>([]);

    const loadMessages = async () => {
        try {
            const fetchedMessages = await getMessages();
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Error loading messages in dashboard:', error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            loadMessages();
        }
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await signOut();
            setMessages([]);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-xl text-red-600 font-bold animate-pulse uppercase tracking-widest">Loading Dashboard...</div>
            </div>
        );
    }

    if (!currentUser) {
        return <LoginForm />;
    }

    return (
        <DashboardLayout
            currentUserEmail={currentUser.email}
            onLogout={handleLogout}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            messageCount={messages.length}
        >
            {activeTab === 'projects' && <ProjectsTab />}
            {activeTab === 'messages' && <MessagesTab messages={messages} onRefresh={loadMessages} />}
            {activeTab === 'skills' && <SkillsTab />}
            {activeTab === 'experience' && <ExperienceTab />}
            {activeTab === 'education' && <EducationTab />}
            {activeTab === 'services' && <ServicesTab />}
        </DashboardLayout>
    );
}
