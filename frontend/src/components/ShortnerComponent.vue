<template>
    <div class="container">
      <h1>URL Shortener</h1>
  
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
          width="560"
          height="315"
        ></iframe>
    </div>
    <div class ="Analyse">
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
      <div v-if="numberOfClicks " class="result">
        <p>NumberOfClicks: {{ numberOfClicks }}</p>
        <p v-if="createdAt">URL Created At: {{ formattedCreatedAt }}</p>
      </div>
  
    
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { format } from "date-fns"; 

  
  export default {
      data() {
          return {
              longUrl: '',
              shortUrl: '',
              videoId: '',
              numberOfClicks: '',
              analyseURL:'',
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
              }else {
                this.videoId = '';  
              }
           },
            async analyseContent(){
            const contentID = this.analyseURL.split('/').pop();
            const response = await axios.get(`http://localhost:3000/analytics/${contentID}`);
            this.numberOfClicks = response.data.hitCount;
            this.createdAt = response.data.createdAt;
            console.log(this.numberOfClicks,this.createdAt)
           }
      },
      computed: {
    formattedCreatedAt() {
      const date = new Date(this.createdAt);
      return format(date, "dd MMM yyyy "); 
    },
    }
  };
  </script>
  
  
  <style>
  .container {
    max-width: 600px;
    margin: 50px auto;
    font-family: Arial, sans-serif;
    text-align: center;
  }
  
  h1 {
    color: #333;
  }
  
  .form {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 20px 0;
  }
  
  input {
    width: 70%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .result {
    margin: 20px 0;
    color: green;
  }
  
  .error {
    color: red;
  }
  </style>
  