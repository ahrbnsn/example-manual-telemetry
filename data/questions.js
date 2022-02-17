export const questions = [
  {
    question: "Which of these the same abbreviation algorithm as o11y?",
    slug: "o11y-abbreviation",
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
    question:
      "Which of these forms of telemetry can be used to derive all others?",
    slug: "forms-of-telemetry",
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
    question: "Which of these is an example of a structured event?",
    slug: "structured-event-example",
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
      "A structured event is a JSON blob that captures information about a specific unit of work in the code. It contains a set of labeled fields, and the values for that field. This structure makes them easy to query and join. Traces are composed from structured events. [Read more about structured events.](https://docs.honeycomb.io/getting-started/events-metrics-logs/)",
  },
  {
    question: "What can a trace tell me about an application?",
    slug: "story-a-trace-tells",
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
    question: "How are traces and spans related?",
    slug: "trace-span-relationship",
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
        name: "Spans and traces are two types of events",
      },
    ],
    correctAnswer: "A trace is made up of many spans",
    explanation:
      "A span is an event emitted by a single piece of instrumentation from a single location in the code. A trace is collection of spans that are tied together by a shared Trace ID. [Learn more.](https://docs.honeycomb.io/getting-data-in/tracing/#what-is-a-trace)",
  },
  {
    question: "What’s an example of high cardinality data?",
    slug: "high-cardinality-data",
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
      "Cardinality describes the number of distinct possible values, so a boolean field with two values like feature flag status or one with a few dozen values like AWS Zone is much lower cardinality than Order ID or User ID, where thousands of unique values are possible. Honeycomb is designed to efficiently store and analyze high cardinality data, so you can flexibly dive from broad categories down to a single request or user when identifying an issue. [Learn more about high cardinality](https://docs.honeycomb.io/getting-started/high-cardinality/).",
  },
  {
    question:
      "How granular can you get when analyzing high cardinality data with Honeycomb?",
    slug: "granularity",
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
      "Structured events can accept fields with _any_ cardinality, which means you can drill down rapidly to any level in your data. This is a key aspect of observability. Trace an issue that affects a specific user back to an endpoint, then follow it back to see who else is affected and where, for example.",
  },
  {
    question: "What is “telemetry”?",
    slug: "what-is-telemetry",
    answers: [
      {
        name: "Telephone calls",
      },
      {
        name: "Dotted lines",
      },
      {
        name: "Data emitted about what happens inside a system",
        correct: true,
      },
      {
        name: "Console.log statements",
      },
    ],
    correctAnswer: "Data emitted about what happens inside a system",
    explanation:
      "Telemetry can be webpage clicks, request duration, calls to a database —  anything you want to know about your system. OpenTelemetry is a CNCF open standard designed for the creation and management of telemetry data such as traces, metrics and logs. [Learn more](https://docs.honeycomb.io/getting-data-in/opentelemetry/).",
  },

  {
    question:
      "What’s the recommended way of keeping your telemetry data a reasonable size?",
    slug: "solutions-for-less-data",
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
      "Sampling is the practice of selecting a few elements to represent the whole as a way to handle scale. This allows you to use a subset of data to learn about a high-volume production system in a mathematically sound way. [Learn more](https://docs.honeycomb.io/manage-data-volume/sampling/).",
  },

  {
    question:
      "Which are the following is a way to explore data about your application in Honeycomb?",
    slug: "explore-in-honeycomb",
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
