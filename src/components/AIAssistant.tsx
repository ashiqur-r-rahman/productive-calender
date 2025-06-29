
import React, { useState, useEffect } from 'react';
import { X, Send, Mic } from 'lucide-react';
import { GeminiIcon } from './GeminiIcon';
import { GeminiAPISetup } from './GeminiAPISetup';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI scheduling assistant powered by Gemini. I can help you organize tasks, suggest optimal meeting times, and provide productivity insights. Please set up your API key to get started!",
      timestamp: new Date(),
    },
  ]);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      // Update welcome message
      setMessages([{
        id: 1,
        type: 'ai',
        content: "Hi! I'm your AI scheduling assistant powered by Gemini. I can help you organize tasks, suggest optimal meeting times, and provide productivity insights. How can I help you today?",
        timestamp: new Date(),
      }]);
    }
  }, []);

  const callGeminiAPI = async (userMessage: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful AI assistant for a calendar application. Help the user with scheduling, task management, and productivity tips. User message: ${userMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "I apologize, but I'm having trouble connecting to the Gemini API. Please check your API key and try again.";
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    let aiResponse: Message;
    
    if (apiKey) {
      const response = await callGeminiAPI(message);
      aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: response,
        timestamp: new Date(),
      };
    } else {
      aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: "Please set up your Gemini API key first to enable AI features!",
        timestamp: new Date(),
      };
    }

    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleApiKeySet = (newApiKey: string) => {
    setApiKey(newApiKey);
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type: 'ai',
      content: "Great! Your API key has been set up. I'm now ready to help you with intelligent scheduling and productivity insights. What would you like assistance with?",
      timestamp: new Date(),
    }]);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen 
            ? 'bg-gradient-to-r from-[#819A91] to-[#A7C1A8] hover:from-[#A7C1A8] hover:to-[#D1D8BE]' 
            : 'bg-gradient-to-r from-[#819A91] to-[#A7C1A8] hover:from-[#A7C1A8] hover:to-[#D1D8BE] animate-pulse'
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
          <div className="p-4 border-b border-[#D1D8BE] bg-gradient-to-r from-[#819A91] to-[#A7C1A8] rounded-t-lg">
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
            {/* API Key Setup */}
            {!apiKey && (
              <GeminiAPISetup onApiKeySet={handleApiKeySet} />
            )}
            
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
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-[#EEEFE0] to-[#D1D8BE] text-gray-800 border border-[#D1D8BE] p-3 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin">
                      <GeminiIcon size={16} />
                    </div>
                    Thinking...
                  </div>
                </div>
              </div>
            )}
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
                disabled={isLoading}
                className="flex-1 p-2 border border-[#D1D8BE] rounded focus:outline-none focus:ring-2 focus:ring-[#A7C1A8] text-sm disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !message.trim()}
                className="p-2 bg-gradient-to-r from-[#819A91] to-[#A7C1A8] text-white rounded hover:from-[#A7C1A8] hover:to-[#D1D8BE] transition-all duration-200 disabled:opacity-50"
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
