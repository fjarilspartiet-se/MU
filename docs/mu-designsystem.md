# MU Designsystem
## Visuella riktlinjer för meningsfullt lärande

### Grundprinciper

#### 1. Klarhet & Lugn
Designen ska stödja reflektion och eftertanke genom:
- Tydlig visuell hierarki
- Generöst negativt utrymme
- Lugna övergångar
- Balanserad komposition

#### 2. Djup & Lager
Reflektera plattformens djup genom:
- Subtila skuggor och upphöjningar
- Medveten användning av lager
- Meningsfulla övergångar
- Visuell tyngd för olika innehållstyper

#### 3. Transformation & Rörelse
Visualisera personlig utveckling genom:
- Organiska former
- Flytande övergångar
- Subtila animationer
- Progressiva avslöjanden

### Färgpalett

#### Primära färger
```css
/* Havdjup - Primär */
--mu-primary-50: #f0f9ff;
--mu-primary-100: #e0f2fe;
--mu-primary-200: #bae6fd;
--mu-primary-300: #7dd3fc;
--mu-primary-400: #38bdf8;
--mu-primary-500: #0ea5e9;
--mu-primary-600: #0284c7;
--mu-primary-700: #0369a1;
--mu-primary-800: #075985;
--mu-primary-900: #0c4a6e;
--mu-primary-950: #082f49;

/* Skymning - Sekundär */
--mu-secondary-50: #faf5ff;
--mu-secondary-100: #f3e8ff;
--mu-secondary-200: #e9d5ff;
--mu-secondary-300: #d8b4fe;
--mu-secondary-400: #c084fc;
--mu-secondary-500: #a855f7;
--mu-secondary-600: #9333ea;
--mu-secondary-700: #7e22ce;
--mu-secondary-800: #6b21a8;
--mu-secondary-900: #581c87;
--mu-secondary-950: #3b0764;
```

#### Funktionella färger
```css
/* Framgång/Bekräftelse */
--mu-success-50: #f0fdf4;
--mu-success-500: #22c55e;
--mu-success-900: #14532d;

/* Varning/Uppmärksamhet */
--mu-warning-50: #fffbeb;
--mu-warning-500: #f59e0b;
--mu-warning-900: #78350f;

/* Fel/Fara */
--mu-error-50: #fef2f2;
--mu-error-500: #ef4444;
--mu-error-900: #7f1d1d;

/* Information */
--mu-info-50: #eff6ff;
--mu-info-500: #3b82f6;
--mu-info-900: #1e3a8a;
```

#### Neutrala färger
```css
--mu-gray-50: #f9fafb;
--mu-gray-100: #f3f4f6;
--mu-gray-200: #e5e7eb;
--mu-gray-300: #d1d5db;
--mu-gray-400: #9ca3af;
--mu-gray-500: #6b7280;
--mu-gray-600: #4b5563;
--mu-gray-700: #374151;
--mu-gray-800: #1f2937;
--mu-gray-900: #111827;
--mu-gray-950: #030712;
```

### Typografi

#### Fonthierarki
```css
/* Rubriker */
--mu-font-display: 'Fraunces', serif;  /* För större rubriker och viktiga citat */
--mu-font-heading: 'Cabinet Grotesk', sans-serif;  /* För rubriker och navigation */
--mu-font-body: 'Outfit', sans-serif;  /* För brödtext och gränssnitt */
--mu-font-mono: 'JetBrains Mono', monospace;  /* För kod och tekniskt innehåll */
```

#### Textstorlekar
```css
--mu-text-xs: 0.75rem;    /* 12px */
--mu-text-sm: 0.875rem;   /* 14px */
--mu-text-base: 1rem;     /* 16px */
--mu-text-lg: 1.125rem;   /* 18px */
--mu-text-xl: 1.25rem;    /* 20px */
--mu-text-2xl: 1.5rem;    /* 24px */
--mu-text-3xl: 1.875rem;  /* 30px */
--mu-text-4xl: 2.25rem;   /* 36px */
--mu-text-5xl: 3rem;      /* 48px */
```

### Komponentbibliotek

