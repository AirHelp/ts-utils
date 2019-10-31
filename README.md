# ts-utils
Common utilities for TypeScript language.

## Managing application state in React

React.js is not opinionated when it comes to so called _global_ application state. There are hundreds of articles and videos online advocating for or criticising libraries which try to tackle the problem. The goal of this section is to wrap up what we have learnt about managing state in React applications so far. We start with the most basic example and gradually add some complexity to expose weak spots of implementation at given step.

Below is a simple app which presents how many kudos a user have and lets her increment this number by clicking a button as many times as she wants. Everything is contained in a single component.

```jsx
const App = () => {
  const [kudos, setKudos] = React.useState(0)

  const giveKudos = () => setKudos(kudos + 1)

  return (
    <div className="app">
      <h2>Current value: {kudos}</h2>
      <button onClick={giveKudos}>Give yourself some kudos, you deserve it</button>
    </div>
  )
}
```

It turns out people love praising themselves, so let's give our anonymous app a name and add some features. Now, we want _Kudos.ly_ to show kudos count in a header section and on user profile widget. The _killer feature_ is that in both of these places, the more kudos you have the bigger the font size is going to be:

```jsx
const App = () => {
  const [kudos, setKudos] = React.useState(0)

  const giveKudos = () => setKudos(kudos + 1)

  return (
    <div className="app">
      <Header kudos={kudos} />
      <UserProfile kudos={kudos} />
      <SelfKudo giveKudos={giveKudos} />
    </div>
  )
}

const Header = ({ kudos }) => (
  <div>
    <h1>Kudos.ly</h1>
    <div>
      Logged in as Anna (<KudosPresenter kudos={kudos} /> kudos)
    </div>
  </div>
)

const UserProfile = ({ kudos }) => (
  <div>
    <dl>
      <dt>Name: </dt>
      <dd>Anna Lee</dd>
      <dt>Kudos received so far:</dt>
      <dd>
        <KudosPresenter kudos={kudos} />
      </dd>
    </dl>
  </div>
)

const SelfKudo = ({ giveKudos }) => (
  <button onClick={giveKudos}>Give yourself kudos, you deserve it</button>
)

const KudosPresenter = ({ kudos }) =>
  kudos === 0 ?
    <span>zero</span> :
    <span style={{ fontSize: kudos * 1.4 }}>{kudos}</span>
)
```
The state implementation hasn't changed. However, we have to pass `kudos` and `setKudos` down the component tree to `KudosPresenter` and `SelfKudo`, so that they interact with a single source of truth regarding number of kudos.

As _Kudos.ly_ flourishes and new features arrive, the component tree grows as well. It was fine to pass `kudos` from `App` via `UserProfile` to `KudosPresenter`. But what if there are 8 intermediary components? Even though they don't care about this property, they still have to take care of passing it to its child components.

Now is the moment when people start to look around for a state management library. A few years ago, Facebook open sourced their guidelines for creating UIs along with some helper libraries and called the whole architecture [Flux](https://github.com/facebook/flux). Based on the same patterns, Dan Abramov created [Redux](https://github.com/reduxjs/redux), which gained much more traction in the community.

Even though [Redux is able to cut some complexity corners by using functional composition where Flux uses callback registration](https://stackoverflow.com/a/32920459), people often complain it requires writing too much boilerplate. This is why [MobX](https://github.com/mobxjs/mobx) also got its share of a cake. If you're willing to get more understanding of patterns behind state management, we highly recommend those two courses from Redux creator (both are provided free of charge):

- [egghead.io/courses/getting-started-with-redux](https://egghead.io/courses/getting-started-with-redux)
- [egghead.io/courses/building-react-applications-with-idiomatic-redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

The good news is with the realease of React 16.8 it became easier to manage application state without installing (and comprehending) any additional library. What if we took the advantage of hooks and context and avoided prop drilling?

- [reactjs.org/docs/hooks-reference.html#usecontext](https://reactjs.org/docs/hooks-reference.html#usecontext)
- [reactjs.org/docs/hooks-reference.html#usereducer](https://reactjs.org/docs/hooks-reference.html#usereducer)

This is how the implementation would look like:

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'GIVE_KUDOS':
      return {
        kudos: state.kudos + 1
      };
    default:
      return state;
  }
}

const StateContext = React.createContext({});

const StateProvider = ({ children, initialState }) => {
  const state = React.useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  )
}

const useAppState = () => React.useContext(StateContext)
```

Now, the state implementation we had initially with `useState` can be removed. Instead, let's wrap our application in `StateProvider`:

```jsx
const App = () => (
  <StateProvider initialState={{ kudos: 0 }}>
    <div className="app">
      <Header />
      <UserProfile />
      <SelfKudo />
    </div>
  </StateProvider>
)
```

Also, note how we got rid of passing `kudos` and `setKudos` props down the component tree. It's because we can access our application state straight from the components which need it:

```jsx
const KudosPresenter = () => {
  const [{ kudos }] = useAppState()

  return kudos === 0 ?
    <span>zero</span> :
    <span style={{ fontSize: kudos * 1.4 }}>{kudos}</span>
}

const Header = () => (
  <div className="header">
    <h1>Kudos.ly</h1>
    <span className="current-user">
      Logged in as Anna (<KudosPresenter /> kudos)
    </span>
  </div>
);

const UserProfile = () => (
  <div className="user-profile">
    <dl>
      <dt>Name: </dt>
      <dd>Anna Lee</dd>
      <dt>Kudos received so far:</dt>
      <dd>
        <KudosPresenter />
      </dd>
    </dl>
  </div>
);

const SelfKudo = () => {
  const [, dispatch] = useAppState()
  const giveKudos = () => dispatch({ type: 'GIVE_KUDOS' })

  return (
    <button onClick={giveKudos}>Give yourself kudos, you deserve it</button>
  )
}
```

Unfortunately, such approach to managing state comes with a performance penalty. How about we let _Kudos.ly_ users store a gallery of their photos?

```jsx
const App = () => (
  <StateProvider initialState={{
    photos: [{ id: 534534, url: '/img1.jpg' }],
    kudos: 83
  }}>
    ...
  </StateProvider>
)
```

Now, everytime user give herself kudos and we increment this number in a state object, all components which consume `StateProvider` would be updated. Even the ones which display the gallery and only need to read the collection under the `photos` key. It's not a problem when user has one picture uploaded just like in the example above. But what if someone uploaded 126 selfies? The performance may suffer. At least, fixing it will be easy once you realize nothing stops you from having multiple state providers. Not everything has to be global.

### Resources

- https://reactjs.org/docs/thinking-in-react.html
- https://reactjs.org/docs/lifting-state-up.html
- https://reactjs.org/docs/hooks-state.html
- https://egghead.io/courses/getting-started-with-redux
- https://egghead.io/courses/building-react-applications-with-idiomatic-redux
- https://kentcdodds.com/blog/prop-drilling
- https://kentcdodds.com/blog/application-state-management-with-react
- https://kentcdodds.com/blog/how-to-use-react-context-effectively
