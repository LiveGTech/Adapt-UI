# `Dependency` component
Astronaut:
```javascript
Dependency() ()
```

HTML:
```html
<aui-dependency></aui-dependency>
```

A container that is designed to contain user interface elements that are dependent on the user interface component above the container being enabled. `Dependency` components have an indentation to represent this.

It is recommended that when the dependent options are intended to be disabled, the `inert` attribute is set to `"dependent"`, as this will make all elements within the `Dependency` container non-interactive and faded in appearance. Otherwise, the `inert` attribute should be removed.