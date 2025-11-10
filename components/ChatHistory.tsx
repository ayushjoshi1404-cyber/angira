
import React, { useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import ChatMessage from './ChatMessage';
import LoadingSpinner from './LoadingSpinner';

interface ChatHistoryProps {
  messages: ChatMessageType[];
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      {isLoading && (
        <div className="flex items-start gap-3 my-4 justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div className="max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md bg-gray-800 text-gray-300 rounded-bl-none">
                <LoadingSpinner />
            </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatHistory;
