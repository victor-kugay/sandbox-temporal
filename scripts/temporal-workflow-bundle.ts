import {writeFile} from 'fs/promises';
import path from 'path';

import {bundleWorkflowCode} from '@temporalio/worker';

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

async function main(): Promise<void> {
    const {code} = await bundleWorkflowCode({
        workflowsPath: require.resolve('../workflows'),
    });
    const codePath = path.join(__dirname, '../../workflow-bundle.js');

    await writeFile(codePath, code);
    console.log(`Bundle written to ${codePath}`);
}
