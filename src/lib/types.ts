export interface WellnessEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'ok' | 'bad' | 'terrible';
  notes: string;
}

export interface Profile {
  id: string;
  name: string;
  phone: string;
  address: string;
}
