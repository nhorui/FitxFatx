<template>
  <form class="form" @submit.prevent="sendMessage">
    <input class="input" type="text"
            placeholder="Nome" 
            v-model="username" />
    <input class="input" type="text" 
           placeholder="Digite sua mensagem"
           v-model="message" />
    <button class="button">Enviar</button>
  </form>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      username: '',
      message: '',
      socket: io('http://localhost:5000'),
    };
  },
  methods: {
    sendMessage() {
      if (this.message && this.username) {
        this.socket.emit('send message',
        { username: this.username,
        content: this.message });
        this.message = '';
      }
    },
  },
};
</script>
