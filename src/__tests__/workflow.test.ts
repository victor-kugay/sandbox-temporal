import {randomUUID} from 'crypto';

import {TestWorkflowEnvironment} from '@temporalio/testing';
import {
    Runtime,
    Worker,
    type WorkflowBundleWithSourceMap,
    bundleWorkflowCode,
    DefaultLogger,
} from '@temporalio/worker';

import {temporalHelloWorldWorkflow} from '../workflow';
import {type IActivities} from '../activities';

jest.setTimeout(10_000);

let testWorker: Worker;
let testEnv: TestWorkflowEnvironment;
let workflowBundle: WorkflowBundleWithSourceMap;

beforeAll(async () => {
    Runtime.install({logger: new DefaultLogger('ERROR')});

    testEnv = await TestWorkflowEnvironment.createTimeSkipping();

    workflowBundle = await bundleWorkflowCode({
        workflowsPath: require.resolve('../workflow.ts'),
        logger: new DefaultLogger('WARN'),
    });
});

afterAll(async () => {
    await testEnv.teardown();
});

describe(`[Workflow]`, () => {
    test('HelloWorldWorkflow TestCase1', async () => {
        const activities: IActivities = {
            firstActivity: jest.fn().mockResolvedValue(undefined),
            secondActivity: jest.fn().mockResolvedValue(undefined),
        };

        testWorker = await Worker.create({
            connection: testEnv.nativeConnection,
            taskQueue: 'test',
            workflowBundle,
            activities,
        });

        const result = await testWorker.runUntil(async () => {
            const handle = await testEnv.client.workflow.start(
                temporalHelloWorldWorkflow,
                {
                    taskQueue: 'test',
                    workflowId: randomUUID(),
                },
            );

            return await handle.result();
        });

        expect(result).toBe('fail');
    });
});
