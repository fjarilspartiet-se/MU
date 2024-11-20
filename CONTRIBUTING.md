# Bidra till MU-plattformen
## Riktlinjer för att bidra till utvecklingen

### Introduktion

Tack för ditt intresse att bidra till MU-plattformen! Detta dokument beskriver processen för att bidra till projektets utveckling och hjälper dig komma igång.

### Grundläggande principer

1. **Inkluderande utveckling**
   - Alla bidrag är välkomna
   - Respektfullt bemötande
   - Öppen dialog kring förslag och ändringar

2. **Kvalitetsfokus**
   - Följ kodstandarder
   - Dokumentera ändringar
   - Testa noggrant

3. **Meningsfullt bidragande**
   - Fokusera på användarupplevelsen
   - Tänk på tillgänglighet
   - Bevara projektets vision

### Hur du bidrar

#### 1. Förberedelser
1. Forka projektet
2. Klona din fork lokalt
3. Installera beroenden: `npm install`
4. Skapa en ny branch: `git checkout -b feature/din-feature`

#### 2. Utvecklingsriktlinjer

##### Kod
- Följ TypeScript best practices
- Använd designsystemet
- Skriv tester för ny funktionalitet
- Följ tillgänglighetsriktlinjer (WCAG 2.1)

##### Commit-meddelanden
```
typ(omfattning): kort beskrivning

Längre beskrivning av vad och varför (inte hur)
```

Typer:
- `feat`: Ny funktionalitet
- `fix`: Buggfix
- `docs`: Dokumentationsändringar
- `style`: Formattering, saknade semikolon etc.
- `refactor`: Kodrefaktorering
- `test`: Lägga till tester
- `chore`: Uppdatera byggskript etc.

#### 3. Skicka ändringar
1. Committa dina ändringar
2. Pusha till din fork
3. Skapa en Pull Request
4. Beskriv dina ändringar noggrant
5. Länka relevanta issues

#### 4. Kodgranskning
- Var öppen för feedback
- Svara på kommentarer
- Gör nödvändiga justeringar
- Var tålmodig

### Rapportera buggar

#### Vad ska inkluderas
1. Steg för att återskapa buggen
2. Förväntat beteende
3. Faktiskt beteende
4. Screenshots om relevant
5. Din miljö (browser, OS etc.)

#### Mall för buggrapporter
```markdown
### Beskrivning
[Beskriv buggen]

### Steg att återskapa
1. Gå till '...'
2. Klicka på '....'
3. Skrolla till '....'
4. Se felet

### Förväntat beteende
[Beskriv vad som borde ha hänt]

### Screenshots
[Om tillämpligt]

### Miljö
- OS: [t.ex. iOS]
- Browser: [t.ex. Chrome 91]
- Version: [t.ex. 1.0.0]
```

### Feature-förslag

#### Process
1. Kontrollera att feature:n inte redan föreslagits
2. Skapa ett nytt issue med "feature"-taggen
3. Beskriv feature:n och dess värde
4. Diskutera implementationen
5. Börja utveckla efter godkännande

#### Mall för feature-förslag
```markdown
### Feature-beskrivning
[Beskriv feature:n]

### Problem som löses
[Vilka problem/behov addresserar denna feature?]

### Föreslagen lösning
[Hur skulle feature:n kunna implementeras?]

### Alternativ övervägda
[Vilka andra lösningar har övervägts?]

### Ytterligare kontext
[Annan relevant information]
```

### Utvecklingsmiljö

#### Krav
- Node.js 18+
- npm eller yarn
- Git

#### Setup
```bash
# Klona projektet
git clone https://github.com/your-username/mu-platform.git

# Installera beroenden
cd mu-platform
npm install

# Starta utvecklingsserver
npm run dev
```

### Kodstandarder

#### TypeScript/JavaScript
- Använd TypeScript för all ny kod
- Följ ESLint-konfigurationen
- Dokumentera komplexa funktioner
- Använd beskrivande variabelnamn

#### React
- Använd funktionskomponenter
- Implementera React Hooks korrekt
- Följ komponentstrukturen
- Dokumentera props

#### CSS/Styling
- Använd Tailwind enligt designsystemet
- Följ responsiv design-principer
- Säkerställ tillgänglighet

### Testning

#### Krav
- Skriv enhetstester för ny funktionalitet
- Uppdatera befintliga tester vid behov
- Kör hela testsviten före PR

#### Köra tester
```bash
# Kör alla tester
npm test

# Kör tester i watch-mode
npm test -- --watch

# Kör specifika tester
npm test -- path/to/test
```

### Kontakt

- **E-post**: [bjorn.kenneth.holmstrom@gmail.com]
- **Issues**: GitHub Issues för tekniska diskussioner

### Tack

Ett stort tack till alla som bidrar till att göra MU-plattformen bättre! Din insats hjälper till att skapa en mer meningsfull lärandeupplevelse för alla användare.
