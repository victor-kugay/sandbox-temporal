export interface IActivities {
    hello: () => Promise<void>;
    world: () => Promise<void>;
}

export const hello: IActivities['hello'] = async () => {
    console.log(`${hello.name} was started`);
    await new Promise((resolve) => setTimeout(resolve, 1_000));
    console.log(`${hello.name} was finished`);
};

export const world: IActivities['world'] = async () => {
    console.log(`${world.name} was started`);
    await new Promise((resolve) => setTimeout(resolve, 1_000));
    console.log(`${world.name} was finished`);
};
