# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

IMPORTANT BUG THAT WAS EXPERIENCED WITH THE FORM SUBMISSION : 

"Cross-site POST form submissions are forbidden"

you have to add ->  ORIGIN=http://localhost:3000 node build/index.js
to ur .env files

and then in vercel > project > settings > general > project settings > chaange the development command to vite --port 3000

now vercel dev should work without getting that stupid error 

This is where i found solution : https://github.com/orgs/vercel/discussions/3390

<!-- 25.06.24 -->
some package installed today : npm i -D @smui/button @smui/data-table @smui/dialog @smui/textfield @smui/linear-progress @smui/card

from https://refine.dev/blog/sveltekit-crud-app-with-svelte-mui/#create-the-app-ui

hopefully i can figure out how this crud shit works

<!-- img import -->
i know you hate using script and then importing images there to then use them in the dom, 
so instead i figured out a new way 

run : npm install --save-dev @sveltejs/enhanced-img
then in vite.config.js add this :

import { enhancedImages } from '@sveltejs/enhanced-img';

	plugins: [enhancedImages() ,sveltekit()],


but you know, make it make sense

and thats it, now instead of using <img> u can use <enchanced:img /> which will work with src="$/lib/images/cool.png"

got it from this site : https://sveltekit.io/blog/sveltekit-images


<!-- below makes rem units easier to use, 1rem = 10p, this has to be in <style> of app.html the root.-->
	 html{
		font-size: 62.5%;
	 }
	 body{
		font-size: 1.6rem;
	 }
