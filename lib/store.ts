// Hardcoded data store for MVP
// Two-level structure:
// 1. Subjects (e.g., Calculus 2) have a LINEAR prereq chain (Calc 1 -> Precalc -> Algebra 2)
// 2. Each subject has a LINEAR lesson tree (Limits -> Derivatives -> ...)

export interface Subject {
  id: string
  title: string
  icon: string
  description: string
  category: string
  totalLessons: number
  completedLessons: number
  progress: number
}

export interface PrereqNode {
  id: string
  title: string
  description: string
  status: "locked" | "available" | "completed"
}

export interface LessonNode {
  id: string
  title: string
  description: string
  status: "locked" | "available" | "in-progress" | "completed"
}

export interface Lesson {
  id: string
  nodeId: string
  title: string
  sections: LessonSection[]
}

export interface LessonSection {
  type: "content" | "visualization" | "quiz"
  content?: string
  visualizationType?: string
  questions?: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

// --- Subjects (specific courses, not broad categories) ---

export const subjects: Subject[] = [
  {
    id: "calculus-2",
    title: "Calculus 2",
    icon: "integral",
    description: "Integration techniques, series, and polar coords",
    category: "Mathematics",
    totalLessons: 10,
    completedLessons: 0,
    progress: 0,
  },
  {
    id: "python",
    title: "Python",
    icon: "code",
    description: "Programming fundamentals to advanced concepts",
    category: "Computer Science",
    totalLessons: 12,
    completedLessons: 0,
    progress: 0,
  },
  {
    id: "organic-chemistry",
    title: "Organic Chemistry",
    icon: "flask",
    description: "Carbon compounds, reactions, and mechanisms",
    category: "Sciences",
    totalLessons: 14,
    completedLessons: 0,
    progress: 0,
  },
  {
    id: "linear-algebra",
    title: "Linear Algebra",
    icon: "matrix",
    description: "Vectors, matrices, eigenvalues, and transformations",
    category: "Mathematics",
    totalLessons: 10,
    completedLessons: 0,
    progress: 0,
  },
  {
    id: "classical-mechanics",
    title: "Classical Mechanics",
    icon: "atom",
    description: "Newtonian mechanics, energy, and momentum",
    category: "Sciences",
    totalLessons: 11,
    completedLessons: 0,
    progress: 0,
  },
  {
    id: "data-structures",
    title: "Data Structures",
    icon: "code",
    description: "Arrays, trees, graphs, and hash tables",
    category: "Computer Science",
    totalLessons: 13,
    completedLessons: 0,
    progress: 0,
  },
  {
    id: "statistics",
    title: "Statistics",
    icon: "chart",
    description: "Probability, distributions, and hypothesis testing",
    category: "Mathematics",
    totalLessons: 9,
    completedLessons: 0,
    progress: 0,
  },
  {
    id: "creative-writing",
    title: "Creative Writing",
    icon: "book",
    description: "Narrative craft, voice, and storytelling techniques",
    category: "Humanities",
    totalLessons: 8,
    completedLessons: 0,
    progress: 0,
  },
]

export const suggestedTopics = [
  "Stochastic Calculus",
  "Machine Learning",
  "Quantum Mechanics",
  "Number Theory",
  "Cryptography",
  "Bayesian Statistics",
]

// --- Prereq chains (LINEAR) ---
// Each subject has a chain of prerequisite subjects leading up to it

export const prereqChains: Record<string, PrereqNode[]> = {
  "calculus-2": [
    { id: "algebra-2", title: "Algebra 2", description: "Polynomials, logarithms, and exponentials", status: "completed" },
    { id: "precalculus", title: "Precalculus", description: "Trigonometry, functions, and analytic geometry", status: "completed" },
    { id: "calculus-1", title: "Calculus 1", description: "Limits, derivatives, and basic integration", status: "completed" },
    { id: "calculus-2", title: "Calculus 2", description: "Integration techniques, series, and polar coords", status: "available" },
  ],
  "python": [
    { id: "computer-basics", title: "Computer Basics", description: "Files, terminal, and basic operations", status: "completed" },
    { id: "intro-programming", title: "Intro to Programming", description: "Variables, logic, and control flow", status: "completed" },
    { id: "python", title: "Python", description: "Programming fundamentals to advanced concepts", status: "available" },
  ],
  "organic-chemistry": [
    { id: "gen-chem-1", title: "General Chemistry 1", description: "Atomic structure, bonding, and stoichiometry", status: "completed" },
    { id: "gen-chem-2", title: "General Chemistry 2", description: "Equilibrium, kinetics, and thermodynamics", status: "completed" },
    { id: "organic-chemistry", title: "Organic Chemistry", description: "Carbon compounds, reactions, and mechanisms", status: "available" },
  ],
  "linear-algebra": [
    { id: "algebra-2-la", title: "Algebra 2", description: "Systems of equations, matrices intro", status: "completed" },
    { id: "precalculus-la", title: "Precalculus", description: "Vectors, parametric equations", status: "completed" },
    { id: "linear-algebra", title: "Linear Algebra", description: "Vectors, matrices, eigenvalues, and transformations", status: "available" },
  ],
  "classical-mechanics": [
    { id: "algebra-cm", title: "Algebra 2", description: "Functions and problem solving", status: "completed" },
    { id: "precalculus-cm", title: "Precalculus", description: "Trigonometry and vectors", status: "completed" },
    { id: "calculus-1-cm", title: "Calculus 1", description: "Derivatives and basic integration", status: "completed" },
    { id: "classical-mechanics", title: "Classical Mechanics", description: "Newtonian mechanics, energy, and momentum", status: "available" },
  ],
  "data-structures": [
    { id: "intro-prog-ds", title: "Intro to Programming", description: "Variables, loops, and functions", status: "completed" },
    { id: "python-ds", title: "Python or Java", description: "OOP, data types, and libraries", status: "completed" },
    { id: "data-structures", title: "Data Structures", description: "Arrays, trees, graphs, and hash tables", status: "available" },
  ],
  "statistics": [
    { id: "algebra-2-stat", title: "Algebra 2", description: "Functions and basic probability", status: "completed" },
    { id: "precalculus-stat", title: "Precalculus", description: "Combinatorics and sequences", status: "completed" },
    { id: "statistics", title: "Statistics", description: "Probability, distributions, and hypothesis testing", status: "available" },
  ],
  "creative-writing": [
    { id: "english-comp", title: "English Composition", description: "Essay structure and grammar", status: "completed" },
    { id: "creative-writing", title: "Creative Writing", description: "Narrative craft, voice, and storytelling", status: "available" },
  ],
}

// --- Lesson trees (LINEAR within each subject) ---

export const lessonTrees: Record<string, LessonNode[]> = {
  "calculus-2": [
    { id: "integration-review", title: "Integration Review", description: "Refresher on basic integration", status: "available" },
    { id: "integration-by-parts", title: "Integration by Parts", description: "The product rule in reverse", status: "locked" },
    { id: "trig-substitution", title: "Trigonometric Substitution", description: "Using trig identities to simplify", status: "locked" },
    { id: "partial-fractions", title: "Partial Fractions", description: "Decomposing rational functions", status: "locked" },
    { id: "improper-integrals", title: "Improper Integrals", description: "Integrals with infinite bounds", status: "locked" },
    { id: "sequences", title: "Sequences", description: "Convergence and divergence", status: "locked" },
    { id: "series", title: "Infinite Series", description: "Sums that go on forever", status: "locked" },
    { id: "convergence-tests", title: "Convergence Tests", description: "Ratio, root, and comparison tests", status: "locked" },
    { id: "power-series", title: "Power Series", description: "Taylor and Maclaurin series", status: "locked" },
    { id: "polar-coordinates", title: "Polar Coordinates", description: "Curves and areas in polar form", status: "locked" },
  ],
  "python": [
    { id: "py-variables", title: "Variables & Types", description: "Strings, ints, floats, and booleans", status: "available" },
    { id: "py-control-flow", title: "Control Flow", description: "If/else, loops, and logic", status: "locked" },
    { id: "py-functions", title: "Functions", description: "Defining and calling functions", status: "locked" },
    { id: "py-data-structures", title: "Data Structures", description: "Lists, dicts, sets, and tuples", status: "locked" },
    { id: "py-oop", title: "Object-Oriented Programming", description: "Classes, inheritance, and polymorphism", status: "locked" },
    { id: "py-file-io", title: "File I/O", description: "Reading and writing files", status: "locked" },
  ],
  "organic-chemistry": [
    { id: "oc-bonding", title: "Bonding & Structure", description: "Lewis structures and hybridization", status: "available" },
    { id: "oc-alkanes", title: "Alkanes & Cycloalkanes", description: "Naming, conformations, and reactions", status: "locked" },
    { id: "oc-stereochem", title: "Stereochemistry", description: "Chirality and optical activity", status: "locked" },
    { id: "oc-substitution", title: "Substitution Reactions", description: "SN1 and SN2 mechanisms", status: "locked" },
  ],
  "linear-algebra": [
    { id: "la-vectors", title: "Vectors", description: "Vector operations and spaces", status: "available" },
    { id: "la-matrices", title: "Matrices", description: "Operations and row reduction", status: "locked" },
    { id: "la-determinants", title: "Determinants", description: "Computing and properties", status: "locked" },
    { id: "la-eigenvalues", title: "Eigenvalues", description: "Eigenvalues and eigenvectors", status: "locked" },
  ],
  "classical-mechanics": [
    { id: "cm-kinematics", title: "Kinematics", description: "Position, velocity, and acceleration", status: "available" },
    { id: "cm-newton", title: "Newton's Laws", description: "Force, mass, and acceleration", status: "locked" },
    { id: "cm-energy", title: "Work & Energy", description: "Conservation of energy", status: "locked" },
    { id: "cm-momentum", title: "Momentum", description: "Impulse and collisions", status: "locked" },
  ],
  "data-structures": [
    { id: "ds-arrays", title: "Arrays & Lists", description: "Sequential data storage", status: "available" },
    { id: "ds-stacks-queues", title: "Stacks & Queues", description: "LIFO and FIFO structures", status: "locked" },
    { id: "ds-trees", title: "Trees", description: "Binary trees and BSTs", status: "locked" },
    { id: "ds-graphs", title: "Graphs", description: "Traversal and shortest path", status: "locked" },
  ],
  "statistics": [
    { id: "stat-descriptive", title: "Descriptive Statistics", description: "Mean, median, mode, and spread", status: "available" },
    { id: "stat-probability", title: "Probability", description: "Rules and conditional probability", status: "locked" },
    { id: "stat-distributions", title: "Distributions", description: "Normal, binomial, and Poisson", status: "locked" },
  ],
  "creative-writing": [
    { id: "cw-elements", title: "Story Elements", description: "Character, plot, and setting", status: "available" },
    { id: "cw-voice", title: "Voice & Tone", description: "Finding your narrative voice", status: "locked" },
  ],
}

// --- Hardcoded lesson for "Integration Review" in Calculus 2 ---

export const integrationReviewLesson: Lesson = {
  id: "integration-review-lesson",
  nodeId: "integration-review",
  title: "Integration Review",
  sections: [
    {
      type: "content",
      content: `Integration is the reverse of differentiation. Where a derivative tells you the rate of change, an integral accumulates those tiny changes to find the total quantity.\n\nThe fundamental idea: if F'(x) = f(x), then the integral of f(x) is F(x) + C. We call F an antiderivative of f.\n\nKey formulas to remember:\n- The integral of x^n is x^(n+1)/(n+1) + C (when n is not -1)\n- The integral of 1/x is ln|x| + C\n- The integral of e^x is e^x + C\n- The integral of sin(x) is -cos(x) + C\n- The integral of cos(x) is sin(x) + C`,
    },
    {
      type: "visualization",
      visualizationType: "area-under-curve",
    },
    {
      type: "quiz",
      questions: [
        {
          id: "q1",
          question: "What is the integral of x^2 dx?",
          options: [
            "2x + C",
            "x^3/3 + C",
            "x^3 + C",
            "x^2/2 + C",
          ],
          correctIndex: 1,
          explanation:
            "Using the power rule for integration: increase the exponent by 1 and divide by the new exponent. So x^2 becomes x^3/3 + C.",
        },
        {
          id: "q2",
          question: "What is the integral of cos(x) dx?",
          options: [
            "-sin(x) + C",
            "sin(x) + C",
            "-cos(x) + C",
            "tan(x) + C",
          ],
          correctIndex: 1,
          explanation:
            "The integral of cos(x) is sin(x) + C. This is because the derivative of sin(x) is cos(x), so the antiderivative reverses that.",
        },
        {
          id: "q3",
          question: "What does the definite integral from a to b of f(x)dx represent geometrically?",
          options: [
            "The slope of f(x) at a",
            "The signed area between f(x) and the x-axis from a to b",
            "The maximum value of f(x) between a and b",
            "The average of f(a) and f(b)",
          ],
          correctIndex: 1,
          explanation:
            "A definite integral represents the signed area between the function and the x-axis. Area above the x-axis is positive, and area below is negative.",
        },
      ],
    },
    {
      type: "content",
      content: `Definite integrals have specific bounds and give a numerical answer rather than a function. The Fundamental Theorem of Calculus connects them beautifully:\n\nThe integral from a to b of f(x)dx = F(b) - F(a)\n\nwhere F is any antiderivative of f. This means to evaluate a definite integral, find the antiderivative and plug in the bounds.\n\nFor example, the integral from 0 to 1 of x^2 dx:\nF(x) = x^3/3\nF(1) - F(0) = 1/3 - 0 = 1/3\n\nGeometrically, this gives us the area under the curve y = x^2 from x = 0 to x = 1.`,
    },
    {
      type: "visualization",
      visualizationType: "riemann-sum",
    },
    {
      type: "quiz",
      questions: [
        {
          id: "q4",
          question: "Evaluate the integral from 0 to 2 of 3x^2 dx",
          options: [
            "4",
            "6",
            "8",
            "12",
          ],
          correctIndex: 2,
          explanation:
            "The antiderivative of 3x^2 is x^3. Evaluating: 2^3 - 0^3 = 8 - 0 = 8.",
        },
        {
          id: "q5",
          question: "If F'(x) = f(x), what is the relationship called?",
          options: [
            "Chain rule",
            "Fundamental Theorem of Calculus",
            "L'Hopital's Rule",
            "Mean Value Theorem",
          ],
          correctIndex: 1,
          explanation:
            "The Fundamental Theorem of Calculus establishes the connection between differentiation and integration, stating that integration can be reversed by differentiation.",
        },
      ],
    },
  ],
}
