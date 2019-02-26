Fast and Furious E2E: Using Testcafe for Easy End-to-End Testing
---

Building automated tests is the "Liver and Onions" of the programming world. Everyone agrees that it's good for you, but no one really wants to get into it. When anyone starts, many questions quickly come to mind: "What testing framework should I use in a chaotic world, and will it still be valid, years from now", "what are the things I should be testing", and "how much time do I really have to set these things up" are three avenues of questioning that quickly become familiar to the developer world.

If you find yourself there, then I have good news for you: There is a testing framework for E2E that has legs, that is easy to set up, and is easy to execute.

And we're going to build some tests. Once we gloss over the types of testing, end where E2E sits, and where Testcafe came from.

## Understanding Testing

If you're new to automated testing, you should take a moment to learn the differences between the types of test which you would run. The four distinct categories of tests are "Static Testing', 'Unit Testing', 'Integration Testing', and 'End to End Testing'. The first type, static, deals with errors a programmer may make while typing the code, such as syntax or patterns which linters can observe as bad. Unit Testing is the next step up, where you are looking at a single function in isolation. Integration testing looks at many of these functions when together, and finally, End-to-end (E2E) looks at what results from specific interactions. If you want to learn more about this, then I suggest reading into this article by Kent C Dodds, who brilliantly summarizes this topic.

## What is Testcafe

![Testcafe Logo](https://raw.githubusercontent.com/DevExpress/testcafe/master/media/testcafe-logo.svg?sanitize=true)

Testcafe is a fully-integrated E2E testing library written for NodeJS (Node). It was borne from the difficulty of building testing E2E platforms which relied on other technologies, so that teams can focus chiefly on the tests, as opposed to the framework which runs the tests. Testcafe comes from [Developer Express](https://www.devexpress.com/), a services shop that specializes in dashboards and other user interface components for the Microsoft proprietary ecosystem. 

There are many extensions available for this testing suite including for browserstack, and it also offers a UI-based testing tool for automated E2E tests at cost. Because it operates as a standalone E2E entity, it doesn't need to integrate with modern Javascript frameworks to test many things. But for special cases, there is a rich plugin ecosystem that allows users to integrate if this is something that's really needed. 

## Building E2E Tests

**If you are stuck, [this link](https://github.com/sparkgeo/testcafe-introduction-examples/branches) contains stepped solutions for each of the sections of this tutorial**. 

In this tutorial, we're going to build fictional E2E tests for [Leaflet](https://leafletjs.com/), and how Testcafe can be used to capture changes to DOM elements, as well as network request. To follow this tutorial, you're going to require the following:

1. A text editor. My preference is [VSCode](https://code.visualstudio.com/).
2. A command line terminal. This tutorial is writen for a Mac or Linux machine. 
3. Git. It comes with Linux or Mac, but Windows users can find it [here](https://code.visualstudio.com/)
4. NodeJS, at least at version 8.15 (lts/carbon). 

This list makes up a common toolsuite for developers. If you're building applications in React, Ember, or Vue, there's a good chance you already have all of these things. 
