import { defineNuxtConfig } from 'nuxt';

import { resolve } from 'path';
import { readFileSync } from 'fs';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    vite: {
        vue: {
            reactivityTransform: true,
        },
    },
    css: ['~/assets/main.scss'],
});
