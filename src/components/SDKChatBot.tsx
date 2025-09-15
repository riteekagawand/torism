'use client';

import React, { useEffect, useRef } from 'react';

// Import the SDK from the local copy
import { ContentstackChatBot } from '../lib/chatbot-sdk';

interface SDKChatBotProps {
  contentstackApiKey: string;
  contentstackToken: string;
  contentstackEnvironment: string;
  title?: string;
  placeholder?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
}

const SDKChatBot: React.FC<SDKChatBotProps> = ({
  contentstackApiKey,
  contentstackToken,
  contentstackEnvironment,
  title = 'Travel Assistant',
  placeholder = 'Ask me about tours and travel...',
  position = 'bottom-right',
  theme = 'light',
  width = 350,
  height = 500
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the chatbot using the SDK
    chatbotRef.current = ContentstackChatBot.create({
      contentstack: {
        apiKey: contentstackApiKey,
        deliveryToken: contentstackToken,
        environment: contentstackEnvironment
      },
      title,
      placeholder,
      position,
      theme,
      width,
      height
    }, {
      onMessage: (message) => {
        console.log('New message:', message);
      },
      onStateChange: (state) => {
        console.log('State changed:', state);
      },
      onError: (error) => {
        console.error('Chatbot error:', error);
      }
    });

    // Mount the chatbot
    chatbotRef.current.mount(containerRef.current);

    return () => {
      if (chatbotRef.current) {
        chatbotRef.current.destroy();
      }
    };
  }, [contentstackApiKey, contentstackToken, contentstackEnvironment, title, placeholder, position, theme, width, height]);

  return <div ref={containerRef} />;
};

export default SDKChatBot;
