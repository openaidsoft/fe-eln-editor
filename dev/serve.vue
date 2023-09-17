<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { WeditorSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  WeditorSample,
  // }
});
</script>

<template>
  <div id="app">
    Editor!!
    <weditor/>
  </div>
</template>
