export const colors = {
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.75)',
  card: 'rgba(255,255,255,0.16)',
  divider: 'rgba(255,255,255,0.18)',
  track: 'rgba(255,255,255,0.25)',
  buttonText: '#1E5FD8',
};

const gradients = {
  day: ['#4A9BFF', '#2563D8'],
  night: ['#1F2F55', '#0B1426'],
};
export const getGradient = isDay => (isDay ? gradients.day : gradients.night);

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
export const radius = { md: 12, lg: 20 };
export const fontSize = { xs: 12, sm: 14, md: 16, lg: 20, xl: 28, hero: 72 };
