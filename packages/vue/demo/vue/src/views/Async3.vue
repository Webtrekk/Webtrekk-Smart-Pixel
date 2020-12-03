<template>
    <div class='about'>
        <h1 v-webtrekk.page="{ parameter: { 1: trackData } }">Async content</h1>
        <p>On this page we fake loading asynchronous content with a setTimeout.</p>
        <p>
            We want to use the information we gather from within the timeout for our
            trackrequest though.
        </p>
        <p>Therefore we have to delay the page trackrequest.</p>
        <p>
            We do this by executing
            <code>
                <pre>this.$webtrekk.deactivateAutoTracking = true</pre>
            </code> in the
            beforeCreate hook.
        </p>
        <p>
            Now the Smartpixel holds back the trackrequest until
            <code>
                <pre>this.$webtrekk.track()</pre>
            </code> is executed, which we
            do within the timeOut. This way you are in control when the trackrequest
            shall be triggered.
        </p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                trackData: 'data before async call',
                timeoutId: 0
            };
        },
        beforeCreate() {
            this.$webtrekk.deactivateAutoTracking = true;
        },
        mounted() {
            this.timeoutId = window.setTimeout(() => {
                this.$webtrekk.page('', {
                    parameter: {2: 'data after async call'}
                });
                this.$webtrekk.track();
            }, 3000);
        },
        beforeUnmount() {
            window.clearTimeout(this.timeoutId);
        },
    };
</script>
