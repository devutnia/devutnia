# Lumby

```
Lumby is a WIP at v.0.0.1
Although the `core` API of the library should stay untouched, there will be changes to everything, so keep an eye on things.
```

Lumby is a state-machine-like CSS-in-JS UI builder/tool.

It's purpose is to speed up the process of developing UI components for MVP software products, where DevEx and speed of building are probably some of the most important success factors for the future of any early software product.

### How to use

Just run `yarn lumby:docs` in your terminal to open .storybook instance of Lumby's docs. <br/>
To work on the code go to `libs/lumby/src/lib` and code away ;)

If you just want to read the docs, go to [libs/lumby/src/lib/docs](https://github.com/devutnia/devutnia/tree/main/libs/lumby/src/lib/docs).

### Why Lumby

I have worked on several MVPs and early-stage products. I have used all the Bulmas, Tailwinds, Materials, Evergreens, Bootstraps, Blueprints and Antds of today, but they all have a common problem. They all lack a specific component I need at a given moment that is needed in the UI and adding an external one or restyling the one they
have is a huge feckin' bummer. CSS conflicts on top of CSS conflicts (I am an app developer, not a web devevloper, so my CSS skills are probably mere) and everything just falls apart after changing one property.

The most time I've spent coding was finetuning some custom pieces of UI, because they were not cooperating with the UI library I was currently using.
Not to mention some weird ways of theming components. If I just want to change one thing globally, I shouldn't have to install some additional libraries and set up webpacks and babels to adjust some `backgroundColor`.

I almost cried when I discovered CSS-in-JS, because it helped solve a gazillion of CSS-related problems. It meant, however, that I would end up writing similar UI components over and over again. I have been using `styled-components` for the past three years and while CSS-in-JS did speed up the UI development process by a lot in my case, it still left a lot to be desired. I think I became a king of CSS-in-JS pasta code at some point.

I tried using some other custom CSS-in-JS libraries built by community, but the DevEx I expected was not there.

All in all, developing UIs for MVPs has always been a huge bummer for me, because it is always dynamic and it is always chaotic, with sudden changes in concepts and themes. UI development pretty much always ends up a huge dumpster fire for me that just spins out of control in the end.

Lumby tries to go about the issue of rapid UI development in MVP projects. <br/>
It introduces a state-machine like approach to building UIs for early-stage products. It focuses on DevEx, while providing a solid pre-defined theming and dynamic access to the entire UI. <br/>

It forces you to define the initial stylesheet. That way, should your UI requirements change, you just change it in one place and can adjust it further from anywhere in the code on the go. However, instead of using `*.css` files, the styling is built per component's props.<br/>

By using [emotionjs]() as a frame for this library, we can use both JS style objects or any other styling that can be understood by `emotion` itself. It gives us freedom to style our components however we like on the fly. <br/>

`@devutnia/lumby/core` provides all the tools you might need to start creating your own UI components.
