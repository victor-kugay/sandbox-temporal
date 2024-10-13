import {config} from 'dotenv';

config();

export const env = {
    TEMPORAL_HOST: String(process.env['TEMPORAL_HOST']),
};
