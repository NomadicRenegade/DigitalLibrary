import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSettings } from '../types';

interface SettingsState {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  autoPreview: true,
  previewQuality: 'medium'
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
    }),
    {
      name: 'digital-library-settings'
    }
  )
);