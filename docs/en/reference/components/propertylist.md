# `PropertyList` component
Astronaut:
```javascript
PropertyList() (
    Property() (Text(), Text()),
    Property() (Text(), Text()),
    Property() (Text(), Text())
)
```

HTML:
```html
<dl>
    <div>
        <dt></dt>
        <dd></dd>
    </div>
    <div>
        <dt></dt>
        <dd></dd>
    </div>
    <div>
        <dt></dt>
        <dd></dd>
    </div>
</dl>
```

A list consisting of items that have a name and a value. The list should contain [`Property` components](property.md).