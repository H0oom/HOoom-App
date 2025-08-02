export type User = {
  id: number;
  name: string;
  status: 'online' | 'away';
  avatar: string;
  statusMessage: string;
};
