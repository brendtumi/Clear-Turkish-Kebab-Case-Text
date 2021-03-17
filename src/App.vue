<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h1">Clear Turkish & Kebab Case Text</span>
      <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
        <li class="nav-item">
          <a class="nav-link p-2" href="https://github.com/brendtumi/Clear-Turkish-Kebab-Case-Text" target="_blank" rel="noopener" aria-label="GitHub">
            <svg class="navbar-nav-svg" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-label="GitHub">
              <title>GitHub</title>
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
    <div class="container mt-5">
      <div class="row">
        <div class="col">
          <textarea v-model="textToBeCleared" class="form-control" rows="10" style="min-width: 100%"></textarea>
        </div>
        <div class="col">
          <div class="form-group">
            <input id="generateKey" v-model="generateKey" class="form-check-input" type="checkbox" />
            <label class="form-check-label" for="generateKey">Generate Keys</label>
          </div>
          <div class="form-group">
            <input id="keepKeys" v-model="keepKeys" class="form-check-input" type="checkbox" />
            <label class="form-check-label" for="keepKeys">Preserve Keys</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="container">
            <div v-for="(txt, i) in clearedText" v-bind:key="i" class="row">
              <div class="col">
                <code>{{ txt }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      textToBeCleared: '',
      generateKey: true,
      keepKeys: false,
    };
  },
  computed: {
    clearedText() {
      const replace = t =>
        t
          .trim()
          .replace(/[-,'"\s]+$/, '')
          .replace(/^[-,'"\s]+/, '');

      if (this.textToBeCleared.trim().length === 0) return [];

      return this.textToBeCleared
        .trim()
        .split('\n')
        .map(text => {
          if (this.generateKey) {
            if (text.includes(':')) {
              const [key, val] = text.split(':');
              if (this.keepKeys && key.length > 0) {
                return `'${replace(key)}': '${replace(val)}'`;
              } else {
                return `'${this.clearText(val)}': '${replace(val)}',`;
              }
            } else {
              return `'${this.clearText(text)}': '${replace(text)}',`;
            }
          } else {
            if (text.includes(':') && this.keepKeys) {
              const [key, val] = text.split(':');
              return `'${replace(key)}': '${replace(val)}'`;
            }
            return this.clearText(text);
          }
        });
    },
  },
  methods: {
    clearText(txt) {
      let text = txt.trim();
      const trMap = {
        çÇ: 'c',
        ğĞ: 'g',
        şŞ: 's',
        üÜ: 'u',
        ıİ: 'i',
        öÖ: 'o',
      };
      for (let key in trMap) {
        text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
      }
      return text
        .replace(/[^-a-zA-Z0-9\s]+/gi, '')
        .replace(/\s/gi, '-')
        .replace(/[-]+/gi, '-')
        .replace(/[-\s]+$/, '')
        .replace(/^[-\s]+/, '')
        .toLowerCase();
    },
  },
};
</script>
