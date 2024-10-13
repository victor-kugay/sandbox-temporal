# Temporal Sandbox

## Features

The repository provides [temporal.io](https://github.com/temporalio/temporal) configuration setup and includes next files:

* [workflow.ts](src/workflow.ts) - workflow sample

* [worker.ts](src/worker.ts) - worker sample

* [client.ts](src/client.ts) - client sample

* [activities.ts](src/activities.ts) - activities sample

* [workflow.test.ts](src/__tests__/workflow.test.ts) - test sample

## Installation

1. Install Node Modules

```bash
$ npm install
```

2. Run Provision

```bash
$ make docker-up
```

## Getting Started

1. Run worker

```bash
$ make worker-up
```

2. Run client

```bash
$ make client-up
```

## Local Setup

* Device: MacBook Pro, Apple M1 Max, macOS 14.5 (23F79), RAM 32 GB

* Docker: v24.0.2

* Docker Compose v2.18.1