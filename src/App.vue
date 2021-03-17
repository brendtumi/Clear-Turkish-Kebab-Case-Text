<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Clear Turkish & Kebab Case Text</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <textarea v-model="textToBeCleared" class="form-control" rows="10" style="min-width: 100%"></textarea>
      </div>
      <div class="col">
        <div class="form-group">
          <input id="generateKey" v-model="generateKey" class="form-check-input" type="checkbox">
          <label class="form-check-label" for="generateKey">Generate Keys</label>
        </div>
        <div class="form-group">
          <input id="keepKeys" v-model="keepKeys" class="form-check-input" type="checkbox">
          <label class="form-check-label" for="keepKeys">Preserve Keys</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="container">
          <div v-for="(txt,i) in clearedText" v-bind:key="i" class="row">
            <div class="col">
              <code>{{ txt }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      textToBeCleared: '',
      generateKey: true,
      keepKeys: false,
    }
  },
  computed: {
    clearedText() {
      const replace = (t) => t.trim().replace(/[,\s]+$/, '').replace(/['"]+/ig, '');

      if (this.textToBeCleared.trim().length === 0) return [];

      return this.textToBeCleared.trim().split("\n").map(text => {
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
            return `'${replace(key)}': '${this.clearText(val)}'`;
          }
          return this.clearText(text);
        }
      });
    }
  },
  methods: {
    clearText(txt) {
      let text = txt.trim();
      const trMap = {
        'çÇ': 'c',
        'ğĞ': 'g',
        'şŞ': 's',
        'üÜ': 'u',
        'ıİ': 'i',
        'öÖ': 'o'
      };
      for (let key in trMap) {
        text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
      }
      return text.replace(/[^-a-zA-Z0-9\s]+/ig, '')
          .replace(/\s/gi, "-")
          .replace(/[-]+/gi, "-")
          .replace(/[-\s]+$/, '')
          .replace(/^[-\s]+/, '')
          .toLowerCase();
    }
  }
}
</script>