<template>
    <div id="hero-container" class="container pt-5 pb-5 d-flex flex-column justify-content-center align-items-center">
        <h1 class="text-white">Twitter video downloader</h1>
        <h4 class="text-white">Download videos easily 😊</h4>
        <div class="mt-5 col-12 col-md-6">
            <div class="row">
                <div class="input-group">
                    <input type="text" class="form-control form-control-lg" v-model="tweetUrl" placeholder="Put tweet link here" />
                    <button @click="pasteUrl" class="btn btn-outline-primary" v-if="false"><i class="bi bi-clipboard"></i> Paste</button>
                    <button @click="getVideo" class="btn btn-primary btn-get-video">
                        <Transition mode="out-in">
                            <span v-if="loading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </span>
                            <span v-else> Get video </span>
                        </Transition>
                    </button>
                </div>
            </div>
            <Transition mode="out-in">
                <div v-if="videoUrl" class="mt-5">
                    <video class="col-12 mx-auto" :src="videoUrl" controls></video>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
    let tweetUrl = $ref('');
    let videoUrl = $ref('');
    let loading = $ref(false);

    async function getVideo() {
        videoUrl = '';
        loading = true;

        const response = await $fetch('/api/video', {
            method: 'post',
            body: { tweetUrl },
        });

        loading = false;
        tweetUrl = '';

        videoUrl = response;
    }

    async function pasteUrl() {
        if (!navigator.clipboard) return;

        tweetUrl = '';
        const clipboardText = await navigator.clipboard.readText();
        tweetUrl = clipboardText;
    }
</script>

<style lang="scss" scoped>
    .btn-get-video {
        width: 100px;
        min-width: 100px;
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.333s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>
