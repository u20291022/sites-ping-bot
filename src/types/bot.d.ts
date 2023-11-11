export interface DotEnvData {
  ownerId: string;
  sites: string[];
}

export interface MessageData {
  chat: { id: number },
  from: { id: number }
}