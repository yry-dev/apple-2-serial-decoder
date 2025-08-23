# Apple II GS Serial Number Decoder - Distribution

This folder contains the built application and integration examples.

## Files

- **`app.iife.js`** - Main application bundle (IIFE format) - Use this in your integration
- **`app.mjs`** - Main application bundle (ES module format)
- **`app.css`** - Generated styles (usually not needed)
- **`integration-example.html`** - Full integration example with existing site content
- **`simple-integration.html`** - Minimal integration example

## Testing the Integration Examples

You can open the integration examples directly in your browser to see the application working:

1. **Open** `integration-example.html` in your browser to see a full example
2. **Open** `simple-integration.html` in your browser to see a minimal example

Both examples load the built `app.iife.js` file and demonstrate how the application works when integrated into an existing site.

## Apple II GS Serial Number Format

The application decodes Apple II GS serial numbers using the standard format:

**Format**: `X-Y-WW-YYY-XXXXXX`

- **X**: Factory code (1-2 letters: E=Singapore, CK=Cork Ireland, etc.)
- **Y**: Year of production (single digit: 7=1987, 8=1988, 9=1989, 0=1990...)
- **WW**: Week of production (01-52)
- **YYY**: Unit count in base-34 system (0-9, A-Z excluding I,O)
- **XXXXXX**: Apple II GS identifier code

**Example**: `E749YJAA2S6000`

- E = Factory (Singapore)
- 7 = Year (1987)
- 49 = Week 49
- YJA = Unit 37,614 (base-34: Y=32, J=18, A=10)
- A2S6000 = Apple II GS code

## Using in Your Project

1. **Copy** `app.iife.js` to your project's assets folder
2. **Include** the required dependencies in your HTML:

   ```html
   <!-- Tailwind CSS -->
   <script src="https://cdn.tailwindcss.com?v=3.4.0"></script>
   
   <!-- Vue.js -->
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   
   <!-- Font Awesome (if not already loaded) -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
   ```

3. **Add** a mount point: `<div id="app"></div>`
4. **Include** the application: `<script src="path/to/app.iife.js"></script>`

## Note

If your page already has Font Awesome loaded (like version 6.7.2), you can skip including it again. The application will use whatever Font Awesome version is already available.
