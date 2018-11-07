# Express Template

Express on docker with unit test, lint and logger.

## Getting Started

### Node

```
npm install

npm start
```

### Docker

```
docker build -t express-template .

docker run --rm -p 3000:3000 --name express express-template
```

## Running the tests

```
npm install

npm run test
```


## Running lint

```
npm install

npm run lint
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
