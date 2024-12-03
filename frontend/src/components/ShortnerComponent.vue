<template>
  <div class="container">
    <h1 style="color:blue; font-size: 700">URL Shortner</h1>
    <div class="card">
      <h1>Paste your URL to shorten</h1>

      <div class="form">
        <input
          type="text"
          v-model="longUrl"
          placeholder="Enter a URL to shorten"
          @keyup.enter="shortenUrl"
          @input="previewVideo"
        />
        <button @click="shortenUrl">Shorten</button>
      </div>

      <div v-if="shortUrl" class="result">
        <p>Shortened URL:</p>
        <a :href="shortUrl" target="_blank">{{ shortUrl }}</a>
      </div>

      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <div v-if="videoId" class="video-preview">
        <iframe
          :src="`https://www.youtube.com/embed/${videoId}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          width="100%"
          height="315"
        ></iframe>
      </div>
    </div>

    <div class="card">
      <h1>Analyse your content</h1>
      <div class="form">
        <input
          type="text"
          v-model="analyseURL"
          placeholder="Enter a URL to Analyse"
          @keyup.enter="analyseContent"
        />
        <button @click="analyseContent">Analyse</button>
      </div>

      <div v-if="numberOfClicks" class="result">
        <p>Number of Clicks: {{ numberOfClicks }}</p>
        <p v-if="createdAt">URL Created At: {{ formattedCreatedAt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';

export default {
  data() {
    return {
      longUrl: '',
      shortUrl: '',
      videoId: '',
      numberOfClicks: '',
      analyseURL: '',
      createdAt: '',
    };
  },
  methods: {
    async shortenUrl() {
      const response = await axios.post('http://localhost:3000/shorten', { originalUrl: this.longUrl });
      this.shortUrl = `http://localhost:3000/${response.data.shortUrl}`;
    },
    previewVideo() {
      // eslint-disable-next-line no-useless-escape
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/))?(?:\?v=([a-zA-Z0-9_-]+))/;
      const match = this.longUrl.match(youtubeRegex);
      console.log(match);

      if (match && (match[1] || match[2])) {
        this.videoId = match[1] || match[2];
        this.error = '';
      } else {
        this.videoId = '';
      }
    },
    async analyseContent() {
      const contentID = this.analyseURL.split('/').pop();
      const response = await axios.get(`http://localhost:3000/analytics/${contentID}`);
      this.numberOfClicks = response.data.hitCount;
      this.createdAt = response.data.createdAt;
      console.log(this.numberOfClicks, this.createdAt);
    }
  },
  computed: {
    formattedCreatedAt() {
      const date = new Date(this.createdAt);
      return format(date, 'dd MMM yyyy');
    }
  }
};
</script>

<style scoped>
/* General Container */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
  border-radius: 5;
  box-shadow: slategray;
}

/* Card for Form and Results */
.card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
  text-align: center;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

/* Header */
h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 600;
}

/* Form Styling */
.form {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap;
}

input {
  width: 70%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 12px 20px;
  border: none;
  background-color: #007bff;
  height:40px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Results & Error */
.result {
  margin: 20px 0;
  color: #28a745;
}

.error {
  color: red;
}

/* Video Preview */
.video-preview {
  margin-top: 20px;
  margin-bottom: 20px;
}

/* Responsive Design */
@media (max-width: 600px) {
  .form {
    flex-direction: column;
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }
}

@media (max-width: 400px) {
  h1 {
    font-size: 1.5rem;
  }
}
</style>
