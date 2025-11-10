
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm p-4 border-t border-indigo-500/30 sticky bottom-0">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Angira anything..."
          disabled={isLoading}
          className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="bg-indigo-600 text-white rounded-full p-2.5 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
