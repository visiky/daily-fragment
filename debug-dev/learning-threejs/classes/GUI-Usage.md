# Three.js 提供的GUI使用方法

## Examples

http://workshop.chromeexperiments.com/examples/gui/#10--Updating-the-Display-Manually

## Basic

```js
gui.add(params, 'width').min(128).max(256).step(16)
```

```js
// .name("better label")
gui.add(params, 'width').name('Width');
```


## Shortcuts

- press `H` to toggle GUI