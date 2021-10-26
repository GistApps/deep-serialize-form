# Deep Serialize Form Data

Form serializer capable of handling nested data and arrays. Based largely from
Ben Alman's De-param function from the JQuery BBQ plugin, but altered to
have no jQuery dependencies, and convert FormData into javascript objects,
instead of query parameters.

## Installation

 ```bash
 $ yarn add deep-serialize-form
 ```

## Usage

Modular Javascript:

```javascript
> import deepSerializeForm from 'deep-serialize-form'
```

Include Directly:

```html
> <script src="/deep-serialize-form.min.js"></script>
```

Usage:
```javascript
> const form = document.getElementById('form');
> const data = deepSerializeForm(form);
> console.log(data);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
[GPL](https://www.gnu.org/licenses/gpl-3.0.en.html)
