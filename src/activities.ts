export interface IActivities {
    firstActivity: () => Promise<void>;
    secondActivity: () => Promise<void>;
}

export const firstActivity: IActivities['firstActivity'] = async () => {
    console.log(`${firstActivity.name} was started`);
    await new Promise((resolve) => setTimeout(resolve, 1_000));
    console.log(`${firstActivity.name} was finished`);
};

export const secondActivity: IActivities['secondActivity'] = async () => {
    console.log(`${secondActivity.name} was started`);
    await new Promise((resolve) => setTimeout(resolve, 1_000));
    console.log(`${secondActivity.name} was finished`);
};
