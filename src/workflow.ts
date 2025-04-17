import {proxyActivities, setHandler, condition} from '@temporalio/workflow';

import {type IActivities} from './activities';
import {firstSignal, secondSignal} from './signals';

const {firstActivity, secondActivity} = proxyActivities<IActivities>({
    startToCloseTimeout: '1 minute',
});

export async function temporalHelloWorldWorkflow(): Promise<string> {
    let latestSignal: string = 'idle';

    setHandler(firstSignal, () => {
        latestSignal = 'first-signal';
    });

    setHandler(secondSignal, () => {
        latestSignal = 'second-signal';
    });

    const firstSignalInTime = await condition(
        () => latestSignal === 'first-signal',
        '1m',
    );
    if (!firstSignalInTime) {
        return 'fail';
    }

    await firstActivity();

    const secondSignalInTime = await condition(
        () => latestSignal === 'second-signal',
        '1m',
    );
    if (!secondSignalInTime) {
        return 'fail';
    }

    await secondActivity();

    return 'success';
}
