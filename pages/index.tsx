import type { NextPage } from 'next'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks'
import { wrapper } from '../store';
import { setX } from '../store/vault/vault.slice';

export const getStaticProps = wrapper.getStaticProps(store => () => {
  // this gets rendered on the server, then not on the client
  console.debug('In Static Props');
  store.dispatch(setX('Initial State'));
  return {
    // does not seem to work with key `initialState`
    props: { someKey: 'INIITIAL STATE!' }
  }
})

const Index: NextPage<{ someKey?: string }> = (props) => {
  const data = useAppSelector(state => state.vault.x);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState(props.someKey ?? '');
  return (
    <div>
      <p>{data}</p>
      <p>{props.someKey}</p>
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={() => dispatch(setX(input))}>Change</button>
    </div>
  );
};

export default Index;
