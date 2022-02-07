export const questions = [
  {
    question: "What form of telemetry can be used to derive all others?",
    answers: [
      {
        name: "Metrics",
      },
      {
        name: "Traces",
      },
      {
        name: "Logs",
      },
      {
        name: "Events",
        correct: true,
      },
    ],
    correctAnswer: "Events",
    explanation:
      "Events. Events (specifically, structured events) are the building blocks of observability; they’re the place where you put in any information you want, such as build ID, username, service name. These events can be used to queried over as events themselves or can be chained together to make traces, you can record counts to make up metrics, you can include error message that would be returned to the user or be displayed in logs.",
  },
  {
    question: "Which of these the same abbreviation algorithm as o11y?",
    answers: [
      {
        name: "i18n",
        correct: true,
      },
      {
        name: "1337",
      },
      {
        name: "<3",
      },
      {
        name: "gr8!",
      },
    ],
    correctAnswer: "i18n",
    explanation:
      "O11y stands for observability, where “11” is the number of letters between the start and end of the word! Internationalization has 18 letters between the start and the end the word, so it is abbreviated as “i18n.” This style of abbreviation is called a [numeronym](https://en.wikipedia.org/wiki/Numeronym#:~:text=A%20numeronym%20is%20a%20number,%22%20%2B%20%22nine%22).",
  },
  {
    question: "What can a trace tell me about my application or service?",
    orderedAnswers: true,
    answers: [
      {
        name: "How often a user is hitting a database",
      },
      {
        name: "How long each request took",
      },
      {
        name: "The order steps that each request took",
      },
      {
        name: "All of the above",
        correct: true,
      },
    ],
    correctAnswer: "All of the above",
    explanation:
      "A trace is the flow of data through an application, whether it’s a user’s interactions on a webpage, or a user making a request, hitting a database, and then returning the request to the browser. In a single view, it can tell you how long each step took, the order of the route, and any other details you add to your traces.",
  },
  {
    question: "What’s the relationship between a trace and a span?",
    answers: [
      {
        name: "Traces are the children of spans",
      },
      {
        name: "A trace is made up of many spans",
        correct: true,
      },
      {
        name: "A trace and span are always identical",
      },
      {
        name: "Spans are traces are two types of events",
      },
    ],
    correctAnswer: "A trace is made up of many spans",
    explanation:
      "A span is a single piece of instrumentation from a single location in your code. It represents a single unit of work done by a service. A trace is a collection of spans that are tied together with a single Trace ID. Traces tie together instrumentation from separate services, or from different methods within one service to make it easier to identify the source of errors, find performance problems, or understand how data flows through a large system. [Learn more about traces and spans](https://docs.honeycomb.io/getting-data-in/tracing/#what-is-a-trace).",
  },
  {
    question: "What’s an example of high cardinality data?",
    answers: [
      {
        name: "Feature flag status",
      },
      {
        name: "Http status codes",
      },
      {
        name: "Order ID",
        correct: true,
      },
      {
        name: "AWS Zone",
      },
    ],
    correctAnswer: "Order ID",
    explanation:
      "Order ID is most likely to be high cardinality field of the choices above. Cardinality describes the number of distinct possible values, so a boolean field with two values like feature flag status or one with a few dozen values like AWS Zone is much lower cardinality than Order ID or User ID, where thousands of unique values are possible. Honeycomb is designed to efficiently store and analyze high cardinality data, so you can flexibly dive from broad categories down to a single request or user when identifying an issue. [Learn more about high cardinality](https://docs.honeycomb.io/getting-started/high-cardinality/).",
  },
  {
    question:
      "How granular can you get when analyzing high cardinality data with Honeycomb?",
    orderedAnswers: true,
    answers: [
      {
        name: "App level",
      },
      {
        name: "Service level",
      },
      {
        name: "User level",
      },
      {
        name: "All of the above",
        correct: true,
      },
    ],
    correctAnswer: "All of the above",
    explanation:
      "The ability to rapidly analyze high cardinality fields — all the way from app level to user level — is a key aspect of observability. Being able to identify issues in the experience of a specific user or account, and trace them to a specific API endpoint, for example, enables you to deeply understand the dimensions of a complex system. Honeycomb’s [BubbleUp tool](https://docs.honeycomb.io/working-with-your-data/bubbleup/) is designed to help sort through that information by looking at all dimensions at once, and finding which attributes that stand out from the others.",
  },
  {
    question: "What is telemetry?",
    answers: [
      {
        name: "Telephone calls",
      },
      {
        name: "Dotted lines",
      },
      {
        name: "Messages about internal system happenings",
        correct: true,
      },
      {
        name: "Console.log statements",
      },
    ],
    correctAnswer: "Messages about internal system happenings",
    explanation:
      "Telemetry is a set of measurements and data that you collect about your system. The term can describe events as diverse as webpage clicks, request duration, calls to a database, and more, that might be used to understand how your application is running.",
  },

  {
    question:
      "What’s the recommended way of keeping your telemetry data a reasonable size?",
    answers: [
      {
        name: "Remove spans",
      },
      {
        name: "Send fewer fields",
      },
      {
        name: "Only retain spans with errors",
      },
      {
        name: "Sample at the trace level",
        correct: true,
      },
    ],
    correctAnswer: "Sample at the trace level",
    explanation:
      "Sampling is the practice of selecting a few elements to represent the whole as a way to handle scale. This allows you to use a subset of data to learn about a high-volume production system in a mathematically sound way. Honeycomb is sample-native; every event has a sample rate riding along with it, so you have the flexibility to use simple or complex sampling algorithms as desired. [Read more about sampling](https://docs.honeycomb.io/manage-data-volume/sampling/).",
  },
  {
    question: "Which of these is an example of a structured event?",
    format: "code",
    answers: [
      {
        name: '{ "user_id": 123, "build_id": "abc" }',
        correct: true,
      },
      {
        name: "ERROR_API: Couldn’t find user",
      },
      {
        name: '"sent request"',
      },
      {
        name: 'console.log("hello world")',
      },
    ],
    correctAnswer: '{ "user_id": 123, "build_id": "abc" }',
    explanation:
      "A structured event is a collection of information about what it took to complete a unit of work, in the form of a JSON blob. It contains a set of labeled fields, and the values for that field. For example, an event might be the process of accepting an HTTP request, doing the required work, and passing back a response. Honeycomb accepts structured events and enables you to flexibly explore and visualize it to understand how your system is running. [Read more about structured events.](https://docs.honeycomb.io/getting-started/events-metrics-logs/)",
  },
  {
    question:
      "Which are the following is a way to explore data about your application in Honeycomb?",
    orderedAnswers: true,
    answers: [
      {
        name: "Query on any dimension",
      },
      {
        name: "Generate statistical analysis to identify anomalies",
      },
      {
        name: "Visualize events as a heatmap",
      },
      {
        name: "All of the above",
        correct: true,
      },
    ],
    correctAnswer: "All of the above",
    explanation:
      "Honeycomb allows you explore your data by querying on any dimension, aggregating your events to compute a count or a P95 (95th percentile), or visualize them as a heatmap. You can group and filter them on any dimension. This ability allows you to track down the behavior of a single user, code release, feature flag, server, or endpoint.",
  },
];