#### Knappar
```jsx
// Primär knapp
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 
                   transition-colors duration-200">
  Primär åtgärd
</button>

// Sekundär knapp
<button className="px-4 py-2 bg-white text-primary-600 border border-primary-600 
                   rounded-lg hover:bg-primary-50 focus:ring-2 focus:ring-primary-500 
                   focus:ring-offset-2 transition-colors duration-200">
  Sekundär åtgärd
</button>

// Subtil knapp
<button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg 
                   focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 
                   transition-colors duration-200">
  Subtil åtgärd
</button>
```

#### Inmatningsfält
```jsx
// Textfält
<input 
  className="w-full px-3 py-2 border border-gray-300 rounded-lg 
             focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
             transition-colors duration-200"
  type="text"
/>

// Textområde
<textarea 
  className="w-full px-3 py-2 border border-gray-300 rounded-lg 
             focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
             transition-colors duration-200 resize-none"
  rows="4"
/>
```

#### Kort & Behållare
```jsx
// Grundläggande kort
<div className="bg-white rounded-xl shadow-lg overflow-hidden">
  <div className="p-6">
    {/* Innehåll */}
  </div>
</div>

// Reflektionskort
<div className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-primary-500">
  <div className="p-6">
    {/* Reflektionsinnehåll */}
  </div>
</div>
```

### Animationer & Övergångar

#### Grundläggande övergångar
```css
/* Standardövergång */
.transition-standard {
  @apply transition-all duration-200 ease-in-out;
}

/* Mjuk övergång */
.transition-soft {
  @apply transition-all duration-300 ease-out;
}

/* Expressiv övergång */
.transition-expressive {
  @apply transition-all duration-500 ease-in-out;
}
```

#### Interaktionsanimationer
```css
/* Hover-effekter */
.hover-lift {
  @apply hover:-translate-y-1 transition-transform duration-200;
}

/* Fokusringar */
.focus-ring {
  @apply focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
         focus:outline-none transition-shadow duration-200;
}
```

### Tillgänglighet

#### Kontrast & Läsbarhet
- Minst AA-nivå för all text (4.5:1 för normal text, 3:1 för stor text)
- Tydlig visuell hierarki
- Tillräckliga mellanrum mellan interaktiva element

#### Fokustillstånd
- Tydliga fokusmarkörer
- Logisk tab-ordning
- Keyboard-navigering

#### Felhantering
- Tydliga felmeddelanden
- Färgkodning kombinerat med ikoner och text
- Konstruktiv feedback

### Responsivt beteende

#### Brytpunkter
```css
--mu-screen-sm: 640px;   /* Mobil landskapsläge */
--mu-screen-md: 768px;   /* Tablets */
--mu-screen-lg: 1024px;  /* Mindre laptops */
--mu-screen-xl: 1280px;  /* Desktop */
--mu-screen-2xl: 1536px; /* Stora skärmar */
```

#### Layout-grid
```jsx
// Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Innehåll */}
</div>

// Två kolumner
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Innehåll */}
</div>
```

### Ikoner & Illustrationer

#### Ikonsystem
- Använd Lucide React som primärt ikonsystem
- Konsekvent storlek och stil
- Meningsfull användning som stöder förståelse

#### Illustrationer
- Abstrakt och konceptuellt stil
- Fokus på transformation och utveckling
- Begränsad färgpalett från designsystemet

### Användning & Implementation

#### Tailwind Konfiguration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--mu-primary-50)',
          // ... resten av färgskalan
        },
        secondary: {
          50: 'var(--mu-secondary-50)',
          // ... resten av färgskalan
        },
        // ... andra färgdefinitioner
      },
      fontFamily: {
        display: ['var(--mu-font-display)'],
        heading: ['var(--mu-font-heading)'],
        body: ['var(--mu-font-body)'],
        mono: ['var(--mu-font-mono)'],
      },
      // ... andra temautökningar
    },
  },
  // ... övrig konfiguration
}
```

Detta designsystem är levande och kommer att utvecklas i takt med plattformen. Det ska fungera som en grund för konsekvent design som stödjer MU:s mål att skapa meningsfulla lärandeupplevelser.
