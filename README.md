# MyBuddyUI

A React Native + TypeScript application built with Expo for cross-platform development (iOS, Android, and Web).

## Features

- **Cross-platform**: Works on iOS, Android, and Web
- **Real-time streaming**: Server-Sent Events (SSE) for live answer streaming
- **Search functionality**: Integrated search with citations and sources
- **Modern UI**: Clean, responsive design with proper loading states
- **TypeScript**: Full type safety and better development experience

## Project Structure

```
mybuddyui/
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   │   ├── SearchBox.tsx     # Input box for queries
│   │   ├── AnswerStream.tsx  # Displays streaming answers
│   │   └── CitationsList.tsx # Shows sources / citations
│   ├── hooks/                # Custom React hooks
│   │   ├── useFetchAnswer.ts # Hook for SSE streaming
│   │   └── useSearch.ts      # Hook for search functionality
│   ├── screens/              # Screen components
│   │   └── HomeScreen.tsx    # Main screen layout
│   ├── api/                  # API wrapper functions
│   │   ├── answer.ts         # /api/answer endpoint wrapper
│   │   └── search.ts         # /api/search endpoint wrapper
│   ├── App.tsx               # Root component
│   └── styles/               # Styling files
│       └── tailwind.css      # Tailwind CSS for web
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite config for web development
├── app.json                  # Expo configuration
├── main.tsx                  # Entry point for Expo
└── LICENSE                   # Project license
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mybuddyui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

## Development
```bash
npm run web:dev

http://localhost:5173/
```

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser
- `npm run build` - Build for production

### API Endpoints

The frontend expects the following backend API endpoints:

- **POST** `/api/answer` - Stream answers using Server-Sent Events
- **POST** `/api/search` - Search for sources and citations

### Environment Setup

For web development, the Vite configuration includes a proxy to forward `/api` requests to your backend server (default: `http://localhost:3000`).

## Building for Production

### Web
```bash
npm run build
```

### Mobile
```bash
expo build:android  # For Android
expo build:ios      # For iOS
```

## Key Components

### SearchBox
- Handles user input and search queries
- Includes clear button and search button
- Supports keyboard submission

### AnswerStream
- Displays streaming answers in real-time
- Shows typing indicator during generation
- Handles loading and error states

### CitationsList
- Lists search results and sources
- Shows relevance scores
- Includes source attribution and links

## Customization

### Styling
- Uses React Native StyleSheet for mobile
- Tailwind CSS for web styling
- Customizable color scheme and typography

### API Integration
- Modular API wrapper functions
- Easy to modify endpoints and request formats
- Built-in error handling and abort functionality

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `expo start -c`
2. **TypeScript errors**: Ensure all dependencies are properly installed
3. **API connection**: Check that backend server is running and accessible

### Getting Help

- Check Expo documentation: https://docs.expo.dev/
- React Native documentation: https://reactnative.dev/
- TypeScript documentation: https://www.typescriptlang.org/

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
