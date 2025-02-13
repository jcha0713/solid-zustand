<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-zustand&background=tiles&project=%20" alt="solid-zustand">
</p>

# solid-zustand

🐻 State management in Solid using [zustand](https://github.com/pmndrs/zustand).

## Install

```sh
pnpm add zustand solid-zustand
```

Demo: https://stackblitz.com/edit/vitejs-vite-tcofpc

## Example

```jsx
import create from 'solid-zustand'

interface BearState {
  bears: number
  increase: () => void
}

const useStore = create<BearState>(set => ({
  bears: 0,
  increase: () => set(state => ({ bears: state.bears + 1 }))
}))

function BearCounter() {
  const state = useStore()
  return <h1>{state.bears} around here ...</h1>
}

function Controls() {
  const state = useStore()
  return (
    <>
      <button onClick={state.increase}>one up</button>
      {/* Or */}
      <button onClick={() => useStore.setState((prev) => ({ bears: prev.bears + 1 }))}>
        one up
      </button>
    </>
  )
}
```

## Selecting multiple state slices

Since `solid-zustand` uses [createStore](https://www.solidjs.com/docs/latest/api#createstore) to store updates from zustand, state slices only works on plain objects and arrays (as of [v1.4.0](https://github.com/solidjs/solid/releases/tag/v1.4.0)).

```ts
// Do this
const useStore = create(set => ({
  bears: {
    count: 0,
  }
}));
const bears = useStore(state => state.bears); // <div>{bears.count}</div>

// Don't
const useStore = create(set => ({
  bears: 0
}));
const count = useStore(state => state.bears); // <div>{count}</div> Always 0
```

Multiple state-picks also works

```ts
import shallow from 'zustand/shallow';

// Object pick, either state.bears or state.bulls change
const { bears, bulls } = useStore(
  state => ({ bears: state.bears, bulls: state.bulls }),
  shallow,
);

// Array pick, either state.bears or state.bulls change
const [bears, bulls] = useStore(state => [state.bears, state.bulls], shallow);
```

## License

MIT
