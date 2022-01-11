import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store'

export const appConfiguration: Writable<AppConfiguration> = writable({
    configuration: null
});

export const gitSourcePayload: Writable<NewGitSource> = writable({
    name: undefined,
    type: 'github',
    htmlUrl: undefined,
    apiUrl: undefined,
    organization: undefined
});
