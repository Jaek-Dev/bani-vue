# Bani Vue Payment Widget

The Bani Vue Payment Widget is a convenient and user-friendly payment solution for web applications. It enables businesses to easily accept payments through various channels such as mobile money, cryptocurrency, bank transfers, and third-party wallets. With just a few simple steps, you can integrate this widget into your application and start accepting payments securely.


### Installation
You can install the Bani Vue Payment Widget using npm or yarn. Use the following command to install the package:

**Please note that this plugin currently support only vue 3.x**
```bash
# install using npm
npm install bani-vue

# or with yarn
yarn add bani-vue
```

### Plugin Registration
```js
/**
 * In your application entry file
 * main.js or app.js or main.ts or app.ts
 */
import { createApp } from 'vue';
import { BaniVue } from 'bani-vue';

const app = createApp({});

// Registration here
app.use(BaniVue);
```


The plugin can be used in 2 ways:
1. Directly inside the template
2. Using composables.


#### Example usage with template
```js
<script setup>
import { reactive, ref } from 'vue';

const merchantKey = ref('[YOUR_BANI_PUBLIC_KEY]');
const form = reactive({
    amount: '', 
    phoneNumber: '', // Please refer to Bani's documentation for accepted formats
    email: '',
    firstName: '',
    lastName: ''
})
</script>


<template>
    <form @submit.prevent="$bani({
        ...form, 
        merchantKey,
        //Optional properties
        callback(response) { console.log(response); },
        onClose(response) { console.log(response); },
    })">
        <input type="text" v-model="form.firstName" required />
        <input type="text" v-model="form.lastName" required />
        <input type="email" v-model="form.email" required />
        <input type="tel" v-model="form.phone" required />
        <input type="number" v-model="form.amount" required />
        <button>Pay {{ form.amount }}</button>
    </form>
</template>
```


#### Example usage with composable
```js
<script setup>
import { reactive, ref } from 'vue';
import { useBani } from 'bani-vue';

const merchantKey = ref('[YOUR_BANI_PUBLIC_KEY]');
const form = reactive({
    amount: '', 
    phoneNumber: '', // Please refer to Bani's documentation for accepted formats
    email: '',
    firstName: '',
    lastName: ''
});

const baniPopup = useBani();

function payWithBani() {
    baniPopup({
        ...form, 
        merchantKey: merchantKey.value,
        //Optional properties
        callback(response) {
            console.log(response);
        },
        onClose(response) {
            console.log(response);
        },
    });
}
</script>


<template>
    <form @submit.prevent="payWithBani">
        <input type="text" v-model="form.firstName" required />
        <input type="text" v-model="form.lastName" required />
        <input type="email" v-model="form.email" required />
        <input type="tel" v-model="form.phone" required />
        <input type="number" v-model="form.amount" required />
        <button>Pay {{ form.amount }}</button>
    </form>
</template>
```

Please refer to the [bani's documentation](https://docs.getbani.com/bani-pop/initiate-transaction) for more information on available options and customization.

Thousands of businesses of all sizes rely on Bani™ suite of products to receive cardless payments and make payouts seamlessly. Sign up [here](https://bani.africa) to get started.

#### Demo

![demo image](https://res.cloudinary.com/alameen-ak/image/upload/v1686588243/Screenshot_2023-06-12_at_5.42.34_PM_bunfyf.png)



Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities.

#### How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or HackerNews? Spread the word!

Don't forget to [follow me on Twitter](https://twitter.com/Jaek_Dev)! and also  [follow me on LinkedIn](https://www.linkedin.com/in/Jaek-Dev)!


Thanks!
Jacob Eke.

#### License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.