
import React, { useState } from 'react';
import { X, Send, Mic } from 'lucide-react';
import { GeminiIcon } from './GeminiIcon';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI scheduling assistant powered by Gemini. I can help you organize tasks, suggest optimal meeting times, and provide productivity insights. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    const aiResponse = {
      id: messages.length + 2,
      type: 'ai',
      content: "I understand you'd like help with that. Currently, I'm in demo mode. Once connected to the Gemini API, I'll be able to provide intelligent scheduling suggestions and productivity insights!",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
            : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 animate-pulse'
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <GeminiIcon size={28} className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-[#D1D8BE] flex flex-col z-40 animate-scale-in">
          {/* Header */}
          <div className="p-4 border-b border-[#D1D8BE] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg">
            <div className="flex items-center gap-2">
              <GeminiIcon size={20} className="text-white" />
              <div>
                <h3 className="font-medium text-white">AI Assistant</h3>
                <p className="text-xs text-white opacity-90">Powered by Gemini</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-[#819A91] to-[#A7C1A8] text-white'
                      : 'bg-gradient-to-r from-[#EEEFE0] to-[#D1D8BE] text-gray-800 border border-[#D1D8BE]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#D1D8BE]">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border border-[#D1D8BE] rounded focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
              >
                <Send size={16} />
              </button>
              <button className="p-2 border border-[#D1D8BE] rounded hover:bg-gradient-to-r hover:from-[#EEEFE0] hover:to-[#D1D8BE] transition-all duration-200">
                <Mic size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
