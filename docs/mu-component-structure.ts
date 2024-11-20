// Core layouts
interface Layouts {
  MainLayout: {
    Navigation: NavigationComponent;
    Sidebar: SidebarComponent;
    Footer: FooterComponent;
  };
  
  LearningSpaceLayout: {
    Header: HeaderWithProgress;
    ContentArea: ContentContainer;
    ToolBar: LearningTools;
  };
}

// Core pages and their main components
interface Pages {
  Dashboard: {
    LearningJourney: {
      CurrentProgress: ProgressTracker;
      NextSteps: LearningPathDisplay;
      RecentReflections: ReflectionList;
    };
    
    Mentorship: {
      MentorConnection: MentorshipCard;
      UpcomingSessions: SessionsList;
      Messages: MentorChat;
    };
    
    GroupSpace: {
      ActiveProjects: ProjectGrid;
      GroupReflections: SharedReflections;
      Discussions: DiscussionBoard;
    };
  };
  
  ReflectionSpace: {
    ReflectionEditor: ReflectionComponent; // existing
    ReflectionLibrary: {
      Filter: ReflectionFilter;
      Search: SearchComponent;
      Timeline: ReflectionTimeline;
      TagCloud: TagVisualizer;
    };
    Templates: ReflectionTemplates;
    Insights: InsightsDashboard;
  };
  
  LearningPaths: {
    PathExplorer: {
      PathList: LearningPathGrid;
      PathDetail: PathContent;
      Progress: PathProgress;
    };
    Activities: {
      CurrentActivity: ActivityViewer;
      Resources: ResourceLibrary;
      Notes: QuickNotes;
    };
    Assessment: {
      SelfAssessment: AssessmentTool;
      PeerFeedback: FeedbackSystem;
      Reflection: GuidedReflection;
    };
  };
  
  MentorSpace: {
    MentorDashboard: {
      MenteeList: MenteeOverview;
      SessionPlanner: SessionScheduler;
      FeedbackTools: FeedbackManager;
    };
    Resources: {
      MaterialLibrary: ResourceManager;
      ExerciseBank: ExerciseCreator;
      Templates: TemplateLibrary;
    };
  };
  
  Community: {
    Groups: {
      GroupList: GroupDirectory;
      GroupDetail: GroupSpace;
      Activities: GroupActivities;
    };
    Projects: {
      ProjectBoard: ProjectManager;
      Collaboration: CollaborationSpace;
      Documentation: ProjectDocs;
    };
    Discussion: {
      Forums: DiscussionForums;
      Topics: TopicExplorer;
      Responses: ResponseThread;
    };
  };
}

// Shared components used across the application
interface SharedComponents {
  Navigation: {
    MainNav: NavBar;
    Breadcrumbs: BreadcrumbTrail;
    Search: GlobalSearch;
  };
  
  UI: {
    Button: ButtonVariants;
    Card: CardComponent;
    Modal: ModalSystem;
    Notification: NotificationManager;
  };
  
  Forms: {
    Input: FormInputs;
    Select: SelectComponent;
    DatePicker: DateSelector;
    FileUpload: FileUploader;
  };
  
  Feedback: {
    Loading: LoadingStates;
    Error: ErrorBoundary;
    Success: SuccessMessage;
    Empty: EmptyState;
  };
  
  Visualization: {
    Charts: ChartComponents;
    Progress: ProgressIndicators;
    Timeline: TimelineView;
    Network: NetworkGraph;
  };
}

// Authentication and user management
interface Auth {
  Login: LoginComponent;
  Register: RegistrationForm;
  Profile: {
    View: ProfileViewer;
    Edit: ProfileEditor;
    Settings: UserSettings;
  };
  Permissions: PermissionManager;
}
