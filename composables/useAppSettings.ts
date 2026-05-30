export const useAppSettings = () => {
  const isSettingsOpen = useState<boolean>("settings:open", () => false);

  const openSettings = () => {
    isSettingsOpen.value = true;
  };
  const closeSettings = () => {
    isSettingsOpen.value = false;
  };
  const toggleSettings = () => {
    isSettingsOpen.value = !isSettingsOpen.value;
  };

  return { isSettingsOpen, openSettings, closeSettings, toggleSettings };
};
