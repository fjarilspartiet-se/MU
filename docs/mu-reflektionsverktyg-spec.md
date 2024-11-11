# MU Reflektionsverktyg
## Teknisk specifikation och implementation

### 1. Datamodell

```typescript
// Kärnmodeller
interface ReflectionEntry {
  id: string;
  userId: string;
  timestamp: DateTime;
  lastModified: DateTime;
  
  // Innehåll
  title?: string;
  content: {
    text: string;
    format: 'markdown' | 'plain' | 'structured';
    media?: MediaAttachment[];
    tags?: string[];
    mood?: MoodIndicator;
    location?: LocationData;
  };
  
  // Metadata
  type: ReflectionType;
  context: ReflectionContext;
  privacy: PrivacyLevel;
  associations: {
    project?: ProjectReference;
    question?: PhilosophicalQuestion;
    practice?: ContemplativePractice;
    milestone?: LearningMilestone;
  };
  
  // Interaktion
  feedback?: Feedback[];
  responses?: Response[];
  insights?: Insight[];
}

// Typer av reflektion
type ReflectionType = 
  | 'daily'           // Daglig reflektion
  | 'philosophical'   // Filosofiskt utforskande
  | 'contemplative'   // Meditativ insikt
  | 'project'         // Projektreflektion
  | 'question'        // Frågeställning
  | 'insight'         // Spontan insikt
  | 'dream'           // Drömreflektion
  | 'practice';       // Övningsreflektion

interface ReflectionContext {
  setting: 'individual' | 'group' | 'class' | 'project';
  prompt?: ReflectionPrompt;
  guidance?: GuidanceTemplate;
  relatedMaterial?: Resource[];
}

type PrivacyLevel = 
  | 'private'         // Bara användaren
  | 'mentor'          // Användare + mentor
  | 'group'           // Specifik grupp
  | 'class'           // Hela klassen
  | 'public';         // Öppet delat
```

### 2. Användargränssnitt

#### Huvudvy
```typescript
interface ReflectionInterface {
  components: {
    Editor: ReflectionEditor;
    Viewer: ReflectionViewer;
    Navigator: ReflectionNavigator;
    Dashboard: ReflectionDashboard;
  };
  
  features: {
    mediaSupport: boolean;
    realTimeSaving: boolean;
    offlineCapability: boolean;
    collaborativeEditing: boolean;
  };
}

interface ReflectionEditor {
  modes: {
    freeform: TextEditor;      // Fri skrivning
    guided: GuidedEditor;      // Med prompts
    structured: FormEditor;    // Strukturerad input
    visual: CanvasEditor;      // Visuell reflektion
  };
  
  tools: {
    formatting: FormattingTools;
    media: MediaTools;
    tagging: TaggingSystem;
    linking: LinkingTools;
  };
}
```

### 3. Reflektionsstöd

#### Prompts och vägledning
```typescript
interface ReflectionPrompt {
  id: string;
  type: PromptType;
  content: {
    question: string;
    context?: string;
    guidance?: string[];
    supportingMaterial?: Resource[];
  };
  
  adaptivity: {
    ageGroup: AgeGroup;
    difficulty: DifficultyLevel;
    prerequisites?: string[];
  };
  
  progression: {
    nextPrompts?: string[];
    relatedPrompts?: string[];
    depthLevels?: DepthLevel[];
  };
}

interface GuidanceTemplate {
  steps: GuidanceStep[];
  timeEstimate: number;
  difficulty: DifficultyLevel;
  preparation?: string[];
  followUp?: string[];
}
```

### 4. Interaktionsflöden

#### Daglig reflektion
```typescript
interface DailyReflectionFlow {
  morning?: {
    intention: string;
    focus: string[];
    mood: MoodIndicator;
  };
  
  evening?: {
    review: string;
    learnings: string[];
    gratitude: string[];
    tomorrow: string[];
  };
  
  practices?: {
    meditation?: MeditationLog;
    contemplation?: ContemplationLog;
    inquiry?: InquiryLog;
  };
}
```

#### Filosofisk reflektion
```typescript
interface PhilosophicalReflectionFlow {
  question: PhilosophicalQuestion;
  exploration: {
    initialThoughts: string;
    investigation: string[];
    insights: string[];
    questions: string[];
  };
  
  methodology: {
    approach: string;
    resources: Resource[];
    discussions: Discussion[];
  };
  
  development: {
    previousThoughts?: string[];
    evolution?: string[];
    currentPosition: string;
  };
}
```

### 5. Visualiseringar

#### Insiktskarta
```typescript
interface InsightMap {
  nodes: {
    reflections: ReflectionNode[];
    questions: QuestionNode[];
    insights: InsightNode[];
    connections: Connection[];
  };
  
  visualization: {
    layout: 'force' | 'tree' | 'spiral' | 'timeline';
    clustering: boolean;
    highlighting: boolean;
    filtering: FilterOptions;
  };
}
```

### 6. Integration med övriga systemet

#### Kopplingar
```typescript
interface SystemIntegration {
  learning: {
    tracks: LearningTrackConnection;
    milestones: MilestoneTracking;
    competencies: CompetencyMapping;
  };
  
  social: {
    mentorship: MentorshipConnection;
    collaboration: CollaborationTools;
    sharing: SharingMechanisms;
  };
  
  analysis: {
    patterns: PatternRecognition;
    insights: InsightExtraction;
    progress: ProgressTracking;
  };
}
```

### 7. Implementation

#### Första iteration
1. Grundläggande texteditor med stöd för:
   - Markdown-formattering
   - Mediabifogning
   - Taggning
   - Privacyinställningar

2. Enkelt promptsystem med:
   - Åldersanpassade frågor
   - Grundläggande vägledning
   - Sparande och återhämtning
   - Delningsfunktionalitet

3. Visualiseringsverktyg för:
   - Reflektionshistorik
   - Taggmoln
   - Enkla insiktskartor
   - Utvecklingsspårning

