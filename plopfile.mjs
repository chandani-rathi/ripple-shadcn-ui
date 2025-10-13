export default function (plop) {
  // create your generators here
  plop.setGenerator("primitive", {
    description: 'Create a new primitive',
    prompts: [
        { type: 'input', name: 'name', message: 'Primitive name:' },
        { type: 'list', name: 'root', message: 'Select Root Dir:', choices: ['core', 'ripple'] }
    ],
    actions: [
        {
        type: 'addMany',
        destination: 'primitives/{{dashCase root}}/{{dashCase name}}',
        base: 'templates/primitive',
        templateFiles: 'templates/primitive/**/*'
      }
    ],
  });
}