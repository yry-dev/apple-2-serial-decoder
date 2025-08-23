# Apple II GS Serial Number Decoder

A modern TypeScript Vue.js application for decoding Apple II GS serial numbers to reveal manufacturing details and ownership history. Built with Vue 3, TypeScript, Tailwind CSS, and Font Awesome.

![Screenshot of the app](https://github.com/yry-dev/apple-2-serial-decoder/blob/main/preview.png?raw=true)

## Prerequisites

- Node.js 24+
- npm or yarn package manager

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd apple2gs-serial
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run serve-dist` - Serve the dist folder locally for testing integration examples
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Building for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` folder containing:

- `app.iife.js` - IIFE bundle for direct browser use
- `app.mjs` - ES module bundle
- `style.css` - Generated styles (optional)
- `integration-example.html` - Full integration example
- `simple-integration.html` - Minimal integration example
- `dist-readme.md` - Instructions for using the built files

## Testing Integration Examples

After building, you can test the integration examples:

```bash
npm run serve-dist
```

Then open your browser to:

- `http://localhost:5176/integration-example.html` - Full integration example
- `http://localhost:5176/simple-integration.html` - Minimal integration example

Or simply open the HTML files directly in your browser from the `dist` folder.

## Integration into Another Site

### Option 1: Using the IIFE Bundle

1. Build the application: `npm run build`
2. Copy `dist/app.iife.js` to your project
3. Include the script in your HTML:

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
  <script src="app.iife.js"></script>
</body>
</html>
```

### Option 2: Using the ES Module Bundle

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com?v=3.4.0"></script>
  
  <!-- Include Font Awesome (if not already loaded) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
</head>
<body>
  <!-- Mount point for the Vue app -->
  <div id="app"></div>
  
  <!-- Include your built application as a module -->
  <script type="module" src="app.es.js"></script>
</body>
</html>
```

### Font Awesome Integration

The application uses Font Awesome icons via CSS classes. If your target page already has Font Awesome loaded (like your 6.7.2 version), you can skip including it again. The application will use whatever Font Awesome version is already available on the page.

**If Font Awesome is already loaded on your page:**

```html
<!-- You only need these -->
<script src="https://cdn.tailwindcss.com?v=3.4.0"></script>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="app.iife.js"></script>
```

**If Font Awesome is NOT loaded on your page:**

```html
<!-- Include Font Awesome along with the others -->
<script src="https://cdn.tailwindcss.com?v=3.4.0"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="app.iife.js"></script>
```

## Project Structure

```
apple2gs-serial/
├── src/
│   ├── main.ts          # Application entry point
│   ├── App.vue          # Main Vue component
│   └── types/           # TypeScript type definitions
├── dist/                # Build output
├── index.html           # Development entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
└── README.md            # This file
```

## Serial Number Format

The application supports the standard Apple II GS serial number format:

### Apple II GS Format

Format: `X-Y-WW-YYY-XXXXXX`

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

### Base-34 Unit Count System

The 3-letter unit code uses a base-34 system where:

- **0-9**: Represent values 0-9
- **A-Z**: Represent values 10-33 (excluding I and O to avoid confusion with 1 and 0)

This allows encoding large unit numbers in just 3 characters. For example, YJA = 32×(34²) + 18×(34¹) + 10×(34⁰) = 37,614 units.

## Factory Codes

The application includes a database of known Apple II GS factory codes:

- **E**: Singapore
- **NE**: Singapore (Alternative)
- **CK**: Cork, Ireland
- **C**: Cork, Ireland (Alternative)
- **F**: Fremont, CA
- **S**: Sacramento, CA
- **A**: Austin, TX
- **R**: Reno, NV

## Features

### Serial Number Decoding

- Input validation for both numeric and alphanumeric formats
- Real-time format checking
- Detailed decoding results with factory, year, week, and unit information

### Search History

- Automatic tracking of recent searches
- Click to reload previous searches
- Local storage persistence
- Clear history functionality

### Information Panel

- Serial number format explanations
- Factory code reference
- Helpful tips and notes
- About the tool information

## Development

### Code Style

The project uses ESLint and Prettier for consistent code formatting:

- **ESLint**: Code quality and best practices
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking

### Adding New Features

1. Create new Vue components in the `src/components/` directory
2. Add TypeScript interfaces in `src/types/` directory
3. Update the main App.vue component as needed
4. Ensure all new code passes linting and type checking

### Customization

- **Styling**: Modify Tailwind classes in Vue components
- **Icons**: Use Font Awesome CSS classes (e.g., `fas fa-search`, `fab fa-apple`)
- **Database**: Extend the serial number database as needed

## License

MIT License - see LICENSE file for details

---

Built with ❤️ in the ATL
