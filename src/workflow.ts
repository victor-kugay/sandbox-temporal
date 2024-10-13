import {
    proxyActivities,
    setHandler,
    condition,
    CancelledFailure,
} from '@temporalio/workflow';

import {type IActivities} from './activities';
import {helloWorldSignal} from './signals';

const {hello, world} = proxyActivities<IActivities>({
    startToCloseTimeout: '1 minute',
});

export async function temporalHelloWorldWorkflow(): Promise<string> {
    let helloWorldReceived: boolean | null = null;

    setHandler(helloWorldSignal, () => {
        helloWorldReceived = true;
    });

    try {
        await hello();

        await condition(() => helloWorldReceived === true, '1m');

        await world();

        return 'success';
    } catch (error) {
        if (error instanceof CancelledFailure) {
            console.log('Timer cancelled 👍');

            return 'cancelled';
        } else {
            throw error;
        }
    }
}
