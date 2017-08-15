# Custom English Dictionary 
> 

## Installation

First, install [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).
Then run:

```bash
npm install
```

For development go to the folder **./public** and install dependencies:
```
cd public/
npm install
```

## How to use

Before starting the project you need add your **OxfordDictionaries API Id** and **OxfordDictionaries API Key**. If you have not it you can [create the account](https://developer.oxforddictionaries.com/).
Just add your **Id** and **API Key** to **./dictionary.config.js**:

```bash
var config = {
  oxforddictionariesAPIKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  oxforddictionariesAPIId: 'yyyyyyyy'
};

module.exports = config;
```

Now you can run the project:

```bash
npm run start
```

Your app is available by address:

```bash
http://localhost:3000/
```

## License

 © [Liuba Khomych](https://www.facebook.com/abbothca)


[npm-image]: https://badge.fury.io/js/generator-first.svg
[npm-url]: https://npmjs.org/package/generator-first
[travis-image]: https://travis-ci.org/abbothca/generator-first.svg?branch=master
[travis-url]: https://travis-ci.org/abbothca/generator-first
[daviddm-image]: https://david-dm.org/abbothca/generator-first.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/abbothca/generator-first
[coveralls-image]: https://coveralls.io/repos/abbothca/generator-first/badge.svg
[coveralls-url]: https://coveralls.io/r/abbothca/generator-first
