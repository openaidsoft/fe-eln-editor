<template>
  <EmojiPicker v-if="openEmoji" @select="onSelectEmoji" class="emoji-picker" style="margin-top: 33px; margin-left: 52px">Emoji</EmojiPicker>
</template>
<script>
export default {
  name: "emoji",
  props: {
    showEmoji: String,
    id: String,
  },
  data() {
    return {
      openEmoji: this.showEmoji,
      emoji: null,
    };
  },
  updated() {
    this.openEmoji = this.showEmoji;
  },
  methods: {
    onSelectEmoji(emoji) {
      this.emoji = emoji.i;
      this.$emit("selectedEmoji", emoji.i, this.id);
    },
    emojiClose() {
      this.openEmoji = false;
    },
  },
};
</script>
<style lang="scss">
.emoji-picker {
  z-index: 100000;
}
</style>
