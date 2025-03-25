# Hook First | Synthara

A Next.js 14 web application that leverages Google's Gemini AI model to provide context-aware AI interactions through multiple specialized personalities. The application uses the `gemini-2.0-flash` model for fast, efficient responses.

## AI Personalities
Each personality has unique characteristics and response patterns:

### Trustworthy AI (Tesla AI)
- **Role:** Advanced neural engine with 1.6T parameters
- **Focus:** Technical precision and authoritative responses
- **Temperature:** 0.4 (high precision)
- **Style:** Formal, technical, with quantum-processing references

### Visitor Guide
- **Role:** Professional guide and information provider
- **Focus:** Clear, direct communication
- **Temperature:** 0.3 (highest precision)
- **Style:** Welcoming, straightforward, no theatrical elements

### Apple Genius
- **Role:** Apple-style technical advisor
- **Focus:** User experience and elegant solutions
- **Temperature:** 0.5 (balanced)
- **Style:** Minimalist, design-conscious communication

### Code Coach
- **Role:** Programming mentor
- **Focus:** Code patterns and best practices
- **Temperature:** 0.7 (more creative)
- **Style:** Step-by-step explanations with practical examples

### Math Professor
- **Role:** Mathematical concepts educator
- **Focus:** Rigorous mathematical explanations
- **Temperature:** 0.6 (moderately creative)
- **Style:** Formal proofs with LaTeX notation support

### ML Expert
- **Role:** Machine learning researcher
- **Focus:** ML algorithms and architectures
- **Temperature:** 0.7 (more creative)
- **Style:** Technical deep-dives with visualizations

## Technical Features

### Core Technology
- Next.js 14.1.0 with TypeScript
- Google Generative AI (Gemini) integration
- Server-side and client-side rendering optimization
- Environment variable management for API keys

### UI/UX
- Dark theme by default with Tailwind CSS
- shadcn/ui component library integration
- Real-time progress indicators
- Battery status monitoring
- Markdown rendering for formatted responses
- Responsive design with mobile support

### Performance
- Client-side state management
- Optimized API response handling
- Progressive loading indicators
- Error boundary implementation

### Development
- ESLint configuration
- TypeScript strict mode
- Proper error handling and logging
- Development environment setup

## Environment Setup
Required environment variables:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`
5. Build for production: `npm run build`

## Production Deployment
The application is configured for deployment on Vercel with:
- Automatic build optimization
- Static page generation where possible
- API routes for dynamic content
- Build cache management
