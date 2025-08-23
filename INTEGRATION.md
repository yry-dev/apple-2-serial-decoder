# Integration Guide

This guide explains how to integrate the Apple II GS Serial Number Decoder into your existing website or application.

## Quick Start

### 1. Build the Application

First, build the application to generate the distributable files:

```bash
npm run build
```

This creates a `dist/` folder with the following files:

- `app.iife.js` - IIFE bundle (recommended for most use cases)
- `app.mjs` - ES module bundle
- `style.css` - Generated styles (optional)

### 2. Copy Files to Your Project

Copy the `app.iife.js` file to your project's assets directory.

### 3. Include in Your HTML

Add the following to your HTML page:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com?v=3.4.0"></script>
  
  <!-- Include Font Awesome (if not already loaded) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
  
  <!-- Include Vue.js -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <!-- Your existing content -->
  
  <!-- Mount point for the Vue app -->
  <div id="app"></div>
  
  <!-- Include your built application -->
  <script src="path/to/app.iife.js"></script>
</body>
</html>
```

## Integration Options

### Option 1: Full Page Integration

Replace your entire page content with the decoder:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Apple II GS Serial Number Decoder</title>
  <script src="https://cdn.tailwindcss.com?v=3.4.0"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app"></div>
  <script src="app.iife.js"></script>
</body>
</html>
```

### Option 2: Embedded Widget

Embed the decoder as a widget within your existing page:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
  <script src="https://cdn.tailwindcss.com?v=3.4.0"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  
  <style>
    /* Your existing styles */
    .my-header { background: #333; color: white; padding: 1rem; }
    .my-content { padding: 2rem; }
    .my-footer { background: #333; color: white; padding: 1rem; text-align: center; }
  </style>
</head>
<body>
  <!-- Your existing header -->
  <header class="my-header">
    <h1>My Website</h1>
  </header>
  
  <!-- Your existing content -->
  <main class="my-content">
    <h2>Welcome to my site</h2>
    <p>This is my existing content.</p>
    
    <!-- Embedded Apple II GS Serial Number Decoder -->
    <div style="margin: 2rem 0; border: 1px solid #ddd; border-radius: 8px;">
      <div id="app"></div>
    </div>
    
    <p>More of my content here...</p>
  </main>
  
  <!-- Your existing footer -->
  <footer class="my-footer">
    <p>&copy; 2024 My Website</p>
  </footer>
  
  <!-- Application Script -->
  <script src="app.iife.js"></script>
</body>
</html>
```

### Option 3: Modal/Popup Integration

Open the decoder in a modal or popup:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
  <script src="https://cdn.tailwindcss.com?v=3.4.0"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">My Website</h1>
    
    <!-- Button to open modal -->
    <button 
      onclick="openDecoderModal()"
      class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Decode Serial Number
    </button>
    
    <!-- Modal -->
    <div id="decoderModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden">
          <!-- Modal Header -->
          <div class="flex justify-between items-center p-6 border-b">
            <h2 class="text-xl font-semibold">Apple II GS Serial Number Decoder</h2>
            <button 
              onclick="closeDecoderModal()"
              class="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <!-- Modal Content -->
          <div class="p-6 overflow-auto max-h-[80vh]">
            <div id="app"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Application Script -->
  <script src="app.iife.js"></script>
  
  <!-- Modal Control Scripts -->
  <script>
    function openDecoderModal() {
      document.getElementById('decoderModal').classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    
    function closeDecoderModal() {
      document.getElementById('decoderModal').classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
    
    // Close modal when clicking outside
    document.getElementById('decoderModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeDecoderModal();
      }
    });
  </script>
</body>
</html>
```

## Font Awesome Integration

The application uses Font Awesome icons via CSS classes. If your target page already has Font Awesome loaded (like your 6.7.2 version), you can skip including it again. The application will use whatever Font Awesome version is already available on the page.

### If Font Awesome is Already Loaded

If your page already has:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
```

Then you only need to include:

```html
<!-- Include Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?v=3.4.0"></script>

<!-- Include Vue.js -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Include your built application -->
<script src="app.iife.js"></script>
```

### If Font Awesome is NOT Loaded

Include it along with the other dependencies:

```html
<!-- Include Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?v=3.4.0"></script>

<!-- Include Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<!-- Include Vue.js -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Include your built application -->
<script src="app.iife.js"></script>
```

## Customization

### Styling Integration

The application uses Tailwind CSS classes. To integrate with your existing styles:

1. **Custom CSS Variables**: Override Tailwind's default colors and spacing
2. **Component Wrapping**: Wrap the app in a container with your custom styles
3. **CSS Isolation**: Use CSS modules or scoped styles to prevent conflicts

### Theme Integration

Customize the application's appearance to match your site:

```html
<script>
  // Configure Tailwind to match your theme
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#your-primary-color',
          secondary: '#your-secondary-color',
        }
      }
    }
  }
