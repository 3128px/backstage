# Setup

## Manual Kubernetes `httpbin` and gateway setup

1. Install [`kind`](https://kind.sigs.k8s.io/).

```console
brew install kind
```

2. Create a cluster.

```console
kind create cluster
```

3. Install `httpbin`, and label the deployment with: `app=httpbin`.

```console
kubectl apply -f https://raw.githubusercontent.com/istio/istio/master/samples/httpbin/httpbin.yaml
kubectl label deployment httpbin app=httpbin
```

5. Install CRDs and deployments required for Envoy Gateway, by following: https://github.com/envoyproxy/gateway/blob/main/docs/user/QUICKSTART.md.

```console
kubectl apply -f https://github.com/envoyproxy/gateway/releases/download/v0.2.0-rc2/gatewayapi-crds.yaml
kubectl apply -f https://github.com/envoyproxy/gateway/releases/download/v0.2.0-rc2/install.yaml
```

6. Install dataplanes resources:

```
kubectl apply -f packages/catalog-model/examples/kubernetes/gateways/dataplanes
```

7. Expose httpbin:

```
kubectl apply -f packages/catalog-model/examples/kubernetes/applications/httpbin
```

8. Run local kube proxy:

```console
kubectl proxy
```

9. In another terminal session, run:

```console
yarn dev
```
