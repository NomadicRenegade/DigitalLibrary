import { useSettingsStore } from '../store/settingsStore';
import { UserSettings } from '../types';

export function useSettings() {
  const { settings, updateSettings } = useSettingsStore();

  const setSettings = (newSettings: Partial<UserSettings>) => {
    updateSettings(newSettings);
  };

  return {
    settings,
    updateSettings: setSettings
  };
}