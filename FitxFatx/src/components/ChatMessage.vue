<template>
  <div class="messageArea">
    <p class="message" v-for="message in messages"
                       :key="message.id">
      <span class="username">{{ message.username }}:</span>
      <span class="content">{{ message.content }}</span>
    </p>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      messages: [],
      socket: io('http://localhost:5000'),
    };
  },
  mounted() {
    this.socket.on('send message', (message) => {
      this.messages.push(message);
    });
  },
};
</script>
