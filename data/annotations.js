export const annotations = {
  "o11y-abbreviation": {
    text: `This is a live event stream that’s emitted from your interactions with this quiz app.`,
  },

  "forms-of-telemetry": {
    text: `This event represents a span.
    `,
  },

  "structured-event-example": {
    text: `
    This is a structured event, comprised of fields and values
    `,
  },
  "story-a-trace-tells": {
    text: `    
    This is a span event. It includes a trace_id, timestamp, duration, and other additional fields that a developer wanted to track.
    `,
  },
  "trace-span-relationship": {
    text: `
    Span events have a span_id, trace_id, and parent_id. When tied together into a trace, spans tell a story about an application’s workflow: what’s slow, where there are errors, what services are involved. `,
  },

  "high-cardinality-data": {
    text: `
    \`PickedRight\` is a low-cardinality field that can be used to calculate scores on this quiz question, or this entire quiz. This event could include \`user_id\`, a high-cardinality field.
    `,
  },

  granularity: {
    text: `
    High cardinality data in events like this allow you to dive deep into your system using attributes that are important to your business.
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
