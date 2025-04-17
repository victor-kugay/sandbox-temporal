import {randomUUID} from 'crypto';

import {Connection, Client} from '@temporalio/client';

import {TEMPORAL_HELLO_WORLD_TASK_QUEUE} from './constants';
import {temporalHelloWorldWorkflow} from './workflow';
import {env} from './config';
import {firstSignal, secondSignal} from './signals';

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

    await handle.signal(secondSignal);

    await new Promise((resolve) => setTimeout(resolve, 5_000));

    await handle.signal(firstSignal);
}
