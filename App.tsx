
import React, { useState, useCallback } from 'react';
import type { ChatMessage } from './types';
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import { sendMessageToGemini } from './services/geminiService';

const App: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Hello! I am Angira, your intelligent personal assistant. How can I help you today?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = useCallback(async (messageText: string) => {
    setIsLoading(true);
    setError(null);
    
    const newUserMessage: ChatMessage = { role: 'user', text: messageText };
    setChatHistory(prev => [...prev, newUserMessage]);

    try {
      const responseText = await sendMessageToGemini(messageText);
      const newModelMessage: ChatMessage = { role: 'model', text: responseText };
      setChatHistory(prev => [...prev, newModelMessage]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      const errorModelMessage: ChatMessage = { role: 'model', text: `I'm sorry, I ran into a problem: ${errorMessage}` };
      setChatHistory(prev => [...prev, errorModelMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <ChatHistory messages={chatHistory} isLoading={isLoading} />
      {error && (
        <div className="max-w-4xl mx-auto w-full px-4">
          <p className="text-red-500 text-center text-sm mb-2">{error}</p>
        </div>
      )}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
