'use client';

import dynamic from 'next/dynamic';

const ChatBot = dynamic(
  () => import('../lib/chatbot-sdk').then(m => m.ReactChatBot),
  { ssr: false }
);

export interface SDKChatBotProps {
  contentstackApiKey: string;
  contentstackToken: string;
  contentstackEnvironment: string;
  title?: string;
  placeholder?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
  autoOpen?: boolean;
  showWelcomeMessage?: boolean;
  welcomeMessage?: string;
  contentstackRegion?: 'us' | 'eu' | 'azure';
  contentstackBaseUrl?: string;
  onMessage?: (message: any) => void;
  onStateChange?: (state: any) => void;
  onError?: (error: Error) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export default function SDKChatBot({
  contentstackApiKey,
  contentstackToken,
  contentstackEnvironment,
  contentstackRegion,
  contentstackBaseUrl,
  ...rest
}: SDKChatBotProps) {
  const config = {
    contentstack: {
      apiKey: contentstackApiKey,
      deliveryToken: contentstackToken,
      environment: contentstackEnvironment,
      region: contentstackRegion,                          // <- add
      baseUrl: contentstackBaseUrl,                        // <- add
    },
    ...rest,
  } as any;

  return <ChatBot {...config} />;
}