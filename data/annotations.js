export const annotations = {
  "o11y-abbreviation": {
    text: `This is a live event that’s emitted from your interactions with this quiz app.`,
  },

  "forms-of-telemetry": {
    text: `This event represents a span.
    `,
  },
  "structured-event-example": {
    text: `
    This is a structured event, comprised of fields and values.
    `,
  },
  "story-a-trace-tells": {
    text: `
    This span includes a trace_id, timestamp, duration, and other additional fields that a developer may want to track.
    `,
  },
  "trace-span-relationship": {
    text: `
    When spans are stitched into a trace by their trace_id, they tell a story about an application’s workflow. `,
  },

  "high-cardinality-data": {
    text: `
    \`correctAnswer\` is a low-cardinality field that can be used to calculate scores on this quiz question. You can also imagine this event to include \`user_id\`, a high-cardinality field.
    `,
  },

  granularity: {
    text: `
    High cardinality data in events query your system using any attributes that are important to your business.
    `,
  },
  "what-is-telemetry": {
    text: ``,
  },
  "solutions-for-less-data": {
    text: `
    Sampling allows you to send only a subset of these events, using either constant sampling or dynamic sampling.
    `,
  },
  "explore-in-honeycomb": {
    text: ``,
  },
  "survey-selection": {
    text: `
    This is an example of a different kind of event: a span event. Instead of describing a unit of work, span events have no duration and carry information about a thing that happened.
    `,
  },
};

export default annotations;
