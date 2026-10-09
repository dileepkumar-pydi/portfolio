// Update your portfolio here. Leave a URL blank until you have a real link.
const portfolio = {
  brand: "PDK.",
  name: "Pydi Dileep Kumar",
  title: "Java Backend Engineer",
  role: "Java Backend Engineer / 3+ years experience",
  headline: "Building reliable systems, one API at a time",
  headlineAccent: "one API",
  intro: "I work on Java backend services, REST APIs, payment integrations, and event-driven workflows. My main tools are Spring Boot, PostgreSQL, and AWS.",
  heroStack: ["Java", "Spring Boot", "PostgreSQL", "AWS"],

  aboutHeadline: "I work on the parts users don't see",
  about: "I'm Dileep, a Java backend engineer with 3+ years of experience. At OnoArk India, I've worked on lending and billing systems, payment integrations, and runtime tracing. I enjoy working through backend problems and making services easier to understand and maintain.",
  contactIntro: "Want to discuss a Java project or a backend role? Let's get in touch.",
  footerNote: "Thanks for stopping by.",

  stats: [
    { value: "100+", label: "production REST APIs" },
    { value: "15+", label: "microservices" },
    { value: "₹1L/month", label: "infrastructure savings" },
    { value: "40%", prefix: "approximately", label: "lower deployment overhead" },
  ],

  projects: [
    {
      category: "Loan lifecycle",
      title: "Lending Platform",
      description: "Handles loan disbursal, EMI schedules, repayments, and dynamic interest recalculation.",
      highlight: "Supports 100+ loans/month.",
      stack: ["Java", "Python", "Spring Boot", "PostgreSQL", "SQS"],
      url: "",
    },
    {
      category: "Developer tooling",
      title: "Java Agent and Observability",
      description: "Traces HTTP requests, SQL queries, and service calls at runtime, with support for automated unit test generation.",
      stack: ["Java Agent", "OpenTelemetry", "PostgreSQL"],
      url: "",
    },
    {
      category: "Subscriptions & billing",
      title: "Billing Platform",
      description: "Includes 30+ production REST APIs built with Java, Spring Boot, and PostgreSQL.",
      highlight: "Automated subscriptions for 300+ users.",
      stack: ["Java", "Spring Boot", "PostgreSQL"],
      url: "",
    },
  ],

  experience: [
    {
      title: "Software Engineer",
      company: "OnoArk India",
      dates: "",
      points: [
        "Built backend services and REST APIs for lending and billing workflows.",
        "Worked on payment integrations and event-driven systems.",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "OnoArk India",
      dates: "",
      points: [
        "Contributed to Java backend development and REST API workflows.",
        "Worked on runtime tracing and automated unit test generation.",
      ],
    },
  ],

  skills: [
    {
      category: "Backend engineering",
      items: ["Java 17", "Spring Boot", "Microservices", "REST APIs", "Payment integrations"],
    },
    {
      category: "Data & persistence",
      items: ["PostgreSQL", "MySQL", "MongoDB"],
    },
    {
      category: "Cloud & infrastructure",
      items: ["AWS", "SQS", "Lambda", "Docker"],
    },
    {
      category: "Testing & tooling",
      items: ["JUnit", "Mockito", "Maven", "Git"],
    },
  ],

  // Email: mailto:you@example.com. Resume: ./resume.pdf.
  contacts: [
    { label: "Email", url: "mailto:dileepkumarpydi2610@gmail.com", text: "dileepkumarpydi2610@gmail.com" },
    { label: "LinkedIn", url: "https://linkedin.com/in/dileep-kumar-pydi-b41965239", text: "View profile" },
    { label: "GitHub", url: "https://github.com/dileepkumar-pydi", text: "@dileepkumar-pydi" },
    { label: "Resume", url: "https://drive.google.com/file/d/1GPb5TgIe11GfCg81FgI_WlImO14dM3L7/view?usp=sharing", text: "View resume" },
  ],

  // Icon names refer to SVG files in assets/icons.
  icons: {
    Java: "java",
    "Java 17": "java",
    "Java Agent": "java",
    "Spring Boot": "spring",
    PostgreSQL: "postgresql",
    AWS: "aws",
    SQS: "aws",
    Lambda: "aws",
    Docker: "docker",
    MySQL: "mysql",
    MongoDB: "mongodb",
    Git: "git",
    JUnit: "junit",
    Maven: "maven",
  },

  // Duration and stagger are in milliseconds.
  motion: { enabled: true, replay: true, duration: 800, stagger: 70 },
};
