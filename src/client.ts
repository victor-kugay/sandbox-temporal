import {randomUUID} from 'crypto';

import {Connection, Client} from '@temporalio/client';

import {TEMPORAL_HELLO_WORLD_TASK_QUEUE} from './constants';
import {temporalHelloWorldWorkflow} from './workflow';
import {env} from './config';

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

async function main(): Promise<void> {
    const connection = await Connection.connect({address: env.TEMPORAL_HOST});

    const client = new Client({connection});

    const handle = await client.workflow.start(temporalHelloWorldWorkflow, {
        taskQueue: TEMPORAL_HELLO_WORLD_TASK_QUEUE,
        workflowId: randomUUID(),
        args: [],
    });

    console.log(`Started workflow ${handle.workflowId}`);

    console.log(await handle.result());
}
