import { createApp } from 'vue';
import App from './App.vue';

// Function to find the mount point
const findMountPoint = (): string => {
  // Check for query string parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const mountParam = urlParams.get('mount');

  if (mountParam) {
    return mountParam;
  }

  // Check for data attribute on the script tag
  const scripts = document.querySelectorAll('script[src*="app.iife.js"]');
  for (const script of scripts) {
    const mountId = script.getAttribute('data-mount');
    if (mountId) {
      return mountId;
    }
  }

  // Check for data attribute on any element with class 'apple2gs-decoder'
  const decoderElement = document.querySelector('.apple2gs-decoder');
  if (decoderElement) {
    const mountId = decoderElement.getAttribute('data-mount');
    if (mountId) {
      return mountId;
    }
  }

  // Default fallback
  return '#app';
};

// Function to create and mount the app
const createAndMountApp = () => {
  const mountPoint = findMountPoint();
  const targetElement = document.querySelector(mountPoint);

  if (!targetElement) {
    console.error(
      `Apple II GS Decoder: Mount point "${mountPoint}" not found. Please ensure the element exists.`
    );
    return null;
  }

  // Create the Vue app
  const app = createApp(App);

  // Mount the app
  app.mount(mountPoint);

  console.log(`Apple II GS Decoder: Successfully mounted to "${mountPoint}"`);

  return app;
};

// Auto-mount if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createAndMountApp);
} else {
  createAndMountApp();
}

// Export for external use
export default createAndMountApp;
