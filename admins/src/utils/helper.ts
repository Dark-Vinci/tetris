export function generateRandom(): number {
  return Math.floor(Math.random() * 3);
}

export const formatToken = (token: string): string => {
  return `Bearer ${token}`;
};