</script>
```

### Functionality Integration

The application can be integrated with your existing systems:

```javascript
// Listen for application events
window.addEventListener('serial-decoded', function(e) {
  console.log('Serial number decoded:', e.detail);
  // Process the decoded information in your application
});

window.addEventListener('search-history-updated', function(e) {
  console.log('Search history updated:', e.detail);
  // Update your UI or trigger other actions
});

// Control the application programmatically
window.serialDecoder = {
  decode: function(serialNumber) {
    // Trigger decoding
  },
  clearHistory: function() {
    // Clear search history
  },
  getHistory: function() {
    // Get search history
  }
};
```

## Performance Considerations

### Loading Optimization

1. **Lazy Loading**: Load the application only when needed
2. **CDN Usage**: Use CDNs for Vue.js and Tailwind CSS
3. **Bundle Splitting**: Consider code splitting for large applications

### Memory Management

1. **Cleanup**: Properly dispose of the application when not needed
2. **Event Listeners**: Remove event listeners to prevent memory leaks
3. **Local Storage**: Manage search history storage efficiently

## Troubleshooting

### Common Issues

1. **Vue Not Defined**: Ensure Vue.js is loaded before the application script
2. **Tailwind Not Working**: Check that Tailwind CSS is properly loaded
3. **Font Awesome Missing**: Verify Font Awesome CSS is included
4. **Mount Point Missing**: Ensure the `#app` element exists in the DOM

### Debug Mode

Enable debug mode to see detailed logs:

```javascript
// Add this before loading the application
window.SERIAL_DECODER_DEBUG = true;
```

### Browser Compatibility

The application supports:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Advanced Integration

### Web Components

Convert the application to a web component for better isolation:

```javascript
// Custom element wrapper
class SerialNumberDecoder extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    // Initialize the Vue app in shadow DOM
  }
}

customElements.define('serial-number-decoder', SerialNumberDecoder);
```

### Framework Integration

Integrate with popular frameworks:

#### React

```jsx
import { useEffect, useRef } from 'react';

function SerialDecoderWidget() {
  const containerRef = useRef();
  
  useEffect(() => {
    // Load and initialize the Vue app
    const script = document.createElement('script');
    script.src = 'app.iife.js';
    script.onload = () => {
      // App is ready
    };
    document.head.appendChild(script);
  }, []);
  
  return <div ref={containerRef} id="app" />;
}
```

#### Angular

```typescript
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-serial-decoder-widget',
  template: '<div #appContainer id="app"></div>'
})
export class SerialDecoderWidgetComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit() {
    // Load and initialize the Vue app
  }
}
```

## Support

For integration issues:

1. Check the browser console for errors
2. Verify all dependencies are loaded
3. Ensure the mount point exists
4. Check browser compatibility

## Examples

See the `integration-example.html` file for a complete working example of how to integrate the application into an existing website.
