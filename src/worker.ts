import {NativeConnection, Worker} from '@temporalio/worker';

import {type IActivities, hello, world} from './activities';
import {env} from './config';
import {TEMPORAL_HELLO_WORLD_TASK_QUEUE} from './constants';

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

async function main(): Promise<void> {
    const connection = await NativeConnection.connect({
        address: env.TEMPORAL_HOST,
    });

    const activities: IActivities = {hello, world};

    const worker = await Worker.create({
        connection,
        taskQueue: TEMPORAL_HELLO_WORLD_TASK_QUEUE,
        workflowsPath: require.resolve('./workflow'),
        activities,
    });

    await worker.run();
}
