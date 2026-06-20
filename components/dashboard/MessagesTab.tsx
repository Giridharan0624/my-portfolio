'use client';

import { deleteMessage } from '@/firebase/projects';
import { Message } from '@/types';

interface MessagesTabProps {
    messages: Message[];
    onRefresh: () => void;
}

export default function MessagesTab({ messages, onRefresh }: MessagesTabProps) {
    const handleDeleteMessage = async (messageId: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            await deleteMessage(messageId);
            onRefresh();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Messages Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight">Inbox <span className="text-red-600">({messages.length})</span></h2>
                <button
                    onClick={onRefresh}
                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                    title="Refresh messages"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {/* Messages List */}
            <div className="space-y-6">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg.id} className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative group hover:border-red-600 transition-all shadow-lg">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-widest text-white">{msg.name}</h3>
                                    <p className="text-red-500 font-bold text-xs mt-1">{msg.email}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                                        {msg.createdAt?.toDate ? (
                                            <>
                                                {msg.createdAt.toDate().toLocaleDateString()} at {msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </>
                                        ) : (
                                            'Unknown Date'
                                        )}
                                    </span>
                                    <button
                                        onClick={() => msg.id && handleDeleteMessage(msg.id)}
                                        className="p-3 bg-black border border-zinc-800 text-gray-500 hover:text-red-600 hover:border-red-600 rounded-xl transition-all"
                                        aria-label="Delete message"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-black/40 border-l-4 border-red-600 p-6 rounded-r-xl">
                                <p className="text-gray-300 leading-relaxed font-medium whitespace-pre-wrap">{msg.message}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-32 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                        <div className="text-zinc-800 text-6xl mb-6">📭</div>
                        <p className="text-zinc-600 font-bold uppercase tracking-widest">Your inbox is silent</p>
                    </div>
                )}
            </div>
        </div>
    );
}
