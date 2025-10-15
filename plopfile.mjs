import fs from 'node:fs';

export default function (plop) {

   plop.setActionType('updateTsConfigJson', function (answers, config) {
    const filePath = config.path;
    const dashCase = plop.getHelper('dashCase');
    const nameDashed = dashCase(answers.name);
    const updates = {
      [`@ripple-primitives/${nameDashed}`] : [`primitives/${answers.root}/${nameDashed}/src`]
    };

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const tsConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Merge updates into package.json
    const updated = {
      ...tsConfig,
      compilerOptions: {
        ...tsConfig.compilerOptions,
        paths: {
          ...tsConfig.compilerOptions.paths,
          ...(updates || {}),
        }
      },
    };

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 4) + '\n');
    return `✅ Updated ${filePath}`;
  });

  plop.setActionType('updateRipplePrimitivesPackageJson', function (answers, config) {
    const filePath = config.path;
    const dashCase = plop.getHelper('dashCase');
    const nameDashed = dashCase(answers.name);
    const updates = {
      [`@ripple-primitives/${nameDashed}`] : "workspace:*"
    };

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Merge updates into package.json
    const updated = {
      ...pkg,
      dependencies: {
        ...pkg.dependencies,
        ...(updates || {}),
      },
    };

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 4) + '\n');
    return `✅ Updated ${filePath}`;
  });

  
  plop.setActionType('updateRipplePrimitivesIndexTs', function (answers, config) {
    const filePath = config.path;
    const dashCase = plop.getHelper('dashCase');
    const nameDashed = dashCase(answers.name);
    const updates = `export * from "@ripple-primitives/${nameDashed}";`

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const tsFileAsText = fs.readFileSync(filePath, 'utf8');
    const updated = tsFileAsText + "\n" + updates

    fs.writeFileSync(filePath, updated + '\n');
    return `✅ Updated ${filePath}`;
  });

	// create your generators here
	plop.setGenerator('primitive', {
		description: 'Create a new primitive',
		prompts: [
			{ type: 'input', name: 'name', message: 'Primitive name:' },
			{
				type: 'list',
				name: 'root',
				message: 'Select Root Dir:',
				choices: ['core', 'ripple'],
			},
		],
		actions: [
			{
				type: 'addMany',
				destination: 'primitives/{{dashCase root}}/{{dashCase name}}',
				base: 'templates/primitive',
				templateFiles: 'templates/primitive/**/*',
			},
      {
        type: 'updateTsConfigJson',
        path: 'tsconfig.json',
      },
      {
        type: 'updateRipplePrimitivesPackageJson',
        path: "primitives/ripple/ripple-primitive/package.json"
      },
      {
        type: "updateRipplePrimitivesIndexTs",
        path: "primitives/ripple/ripple-primitive/src/index.ts"
      }
		],
	});
}
