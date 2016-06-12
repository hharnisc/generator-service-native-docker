# generator-kube-service

Yeoman generator to build, test and deploy a node service to [Kubernetes](kubernetes.io)


## Setup

```bash
$ npm install -g yo
```

Clone the generator then run:

```bash
$ npm link
```

## Sequence

1. Create a blank repo on github, clone to local system.
2. Run `yo kube-service`
3. Commit and push.

## TODO

- Local deploy should just work, but you have to push images to docker hub for some reason. [see this localkube issue](https://github.com/redspread/localkube/issues/64)
- Hot reload in localkube
- Deploy to production
