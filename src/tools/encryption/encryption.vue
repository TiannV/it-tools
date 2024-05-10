<template>
  <div class="box-2 mg-b-4"><span class="b">说明：</span>AES默认使用CBC模式,数据块长度为128位，所以密钥、IV长度需要为16个字符，IV与密钥超过长度则截取，不足则在末尾填充'\0'补足</div>
  <n-card :title="t('tools.encryption.encrypt')">
    <n-space item-style="flex: 1 1 0">
      <n-form-item :label="t('tools.encryption.text')" :show-feedback="false">
        <n-input
          v-model:value="cypherInput"
          type="textarea"
          placeholder="The string to cypher"
          :autosize="{ minRows: 4 }"
        />
      </n-form-item>
      <n-space vertical>
        <n-form-item :label="t('tools.encryption.secret')" :show-feedback="false">
          <n-input v-model:value="cypherSecret" />
        </n-form-item>
        <n-form-item label="Encryption algorithm:" :show-feedback="false">
          <n-select
            v-model:value="cypherAlgo"
            :options="Object.keys(algos).map((label) => ({ label, value: label }))"
          />
        </n-form-item>
        <n-form-item
          v-if="cypherAlgo === 'AES' || cypherAlgo === 'TripleDES'"
          :label="t('tools.encryption.iv')"
          :show-feedback="false"
        >
          <n-input v-model:value="cypherInitializationVector" />
        </n-form-item>
      </n-space>
    </n-space>
    <br />
    <n-form-item :label="t('tools.encryption.encrypted')" :show-feedback="false">
      <n-input
        :value="cypherOutput"
        type="textarea"
        placeholder="Your string hash"
        :autosize="{ minRows: 2 }"
        readonly
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />
    </n-form-item>
  </n-card>
  <n-card :title="t('tools.encryption.decrypt')">
    <n-space item-style="flex: 1 1 0">
      <n-form-item :label="t('tools.encryption.text')" :show-feedback="false">
        <n-input
          v-model:value="decryptInput"
          type="textarea"
          placeholder="The string to cypher"
          :autosize="{ minRows: 4 }"
        />
      </n-form-item>
      <n-space vertical>
        <n-form-item :label="t('tools.encryption.secret')" :show-feedback="false">
          <n-input v-model:value="decryptSecret" />
        </n-form-item>
        <n-form-item label="Encryption algorithm:" :show-feedback="false">
          <n-select
            v-model:value="decryptAlgo"
            :options="Object.keys(algos).map((label) => ({ label, value: label }))"
          />
        </n-form-item>
        <n-form-item
          v-if="decryptAlgo === 'AES' || decryptAlgo === 'TripleDES'"
          :label="t('tools.encryption.iv')"
          :show-feedback="false"
        >
          <n-input v-model:value="decryptInitializationVector" />
        </n-form-item>
      </n-space>
    </n-space>
    <br />
    <n-form-item :label="t('tools.encryption.decrypted')" :show-feedback="false">
      <n-input
        :value="decryptOutput"
        type="textarea"
        placeholder="Your string hash"
        :autosize="{ minRows: 2 }"
        readonly
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />
    </n-form-item>
  </n-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { AES, TripleDES, Rabbit, RC4, enc } from 'crypto-js';
const { t } = useI18n();
const algos = { AES, TripleDES, Rabbit, RC4 };

function padOrTruncate(str) {
  var length = 16;
  var padChar = '\0'
  // 如果字符串长度大于或等于指定长度，则截取字符串
  if (str.length >= length) {
    return str.substring(0, length);
  }
  // 如果字符串长度小于指定长度，则在末尾填充字符
  return str.padEnd(length, padChar);
}


const cypherInput = ref('Hello World!');
const cypherAlgo = ref<keyof typeof algos>('AES');
const cypherSecret = ref('16bit secret key');
const cypherInitializationVector = ref('0000000000000000');
const cypherOutput = computed(() => {
  var cfg = {};
  if (cypherAlgo.value === 'AES' || cypherAlgo.value === 'TripleDES') {
    cfg = { iv: enc.Utf8.parse(padOrTruncate(cypherInitializationVector.value)) };
  }
  return algos[cypherAlgo.value].encrypt(cypherInput.value, enc.Utf8.parse(padOrTruncate(cypherSecret.value)), cfg).toString();
});

const decryptInput = ref('Odu4DtI1EkkdyQG9ERfTzw==');
const decryptAlgo = ref<keyof typeof algos>('AES');
const decryptSecret = ref('16bit secret key');
const decryptInitializationVector = ref('0000000000000000');
const decryptOutput = computed(() => {
  var cfg = {};
  if (decryptAlgo.value === 'AES' || decryptAlgo.value === 'TripleDES') {
    cfg = { iv: enc.Utf8.parse(padOrTruncate(decryptInitializationVector.value)) };
  }
  return algos[decryptAlgo.value]
    .decrypt(decryptInput.value, enc.Utf8.parse(padOrTruncate(decryptSecret.value)), cfg)
    .toString(enc.Utf8);
});
</script>

<style lang="less" scoped>
.box-1,.box-2,.box-3{padding:10px;background:#FFF;border:1px solid #CCCCCC;overflow:hidden;border-radius:2px;}
.box-2{background:#FFF8E0;border-color:#f98;}
.mg-b-4{margin-bottom:16px !important;}
.b{font-weight:bold;}
</style>
