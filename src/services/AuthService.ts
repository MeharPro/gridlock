
/**
 * Service to handle authentication state and user preferences
 */

export interface UserPreferences {
  firstName?: string;
  lastName?: string;
  homeType?: string;
  appliances?: string[];
  renewables?: string[];
  usagePattern?: string[];
  interests?: string[];
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  provider?: string;
  meterNumber?: string;
  plan?: string;
}

export const AuthService = {
  isLoggedIn: (): boolean => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },
  
  hasCompletedOnboarding: (): boolean => {
    return localStorage.getItem('hasCompletedOnboarding') === 'true';
  },
  
  logout: (): void => {
    localStorage.removeItem('isLoggedIn');
    // Optionally clear other user data
    // localStorage.removeItem('hasCompletedOnboarding');
    // localStorage.removeItem('userPreferences');
  },
  
  getUserPreferences: (): UserPreferences | null => {
    const preferences = localStorage.getItem('userPreferences');
    return preferences ? JSON.parse(preferences) : null;
  },
  
  updateUserPreferences: (newPreferences: Partial<UserPreferences>): void => {
    const currentPreferences = AuthService.getUserPreferences() || {};
    localStorage.setItem('userPreferences', JSON.stringify({
      ...currentPreferences,
      ...newPreferences
    }));
  },
  
  getFullName: (): string => {
    const preferences = AuthService.getUserPreferences();
    if (preferences?.firstName && preferences?.lastName) {
      return `${preferences.firstName} ${preferences.lastName}`;
    } else if (preferences?.firstName) {
      return preferences.firstName;
    } else if (preferences?.lastName) {
      return preferences.lastName;
    }
    return 'User';
  }
};

export default AuthService;
