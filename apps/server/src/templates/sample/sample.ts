const template = {
  id: '123',
  content: {
    containers: [
      {
        name: 'Container1',
        children: [],
      },
    ],
  },
  questionnaire: {
    containers: [{ name: 'Container 1' }],
  },
};

export const sampleParagraphElement = {
  type: 'paragraph',

  runs: [
    { type: 'text', content: 'Hello world', rules: [], marks: [] },

    // Text

    {
      type: 'text',
      content: 'another run',
      rules: ['8dn393hjdhn83d'],
      marks: ['bold'],
    },

    // Calculation

    {
      type: 'calculation',
      // This refers to a calculation object
      referTo: '47ejndne734hf',
      rules: [],
      marks: ['italic', 'underline'],
      options: {},
    },

    // Text (with function)

    {
      type: 'text',
      content: 'more text',
      rules: [],
      marks: ['italic', 'underline'],
      options: {
        function: '374hde7hnf73r5',
      },
    },

    // Placeholder

    {
      type: 'placeholder',
      // This is an array so that we can refer to multiple questions
      referTo: ['d7h34r7ghdh28'],
      rules: [],
      marks: ['italic', 'underline'],
      options: {
        sort: 'initial',
        delimiters: { first: 'as well as', default: ',', last: 'and' },
        function: '374hde7hnf73r5',
      },
    },

    // Placeholder for data source

    {
      type: 'placeholder',
      // This refers to a specific field in the data source
      referTo: [{ question: 'd7h34r7ghdh28', field: 'name' }],
      rules: [],
      marks: ['italic', 'underline'],
      options: {
        sort: 'initial',
        delimiters: { first: 'as well as', default: ',', last: 'and' },
        function: '374hde7hnf73r5',
      },
    },

    // Link

    {
      type: 'link',
      content: 'klick here',
      url: 'https://www.google.com',
      rules: [],
      marks: [],
      options: {},
    },

    // Reference

    {
      type: 'reference',

      // This is an array so that we can refer to multiple elements

      referTo: ['3674nhrnd82zhr3428'],

      rules: [],

      marks: [],

      options: {},
    },

    {
      type: 'function',

      // Refers to a specific function id

      referTo: '7fhj47fhbnw47f',

      rules: [],

      marks: [],

      options: {},
    },
  ],

  // Paragraph level settings
  rules: ['8dn393hjdhn83d'],
  indentation: 0,
  alignment: 'left',
  options: {},
  style: 'paragraphLevel1',
  // Refence to a separate custom JS function
  // that will be called when the element is rendered
  // and modifies the element's content
  function: '8fdj4r8wfhwef',
};

template.content.containers[0].children.push(sampleParagraphElement);

const createTemplate = () => {
  for (let i = 0; i < 1000; i++) {
    template.content.containers[0].children.push(sampleParagraphElement);
  }
  return template;
};

export default createTemplate();
